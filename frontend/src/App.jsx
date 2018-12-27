import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Header, VolunteerApp, AuthWall } from './components';

class App extends Component {
  render() {
    const user = {};
    const authenticated 
    return (
      <Router>
        <div>
          <Header />

          <Route path="/" exact render={_ => <AuthWall user={user} />} />
          <Route path="/apply" exact render={_ => <VolunteerApp onSubmit={console.log} />} />
        </div>
      </Router>
    );
  }
}

export default App;
