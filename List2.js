const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { cmd } = require('../command');

const pluginsPath = path.join(__dirname, '../plugins');
const githubApiUrl = "https://api.github.com/repos/Mrhanstz/HansTz-Sever/contents/Database";

let shuffledImages = [];
let imageIndex = 0;

// Fetch image files from GitHub API
async function fetchImages() {
    try {
        let response = await axios.get(githubApiUrl);
        if (Array.isArray(response.data)) {
            let images = response.data.filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file.name));
            if (images.length > 0) {
                shuffledImages = images.sort(() => Math.random() - 0.5);
                imageIndex = 0;
            } else {
                console.log("⚠ No image files found.");
            }
        } else {
            console.log("⚠ Invalid response from GitHub API.");
        }
    } catch (err) {
        console.log("⚠ Failed to fetch from GitHub API:", err.message);
    }
}

// Get next image URL (auto shuffle)
async function getNextImage() {
    if (shuffledImages.length === 0) {
        await fetchImages();
    }

    let imageData = shuffledImages[imageIndex];
    imageIndex++;

    if (imageIndex >= shuffledImages.length) {
        shuffledImages = shuffledImages.sort(() => Math.random() - 0.5);
        imageIndex = 0;
    }

    return imageData.download_url;
}

// Command to list all available commands
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

        // Read each file and extract both `pattern` and `category` from all types of matches
        files.forEach(file => {
            let content = fs.readFileSync(path.join(pluginsPath, file), 'utf-8');
            let patternMatch = content.match(/(?:pattern|\'pattern\'):\s*["']([^"']+)["']/);
            let categoryMatch = content.match(/(?:category|\'category\'):\s*["']([^"']+)["']/);

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

        // Build the message
        let commandList = '';

        for (let category in commandGroups) {
            commandList += `╭━━〔 *${category}* 〕━┈⊷\n`;
            commandList += `┃◈╭────────────·๏\n`;

            commandGroups[category].forEach(cmd => {
                commandList += `┃◈┃• ${cmd}\n`;
            });

            commandList += `┃◈└───────────┈⊷\n`;
            commandList += `╰─────────────┈⊷\n\n`;
        }

        // Get random image from GitHub API
        let imageUrl = await getNextImage();

        // Send the image + commands
        await conn.sendMessage(
            from,
            {
                image: { url: imageUrl },
                caption: commandList,
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

        // Send audio
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
