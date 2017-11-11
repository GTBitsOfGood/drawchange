import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import LeftPane from '../components/LeftPane';
import MainPane from '../components/MainPane';
import ItemList from '../components/ItemList';
import EventView from '../components/EventView';

const MainContainer = ({ name }) => {
  return (
        <LeftPane>
            <ItemList />
        </LeftPane>
        <MainPane>
          <EventView />
        </MainPane>
  );
};

MainContainer.propTypes = {
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
)(MainContainer);
