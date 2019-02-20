import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/ApplicantList.module.css';
import RoleBadge from './RoleBadge';

const ApplicantList = ({ applicants, selectApplicantCallback, selectedIndex, children }) => (
  <div className={styles['list']}>
    {children}
    {(applicants || []).map(({ bio, status }, index) => (
      <button
        key={index}
        onClick={() => selectApplicantCallback(index)}
        className={`${styles['list-item']} ${selectedIndex === index ? styles['selected'] : ''}`}
      >
        <p className={styles['header']}>{bio.first_name + ' ' + bio.last_name}</p>
        <p>{bio.email}</p>
        <RoleBadge
          status={status[0].toUpperCase() + status.slice(1)}
          selected={selectedIndex === index}
        />
      </button>
    ))}
  </div>
);
//make function based on Filters.jsx
//call inside status= (pass what func returns as prop)
//pass result to rolebadge

ApplicantList.propTypes = {
  applicants: PropTypes.array.isRequired,
  selectApplicantCallback: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  children: PropTypes.object
};

export default ApplicantList;
