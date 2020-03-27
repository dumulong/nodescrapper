const axios = require("axios");
const cheerio = require("cheerio");

const fetchData = async (siteUrl) => {
  try {
    const response = await axios.get(siteUrl);
    const $ = cheerio.load(response.data);
    const postJobButton = $('.top > .action-post-job').text();
    console.log(postJobButton) // Logs 'Post a Job'
    console.log("Done!");
  } catch (error) {
    console.error(error);
  }
}


fetchData("https://remoteok.io/")
