const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const util = require('util');

const app = express();
const read = util.promisify(fs.readFile);
const path = require('path');

const requests = require('./requests.js');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

const writeInFile = async () => {
  try {
    const users = await requests.update();
    fs.writeFile('users.txt', JSON.stringify(users, null, 2), err => {
      if (err) throw err;
      console.log('users updated');
      return 'users updated';
    });
  } catch (e) {
    console.error(e);
  }
};

// setInterval(writeInFile, 1000 * 60 * 60);

// Manually update users
app.get('/manual', async (req, res) => {
  console.log('Updating users');
  try {
    await writeInFile();
    res.send('updated');
  } catch (e) {
    res.send(e);
  }
});

app.get('/getUsers', async (req, res) => {
  try {
    const users = await read('users.txt');
    res.send(JSON.parse(users));
  } catch (e) {
    console.error(e);
  }
});

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

const port = process.env.PORT || 1234;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
