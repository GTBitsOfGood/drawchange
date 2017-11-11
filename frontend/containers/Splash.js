// NPM Packages
import React from 'react';
import { Jumbotron, Col, Panel } from 'react-bootstrap';

// Local Imports
import SplashInfo from '../components/SplashInfo';
import SplashAuth from '../components/SplashAuth';

// Home component
const Splash = () => (
  <div>
    <Jumbotron style={{ backgroundColor: '#deffcf' }}>
      <div style={{ paddingLeft: '25px' }}>
        <h1>Welcome to the drawchange Volunteer Portal!</h1>
        <p>From here you can become a volunteer and sign up for events!</p>
      </div>
    </Jumbotron>
    <Col md={7}>
      <SplashInfo />
      {/* Add this for insta feed http://instafeedjs.com/ */}

    </Col>
    <Col md={5}>
      <SplashAuth/>
    </Col>
  </div>
);


export default Splash;