const fs = require('fs');
const path = require('path');
const { cmd } = require('../command');

const pluginsPath = path.join(__dirname, '../plugins'); 

cmd({
    pattern: "list2",
    alias: ["listcmd", "commands"],
    desc: "Show available command categories",
    category: "menu",
    react: "⚡",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        let categories = {};
        let categoryKeys = [];

        // Read all plugin files
        const files = fs.readdirSync(pluginsPath).filter(file => file.endsWith('.js'));

        files.forEach(file => {
            try {
                const plugin = require(path.join(pluginsPath, file));

                if (plugin?.cmd?.category) {
                    let category = plugin.cmd.category.toUpperCase(); 

                    if (!categories[category]) {
                        categories[category] = [];
                        categoryKeys.push(category);
                    }
                    categories[category].push(plugin.cmd.pattern);
                }
            } catch (err) {
                console.log(`Error loading ${file}: ${err.message}`);
            }
        });

        if (categoryKeys.length === 0) {
            return reply("⚠ No command categories found.");
        }

        // Send numbered category list
        let categoryList = `📌 *Available Categories:* \n\n`;
        categoryKeys.forEach((cat, i) => {
            categoryList += `*${i + 1}.* ${cat}\n`;
        });
        categoryList += `\n📩 *Reply with a category number to get its commands!*`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/5hdckf.jpeg` },
                caption: categoryList
            },
            { quoted: mek }
        );

        // Send the song after listing categories
        await conn.sendMessage(
            from,
            {
                audio: { url: 'https://github.com/devhanstz/VORTEX-XMD-DATA/raw/refs/heads/main/KingHans/Menu.mp3' },
                mimetype: 'audio/mp4',
                ptt: true
            },
            { quoted: mek }
        );

        // Handle replies for category selection
        conn.on('message-new', async msg => {
            let selectedNumber = parseInt(msg.body.trim());
            if (!isNaN(selectedNumber) && selectedNumber > 0 && selectedNumber <= categoryKeys.length) {
                let selectedCat = categoryKeys[selectedNumber - 1];
                let cmdList = `🛠 *Commands in ${selectedCat}:* \n\n`;
                cmdList += categories[selectedCat].map(cmd => `• ${cmd}`).join('\n');

                await conn.sendMessage(from, { text: cmdList }, { quoted: msg });
            }
        });

    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});
