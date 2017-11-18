// NPM Packages
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Local Imports
import '../assets/stylesheets/ItemDisplay.css';
import * as eventActions from '../actions/events.js';
// import * as volunteerActions from '../actions/volunteers.js';
import LeftPane from '../components/LeftPane';
import MainPane from '../components/MainPane';

class EventContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.eventActions.onLoadEvent();
  }
  renderItem() {
    if (this.props.currentEvent !== null) {
      return this.props.eventList.find((item) => {
        console.log(item._id);
        return item._id === this.props.currentEvent;
      });
    }
    return null;
  }

  render() {
    return(
        <div>
          <LeftPane
                itemList = {this.props.eventList}
                updateCurrentEvent = {this.props.eventActions.updateCurrentEvent}
                view = "Event"
                />
         <MainPane
                currentItem = {this.renderItem()}/>
        </div>
    );
  }

}

EventContainer.propTypes = {
  itemList: PropTypes.array,
  currentEvent: PropTypes.string,
  events: PropTypes.object,
  updateCurrentEvent: PropTypes.func
};


EventContainer.propTypes = {
    //   currentView: PropTypes.string,
  events: PropTypes.object,
  volunteers: PropTypes.array,
  eventMode: PropTypes.string,
  currentEvent: PropTypes.string,
  currentVolunteer: PropTypes.string,
  eventActions: PropTypes.object,
  onLoadEvent: PropTypes.func,
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
  return {
    eventActions: bindActionCreators( eventActions, dispatch ),
        // volunteerActions: bindActionCreators( volunteerActions, dispatch )
  };
};

export default connect(
      mapStateToProps,
      mapDispatchToProps
    )(EventContainer);