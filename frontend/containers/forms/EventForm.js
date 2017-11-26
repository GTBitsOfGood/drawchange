import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Control, Form } from 'react-redux-form';
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
        <Control required component={Text} model=".name" label="Event Name" type="text" />
        <Control required component={Text} model=".date" label="Event Date" type="date" />
        <Control required component={Text} model=".location" label="Event Location" type="text" />
        <Control required component={Textarea} model=".description" label="Event Description" />
        <Control required component={Text} model=".contact" label="Event Contact" type="text" />
        <Control required component={Text} model=".max_volunteers" label="Maximum Number of Volunteers" type="text" />
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