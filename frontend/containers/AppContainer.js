import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Splash from './Splash';
import MainContainer from './MainContainer';
import SurveyForm from './forms/SurveyForm';

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
    return (this.props.user ? <Redirect to={'/'} /> : <SurveyForm />);
  }
  _home() {
    return (this.props.user ? <MainContainer /> : <Redirect to={'/login'} />);
  }

  render() {
    return (
      <div>
        <Navbar logoutAction={this.props.logout} />
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
