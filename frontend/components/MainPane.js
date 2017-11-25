import PropTypes from 'prop-types';
import React from 'react';
import { Control, Form, actions } from 'react-redux-form';

import '../assets/stylesheets/ItemDisplay.css';
import EventCreate from './EventCreate';
class MainPane extends React.Component {
  constructor(props) {
    super(props);

    this.isEvent = this.props.view === "Event" ? true : null;
    this.isVolunteer = this.props.view === "Volunteer" ? true : null;
    this.isNewEvent = this.props.newEvent === "NewEvent" ? true : null;
  }

  render() {
    return (
        <div>
            {this.isEvent && this.isNewEvent && <EventCreate/>}
            {this.isEvent && !this.isNewEvent && this.props.currentItem ? this.props.currentItem._id : "None Selected"}
            {this.isVolunteer && this.props.currentItem ? this.props.currentItem._id : "None Selected"}
        </div>
    );
  }
}

MainPane.propTypes = {
  newEvent: PropTypes.string,
  currentItem: PropTypes.object,
  view: PropTypes.string
};

export default MainPane;