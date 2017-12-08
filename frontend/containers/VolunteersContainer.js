// NPM Packages
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col, Row, Panel, Nav, NavItem } from 'react-bootstrap';

// Local Imports
import '../assets/stylesheets/ItemDisplay.css';
import * as volunteerActions from '../actions/volunteers.js';
import VolunteerProfile from '../components/VolunteerProfile';
import PendingVolunteersShort from '../components/tables/PendingVolunteersShort';
import AllVolunteers from '../components/tables/AllVolunteers';
import PENDING_VOLUNTEERS_SHORT from '../components/tables/columns';


class VolunteersContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadAllVolunteers(this.props.match.params.id);
    this.props.loadPendingVolunteers();
  }

  // eventually we should move this logic to redux...
//   renderItem() {
//     if (this.props.currentVolunteer !== null) {
//       return this.props.volunteersList.find((item) => item._id === this.props.currentVolunteer);
//     }
//     return null;
//   }

  render() {
    return (<div>
        <Row>
          <Col smOffset={1} lgOffset={2} lg={4} sm={5}>
            <h1>Manage Volunteers</h1>
          </Col>
        </Row>
        <Row>
          <Col smOffset={1} lgOffset={2} lg={4} sm={5}>
            <Panel header={<h3>All Volunteers</h3>} bsStyle="info">
              {/* <input type={text}> */}
              <AllVolunteers data={this.props.all} updateVolunteer={this.props.updateCurrentVolunteer} />
            </Panel>
            <Panel header={<h3>Pending Volunteers</h3>} bsStyle="info">
              <PendingVolunteersShort data={this.props.pending} updateVolunteer={this.props.updateCurrentVolunteer} />
            </Panel>
          </Col>
          <Col sm={5} lg={4}>
            <Panel header={<h3>Volunteer Details</h3>} bsStyle="info">
              {this.props.current_volunteer && <VolunteerProfile user={this.props.current_volunteer} onClickApprove={() => this.props.approvePendingVolunteer(this.props.current_volunteer._id)} />}
              {!this.props.current_volunteer && <h3>Click on a Volunteer to view details</h3>}
            </Panel>
          </Col>
        </Row>
      </div>);
  }
}

VolunteersContainer.propTypes = {
  onLoadVolunteers: PropTypes.func,
  current_volunteer: PropTypes.object,
  volunteersList: PropTypes.array,
  updateCurrentVolunteer: PropTypes.func,
  approvePendingVolunteer: PropTypes.func,
};

const mapStateToProps = ( state, ownProps ) => {
  return {
    pending: state.volunteers.pending,
    all: state.volunteers.all,
    current_volunteer: state.volunteers.current_volunteer,
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return bindActionCreators( volunteerActions, dispatch );
};

export default connect(mapStateToProps, mapDispatchToProps)(VolunteersContainer);