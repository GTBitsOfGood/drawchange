// NPM Packages
import PropTypes from 'prop-types';
import React from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { Switch, Route, Redirect, withRouter, Link } from 'react-router-dom';

// Local Imports
// import * as volunteerActions from '../actions/volunteers.js'
import EventContainer from './EventContainer';
import VolunteersContainer from './VolunteersContainer';


// class MainContainer extends React.Component {
const MainContainer = () => (
    <div>
      <Link to={'/'}>Dashbaord</Link><br />
      <Link to={'/volunteers'}>Volunteers Link</Link>
      <br />
      <Link to={'/events'}>Event Link</Link><br />
      <Route path={"/"} render={() => <h1>We are logged in</h1>} />
      <Route path={"/"} exact render={() => <h1>Dashboard Only</h1>} />
      <Route path={"/events"} component={EventContainer}/>
      <Route path={"/volunteers"} component={VolunteersContainer} />
    </div>
  );


export default MainContainer;