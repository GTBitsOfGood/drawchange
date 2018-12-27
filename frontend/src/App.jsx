import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Header, VolunteerApp, Dashboard, Splash } from './components';

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
      <Router>
        <div>
          <Header />
          {this.state.authenticated ? <Dashboard user={user} /> : <Splash onAuth={this.fakeAuth} />}

          {/* <Route path="/" exact render={_ => <AuthWall user={user} />} /> */}
          <Route path="/apply" exact render={_ => <VolunteerApp onSubmit={console.log} />} />
        </div>
      </Router>
    );
  }
}

export default App;
