import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const AppContainer = () => {
  return (
        <div>
            <h1>Testing :)</h1>
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
