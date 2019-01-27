import React, { Component } from 'React';
import PropTypes from 'prop-types';

const ApplicantListItem = ({ name, email, role }) => (
  <p>
    {`Hi, I'm ${name}!`}
  </p>
);

ApplicationListItem.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired
};
