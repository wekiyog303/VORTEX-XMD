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

        // Read plugins dynamically
        const files = fs.readdirSync(pluginsPath).filter(file => file.endsWith('.js'));

        files.forEach(file => {
            const plugin = require(path.join(pluginsPath, file));

            if (plugin?.cmd?.category) {
                let cat = plugin.cmd.category.toUpperCase();
                if (!categories[cat]) categories[cat] = [];
                categories[cat].push(plugin.cmd.pattern);
            }
        });

        // Send short category list with an image
        let categoryList = `📌 *Available Categories:* \n\n`;
        categoryList += Object.keys(categories).map((cat, i) => `➤ *${i + 1}.* ${cat}`).join('\n');
        categoryList += `\n\n📩 *Reply with a category name to get its commands!*`;

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

        // Reply handler for category selection
        conn.on('message-new', async msg => {
            let selectedCat = msg.body.toUpperCase();
            if (categories[selectedCat]) {
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
