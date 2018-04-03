// NPM Packages
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col, Row, Panel, Nav, NavItem, Button } from 'react-bootstrap';
import { Switch, Route, Redirect, withRouter, Link } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";

// Local Imports
import '../assets/stylesheets/ItemDisplay.css';
import * as eventActions from '../actions/events.js';
import LeftPane from '../components/LeftPane';
import MainPane from '../components/MainPane';
import UpcomingEvents from '../components/tables/UpcomingEvents';
import AllVolunteers from '../components/tables/AllVolunteers';
import PENDING_VOLUNTEERS_SHORT from '../components/tables/columns';
import EventDetails from '../components/EventDetails';
import EventForm from './forms/EventForm';
import VolunteerForm from './forms/VolunteerForm';


class EventContainer extends React.Component {

  componentWillMount() {
    this.props.loadAllEvents(this.props.match.params.id);
  }

  // onCreateEvent() {
  //   console.log("clicked");
  //   return (
  //       <Route exact path={'/createEvent'} component={EventForm} />
  //   );
  // }

  render() {
    return (<div>
        <Row>
          <Col smOffset={1} lgOffset={2} lg={4} sm={5}>
            <h1>Volunteer Events</h1>
          </Col>
          <Col sm={5} lg={4}>
            <Nav pullRight style={{ marginTop: "20px", marginBottom: "10px", fontSize: "initial" }} bsStyle="pills" >
              <LinkContainer exact to="/events/new">
                <NavItem>+ New Event</NavItem>
              </LinkContainer>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col smOffset={1} lgOffset={2} lg={4} sm={5}>
            <Panel header={<h3>All Event</h3>} bsStyle="info">
              {/* <input type={text}> */}
              <UpcomingEvents data={this.props.all} updateEvent={this.props.updateCurrentEvent} />
            </Panel>
            <Panel header={<h3>Upcoming Events</h3>} bsStyle="info">
              {/* <input type={text}> */}
              <UpcomingEvents data={this.props.all} updateEvent={this.props.updateCurrentEvent} />
            </Panel>
          </Col>
          <Col sm={5} lg={4}>
            <Panel header={<h3>Event Detail</h3>} bsStyle="info">
              {this.props.current_event && <EventDetails event={this.props.current_event} />}
              {!this.props.current_event && <h3> Click an Event to view details </h3>}
            </Panel>
          </Col>
        </Row>
      </div>);
  }
}

EventContainer.propTypes = {
  onLoadVolunteers: PropTypes.func,
  currentVolunteer: PropTypes.string,
  volunteersList: PropTypes.array,
  updateCurrentVolunteer: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    pending: state.volunteers.pending,
    all: state.events.all,
    current_event: state.events.current_event
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(eventActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EventContainer);
