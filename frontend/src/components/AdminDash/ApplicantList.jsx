import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/ApplicantList.module.css';
import RoleBadge from './RoleBadge';

const onChooseApplicant = (index) => {

};

const ApplicantList = ({ applicants }) => (
  <div className={styles['list']}>
    {applicants.map(({ name, email, role }, index) => (
      <button key={index} className={styles['list-item']}>
        <p className={styles['header']}>{name}</p>
        <p>{email}</p>
        <RoleBadge role={role} />
      </button>
    ))}
  </div>
);

ApplicantList.propTypes = {
  applicants: PropTypes.array.isRequired
};

export default ApplicantList;
