import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Header, VolunteerApp, Splash } from './components';
// import styles from './styles/Main.module.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route path="/" exact component={Splash} />
          <Route path="/apply" exact render={_ => <VolunteerApp onSubmit={console.log} />} />
        </div>
      </Router>
    );
  }
}

export default App;
