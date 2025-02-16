const axios = require('axios');
const cheerio = require('cheerio');
const { cmd } = require('../command');

// Command to search logos on ePhoto360
cmd({
    pattern: 'logo10',
    alias: ['logosearch'],
    desc: 'Search and send logo images from ePhoto360',
    category: 'media',
    react: '💡',
    filename: __filename
}, async (conn, mek, m, { from, reply, match }) => {
    try {
        const query = match[1]; // The name entered by the user (e.g., "Hans")
        
        if (!query) return reply('⚠ Please provide the name of the logo you want to search for.');

        // URL for ePhoto360 search
        const searchUrl = `https://en.ephoto360.com/search/${encodeURIComponent(query)}.html`;

        // Fetch the page content
        const { data } = await axios.get(searchUrl);
        const $ = cheerio.load(data);

        // Find all logo links on the search page
        let logos = [];
        $('.result-item').each((i, element) => {
            const logoUrl = $(element).find('img').attr('src');
            const logoTitle = $(element).find('img').attr('alt');
            if (logoUrl && logoTitle) {
                logos.push({
                    title: logoTitle,
                    url: logoUrl.startsWith('http') ? logoUrl : `https:${logoUrl}`
                });
            }
        });

        if (logos.length === 0) {
            return reply('⚠ No logos found for that name.');
        }

        // Create the list of logos to show to the user
        let logoList = 'Here are some logos I found for you:\n';
        logos.forEach((logo, index) => {
            logoList += `${index + 1}. ${logo.title}\n`;
        });
        logoList += 'Please reply with the number of the logo you want to choose.';

        // Send the list of logos
        await conn.sendMessage(from, { text: logoList }, { quoted: mek });

        // Handle user's response (the number of the selected logo)
        conn.on('message', async (msg) => {
            const userMessage = msg.text;

            // If the user replied with a number, choose the corresponding logo
            if (userMessage && !isNaN(userMessage)) {
                const selectedIndex = parseInt(userMessage) - 1;
                if (selectedIndex >= 0 && selectedIndex < logos.length) {
                    const selectedLogo = logos[selectedIndex];

                    // Send the selected logo image
                    await conn.sendMessage(from, {
                        image: { url: selectedLogo.url },
                        caption: `Here is the logo you requested: ${selectedLogo.title}`
                    }, { quoted: mek });
                } else {
                    reply('⚠ Invalid number! Please choose a valid number from the list.');
                }
            }
        });
    } catch (e) {
        console.log(e);
        reply(`⚠ Error: ${e.message}`);
    }
});
              
