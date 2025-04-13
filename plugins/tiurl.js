const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');


cmd({
  pattern: 'tinyurl',
  alias: ['tiny', 'shorten', 'short', 'shorturl'],
  react: '🪤',
  desc: 'Shorten a URL using TinyURL or ShortURL.',
  category: 'main',
  filename: __filename
}, async (conn, mek, m, {
  from,
  quoted,
  body,
  isCmd,
  command,
  args,
  q,
  isGroup,
  sender,
  senderNumber,
  botNumber2,
  botNumber,
  pushname,
  isMe,
  isOwner,
  groupMetadata,
  groupName,
  participants,
  groupAdmins,
  isBotAdmins,
  isAdmins,
  reply
}) => {
  try {
    if (!q) return reply('Please provide a URL to shorten.');

    await reply('> *VORTEX-XMD is Processing...*');

    let apiUrl = '';
    if (command === 'tiny' || command === 'tinyurl') {
      apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(q)}`;
    } else {
      apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(q)}`;
    }

    await reply('> *Shortening URL...*');

    const response = await fetchJson(apiUrl);
    const result = response.result;

    const caption = ` \`VORTEX XMD URL SHORTENER\` \n\n\n*Original Link:* ${q}\n\n*Shortened Link:* ${result}\n\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ HansTz`;

   /* await conn.sendMessage(m.chat, { text: caption }, { quoted: m });
  } catch (error) {
    console.error(error);
    reply(`An error occurred: ${error.message}`);
  }
});
*/
 // Send the status message with an image
        await conn.sendMessage(from, { 
            image: { url: `https://github.com/Mrhanstz/VORTEX-XMD/raw/refs/heads/main/HansTz/HansTz.jpg` },  // Image URL
            caption: caption,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363352087070233@newsletter',
                    newsletterName: '『 VORTEX 𝐗𝐌𝐃 𝐒𝐇𝐎𝐑𝐓 𝐔𝐑𝐋 』',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in shortining URL:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
