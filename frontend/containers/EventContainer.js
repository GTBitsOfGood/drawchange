// NPM Packages
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Local Imports
import '../assets/stylesheets/ItemDisplay.css';
import * as eventActions from '../actions/events.js';
import LeftPane from '../components/LeftPane';
import MainPane from '../components/MainPane';

class EventContainer extends React.Component {
  componentWillMount() {
    this.props.onLoadEvent();
  }

  // eventually we should move this logic to redux...
  renderItem() {
    if (this.props.currentEvent !== null) {
      return this.props.eventList.find(item => item._id === this.props.currentEvent );
    }
    return null;
  }

  render() {
    return(
      <div>
        <LeftPane
          itemList = {this.props.eventList}
          updateCurrentEvent = {this.props.updateCurrentEvent}
          view = "Event"
        />
        <MainPane currentItem = {this.renderItem()}/>
      </div>
    );
  }
}

EventContainer.propTypes = {
  onLoadEvent: PropTypes.func,
  itemList: PropTypes.array,
  currentEvent: PropTypes.string,
  events: PropTypes.object,
  updateCurrentEvent: PropTypes.func,
  volunteers: PropTypes.array,
  eventMode: PropTypes.string,
  currentVolunteer: PropTypes.string,
  eventList: PropTypes.array
};

const mapStateToProps = ( state, ownProps ) => {
  return {
        // name: state.name
        // currentView: state.currentView,
    currentEvent: state.current.currentEvent,
    eventList: state.events.list
        // volunteers: state.volunteers, // volunteer data
        // eventMode: state.eventMode, // view, edit, or create
        // currentVolunteer: state.current.currentVolunteer, // Volunteer id
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return bindActionCreators( eventActions, dispatch );
};

export default connect(mapStateToProps, mapDispatchToProps)(EventContainer);