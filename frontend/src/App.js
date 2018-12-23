import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import { EmploymentInfoForm } from './components';
import Basic from './components/formik-ex';

class App extends Component {
  render() {
    return (
      <EmploymentInfoForm />
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //     <Button>Click Here</Button>
      //   </header>
      // </div>
    );
  }
}

export default App;
