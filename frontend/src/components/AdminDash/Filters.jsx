import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import { Form, Checkbox } from '../Forms';

const defaultValues = {
  roles: {
    admin: false,
    volunteer: false,
    manager: false,
    pending: false,
    rejected: false
  },
  availability: {
    weekday_mornings: false,
    weekday_afternoons: false,
    weekday_evenings: false,
    weekend_mornings: false,
    weekend_afternoons: false,
    weekend_evenings: false
  },
  skills_interests: {
    admin_office: false,
    admin_virtual: false,
    atlanta_shelter: false,
    orlando_shelter: false,
    graphic_web_design: false,
    special_events: false,
    grant_writing: false,
    writing_editing: false,
    social_media: false,
    fundraising: false,
    finance: false,
    office_maintenance_housekeeping: false,
    international_projects: false,
    volunteer_coordination: false,
    outreach: false
  }
};

const values = {
  roles: { ...defaultValues.roles },
  availability: { ...defaultValues.availability },
  skills_interests: { ...defaultValues.skills_interests }
};

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  onSubmit = values => {
    this.toggle();
    console.log(values);
  };
  render() {
    return (
      <Modal
        isOpen={this.state.modal}
        toggle={this.toggle}
        className={this.props.className}
        backdrop={this.state.backdrop}
      >
        <ModalHeader toggle={this.toggle}>Filters</ModalHeader>
        <Form
          initialValues={{ ...values, onSubmit: this.onSubmit, ...this.props }}
          onSubmit={this.onSubmit}
        >
          <ModalBody>
            <FormGroup>
              <Label for="role">Role</Label>
              <div>
                <Checkbox name="roles.admin" value="Admin" />
                <Checkbox name="roles.volunteer" value="Volunteer" />
                <Checkbox name="roles.manager" value="Manager" />
                <Checkbox name="roles.pending" value="Pending" />
                <Checkbox name="roles.rejected" value="Rejected" />
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="availability">Availability</Label>
              <div>
                <h6>Weekdays</h6>
                <Checkbox name="availability.weekday_mornings" value="Weekday Mornings" />
                <Checkbox name="availability.weekday_afternoons" value="Weekday Afternoons" />
                <Checkbox name="availability.weekday_evenings" value="Weekday Evenings" />
                <h6>Weekends</h6>
                <Checkbox name="availability.weekend_mornings" value="Weekend Mornings" />
                <Checkbox name="availability.weekend_afternoons" value="Weekend Afternoons" />
                <Checkbox name="availability.weekend_evenings" value="Weekend Evenings" />
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="skills">Skills</Label>
              <div>
                <Checkbox
                  name="skills_interests.admin_office"
                  value="Administrative In Office Support"
                />
                <Checkbox name="skills_interests.atlanta_shelter" value="Atlanta Shelter" />
                <Checkbox name="skills_interests.orlando_shelter" value="Orlando Shelter" />
                <Checkbox name="skills_interests.graphic_web_design" value="Graphic/Web Design" />
                <Checkbox name="skills_interests.special_events" value="Special Events" />
                <Checkbox name="skills_interests.writing_editing" value="Writing & Editing" />
                <Checkbox name="skills_interests.grant_writing" value="Grant Writing" />
                <Checkbox name="skills_interests.finance" value="Finance Assistance" />
                <Checkbox name="skills_interests.outreach" value="Outreach" />
                <Checkbox
                  name="skills_interests.volunteer_coordination"
                  value="Volunteer Coordination"
                />
                <Checkbox
                  name="skills_interests.office_maintenance_housekeeping"
                  value="Office Maintenance & Housekeeping"
                />
                <Checkbox
                  name="skills_interests.international_projects"
                  value="International Projects/Trips"
                />
                <Checkbox name="skills_interests.social_media" value="Social Media" />
                <Checkbox name="skills_interests.special_events" value="Special Events" />
                <Checkbox name="skills_interests.fundraising" value="Fundraising" />
              </div>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
            <Button color="secondary" type="reset">
              Clear Filters
            </Button>
            <Button color="primary" type="submit">
              Submit
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

export default Filters;

Filters.propTypes = {
  initValues: PropTypes.object
};
