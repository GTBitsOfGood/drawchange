// NPM Packages
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col, Row, Panel, Nav, NavItem, Button } from 'react-bootstrap';

// Local Imports
import '../assets/stylesheets/ItemDisplay.css';
import * as eventActions from '../actions/events.js';
import LeftPane from '../components/LeftPane';
import MainPane from '../components/MainPane';
import UpcomingEvents from '../components/tables/UpcomingEvents';
import MyEvents from '../components/tables/MyEvents';
import AllVolunteers from '../components/tables/AllVolunteers';
import PENDING_VOLUNTEERS_SHORT from '../components/tables/columns';
import VolunteersEventDetails from '../components/VolunteersEventDetails';


class VolunteersDashboard extends React.Component {

  componentWillMount() {
    console.log(this.props.match);
    if (this.props.match !== undefined) {
      this.props.loadAllEvents(this.props.match.params.id);
    } else if (this.props.match === undefined) {
      this.props.loadAllEvents(null);
    }
  }

  findEvent() {
    this.eventsArr = this.props.all;
    return this.eventsArr.find((val) => val._id === this.props.current_event._id);
  }
  render() {
    return (
      <div>
        <Row>
          <Col smOffset={1} lgOffset={2} lg={4} sm={5}>
            <Panel header={<h3>My Events</h3>} bsStyle="info">
            <MyEvents data={this.props.all} updateEvent={this.props.updateCurrentEvent}/>
            </Panel>
            <Panel header={<h3>All Events</h3>} bsStyle="info">
              <UpcomingEvents data={this.props.all} updateEvent={this.props.updateCurrentEvent}/>
            </Panel>

          </Col>
          <Col sm={5} lg={4}>
            <Panel header={<h3>Event Details</h3>} bsStyle="info">

                {/* {this.props.current_event && this.props.} */}
              {this.props.current_event && <VolunteersEventDetails user = {this.props.userId} event=
                {this.props.current_event} signUp={this.props.onSignUp} unregister=
                {this.props.unSignUp} allVolunteers={this.findEvent()}/>}
              {!this.props.current_event && <h2>Click an Event to view details</h2>}
            </Panel>
          </Col>
        </Row>
      </div>
    );
  }
}

VolunteersDashboard.propTypes = {
  onLoadVolunteers: PropTypes.func,
  currentVolunteer: PropTypes.string,
  volunteersList: PropTypes.array,
  updateCurrentVolunteer: PropTypes.func,
  updateCurrentEvent: PropTypes.func,
  current_event: PropTypes.object,
  onSignUp: PropTypes.func,
  unSignUp: PropTypes.func,
  user: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  return {
    pending: state.volunteers.pending,
    all: state.events.all,
    current_event: state.events.current_event,
    userId: state.auth.user._id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(eventActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(VolunteersDashboard);
