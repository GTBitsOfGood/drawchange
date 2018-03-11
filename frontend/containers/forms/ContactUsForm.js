import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Control, Form, actions, Fieldset, Errors } from 'react-redux-form';
import { bindActionCreators } from 'redux';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';
import validator from 'validator';
var isPhoneNumber = require('is-phone-number');
var isValidZip = require('is-valid-zip');
var isValidDate = require('is-valid-date');

// Local Components
import { register } from '../../actions/auth';
import ReduxSweetAlert, { swal, close } from 'react-redux-sweetalert';
import Text from '../../components/inputs/Text';
import TextArea from '../../components/inputs/Textarea';
import Checkbox from '../../components/inputs/Checkbox';
import '../../assets/stylesheets/ItemDisplay.css';
import {isRequired, isLong} from './Validation';
class VolunteerForm extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.props.swal({
        title: "Registration Failed!",
        type: "error",
        confirmButtonText: "Ok"
      });
    } else if (nextProps.success) {
      this.props.swal({
        title: "Registration Success!",
        text: "Now Please Login",
        type: "success",
        confirmButtonText: "Ok"
      });
    }
  }

  render() {
      <div>
      <Col md={6} mdOffset={3}>
        <Form model="forms.user" onSubmit={v => console.log(v)}>
        
        </Form>
      </Col>
      </div>
  }
}
