const config = require('../config');
const { cmd, commands } = require('../command');
const path = require('path');

cmd({
    pattern: "list2",
    alias: ["listcmd", "commands"],
    desc: "menu the bot",
    category: "menu",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // List installed plugin categories
        const pluginCategories = [
            { name: "Download", path: path.join(__dirname, '../plugins/download') },
            { name: "Anime", path: path.join(__dirname, '../plugins/anime') },
            { name: "Info", path: path.join(__dirname, '../plugins/info') },
            { name: "Group", path: path.join(__dirname, '../plugins/group') },
            { name: "Owner", path: path.join(__dirname, '../plugins/owner') },
            { name: "Convert", path: path.join(__dirname, '../plugins/convert') }
        ];

        let commandDescription = "╭━━━━━━━━━━━━⪼\n";
        commandDescription += "Installed Plugins:\n";

        // Loop through categories and add to the command list
        pluginCategories.forEach(category => {
            commandDescription += `\n*${category.name} Commands*: ${category.path}\n`;
        });

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
