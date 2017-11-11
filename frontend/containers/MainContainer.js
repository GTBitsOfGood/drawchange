//NPM Packages
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Local Imports
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
          <ItemList
            title="Your Events"
            items={
                [{
                    "name": "event1",
                    "date": "11/11/2017",
                    "location": "location1",
                    "description": "description1",
                    "contact": "contact1",
                    "_id": "in329894322",
                    "volunteers": [],
                    "max_volunteers": null
                },
                {
                    "name": "event2",
                    "date": "11/12/2017",
                    "location": "location2",
                    "description": "description2",
                    "contact": "contact2",
                    "_id": "in329894323",
                    "volunteers": [],
                    "max_volunteers": null
                },
                {
                    "name": "event3",
                    "date": "11/13/2017",
                    "location": "location3",
                    "description": "description3",
                    "contact": "contact3",
                    "_id": "in329894324",
                    "volunteers": [],
                    "max_volunteers": null
                },
                {
                    "name": "event4",
                    "date": "11/14/2017",
                    "location": "location4",
                    "description": "description4",
                    "contact": "contact4",
                    "_id": "in329894325",
                    "volunteers": [],
                    "max_volunteers": null
                }]
            }
            updateCurrentEvent={this.props.eventActions.updateCurrentEvent}
          />
          <ItemList
            title="Upcoming Events"
            {/* items={this.props.events}  */}
            items={
                [{
                    "name": "event1",
                    "date": "11/11/2017",
                    "location": "location1",
                    "description": "description1",
                    "contact": "contact1",
                    "_id": "in329894322",
                    "volunteers": [],
                    "max_volunteers": null
                },
                {
                    "name": "event2",
                    "date": "11/12/2017",
                    "location": "location2",
                    "description": "description2",
                    "contact": "contact2",
                    "_id": "in329894323",
                    "volunteers": [],
                    "max_volunteers": null
                },
                {
                    "name": "event3",
                    "date": "11/13/2017",
                    "location": "location3",
                    "description": "description3",
                    "contact": "contact3",
                    "_id": "in329894324",
                    "volunteers": [],
                    "max_volunteers": null
                },
                {
                    "name": "event4",
                    "date": "11/14/2017",
                    "location": "location4",
                    "description": "description4",
                    "contact": "contact4",
                    "_id": "in329894325",
                    "volunteers": [],
                    "max_volunteers": null
                }]
            }
            updateCurrentEvent={this.props.updateCurrentEvent} />
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
      <div>
        <LeftPane>
          { itemLists }
        </LeftPane>
        <MainPane>
          { mainItem }
        </MainPane>
      </div>
    );
  }
};

const mapStateToProps = ( state, ownProps ) => {
  return {
    // name: state.name
    currentEvent: state._id,
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
    volunteerActions: bindActionCreators( volunteerActions, dispatch )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);
