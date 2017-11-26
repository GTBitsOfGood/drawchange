// NPM Packages
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
// Local Imports
import '../assets/stylesheets/ItemDisplay.css';
import * as eventActions from '../actions/events.js';
import LeftPane from '../components/LeftPane';
import MainPane from '../components/MainPane';


class Dashboard extends Component {

  constructor(props) {
    super(props);
  }
  // componentWillMount() {
  //   this.props.onLoadEvent();
  // }


  render() {
    return (
      <div>
        <h1> Dashboard</h1>
      </div>
    );
  }
}

Dashboard.propTypes = {
  onLoadEvent: PropTypes.func,
  itemList: PropTypes.array,
  currentEvent: PropTypes.string,
  events: PropTypes.object,
  updateCurrentEvent: PropTypes.func,
  volunteers: PropTypes.array,
  eventMode: PropTypes.string,
  currentVolunteer: PropTypes.string,
  eventList: PropTypes.array,
  onCreateEvent: PropTypes.func,
  createEvent: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(eventActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);