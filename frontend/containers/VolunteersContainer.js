// NPM Packages
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Local Imports
import '../assets/stylesheets/ItemDisplay.css';
import * as volunteerActions from '../actions/volunteers.js';
import LeftPane from '../components/LeftPane';
import MainPane from '../components/MainPane';

class VolunteersContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.onLoadVolunteers();
  }

  // eventually we should move this logic to redux...
  renderItem() {
    if (this.props.currentVolunteer !== null) {
      return this.props.volunteersList.find((item) => item._id === this.props.currentVolunteer);
    }
    return null;
  }

  render() {
    return(
      <div>
        <LeftPane
            itemList = {this.props.volunteersList}
            updateCurrentVolunteer = {this.props.updateCurrentVolunteer}
            view = "Volunteer"
        />
        <MainPane currentItem = {this.renderItem()}
        view = "Volunteer"/>
      </div>
    );
  }
}

VolunteersContainer.propTypes = {
  onLoadVolunteers: PropTypes.func,
  currentVolunteer: PropTypes.string,
  volunteersList: PropTypes.array,
  updateCurrentVolunteer: PropTypes.func,
};

const mapStateToProps = ( state, ownProps ) => {
  return {

    volunteersList: state.volunteers.list,
    currentVolunteer: state.current.currentVolunteer
          // name: state.name
          // currentView: state.currentView,
    // currentEvent: state.current.currentEvent,
    // eventList: state.events.list
          // volunteers: state.volunteers, // volunteer data
          // eventMode: state.eventMode, // view, edit, or create
          // currentVolunteer: state.current.currentVolunteer, // Volunteer id
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return bindActionCreators( volunteerActions, dispatch );
};

export default connect(mapStateToProps, mapDispatchToProps)(VolunteersContainer);