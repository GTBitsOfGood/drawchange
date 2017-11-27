import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Control, Form, Errors } from 'react-redux-form';
import ReduxSweetAlert, { swal, close } from 'react-redux-sweetalert';
import { bindActionCreators } from 'redux';
import Button from 'react-bootstrap/lib/Button';
// Local Components
import { onCreateEvent } from '../../actions/events';
import Text from '../../components/inputs/Text';
import Textarea from '../../components/inputs/Textarea';


class EventForm extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.props.swal({
        title: "Login Failed!",
        type: "error",
        confirmButtonText: "Ok"
      });
    }
  }

  render() {
    return (
      <Form model="forms.event" >
        <Control required component={Text} model=".name" label="Event Name" type="text" validateOn="blur"/>
        <Errors model=".name" show="touched" messages={{
          valueMissing: 'Please enter your name',
          typeMismatch: 'Please enter a valid name',
        }} />
        <Control required component={Text} model=".date" label="Event Date" type="date" validateOn="blur" />
        <Errors model=".date" show="touched" messages={{
          valueMissing: 'Please enter a date',
          typeMismatch: 'Please enter a valid date',
        }} />
        <Control required component={Text} model=".location" label="Event Location" type="text" validateOn="blur" />
        <Errors model=".location" show="touched" messages={{
          valueMissing: 'Please enter a location',
          typeMismatch: 'Please enter a valid location',
        }} />
        <Control required component={Textarea} model=".description" label="Event Description" validateOn="blur" />
        <Errors model=".description" show="touched" messages={{
          valueMissing: 'Please enter a description',
          typeMismatch: 'Please enter a valid description',
        }} />
        <Control required component={Text} model=".contact" label="Event Contact" type="text" validateOn="blur" />
        <Errors model=".contact" show="touched" messages={{
          valueMissing: 'Please enter a contact',
          typeMismatch: 'Please enter a valid contact',
        }} />
        <Control required component={Text} model=".max_volunteers" label="Maximum Number of Volunteers" type="text" validateOn="blur" min={1}/>
        <Errors model=".max_volunteers" show="touched" messages={{
          valueMissing: 'Please enter a maximum number of volunteers',
          typeMismatch: 'Please enter a valid maximum number of volunteers',
        }} />
        <Button bsStyle="primary" onClick={this.props.onCreateEvent}>Submit</Button>
        <ReduxSweetAlert />
      </Form>
    );
  }
}

EventForm.propTypes = {
  onCreateEvent: PropTypes.func,
  error: PropTypes.bool,
  swal: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,

};

function mapStateToProps(state) {
  return {
    error: state.auth.loginFailed,
  };
}

function mapDispatchToProps(dispatch) {
  return Object.assign(
    {},
    { swal: bindActionCreators(swal, dispatch) },
    { close: bindActionCreators(close, dispatch) },
    { onCreateEvent: () => dispatch(onCreateEvent()) }
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);