import React from 'react';
import PropTypes from 'prop-types';

import Dashboard from './Dashboard';
import Splash from './Splash';

const isAuthenticated = user => {
  // TODO verify user object is valid
  return true;
};

const AuthWall = ({ user }) => {
  if (isAuthenticated(user)) return <Dashboard user={user} />;
  return <Splash />;
};

AuthWall.propTypes = {
  user: PropTypes.object.isRequired
};

export default AuthWall;
