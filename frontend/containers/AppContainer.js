import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Splash from './Splash';
const AppContainer = () => {
  return (
        <Splash/>
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
