import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import TestContainer from './TestContainer.js';
const AppContainer = () => {
  return (
        <BrowserRouter>
            <div>
                <Route path="/homeScreen"
                component={TestContainer}/>
            </div>
        </BrowserRouter>
  );
};

AppContainer.propTypes = {
  name: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    name: state.name
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
