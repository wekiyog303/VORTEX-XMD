const axios = require('axios');
const { exec } = require('child_process');
const fs = require('fs');

const scriptUrl = "https://hanstz-tech.vercel.app/vortexbyhanstzfelix.js"; // Your script URL
const scriptPath = "./remote-index.js"; // Local temporary file

async function downloadAndRunScript() {
    try {
        console.log("\nHansTz Send you request or Loading from Vortex-xmd Database script 🔥...\n");

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
        console.log("\n\x1b[31mMADE BY HANSTZ 😌\x1b[0m\n");

    } catch (error) {
        console.error("Error downloading or executing script:", error);
    }
}

// Run the script loader
downloadAndRunScript();
