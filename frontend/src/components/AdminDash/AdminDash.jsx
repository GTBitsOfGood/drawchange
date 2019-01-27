import React, { Component } from 'react';
import {  Button, Form, FormGroup, Label, Input, InputGroup, Container, Row, Col} from 'reactstrap';
import VolunteerCard from './VolunteerCard';
import _ from "lodash";  

const userData =
[
  {
    role: 'volunteer', 
    bio: {
      first_name: "John", 
      last_name: "Adams", 
      phone_number: "(888)-888-8888", 
      email: "jadams@foundingfathers.gov", 
      date_of_birth: new Date(),
      street_address: "350 Ferst Drive", 
      city: "Atlanta",
      state: "Georgia", 
      zip_code: "30332", 
    }, 
    history: {
      volunteer_interest_cause: 'Well, I just helped found a nation and finally have some time to give back to my community. This cause really caught my eye!',
      volunteer_support: " ",
      volunteer_commitment: { type: String, required: true },
      previous_volunteer_experience: "Not sure if you would call it volunteer work, but there was certainly a lot of work with no pay"
    }
  }, 
  {
    role: 'admin', 
    bio: {
      first_name: "Sam", 
      last_name: "Ham", 
      phone_number: "1234567", 
      email: "456@gmail.com", 
      date_of_birth: new Date(),
      street_address: "101 peachtree lane", 
      state: "Georgia", 
      zip_code: "30032", 
    },
    history: {
      volunteer_interest_cause: 'I love little kids',
      volunteer_support: { type: String, required: true },
      volunteer_commitment: { type: String, required: true },
      previous_volunteer_experience: { type: String, required: true }
    }
  },
  {
    role: 'admin', 
    bio: {
      first_name: "Dean", 
      last_name: "Bean", 
      phone_number: "1234567", 
      email: "789@gmail.com", 
      date_of_birth: new Date(),
      street_address: "101 peachtree lane", 
      state: "Georgia", 
      zip_code: "30032", 
    },
    history: {
      volunteer_interest_cause: 'I want to change the world',
      volunteer_support: { type: String, required: true },
      volunteer_commitment: { type: String, required: true },
      previous_volunteer_experience: { type: String, required: true }
    }
  },
  {
    role: 'admin', 
    bio: {
      first_name: "Bud", 
      last_name: "Spud", 
      phone_number: "1234567", 
      email: "abc@gmail.com", 
      date_of_birth: new Date(),
      street_address: "101 peachtree lane", 
      state: "Georgia", 
      zip_code: "30032", 
    },
    history: {
      volunteer_interest_cause: 'Everyone deserves to be happy',
      volunteer_support: { type: String, required: true },
      volunteer_commitment: { type: String, required: true },
      previous_volunteer_experience: { type: String, required: true }
    }
  },

]

export default class AdminDash extends Component {
  render()
  {
    return (
      <Container>
        <Row>
          <Col>
            <Form>
                <FormGroup>
                  <Label for="exampleSearch"></Label>
                  <InputGroup>
                    <Input
                      type="search"
                      name="search"
                      id="exampleSearch"
                      placeholder="Find a Volunteer"
                    />
                  <Button>Search</Button>
                  </InputGroup>
                </FormGroup>
            </Form>
          </Col>
        </Row>
        <Row>
          {_.map(userData, data => <Col><VolunteerCard name = {data.bio.first_name + ' ' + data.bio.last_name} email = {data.bio.email} interest = {data.history.volunteer_interest_cause}/>></Col>)}
          {/* <Col><VolunteerCard userData = {userData} /></Col>
          <Col><VolunteerCard userData = {userData} /></Col>
          <Col><VolunteerCard userData = {userData} /></Col>
          <Col><VolunteerCard userData = {userData} /></Col> */}
        </Row>
      </Container>
     
    );
  }
}
