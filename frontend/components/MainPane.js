import PropTypes from 'prop-types';
import React from 'react';
import { LocalForm, Control } from 'react-redux-form';
import { Control, Form, actions } from 'react-redux-form';

import '../assets/stylesheets/ItemDisplay.css';
import EventCreate from './EventCreate';
class MainPane extends React.Component {
  constructor(props) {
    super(props);
  }
  _createNewEvent() {
    return (
    {this.props.newEvent === "true" ? {EventCreate} : this.props.currentItem ? this.props.currentItem._id : "None Selected"}
   );
  }

  render() {
    return (
        <div>
            {this._createNewEvent()}
        </div>
    );
  }
}

MainPane.propTypes = {
  newEvent: PropTypes.string,
  currentItem: PropTypes.object
};

export default MainPane;