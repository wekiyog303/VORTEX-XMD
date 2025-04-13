const axios = require("axios");
const { cmd } = require("../command");


cmd({
    pattern: "18+",
    alias: ["adultmenu"],
    desc: "menu the bot",
    category: "menu",
    react: "🍑",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `
 ───❍「 18+ CMD🔞」❍*
‎> 🍑 xᴠɪᴅᴇᴏ*
> ‎🍑 ᴘᴏʀɴ*
> ‎🍑 xᴠɪᴅᴇᴏs*
> ‎🍑 ʀᴀɴᴅᴏᴍᴘᴏʀɴ*
> ‎🍑 ʀᴀɴᴅᴏᴍxᴠɪᴅᴇᴏ*
 ‎────────────❍*`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://i.imgur.com/MBGZgNz.jpeg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363352087070233@newsletter',
                        newsletterName: "VORTEX 🔞ADULTS🔞MENU ",
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
