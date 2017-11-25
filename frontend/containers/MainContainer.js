// NPM Packages
import PropTypes from 'prop-types';
import React from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { Switch, Route, Redirect, withRouter, Link } from 'react-router-dom';

// Local Imports
import * as eventActions from '../actions/events.js';
// import * as volunteerActions from '../actions/volunteers.js'
// import LeftPane from '../components/LeftPane';
// import MainPane from '../components/MainPane';
// import ItemList from '../components/ItemList';
// import EventView from '../components/EventView';

// class MainContainer extends React.Component {
const MainContainer = () => (
    <div>
      <Link to={'/'}>Dashbaord</Link><br />
      <Link to={'/volunteers'}>Volunteers Link</Link>
      <br />
      <Link to={'/events'}>Event Link</Link><br />
      <Route path={"/"} render={() => <h1>We are logged in</h1>} />
      <Route path={"/"} exact render={() => <h1>Dashboard Only</h1>} />
      <Route path={"/events"} render={() => <h1>Events Page</h1>} />
      <Route path={"/volunteers"} render={() => <h1>Volunteer Page</h1>} />
    </div>
  );


// MainContainer.propTypes = {
//   currentView: PropTypes.string,
//   events: PropTypes.array,
//   volunteers: PropTypes.array,
//   eventMode: PropTypes.string,
//   currentEvent: PropTypes.string,
//   currentVolunteer: PropTypes.string,
//   eventActions: PropTypes.object,
//   volunteerActions: PropTypes.object,
// };

// const mapStateToProps = ( state, ownProps ) => {
//   return {
//     // name: state.name
//     currentEvent: state._id,
//     currentView: state.currentView,
//     events: state.events, // event data
//     volunteers: state.volunteers, // volunteer data
//     eventMode: state.eventMode, // view, edit, or create
//     currentEvent: state.currentEvent, // Event id
//     currentVolunteer: state.currentVolunteer, // Volunteer id
//   };
// };

// const mapDispatchToProps = ( dispatch ) => {
//   return {
//     eventActions: bindActionCreators( eventActions, dispatch ),
//     // volunteerActions: bindActionCreators( volunteerActions, dispatch )
//   };
// };

// export default withRouter(connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(MainContainer));

export default MainContainer;