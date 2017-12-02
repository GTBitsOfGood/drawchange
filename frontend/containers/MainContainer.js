// NPM Packages
import PropTypes from 'prop-types';
import React from 'react';
import { Switch, Route  } from 'react-router-dom';

// Local Imports
import Dashboard from './Dashboard';
import EventContainer from './EventContainer';
import VolunteersContainer from './VolunteersContainer';
import VolunteerDashboard from './VolunteerDashboard';

const MainContainer = () => (
  <Switch>
    <Route path={"/events/:id"} component={VolunteerDashboard} />
    <Route path={"/events"} component={VolunteerDashboard}/>
    <Route path={"/volunteers/:id"} component={VolunteersContainer} />
    <Route path={"/volunteers"} component={VolunteerDashboard} />
    <Route path={"/"} exact component={Dashboard} />
  </Switch>
  );


export default MainContainer;