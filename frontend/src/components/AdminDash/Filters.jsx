import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, Checkbox } from '../Forms';
import styled from 'styled-components';

const Styled = {
  Label: styled.label`
    font-weight: 600;
  `
};

const defaultValues = {
  role: {
    label: 'Role',
    values: {
      admin: false,
      volunteer: false,
      manager: false,
      pending: false,
      rejected: false
    }
  },
  availability: {
    label: 'Availability',
    values: {
      weekday_mornings: false,
      weekday_afternoons: false,
      weekday_evenings: false,
      weekend_mornings: false,
      weekend_afternoons: false,
      weekend_evenings: false
    }
  },
  skills_interests: {
    label: 'Skills and Interests',
    values: {
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
  }
};

const keyToLabel = key => {
  const words = key.split('_');
  const capitalizedWords = words.map(word => `${word[0].toUpperCase()}${word.slice(1)}`);
  return capitalizedWords.join(' ');
};

const Filters = ({ show, toggleCallback, submitCallback, appliedFilters }) => (
  <Modal isOpen={show} toggle={toggleCallback}>
    {console.log(appliedFilters)}
    <ModalHeader toggle={toggleCallback}>Filters</ModalHeader>
    <Form
      initialValues={appliedFilters || defaultValues}
      onSubmit={values => {
        toggleCallback();
        submitCallback(values);
      }}
    >
      <ModalBody>
        {Object.entries(defaultValues).map(([groupKey, filterGroup], index) => (
          <FormGroup key={index}>
            <Styled.Label>{filterGroup.label}</Styled.Label>
            {Object.keys(filterGroup.values).map((filter, index2) => (
              <Checkbox
                key={index2}
                name={`${groupKey}.values.${filter}`}
                value={keyToLabel(filter)}
              />
            ))}
          </FormGroup>
        ))}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggleCallback}>
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

export default Filters;

Filters.propTypes = {
  show: PropTypes.bool.isRequired,
  toggleCallback: PropTypes.func.isRequired,
  submitCallback: PropTypes.func.isRequired,
  appliedFilters: PropTypes.object
};
