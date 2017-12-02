import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Splash from './Splash';
import PostRegisterSplash from '../components/PostRegisterSplash';
import MainContainer from './MainContainer';
import VolunteerForm from './forms/VolunteerForm';
import Dashboard from './Dashboard';
import VolunteersContainer from './VolunteersContainer';
import VolunteerDashboard from './VolunteerDashboard';
import Navbar from '../components/Navbar';

import * as actions from '../actions/auth';


class AppContainer extends Component {
  constructor(props) {
    super(props);

    this._login = this._login.bind(this);
    this._register = this._register.bind(this);
    this._home = this._home.bind(this);
  }

  _login() {
    return ( this.props.user ? <Redirect to={'/'} /> : <Splash /> );
  }
  _register() {
    return (this.props.user ? <Redirect to={'/'} /> : <VolunteerForm />);
  }
  _home() {
    return (this.props.user ? this._authorize(this.props.user) : <Redirect to={'/login'} />);
  }

  _authorize(user) {
    if (user.bio.role === 'pending') {
      return <MainContainer user={user} />;
    } else if (user.bio.role === 'rejected') {
      return <h1>Your application has been rejected</h1>;
    } else if (user.bio.role === 'volunteer') {
      return <VolunteerDashboard user={user} />;
    }
    return <MainContainer user={user} />;
  }

  render() {
    return (
      <div>
        <Navbar logoutAction={this.props.logout} user = {this.props.user} />
        <Switch>
          <Route exact path={'/login'} render={this._login}/>
          <Route exact path={'/register'} render={this._register} />
          <Route path={'/*'} render={this._home}/>
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
