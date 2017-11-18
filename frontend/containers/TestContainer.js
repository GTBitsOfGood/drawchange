// NPM Packages
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';

// Local Imports
import * as eventActions from '../actions/events.js';
import '../assets/stylesheets/ItemDisplay.css';
// import * as volunteerActions from '../actions/volunteers.js';
import LeftPane from '../components/LeftPane';
import MainPane from '../components/MainPane';
import ItemList from '../components/ItemList';
import EventView from '../components/EventView';
import EventContainer from './EventContainer';
class TestContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
            <Route path="/EventScreen"
                render={
                    () =>  (<EventContainer
                            itemList = {this.itemList}
                            updateCurrentEvent = {this.props.eventActions.updateCurrentEvent}
                            currentEvent = {this.props.currentEvent}/>)}/>
    );
  }
}

TestContainer.propTypes = {
//   currentView: PropTypes.string,
  events: PropTypes.object,
  volunteers: PropTypes.array,
  eventMode: PropTypes.string,
  currentEvent: PropTypes.string,
  currentVolunteer: PropTypes.string,
  eventActions: PropTypes.object,
  volunteerActions: PropTypes.object,
};

const mapStateToProps = ( state, ownProps ) => {
  return {
    // name: state.name
    // currentView: state.currentView,
    currentEvent: state.current.currentEvent,
    events: state.events, // event data
    // volunteers: state.volunteers, // volunteer data
    // eventMode: state.eventMode, // view, edit, or create
    // currentVolunteer: state.current.currentVolunteer, // Volunteer id
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    eventActions: bindActionCreators( eventActions, dispatch ),
    // volunteerActions: bindActionCreators( volunteerActions, dispatch )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestContainer);
