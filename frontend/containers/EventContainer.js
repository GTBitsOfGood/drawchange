// NPM Packages
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Button} from 'react-bootstrap';
// Local Imports
import '../assets/stylesheets/ItemDisplay.css';
import * as eventActions from '../actions/events.js';
import LeftPane from '../components/LeftPane';
import MainPane from '../components/MainPane';


class EventContainer extends React.Component {

  constructor(props) {
    super(props);
    var newEvent = false;
  }
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
          <div>
        <LeftPane
          itemList = {this.props.eventList}
          updateCurrentEvent = {this.props.updateCurrentEvent}
          view = "Event"
        />
        <MainPane currentItem = {this.renderItem()}
            newEvent = {this.props.createEvent}/>
        </div>
        <Button onClick={() => this.props.onCreateEvent("true")}>New Event</Button>
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
  eventList: PropTypes.array,
  onCreateEvent: PropTypes.func,
  createEvent: PropTypes.string
};

const mapStateToProps = ( state, ownProps ) => {
  return {
    currentEvent: state.current.currentEvent,
    eventList: state.events.list,
    createEvent: state.events.createEvent
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return bindActionCreators( eventActions, dispatch );
};

export default connect(mapStateToProps, mapDispatchToProps)(EventContainer);