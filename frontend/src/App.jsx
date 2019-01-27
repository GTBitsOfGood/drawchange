import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import styles from '../src/styles/App.module.css';

import { Header, Authenticated, Splash } from './components';

class App extends Component {
  state = { user: { role: 'admin' } };
  componentWillMount(props) {
    // check url for user id
  }

  fakeAuth = _ => this.setState({ user: { role: null } });

  render() {
    return (
      <BrowserRouter>
        <div className={styles.container}>
          <Header />
          <content className={styles.content}>
            {this.state.user ? (
              <Authenticated user={this.state.user} />
            ) : (
                <Splash onAuth={this.fakeAuth} />
              )}
          </content>
        </div>
      </BrowserRouter >
    );
  }
}

export default App;
