const axios = require('axios');
const cheerio = require('cheerio');
const { cmd } = require('../command');

// Function to fetch video logo URL from ePhoto360
async function fetchVideoLogo(url, text) {
    try {
        // Fetch ePhoto360 page content
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        // Find form data for generating the logo
        const formAction = $('form').attr('action');
        if (!formAction) return null;

        // Prepare form submission data
        const formData = new URLSearchParams();
        formData.append('text[]', text);
        
        // Submit form to generate logo
        const response = await axios.post(`https://en.ephoto360.com${formAction}`, formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        // Extract generated video logo URL
        const resultPage = cheerio.load(response.data);
        const videoUrl = resultPage('.btn-download').attr('href');
        
        return videoUrl ? `https:${videoUrl}` : null;
    } catch (error) {
        console.error("Error fetching video logo:", error.message);
        return null;
    }
}

// Command to request video logo
cmd({
    pattern: 'videologo',
    alias: ['vlogo'],
    desc: 'Generate video logos from ePhoto360',
    category: 'media',
    react: '🎥',
    filename: __filename
}, async (conn, mek, m, { from, reply, match }) => {
    try {
        const text = match[1]; // User input text for the logo
        
        if (!text) return reply('⚠ Please provide the name for the video logo. Example: *.videologo Hans*');

        const contextInfo = {
            mentionedJid: [m.sender],
            externalAdReply: {
                title: "VORTEX-XMD",
                body: "Regards, HansTz",
                thumbnailUrl: "https://files.catbox.moe/lb64rn.jpeg",
                sourceUrl: "https://whatsapp.com/channel/0029VasiOoR3bbUw5aV4qB31",
                mediaType: 1,
                renderLargerThumbnail: true,
            },
        };

        // Video logo options
        const messageText = `*Reply with a number to generate your video logo for:* *${text}*

1 ➠ Sweet Love 💕😘  
2 ➠ Lightning PUBG ⚡  
3 ➠ Intro Video 📷  
4 ➠ Tiger Video 🐯  

*_Enjoy 😂_*`;

        // Send the menu
        await conn.sendMessage(from, { text: messageText, contextInfo }, { quoted: mek });

        // Wait for user response
        conn.on('message', async (msg) => {
            const responseText = msg.text;

            let videoUrl;
            switch (responseText) {
                case '1':
                    videoUrl = await fetchVideoLogo("https://en.ephoto360.com/create-sweet-love-video-cards-online-734.html", text);
                    break;
                case '2':
                    videoUrl = await fetchVideoLogo("https://en.ephoto360.com/lightning-pubg-video-logo-maker-online-615.html", text);
                    break;
                case '3':
                    videoUrl = await fetchVideoLogo("https://en.ephoto360.com/free-logo-intro-video-maker-online-558.html", text);
                    break;
                case '4':
                    videoUrl = await fetchVideoLogo("https://en.ephoto360.com/create-digital-tiger-logo-video-effect-723.html", text);
                    break;
                default:
                    return reply("⚠ Invalid number! Please choose a valid number from the list.");
            }

            if (!videoUrl) {
                return reply("⚠ Failed to generate video. Please try again later.");
            }

            // Send the generated video
            await conn.sendMessage(from, {
                video: { url: videoUrl },
                caption: `Here is your video logo for *${text}* 🎥`
            }, { quoted: mek });
        });

    } catch (e) {
        console.log(e);
        reply(`⚠ Error: ${e.message}`);
    }
});
                
