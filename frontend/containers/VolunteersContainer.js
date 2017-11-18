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
    this.props.volunteerActions.onLoadVolunteers();
    console.log(this.props.volunteersList);
  }

  renderItem() {
    if (this.props.currentVolunteer !== null) {
      return this.props.volunteersList.find((item) => {
        console.log(item._id);
        return item._id === this.props.currentVolunteer;
      });
    }
    return null;
  }

  render() {
    return(
            <div>
                <LeftPane
                    itemList = {this.props.volunteersList}
                    updateCurrentVolunteer = {this.props.volunteerActions.updateCurrentVolunteer}
                    view = "Volunteer"
                />
                <MainPane
                    currentItem = {this.renderItem()}/>
            </div>
    );
  }
}

VolunteersContainer.propTypes = {
  currentVolunteer: PropTypes.string,
  volunteersList: PropTypes.array,
  updateCurrentVolunteer: PropTypes.array,
  volunteerActions: PropTypes.object,
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
  return {
    volunteerActions: bindActionCreators( volunteerActions, dispatch ),
          // volunteerActions: bindActionCreators( volunteerActions, dispatch )
  };
};

export default connect(
        mapStateToProps,
        mapDispatchToProps
      )(VolunteersContainer);