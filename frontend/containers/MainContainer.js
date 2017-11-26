// NPM Packages
import PropTypes from 'prop-types';
import React from 'react';
import { Switch, Route  } from 'react-router-dom';

// Local Imports
import Dashboard from './Dashboard';
import EventContainer from './EventContainer';
import VolunteersContainer from './VolunteersContainer';


const MainContainer = () => (
  <Switch>
    <Route path={"/events"} component={EventContainer}/>
    <Route path={"/volunteers"} component={VolunteersContainer} />
    <Route path={"/"} exact component={Dashboard} />
  </Switch>
  );


export default MainContainer;