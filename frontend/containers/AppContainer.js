import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Splash from './Splash';
import MainContainer from './MainContainer';

import Navbar from '../components/Navbar';

import * as actions from '../actions/auth';


// const AppContainer = ({ logout }) => {
class AppContainer extends Component {
  render() {
    return (
      <div>
        <Navbar logoutAction={this.props.logout} />
        <Switch>
          <Route exact path={'/login'} render={() => this.props.user ? <Redirect to={'/'} /> : <Splash/>}/>
          <Route path={'/*'} render={() => this.props.user ? <MainContainer/> : <Redirect to={'/login'}/>}/>
        </Switch>
      </div>

    );
  }
}


AppContainer.propTypes = {
  logout: PropTypes.func,
  user: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer));
