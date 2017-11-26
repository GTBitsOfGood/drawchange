// NPM Packages
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col, Row, Panel, Nav, NavItem } from 'react-bootstrap';
// Local Imports
import '../assets/stylesheets/ItemDisplay.css';
import * as eventActions from '../actions/events.js';
import PendingVolunteers from '../components/tables/PendingVolunteers';


class Dashboard extends Component {

  constructor(props) {
    super(props);
  }
  // componentWillMount() {
  //   this.props.onLoadEvent();
  // }


  render() {
    return (
      <div>
        <Row>
          <Col smOffset={2} sm={4}>
            <h1>Welcome Andre</h1>
          </Col>
          <Col sm={4}>
            <Nav pullRight style={{marginTop: '20px', marginBottom: '10px', fontSize: 'initial'}} bsStyle="pills"  onSelect={key => alert(`clicked ${key}`)}>
              <NavItem eventKey={1}>New Event</NavItem>
              <NavItem eventKey={2}>New Volunteer</NavItem>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col smOffset={2} sm={8}>
            <Panel header={<h3>Pending Volunteers</h3>} bsStyle="info">
              <PendingVolunteers/>
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col smOffset={2} sm={4}>
            <Panel header={<h3>New Volunteers</h3>} bsStyle="info">
              <h2>Panel contents</h2>
            </Panel>
          </Col>
          <Col sm={4}>
            <Panel header={<h3>Upcoming Events</h3>} bsStyle="info">
              <h2>Panel contents</h2>
            </Panel>
          </Col>
        </Row>
      </div>
    );
  }
}

Dashboard.propTypes = {
  onLoadEvent: PropTypes.func,
  itemList: PropTypes.array,
  currentEvent: PropTypes.string,
  events: PropTypes.object,
  updateCurrentEvent: PropTypes.func,
  volunteers: PropTypes.array,
  eventMode: PropTypes.string,
  currentVolunteer: PropTypes.string,
  eventList: PropTypes.array,
  onCreateEvent: PropTypes.func,
  createEvent: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(eventActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);