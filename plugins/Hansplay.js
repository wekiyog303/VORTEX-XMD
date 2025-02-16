const axios = require("axios");
const { cmd } = require("../command");

// Function to fetch video logo from API
const fetchLogoUrl = async (url, name) => {
  try {
    const response = await axios.get(`https://api-pink-venom.vercel.app/api/logo`, {
      params: { url, name }
    });
    return response.data.result.download_url; // Ensure this is the correct path for the download URL in the API response
  } catch (error) {
    console.error("Error fetching logo:", error);
    return null;
  }
};

// Command to generate video logo
cmd({
    pattern: "videologo ?(.*)",
    alias: ["videomaker"],
    desc: "Generate animated video logos using API",
    category: "media",
    react: "🎬",
    filename: __filename
}, async (conn, mek, m, { from, reply, match }) => {
    let text = match.trim(); // Get the name of the logo

    // If user does not provide a name, show the example usage.
    if (!text) {
        return reply(`❌ Please provide a name for the video logo!\n\nExample Usage:\n.videologo Hans\n.videologo Vortex\n\nTry again with a name.`);
    }

    const messageText = `Reply with a number to generate *${text}* animated logo:

1 ➠ Sweet Love 💕  
2 ➠ Lightning PUBG ⚡  
3 ➠ Intro Video 🎬  
4 ➠ Tiger Video 🐯  
5 ➠ Fire Text 🔥  
6 ➠ Water Splash 💦  
7 ➠ Glitch Effect ⚡  
8 ➠ Neon Glow ✨  
9 ➠ Space Animation 🌌  
10 ➠ Golden Shine 🏆  
11 ➠ Retro Text 🕹️  
12 ➠ Horror Theme 💀  
13 ➠ Cool Text 🔥  
14 ➠ Flame Text 🔥  
15 ➠ Smoke Effect 💨  
16 ➠ Ocean Wave 🌊  
17 ➠ Colorful Neon 🌈  
18 ➠ Frosted Text ❄️  
19 ➠ 3D Text 🧊  
20 ➠ Pixel Effect 🕹️  

Reply with the number of your choice!`;

    reply(messageText);

    // Wait for the user to respond with a number (1-20)
    conn.once("chat-update", async (response) => {
        if (!response.message || !response.message.conversation) return;
        let responseText = response.message.conversation.trim();

        let videoUrl;

        // Match the user's response to the correct logo
        switch (responseText) {
            case "1":
                videoUrl = await fetchLogoUrl("https://en.ephoto360.com/create-sweet-love-video-cards-online-734.html", text);
                break;
            case "2":
                videoUrl = await fetchLogoUrl("https://en.ephoto360.com/lightning-pubg-video-logo-maker-online-615.html", text);
                break;
            case "3":
                videoUrl = await fetchLogoUrl("https://en.ephoto360.com/free-logo-intro-video-maker-online-558.html", text);
                break;
            case "4":
                videoUrl = await fetchLogoUrl("https://en.ephoto360.com/create-digital-tiger-logo-video-effect-723.html", text);
                break;
            case "5":
                videoUrl = await fetchLogoUrl("https://en.ephoto360.com/fire-text-animation-video-617.html", text);
                break;
            case "6":
                videoUrl = await fetchLogoUrl("https://en.ephoto360.com/water-splash-text-video-effect-620.html", text);
                break;
            case "7":
                videoUrl = await fetchLogoUrl("https://en.ephoto360.com/glitch-text-animation-video-maker-622.html", text);
                break;
            case "8":
                videoUrl = await fetchLogoUrl("https://en.ephoto360.com/neon-glow-text-video-effect-625.html", text);
                break;
            case "9":
                videoUrl = await fetchLogoUrl("https://en.ephoto360.com/space-text-animation-video-628.html", text);
                break;
            case "10":
                videoUrl = await fetchLogoUrl("https://en.ephoto360.com/golden-shine-text-video-effect-630.html", text);
                break;
            case "11":
                videoUrl = await fetchLogoUrl("https://en.ephoto360.com/retro-text-animation-video-maker-633.html", text);
                break;
            case "12":
                videoUrl = await fetchLogoUrl("https://en.ephoto360.com/horror-themed-logo-video-maker-635.html", text);
                break;
            case "13":
                videoUrl = await fetchLogoUrl("https://en.ephoto360.com/cool-text-animation-video-maker-638.html", text);
                break;
            case "14":
                videoUrl = await fetchLogoUrl("https://en.ephoto360.com/flame-text-animation-video-maker-641.html", text);
                break;
            case "15":
                videoUrl = await fetchLogoUrl("https://en.ephoto360.com/smoke-effect-logo-video-644.html", text);
                break;
            case "16":
                videoUrl = await fetchLogoUrl("https://en.ephoto360.com/ocean-wave-text-video-effect-646.html", text);
                break;
            case "17":
                videoUrl = await fetchLogoUrl("https://en.ephoto360.com/colorful-neon-logo-video-maker-649.html", text);
                break;
            case "18":
                videoUrl = await fetchLogoUrl("https://en.ephoto360.com/frosted-text-logo-video-651.html", text);
                break;
            case "19":
                videoUrl = await fetchLogoUrl("https://en.ephoto360.com/3d-text-animation-video-maker-653.html", text);
                break;
            case "20":
                videoUrl = await fetchLogoUrl("https://en.ephoto360.com/pixel-effect-logo-video-656.html", text);
                break;
            default:
                return reply("❌ Invalid choice! Please reply with a valid number.");
        }

        if (!videoUrl) return reply("❌ Failed to generate video logo. Try again!");

        await conn.sendMessage(
            from,
            {
                video: { url: videoUrl },
                caption: `✅ Here is your *${text}* animated logo! 🎬`
            },
            { quoted: mek }
        );
    });
});
