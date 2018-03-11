// NPM Packages
import React from 'react';
import { Jumbotron } from 'react-bootstrap';

// Local Imports
import ContactUsForm from './forms/ContactUsForm';

// Home component
const Splash = () => (
  <div>
    <Jumbotron style={{ backgroundColor: '#deffcf' }}>
      <div style={{ paddingLeft: '25px' }}>
        <h1>We would love to hear from you!</h1>
        <p>Please fill out the information below, and we will be back to your soon!</p>
      </div>
    </Jumbotron>
    <ContactUsForm/>
  </div>
);

// exports -> when and why to use them? 
