# freeCodeCamp Leaderboard

Allows you to see the progress of each CoderBunker member.

### Installing

Install Dependencies

```
$ yarn install && cd react-ui && yarn install && cd ..
```

Add your google api key in .env file (see .env.example file)


### Development

Run node back and react ui

```
$ yarn dev
```

## Update users

To manually update users just click 'Update users' on the bottom of the page.


## Deploying

In App.js use host with empty strings, then
```
$ git push heroku master
```

## Built With

* [React](https://reactjs.org/) - Javascript library for building UI
* [Express](https://www.npmjs.com/package/express/) - Web framework for Node.js
* [Axios](https://www.npmjs.com/package/axios/) - Make requests to FreeCodeCamp
* [Google APIs](https://www.npmjs.com/package/googleapis/) - Get data from the spreadsheet
