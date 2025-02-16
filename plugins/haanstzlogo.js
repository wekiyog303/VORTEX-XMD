const { cmd, commands } = require("../command");
const { fetchJson } = require("../lib/functions");
const axios = require("axios");

cmd({
  'pattern': "hanslogo",
  'desc': "Create text logos with various styles",
  'react': '✍️', // Set reaction
  'category': "other",
  'filename': __filename,
  'handler': async (m) => {
    const text = m.text.trim(); // Get the text input

    // Send the message with logo choices
    const messageText = `Reply with below numbers to generate *${text}* logo

1⊷ Black Pink pink logo with members signature  
2⊷ Black Pink style  
3⊷ Silver 3D  
4⊷ Naruto  
5⊷ Digital Glitch  
6⊷ Birthday cake  
7⊷ Zodiac  
8⊷ Underwater 🫧  
9⊷ Glow 🌟  
10⊷ Avatar gold🥇  
11⊷ Bokeh  
12⊷ Fireworks 🎇  
13⊷ Gaming logo  
14⊷ Signature 💫  
15⊷ Luxury  
16⊷ Dragon fire 🐉  
17⊷ Queen card  
18⊷ Graffiti color  
19⊷ Tattoo  
20⊷ Pentakill 🔥  
21⊷ Halloween 🎃  
22⊷ Horror  
23⊷ Blood 🩸  
24⊷ Women's day  
25⊷ Valentine  
26⊷ Neon light 🕯️  
27⊷ Gaming assassin  
28⊷ Foggy glass  
29⊷ Sand summer beach 🏖️  
30⊷ Light 🚨  
31⊷ Modern gold 🪙  
32⊷ Cartoon style graffiti  
33⊷ Galaxy ❤️‍🔥  
34⊷ Anonymous hacker (avatar cyan neon)  
35⊷ Birthday flower cake 🎂  
36⊷ Dragon 🐲 ball  
37⊷ Elegant rotation  
38⊷ Write text on wet glass  
39⊷ Water 3D  
40⊷ Realistic sand ⌛  
41⊷ PUBG mascot  
42⊷ Typography  
43⊷ Naruto Shippuden  
44⊷ Colourful paint 🎨  
45⊷ Typography maker  
46⊷ Incandescent  
47⊷ Cartoon style graffiti  
48⊷ Galaxy ❤️‍🔥  
49⊷ Anonymous hacker (avatar cyan neon)  
50⊷ Birthday cake

*Enjoy 😂*`;

    await m.reply(messageText); // Send the options for logo types

    // React with ✍️
    await m.react('✍️');  // React to the message with the ✍️ emoji

    // Listen for the user's next reply
    m.client.on("message", async (message) => {
      const responseText = message.text.trim();

      // Check for a valid selection
      let logoUrl = null;
      switch (responseText) {
        case '1':
          logoUrl = await fetchLogoUrl("https://en.ephoto360.com/create-a-blackpink-style-logo-with-members-signatures-810.html", text);
          break;
        case '2':
          logoUrl = await fetchLogoUrl("https://en.ephoto360.com/online-blackpink-style-logo-maker-effect-711.html", text);
          break;
        case '3':
          logoUrl = await fetchLogoUrl("https://en.ephoto360.com/create-glossy-silver-3d-text-effect-online-802.html", text);
          break;
        case '4':
          logoUrl = await fetchLogoUrl("https://en.ephoto360.com/naruto-shippuden-logo-style-text-effect-online-808.html", text);
          break;
        case '5':
          logoUrl = await fetchLogoUrl("https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html", text);
          break;
        case '6':
          logoUrl = await fetchLogoUrl("https://en.ephoto360.com/birthday-cake-96.html", text);
          break;
        case '7':
          logoUrl = await fetchLogoUrl("https://en.ephoto360.com/free-zodiac-online-logo-maker-491.html", text);
          break;
        case '8':
          logoUrl = await fetchLogoUrl("https://en.ephoto360.com/3d-underwater-text-effect-online-682.html", text);
          break;
        case '9':
          logoUrl = await fetchLogoUrl("https://en.ephoto360.com/advanced-glow-effects-74.html", text);
          break;
        case '10':
          logoUrl = await fetchLogoUrl("https://en.ephoto360.com/create-avatar-gold-online-303.html", text);
          break;
        // Add more cases as before...
        default:
          return await message.reply("*_Invalid number. Please reply with a valid number._*");
      }

      // If logoUrl is found, send the generated logo
      if (logoUrl) {
        await message.reply(`Here is your logo: ${logoUrl}`);
      }
    });
  }
});

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
