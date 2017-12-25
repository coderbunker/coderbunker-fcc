const google = require('googleapis');
const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();

const getFromGoogle = () => new Promise((resolve, reject) => {
  const sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
    auth: process.env.GOOGLE_API,
    spreadsheetId: '1qNfCUG64eFAitoprpC0Uy8yUr5byLSkFIiYQQ9L4vMg',
    range: 'user database!A:Z',
  }, (err, response) => {
    if (err) {
      reject(err);
      return;
    }
    const users = response.values.filter(item => item[1]);
    const newUsers = [];
    for (let i = 1; i < users.length; i++) {
      newUsers.push({
        name: users[i][0],
        username: users[i][1],
        country: users[i][2],
        score: '',
        streak: '',
        image: '',
        certificate: '',
      });
    }
    resolve(newUsers);
  });
});

const scrape = (fccUsername, name, country) => new Promise(async (resolve, reject) => {
  try {
    const html = await axios.get(`http://www.freecodecamp.com/${fccUsername}`);
    const $ = cheerio.load(html.data);
    const score = $('h1.flat-top.text-primary').text().substr(2).slice(0, -2);
    const username = $('h1.text-center').first().text();
    const streak = $('h4.col-sm-6.text-left').text().substr(16);
    const image = $('img.img-center.img-responsive.public-profile-img').attr('src');
    const certificate = $('.col-xs-12.col-sm-10.col-sm-offset-1.col-md-8.col-md-offset-2 > a').text();
    const newObj = {
      name,
      country,
      username,
      streak,
      image,
      certificate,
      score,
    };
    resolve(newObj);
  } catch (e) {
    reject(e);
  }
});

const update = () => new Promise(async (resolve, reject) => {
  try {
    const userList = await getFromGoogle();
    const promises = userList.map(user => scrape(user.username, user.name, user.country));
    const allUsers = await Promise.all(promises);
    resolve(allUsers);
  } catch (e) {
    reject(e);
  }
});


module.exports = {
  getFromGoogle,
  scrape,
  update,
};
