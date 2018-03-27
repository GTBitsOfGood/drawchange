import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Control, LocalForm, actions, Fieldset, Errors } from 'react-redux-form';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import validator from 'validator';
var isPhoneNumber = require('is-phone-number');
var isValidDate = require('is-valid-date');

// Local Components
import Text from '../../components/inputs/Text';
import TextArea from '../../components/inputs/Textarea';
import Checkbox from '../../components/inputs/Checkbox';
import '../../assets/stylesheets/ItemDisplay.css';
import {isRequired, isEmail, isLong} from './Validation';
class ContactUsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    handleChange(event) {
        console.log(event)
        this.setState({
            [event.target.name]:event.target.value
        });
    }
    handleForm(event) {
        event.preventDefault();
        console.log(this.state);
    }
  render() {
      return (
      <div>
      <Col md={6} mdOffset={3}>
        <form onSubmit={this.handleForm.bind(this)}>
            <Text name="firstName" label="First Name" onChange={this.handleChange.bind(this)} placeholder="First Name"/>
            <Text name="lastName" label="Last Name" onChange={this.handleChange.bind(this)} placeholder="Last Name"/>
            <Text name="email" label="Email" onChange={this.handleChange.bind(this)} placeholder="example@gmail.com"/>
            <Text name="phoneNumber" label="Phone Number" onChange={this.handleChange.bind(this)} placeholder="999-999-9999"/>
            <Text name="subject" label="Subject" onChange={this.handleChange.bind(this)} placeholder="Subject"/>
            <Text name="message" label="Message" onChange={this.handleChange.bind(this)} placeholder="Message"/>
            <Button bsStyle="primary" type="submit">Submit</Button>
        </form>
        {/*LocalForm name="ContactUsForm" onSubmit={v  => console.log(v)}>
            <Control required component={Text} label="First Name" placeholder="First Name" type= "text"
                errors={{isRequired: (val) => !val}}/>
            <Errors className="errors" show = "focus" messages={{
                isRequired: 'Please enter a last name',
            }} />

            <Control required component={Text} label="Last Name" placeholder="Last Name" type= "text"
                errors={{isRequired: (val) => !val}}/>
            <Errors className="errors" show = "focus" messages={{
                isRequired: 'Please enter a last name',
            }} />

            <Control required component={Text} label="Email" placeholder="Email" type="email"
                errors={{isEmail: (val) => !validator.isEmail(val)}}/>
            <Errors className="errors" show = "focus" messages={{
                isEmail: 'Please enter a valid email',
            }} />

            <Control required component={Text} label="Phone Number" placeholder="982-004-3178" type="tel"
                errors={{isPhoneNumber: (val) => !isPhoneNumber(val)}}/>
            <Errors className="errors" show = "focus" messages={{
              isPhoneNumber: 'Enter a valid phone number of form: 982-004-3178',
            }} />

            <Control required component={Text} label="Subject" placeholder="Subject" type= "text"
                errors={{isRequired: (val) => !val}}/>
            <Errors className="errors" show = "focus" messages={{
                isRequired: 'Please enter a subject',
            }} />

            <Control required component={Text} label="Message" placeholder="Message" type= "text"
                errors={{isRequired: (val) => !val}}/>
            <Errors className="errors" show = "focus" messages={{
                isRequired: 'Please enter your message',
            }} />

            /*Do the onClick function
            // <Button bsStyle="primary" type="submit">Send</Button>
            // onClick={}

        </LocalForm>*/}
      </Col>
      </div>
    )
  }
}

export default ContactUsForm;
