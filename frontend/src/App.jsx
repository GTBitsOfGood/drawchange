import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import styles from '../src/styles/App.module.css';
import axios from 'axios';

import { Header, Authenticated, Splash } from './components';

class App extends Component {
  state = { isAuthenticated: true, user: { role: 'admin' }, token: '' };

  fakeAuth = _ => this.setState({ user: { role: null } });

  logout = e => {
    e.preventDefault();
    this.setState({ isAuthenticated: false, user: null });
    axios.get('/auth/logout');
  };
  auth = user => {
    this.setState({ isAuthenticated: true, user });
  };

  render() {
    return (
      <BrowserRouter>
        <div className={styles.container}>
          <Header onLogout={this.logout} loggedIn={this.state.isAuthenticated} />
          <content className={styles.content}>
            {this.state.isAuthenticated ? (
              <Authenticated user={this.state.user} />
            ) : (
              <Splash onAuth={this.auth} />
            )}
          </content>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
