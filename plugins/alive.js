const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "online",
    alias: ["status", "runtime", "uptime"],
    desc: "Check uptime and system status",
    category: "main",
    react: "⌚",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Generate system status message
        const status = `
──〔𝐕𝐎𝐑𝐓𝐄𝐗-𝐗𝐌𝐃 ───·๏
> 🛸┃• *⏳ Uptime*:  ${runtime(process.uptime())}
> 🛸┃• *⚙️ HostName*: ${os.hostname()}
> 🛸┃• *👨‍💻 Creator*: HansTz
> 🛸┃• *🧬 Version*: V1
──────────────┈⊷
> © 𝐕𝐎𝐑𝐓𝐄𝐗-𝐗𝐌𝐃`;

        // Send the status message with an image
        await conn.sendMessage(from, { 
            image: { url: `https://github.com/Mrhanstz/VORTEX-XMD/raw/refs/heads/main/HansTz/HansTz.jpg` },  
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363352087070233@newsletter',
                    newsletterName: '𝑉𝑜𝑟𝒕𝒆𝒙 𝑿𝒎𝒅 🥳',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
