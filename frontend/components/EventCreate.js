import PropTypes from 'prop-types';
import React from 'react';
import { Control, Form, actions } from 'react-redux-form';
import Button from 'react-bootstrap/lib/Button';

import Text from '../components/inputs/Text';
import Textarea from '../components/inputs/Textarea';

const EventCreate = () => (
    <Form model = "myForms" >
        <Control required component={Text} model=".name" label="Name" type="name" />
        <Control required component={Text} model=".date" label="Date" type="date" />
        <Control required component={Textarea} model=".location" label="Location" type="location" />
        <Control required component={Textarea} model=".description" label="Description" type="description" />
        <Control required component={Text} model=".contact" label="Contact" type="contact" />
        <Control required component={Text} model=".max_volunteers" label="Max_Volunteers" type="max_volunteers" />
        <Button bsStyle="primary" >Submit</Button>
    </Form>
);


export default EventCreate;
