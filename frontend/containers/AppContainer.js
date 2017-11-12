import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Splash from './Splash';

import Navbar from '../components/Navbar';

import * as actions from '../actions/auth';


const AppContainer = ({ logout }) => {
  return (
    <div>
      <Navbar logoutAction={ logout } />
      <Splash />
    </div>

  );
};

AppContainer.propTypes = {
  logout: PropTypes.func
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);
