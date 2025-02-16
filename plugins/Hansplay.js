const ytdl = require('ytdl-core'); // For downloading YouTube videos
const fs = require('fs'); // File system module to handle files
const path = require('path'); // Path module
const { cmd } = require('../command');
const axios = require('axios'); // Axios for other HTTP requests if needed

// Command to play song from YouTube
cmd({
    pattern: 'play10',
    alias: ['playvideo'],
    desc: 'Play song/video from YouTube',
    category: 'media',
    react: '🎶',
    filename: __filename
}, async (conn, mek, m, { from, reply, match }) => {
    try {
        const query = match[1]; // The query entered by the user (e.g., song name)
        
        if (!query) return reply('⚠ Please provide the name of the song or video URL.');
        
        const videoUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
        const videoStream = ytdl(videoUrl, { quality: 'highestaudio' }); // Download audio in best quality

        // Temporary file path to store the video
        const filePath = path.join(__dirname, 'downloads', `${Date.now()}.mp4`);
        
        // Create the writable stream and save the video
        const videoStreamFile = fs.createWriteStream(filePath);
        videoStream.pipe(videoStreamFile);

        videoStreamFile.on('finish', async () => {
            // Once the video is downloaded, send it as a message
            await conn.sendMessage(
                from,
                { video: { url: filePath }, caption: `🎶 Here is the video: ${query}` },
                { quoted: mek }
            );

            // Delete the video file after sending
            fs.unlink(filePath, (err) => {
                if (err) console.error('Failed to delete file:', err);
            });
        });

    } catch (e) {
        console.log(e);
        reply(`⚠ Error: ${e.message}`);
    }
});
