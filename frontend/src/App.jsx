import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import { Header, Authenticated, Splash } from './components';

class App extends Component {
  state = { isAuthenticated: false, user: null, token: '' };

  fakeAuth = _ => this.setState({ user: { role: null } });

  logout = e => {
    e.preventDefault();
    console.log('logout from app');
    this.setState({ isAuthenticated: false, user: null });
    axios.get('/auth/logout');
  };
  auth = user => {
    console.log('inside auth fn', user);
    this.setState({ isAuthenticated: true, user });
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header onLogout={this.logout} loggedIn={this.state.isAuthenticated} />
          {this.state.isAuthenticated ? (
            <Authenticated user={this.state.user} />
          ) : (
            <Splash onAuth={this.auth} />
          )}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
