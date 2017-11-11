import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventActions from '../actions/events.js'
import * as volunteerActions from '../actions/volunteers.js'
import LeftPane from '../components/LeftPane';
import MainPane from '../components/MainPane';
import ItemList from '../components/ItemList';
import EventView from '../components/EventView';

class MainContainer extends React.Component {
  

  render() {
    let itemLists;
    let mainItem;

    switch( this.props.currentView ) {
      case 'events':
        itemLists = (
          <ItemList title="Your Events" items={[]} updateCurrentEvent={} />
          <ItemList title="Upcoming Events" items={this.props.events} updateCurrentEvent={} />
        );
        mainItem = (
          <EventView mode={} event={} onCreate={} onUpdate={} onRegister={} onUnregister={} />
        );
        break;
      case 'volunteers':
        itemLists = (
          <ItemList title="Volunteers" items={this.props.volunteers} updateCurrentEvent={} />
        );
        mainItem = (
          {/*<VolunteerView />*/}
        );
        break;
      default:
        itemLists = ();
        mainItem = ();
        break;
    }

    return (
      <LeftPane>
        { itemLists }
      </LeftPane>
      <MainPane>
        { mainItem }
      </MainPane>
    );
  }
};

const mapStateToProps = ( state, ownProps ) => {
  return {
    currentView: state.currentView,
    events: state.events, // event data
    volunteers: state.volunteers, // volunteer data
    eventMode: state.eventMode, // view, edit, or create
    currentEvent: state.currentEvent, // Event id
    currentVolunteer: state.currentVolunteer, // Volunteer id
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    eventActions: bindActionCreators( eventActions, dispatch ),
    volunteerActions: bindActionCreators( volunteerActions, dispatch ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);
