import React, { Component } from 'react';

import VolunteerApp from './components/VolunteerApp';

class App extends Component {
  render() {
    return <VolunteerApp onSubmit={console.log} />;
  }
}

export default App;
