const axios = require("axios");
const cheerio = require("cheerio");
const { sendContent } = require("./emailContent.js");

const emailFrom = process.env.emailFrom;
const emailTo = process.env.emailTo;
const emailSubject = "Web Scrapper";

function log(message) {
  const ts = new Date().toLocaleString("en-US");
  console.log(`${ts} : ${message}`);
}

async function fetchData(siteUrl) {
  try {
    const response = await axios.get(siteUrl);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

function getText(content) {
  const $ = cheerio.load(content);
  log("The page parsed");
  const values = $(".maincounter-number > span");
  let output = "Coronavirus Cases: " + values[0].lastChild.data + "<br/>";
  output += "Deaths: " + values[1].lastChild.data + "<br/>";
  output += "Recovered: " + values[2].lastChild.data + "<br/>";
  return output;
}

function checkWebsite() {
  fetchData("https://www.worldometers.info/coronavirus/").then(content => {
    log("The page was retrieved");
    const text = getText(content);
    const body = `Here's the latest stats:<br/>${text}`;
    sendContent(emailFrom, emailTo, emailSubject, body).then(() => {
      log(`Email sent to ${emailTo}`);
    });
  });
}

checkWebsite()

setInterval(function() {
  checkWebsite()
}, 1000 * 60 * 60 * 12);
