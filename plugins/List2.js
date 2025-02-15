const fs = require('fs');
const path = require('path');
const { cmd } = require('../command');

const pluginsPath = path.join(__dirname, '../plugins');

cmd({
    pattern: "list2",
    alias: ["listcmd", "commands"],
    desc: "Show all available commands",
    category: "menu",
    react: "⚡",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        let files = fs.readdirSync(pluginsPath).filter(file => file.endsWith('.js'));

        if (files.length === 0) {
            return reply("⚠ No command files found.");
        }

        let commandGroups = {};

        // Read each file and extract `pattern` and `category`
        files.forEach(file => {
            let content = fs.readFileSync(path.join(pluginsPath, file), 'utf-8');
            let patternMatch = content.match(/pattern:\s*["']([^"']+)["']/);
            let categoryMatch = content.match(/category:\s*["']([^"']+)["']/);

            if (patternMatch && categoryMatch) {
                let command = patternMatch[1];
                let category = categoryMatch[1];

                if (!commandGroups[category]) {
                    commandGroups[category] = [];
                }
                commandGroups[category].push(command);
            }
        });

        if (Object.keys(commandGroups).length === 0) {
            return reply("⚠ No valid commands found.");
        }

        // Build the message with your desired style
        let commandList = '';

        for (let category in commandGroups) {
            commandList += `╭━━〔 *${category}* 〕━┈⊷\n`;
            commandList += `┃◈╭────────────·๏\n`;

            commandGroups[category].forEach(cmd => {
                commandList += `┃◈┃• ${cmd}\n`;
            });

            commandList += `╰━━━━━━━━━━━━━━━━━━━╯\n\n`;
        }

        // Send the message with the stylish command list
        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/5hdckf.jpeg` },
                caption: commandList
            },
            { quoted: mek }
        );

        // Send the song after listing commands
        await conn.sendMessage(
            from,
            {
                audio: { url: 'https://github.com/devhanstz/VORTEX-XMD-DATA/raw/refs/heads/main/KingHans/Menu.mp3' },
                mimetype: 'audio/mp4',
                ptt: true
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});
