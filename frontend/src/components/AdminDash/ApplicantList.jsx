import React from 'react';
import PropTypes from 'prop-types';
import StatusBadge from './StatusBadge';
import styled from 'styled-components';
import { Button, CustomInput, Input } from 'reactstrap';
import { Field } from 'formik';
import { Form } from '../Forms';

const List = styled.div`
  padding-top: 2rem;
  max-width: 20em;
  margin: 0 1rem;
`;

const ListItem = styled.button`
  background-color: white;
  text-align: left;
  width: 100%;
  padding: 1rem;
  padding-top: 1rem;
  border: none;
  border-bottom: 0.1rem solid #ddd;

  :hover {
    background-color: #f5f5f5;
    transition: background-color 0.2s;
  }

  p {
    margin: 0 0 1rem 0;
    color: #777;
  }

  ${props =>
    props.selected &&
    `
    background-color: #b35fd0;
    border-radius: 0.3rem;

    :hover {
      background-color: #c98adf;
    }

    p, h1 {
      color: white;
    }
  `}
`;

const ListItemHeader = styled.h1`
  margin-bottom: 0.3rem;
  font-size: 1.2em;
  font-weight: 700;
  color: ${props => props.theme.grey1};
`;

const CheckboxContainer = styled.div`
  padding: 2rem;
  width: 100%;
  flex-direction: row;
  display: ${props => (props.display ? 'initial' : 'none')};
`;

const ApplicantList = ({
  applicants,
  selectApplicantCallback,
  selectedIndex,
  children,
  showMassEmailCheckboxes,
  selectEmails
}) => (
  <List>
    {children}
    {(applicants || []).map(({ bio, status }, index) => (
      <ListItem
        key={index}
        onClick={() => selectApplicantCallback(index)}
        selected={selectedIndex === index}
      >
        <CheckboxContainer display={showMassEmailCheckboxes}>
          <CustomInput
            type="checkbox"
            id={index}
            label={bio.email}
            checked={showMassEmailCheckboxes.value}
            onChange={() => {
              selectEmails(bio.email);
            }}
          />
        </CheckboxContainer>
        <ListItemHeader>{bio.first_name + ' ' + bio.last_name}</ListItemHeader>
        <p>{bio.email}</p>
        <StatusBadge status={status} selected={selectedIndex === index} />
      </ListItem>
    ))}
  </List>
);

ApplicantList.propTypes = {
  applicants: PropTypes.array.isRequired,
  selectApplicantCallback: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number.isRequired
};

export default ApplicantList;
