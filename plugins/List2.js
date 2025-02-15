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
        let commands = [];

        // Read all plugin files
        const files = fs.readdirSync(pluginsPath).filter(file => file.endsWith('.js'));

        files.forEach(file => {
            try {
                const plugin = require(path.join(pluginsPath, file));

                if (plugin?.cmd?.pattern) {
                    let commandName = plugin.cmd.pattern;
                    let category = plugin?.cmd?.category ? plugin.cmd.category.toUpperCase() : "UNCATEGORIZED";

                    commands.push({ name: commandName, category });
                }
            } catch (err) {
                console.log(`Error loading ${file}: ${err.message}`);
            }
        });

        if (commands.length === 0) {
            return reply("⚠ No commands found.");
        }

        // Organize commands by category
        let commandList = `📌 *Available Commands:* \n\n`;
        let groupedCommands = {};

        commands.forEach(cmd => {
            if (!groupedCommands[cmd.category]) {
                groupedCommands[cmd.category] = [];
            }
            groupedCommands[cmd.category].push(cmd.name);
        });

        Object.keys(groupedCommands).forEach(category => {
            commandList += `📂 *${category}*\n`;
            groupedCommands[category].forEach(cmd => {
                commandList += `  ➤ ${cmd}\n`;
            });
            commandList += `\n`;
        });

        // Send the message
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
