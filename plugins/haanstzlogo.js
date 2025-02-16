const { cmd } = require("../command");
const { fetchJson } = require("../lib/functions");
const axios = require("axios");

cmd({
  'pattern': "textlogo",
  'desc': "Create text logos with various styles",
  'react': '✍️',
  'category': "other",
  'filename': __filename,
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
  const text = arg.join(" ");

  if (!text) {
    return repondre("Please provide a search query.");
  }

  try {
    const messageText = generateLogoOptionsMessage(text);
    const contextInfo = getContextInfo(ms.sender);
    const messageToSend = { text: messageText, contextInfo };

    // Send the message and get the response ID
    const sentMessage = await zk.sendMessage(dest, messageToSend, { quoted: ms });

    // Listen for user responses
    zk.ev.on('messages.upsert', async (update) => {
      const message = update.messages[0];
      if (!isValidResponse(message)) return;

      const responseText = message.message.extendedTextMessage.text.trim();
      if (message.message.extendedTextMessage.contextInfo.stanzaId === sentMessage.key.id) {
        await handleLogoChoice(responseText, text, dest, ms, zk);
      }
    });
  } catch (error) {
    console.error(error);
    repondre(`Error: ${error}`);
  }
});

// Function to generate logo options message
const generateLogoOptionsMessage = (text) => {
  return `Reply with below numbers to generate *${text}* logo:
  
1⊷ Black Pink pink logo with members signature  
2⊷ Black Pink style  
3⊷ Silver 3D  
... (rest of the options)`;

};

// Function to create context for the message
const getContextInfo = (sender) => {
  return {
    mentionedJid: [sender],
    externalAdReply: {
      title: "🌟 𝐊𝐄𝐈𝐓𝐇-𝐌𝐃 ✨",
      body: "Regards, Keithkeizzah",
      thumbnailUrl: "https://i.imgur.com/v9gJCSD.jpeg",
      sourceUrl: "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
      mediaType: 1,
      renderLargerThumbnail: true,
    },
  };
};

// Function to check if the response message is valid
const isValidResponse = (message) => {
  return message && message.message.extendedTextMessage && message.message.extendedTextMessage.text;
};

// Function to handle logo choice based on user input
const handleLogoChoice = async (responseText, text, dest, ms, zk) => {
  const urlMap = {
    '1': "https://en.ephoto360.com/create-a-blackpink-style-logo-with-members-signatures-810.html",
    '2': "https://en.ephoto360.com/online-blackpink-style-logo-maker-effect-711.html",
    // ... (map other numbers to URLs)
    '50': "https://en.ephoto360.com/free-zodiac-online-logo-maker-491.html"
  };

  const logoUrl = urlMap[responseText];
  if (logoUrl) {
    const generatedLogoUrl = await fetchLogoUrl(logoUrl, text);
    if (generatedLogoUrl) {
      await zk.sendMessage(dest, {
        image: { url: generatedLogoUrl },
        caption: `*Downloaded by Alpha Md*`,
      }, { quoted: ms });
    }
  } else {
    await zk.sendMessage(dest, {
      text: "*_Invalid number. Please reply with a valid number._*"
    }, { quoted: ms });
  }
};

// Function to fetch the logo URL using axios
const fetchLogoUrl = async (url, name) => {
  try {
    const response = await axios.get(`https://api-pink-venom.vercel.app/api/logo`, {
      params: { url, name }
    });
    return response.data.result.download_url;
  } catch (error) {
    console.error("Error fetching logo:", error);
    return null;
  }
};
