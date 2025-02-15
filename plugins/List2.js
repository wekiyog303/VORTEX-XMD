const config = require('../config');
const { cmd } = require('../command');
const path = require('path');
const fs = require('fs');

cmd({
    pattern: "list2",
    alias: ["listcmd", "commands"],
    desc: "menu the bot",
    category: "menu",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const pluginsDir = path.join(__dirname, '../plugins');
        const pluginCategories = {};

        // Read all plugin directories dynamically
        const categories = fs.readdirSync(pluginsDir).filter(folder => fs.statSync(path.join(pluginsDir, folder)).isDirectory());
        
        categories.forEach(category => {
            const categoryPath = path.join(pluginsDir, category);
            const commands = fs.readdirSync(categoryPath).filter(file => file.endsWith('.js'));
            if (commands.length > 0) {
                pluginCategories[category] = commands.map(cmd => cmd.replace('.js', ''));
            }
        });

        let commandDescription = "╭━━━━━━━━━━━━⪼\n";
        commandDescription += "Installed Plugins:\n";

        // Loop through dynamically found categories
        for (const [category, cmds] of Object.entries(pluginCategories)) {
            commandDescription += `\n*${category} Commands*:\n`;
            cmds.forEach(cmd => {
                commandDescription += `⬡│▸ *${cmd}*\n`;
            });
        }

        commandDescription += "╰━━━━━━━━━━━━⪼\n";

        await conn.sendMessage(
            from,
            {
                image: { url: 'https://files.catbox.moe/5hdckf.jpeg' },
                caption: commandDescription + `\n> ${config.DESCRIPTION}`,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363395768630577@newsletter',
                        newsletterName: '💫 Vᴏʀᴛᴇx xᴍᴅ 💫',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

        // Send a brief audio message
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/devhanstz/VORTEX-XMD-DATA/raw/refs/heads/main/KingHans/Menu.mp3' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
