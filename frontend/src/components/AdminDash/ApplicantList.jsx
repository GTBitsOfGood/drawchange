import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/ApplicantList.module.css';
import RoleBadge from './RoleBadge';

const ApplicantList = ({ applicants, selectApplicantCallback, selectedIndex, children }) => (
  <div className={styles['list']}>
    {children}
    {applicants.map(({ name, email, role }, index) => (
      <button
        key={index}
        onClick={() => selectApplicantCallback(index)}
        className={`${styles['list-item']} ${selectedIndex === index ? styles['selected'] : ''}`}
      >
        <p className={styles['header']}>{name}</p>
        <p>{email}</p>
        <RoleBadge role={role} selected={selectedIndex === index} />
      </button>
    ))}
  </div>
);

ApplicantList.propTypes = {
  applicants: PropTypes.array.isRequired,
  selectApplicantCallback: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  children: PropTypes.object
};

export default ApplicantList;
