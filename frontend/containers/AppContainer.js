import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Splash from './Splash';

import Navbar from '../components/Navbar';

import * as actions from '../actions/authentication';


const AppContainer = () => {
  return (
    <div>
      <Navbar logoutAction={ logout } />
      <Splash />
    </div>

  );
};

AppContainer.propTypes = {
};

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (/* dispatch */) => {
  return {
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);
