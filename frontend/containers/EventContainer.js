// NPM Packages
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Local Imports
import '../assets/stylesheets/ItemDisplay.css';
// import * as volunteerActions from '../actions/volunteers.js';
import LeftPane from '../components/LeftPane';
import MainPane from '../components/MainPane';
import ItemList from '../components/ItemList';
import EventView from '../components/EventView';

class EventContainer extends React.Component {
  constructor(props) {
    super(props);
    this.itemList = this.props.itemList;
  }

  renderItem() {
    if (this.props.currentEvent !== null) {
      return this.itemList.find((item) => {
        return item._id === this.props.currentEvent;
      });
    }
    return null;
  }

  render() {
    return(
        <div>
          <LeftPane
                itemList = {this.itemList}
                updateCurrentEvent = {this.props.updateCurrentEvent}
                view = "Event"
                />
         <MainPane
                currentEvent = {this.renderItem()}/>
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


export default EventContainer;
