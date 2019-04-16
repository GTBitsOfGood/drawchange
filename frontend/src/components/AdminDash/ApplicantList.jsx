import React from 'react';
import PropTypes from 'prop-types';
import StatusBadge from './StatusBadge';
import styled from 'styled-components';
import { CustomInput } from 'reactstrap';

const List = styled.div`
  padding-top: 2rem;
  max-width: 19.8em;
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
  display: flex;
  position: relative;

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
  padding-right: 0.5rem;
  display: ${props => (props.display ? 'initial' : 'none')};
`;

const ApplicantList = ({
  applicants,
  selectApplicantCallback,
  selectedIndex,
  children,
  showMassEmailCheckboxes,
  checkedEmails,
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
            checked={checkedEmails.includes(bio.email)}
            onChange={() => {
              selectEmails(bio.email);
            }}
          />
        </CheckboxContainer>
        <div>
          <ListItemHeader>{bio.first_name + ' ' + bio.last_name}</ListItemHeader>
          <p>{bio.email}</p>
          <StatusBadge status={status} selected={selectedIndex === index} />
        </div>
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
