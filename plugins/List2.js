const fs = require('fs');
const path = require('path');
const config = require('../config');
const { cmd } = require('../command');
const axios = require('axios');

const PLUGINS_DIR = path.join(__dirname, '../plugins');
const IMAGE_JSON_URL = 'https://raw.githubusercontent.com/DevHansTz1/Hans-Tz/refs/heads/main/HansTz.json';

let usedImages = [];

async function getRandomImage() {
    try {
        const { data } = await axios.get(IMAGE_JSON_URL);
        if (!Array.isArray(data) || data.length === 0) return null;
        
        const availableImages = data.filter(img => !usedImages.includes(img));
        if (availableImages.length === 0) {
            usedImages = [];
            return data[0];
        }
        
        const randomImage = availableImages[Math.floor(Math.random() * availableImages.length)];
        usedImages.push(randomImage);
        return randomImage;
    } catch (error) {
        console.error('Error fetching images:', error);
        return null;
    }
}

function getAllCommands() {
    const categories = {};
    const files = fs.readdirSync(PLUGINS_DIR).filter(file => file.endsWith('.js'));

    files.forEach(file => {
        const plugin = require(path.join(PLUGINS_DIR, file));
        if (plugin.category) {
            const categoryName = plugin.category;
            if (!categories[categoryName]) {
                categories[categoryName] = [];
            }
            categories[categoryName].push(plugin.pattern);
        }
    });
    return categories;
}

cmd({
    pattern: 'list',
    alias: ['listcmd', 'commands'],
    desc: 'Menu for the bot',
    category: 'menu',
    react: '⚡',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const categories = getAllCommands();
        let menuText = '';
        
        Object.entries(categories).forEach(([category, commands]) => {
            menuText += `╭━━〔 *${category}* 〕━┈⊷\n`;
            menuText += '┃◈╭────────────·๏\n';
            commands.forEach(cmd => {
                menuText += `┃◈┃• ${cmd}\n`;
            });
            menuText += '┃◈└───────────┈⊷\n';
            menuText += '╰─────────────┈⊷\n\n';
        });
        
        const randomImage = await getRandomImage();
        await conn.sendMessage(from, {
            image: { url: randomImage },
            caption: menuText
        }, { quoted: mek });

        // Send audio
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/devhanstz/VORTEX-XMD-DATA/raw/refs/heads/main/KingHans/Menu.mp3' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply('An error occurred while generating the menu.');
    }
});
