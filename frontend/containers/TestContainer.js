// NPM Packages
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Local Imports
import * as eventActions from '../actions/events.js';
import '../assets/stylesheets/ItemDisplay.css';
// import * as volunteerActions from '../actions/volunteers.js';
import LeftPane from '../components/LeftPane';
import MainPane from '../components/MainPane';
import ItemList from '../components/ItemList';
import EventView from '../components/EventView';

class TestContainer extends React.Component {

  constructor(props) {
    super(props);
    this.itemList = [{
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
    }];
  }

  renderItem() {
    console.log('asdf');
    // console.log(this.props.events.currentEvent);
    console.log(this.props.currentEvent);
    if (this.props.currentEvent !== null) {
      return this.itemList.find((item) => {
        return item._id === this.props.currentEvent;
      });
    }
    return null;
  }
  render() {
    let mainItem;
    return (
      <div className="Item">
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
            <div>
                 <MainPane currentItem = {this.renderItem()}/>
            </div>
      </div>
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
