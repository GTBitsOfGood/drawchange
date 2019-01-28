import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/RoleBadge.module.css';

const RoleBadge = ({ role, selected }) => (
  <span
    className={`${styles['badge']}
    ${role === 'Pending' ? styles['badge--pending'] : styles['badge--approved']}
    ${selected ? styles['badge--selected'] : ''}
    `}
  >
    {role}
  </span>
);

RoleBadge.propTypes = {
  role: PropTypes.string.isRequired
};

export default RoleBadge;
