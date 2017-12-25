const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const util = require('util');

const app = express();
const read = util.promisify(fs.readFile);

const promises = require('./promises.js');

app.use(cors());
app.use(bodyParser.json());


const writeInFile = async () => {
  try {
    const users = await promises.update();
    fs.writeFile('users.txt', JSON.stringify(users, null, 2), (err) => {
      if (err) throw err;
      console.log('users updated');
      return 'users updated';
    });
  } catch (e) {
    console.error(e);
  }
};

setInterval(writeInFile, 1000 * 60 * 60);


// Manually update users
app.get('/manual', async (req, res) => {
  res.send(await writeInFile());
});


app.get('/getUsers', async (req, res) => {
  try {
    const users = await read('users.txt');
    res.send(JSON.parse(users));
  } catch (e) {
    console.error(e);
  }
});

const port = process.env.PORT || 1234;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
