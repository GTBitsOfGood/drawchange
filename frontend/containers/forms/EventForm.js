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

import '../../assets/stylesheets/ItemDisplay.css';


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
      <Form model="forms.event" onSubmit={v => console.log(v)}>
        <Control required component={Text} model=".name" label="Event Name" type="text" placeholder = "Event Name"
        errors={{
          isRequired: (val) => !val
        }}/>
        <Errors className="errors" model=".name" show="focus" messages={{
          isRequired: 'Please enter your name',
        }} />
        <Control required component={Text} model=".date" label="Event Date" type="date"
        errors={{
          isRequired: (val) => !val
        }}/>
        <Errors className="errors" model=".date" show="focus" messages={{
          isRequired: 'Please enter a date',
        }} />
        <Control required component={Text} model=".location" label="Event Location" type="text" placeholder = "Event Location"
        errors={{
          isRequired: (val) => !val
        }}/>
        <Errors className="errors" model=".location" show="focus" messages={{
          isRequired: 'Please enter a location',
        }} />
        <Control required component={Textarea} model=".description" label="Event Description" type="text" placeholder = "Event Description"
        errors={{
          isRequired: (val) => !val || !(val.length() >= 5)
        }}/>
        <Errors className="errors" model=".description" show="focus" messages={{
          isRequired: 'Please enter a description',
        }} />
        <Control required component={Text} model=".contact" label="Event Contact" type="text" placeholder = "Event Contact"
        errors={{
          isRequired: (val) => !val
        }}/>
        <Errors className="errors" model=".contact" show="focus" messages={{
          isRequired: 'Please enter a location',
        }} />
        <Control required component={Text} model=".max_volunteers" label="Maximum Number of Volunteers" type="text" min={1} placeholder = "Maximum number of Volunteers"
        errors={{
          isRequired: (val) => !val
        }}/>
        <Errors className="errors" model=".max_volunteers" show="focus" messages={{
          isRequired: 'Please enter a maximum number of volunteers',
        }} />
        <Button bsStyle="primary" type="submit" onClick={this.props.onCreateEvent}>Submit</Button>
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