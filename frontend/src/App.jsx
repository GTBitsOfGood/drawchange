import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Header, Authenticated, Splash } from './components';

// import styles from './styles/Main.module.css'

class App extends Component {
  state = { authenticated: false };
  componentWillMount(props) {
    // check url for user id
  }

  fakeAuth = _ => this.setState({ authenticated: true });

  render() {
    const user = { admin: false };

    return (
      <BrowserRouter>
        <div>
          <Header />
          {this.state.authenticated ? (
            <Authenticated user={user} />
          ) : (
            <Splash onAuth={this.fakeAuth} />
          )}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
