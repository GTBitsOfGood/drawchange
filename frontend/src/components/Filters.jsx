import React from 'react';
import { Button, Form, FormGroup,Modal, ModalHeader, ModalBody, ModalFooter, CustomInput, Label, Input, FormText } from 'reactstrap';

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
render() {
    return (
<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={this.state.backdrop}>
    <ModalHeader toggle={this.toggle}>Filters</ModalHeader>
    <ModalBody>
        <FormGroup>
          <Label for="Role">Role</Label>
          <div>
            <CustomInput type="checkbox" id="role-admin" label="Admin" />
            <CustomInput type="checkbox" id="role-volunteer" label="Volunteer" />
            <CustomInput type="checkbox" id="role-manager" label="Manager" />
            <CustomInput type="checkbox" id="role-pending" label="Pending" />
            <CustomInput type="checkbox" id="role-rejected" label="Rejected" />
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="Availability">Availability</Label>
          <div>
            <h6>Weekdays</h6>
            <CustomInput type="checkbox" id="weekdays-mornings" label="Mornings" />
            <CustomInput type="checkbox" id="weekdays-afternoons" label="Afternoons" />
            <CustomInput type="checkbox" id="weekdays-evenings" label="Evenings" />
            <h6>Weekends</h6>
            <CustomInput type="checkbox" id="weekends-mornings" label="Mornings" />
            <CustomInput type="checkbox" id="weekends-afternoons" label="Afternoons" />
            <CustomInput type="checkbox" id="weekends-evenings" label="Evenings" />
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="Skills">Skills</Label>
          <div>
            <CustomInput type="checkbox" id="graphic_web_design" label="Web Design" />
            <CustomInput type="checkbox" id="grant_writing" label="Grant Writing" />
            <CustomInput type="checkbox" id="social_media" label="Social Media" />
            <CustomInput type="checkbox" id="special_events" label="Special Events" />
            <CustomInput type="checkbox" id="writing_editing" label="Writing/Editing" />
            <CustomInput type="checkbox" id="office_maintenance_housekeeping" label="Office Maintainance/Housekeeping" />
            <CustomInput type="checkbox" id="international_projects" label="International Projects" />
            <CustomInput type="checkbox" id="volunteer_coordination" label="Volunteer Coordination" />
            <CustomInput type="checkbox" id="outreach" label="Outreach" />
            <CustomInput type="checkbox" id="fundraising" label="Fundraising" />
            <CustomInput type="checkbox" id="finance" label="Finance" />
          </div>
        </FormGroup>
    </ModalBody>
    <ModalFooter>
        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        <Button color="secondary" onClick={this.toggle}>Clear Filters</Button>
        <Button color="primary" onClick={this.toggle}>Apply</Button>{' '}
    </ModalFooter>
</Modal>
);
}
}

export default Filters
