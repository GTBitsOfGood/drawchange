import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Header, Authenticated, Splash, AdminDash } from './components';

class App extends Component {
  state = { user: null };
  componentWillMount(props) {
    // check url for user id
  }

  fakeAuth = _ => this.setState({ user: { role: null } });

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <AdminDash />
          {/* {this.state.user ? (
            <Authenticated user={this.state.user} />
          ) : (
            <Splash onAuth={this.fakeAuth} />
          )} */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
