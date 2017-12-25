import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import './App.css';
import './flag-icon-css/css/flag-icon.css';

const host = 'http://localhost:1234';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  async componentWillMount() {
    try {
      const response = await axios.get(`${host}/getUsers`);
      this.setState({ users: response.data });
    } catch (e) {
      console.error(e);
    }
  }

  manualUpdate = async () => {
    console.log('clicked');
    try {
      const response = await axios.get(`${host}/manual`);
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    return (
      <div className="App">
        <div className="header">
          <div className="logo" />
        </div>
        <div className="info">
          <li>CoderBunker</li>
          <li className="right">{moment().format('LL')}</li>
        </div>
        <div className="body">
          <table>
            <thead>
              <tr className="table-header">
                <th />
                <th className="rank-head">#</th>
                <th className="image" />
                <th className="name-head">co-learner</th>
                <th />
                <th className="score-head">score</th>
                <th className="streak-head">streak</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.sort((a, b) => b.score - a.score).map((user, index) => (
                <tr key={index}>
                  {user.certificate ? <th className="badge" /> : <th />}
                  <th className="rank">{index + 1}</th>
                  <th className="image"><img src={user.image} alt="" /></th>
                  <th className="name">{user.name}</th>
                  <th><span className={`flag-icon flag-icon-${user.country}`} /></th>
                  <th className="score">{user.score}</th>
                  <th className="streak">{user.streak}</th>
                </tr>))}
            </tbody>
          </table>
        </div>
        <div className="bottom">
          <li onClick={() => this.manualUpdate()}>Update users</li>
        </div>
      </div>
    );
  }
}

export default App;
