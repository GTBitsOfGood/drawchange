// NPM Packages
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col, Row, Panel, Nav, NavItem } from 'react-bootstrap';

// Local Imports
import '../assets/stylesheets/ItemDisplay.css';
import * as eventActions from '../actions/events.js';
import LeftPane from '../components/LeftPane';
import MainPane from '../components/MainPane';
import UpcomingEvents from '../components/tables/UpcomingEvents';
import AllVolunteers from '../components/tables/AllVolunteers';
import PENDING_VOLUNTEERS_SHORT from '../components/tables/columns';


class EventContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadAllEvents();
  }

  // eventually we should move this logic to redux...
  //   renderItem() {
  //     if (this.props.currentVolunteer !== null) {
  //       return this.props.volunteersList.find((item) => item._id === this.props.currentVolunteer);
  //     }
  //     return null;
  //   }

  render() {
    return (
      <div>
        <Row>
          <Col smOffset={1} lgOffset={2} lg={4} sm={5}>
            <Panel header={<h3>All Event</h3>} bsStyle="info">
              {/* <input type={text}> */}
              <UpcomingEvents data={this.props.all} />
            </Panel>

          </Col>
          <Col sm={5} lg={4}>
            <Panel header={<h3>Event Details</h3>} bsStyle="info">
              {/* <input type={text}> */}
              {/* <PendingVolunteers data={this.props.pending} /> */}
              <h1>Heading</h1>
            </Panel>
          </Col>
        </Row>


        {/* <LeftPane
            itemList = {this.props.volunteersList}
            updateCurrentVolunteer = {this.props.updateCurrentVolunteer}
            view = "Volunteer"
        />
        <MainPane currentItem = {this.props.currentVolunteer || null}
        view = "Volunteer"/> */}
      </div>
    );
  }
}

EventContainer.propTypes = {
  onLoadVolunteers: PropTypes.func,
  currentVolunteer: PropTypes.string,
  volunteersList: PropTypes.array,
  updateCurrentVolunteer: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  return {
    pending: state.volunteers.pending,
    all: state.events.all,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(eventActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EventContainer);