import React, { Component } from 'react';
import styles from '../../styles/AdminDash.module.css';
import ApplicantList from './ApplicantList';

const dummyUsers = [
  {
    name: 'John Adams',
    email: 'jadams76@foundingfathers.gov',
    role: 'Volunteer'
  },
  {
    name: 'Henry Clay',
    email: 'greatcompromiser@unelectable.edu',
    role: 'Volunteer'
  },
  {
    name: 'Benjamin Franklin',
    email: 'tobefrankwithyou@unsungheros.net',
    role: 'Volunteer'
  },
  {
    name: 'Alexander Hamilton',
    email: 'bigbanks@dieyoung.com',
    role: 'Volunteer'
  },
  {
    name: 'James K. Polk',
    email: 'napoleonofthestump@forgotten.gov',
    role: 'Pending'
  },
  {
    name: 'John Adams',
    email: 'jadams76@foundingfathers.gov',
    role: 'Volunteer'
  },
  {
    name: 'Henry Clay',
    email: 'greatcompromiser@unelectable.edu',
    role: 'Volunteer'
  },
  {
    name: 'Benjamin Franklin',
    email: 'tobefrankwithyou@unsungheros.net',
    role: 'Volunteer'
  },
  {
    name: 'Alexander Hamilton',
    email: 'bigbanks@dieyoung.com',
    role: 'Volunteer'
  },
  {
    name: 'James K. Polk',
    email: 'napoleonofthestump@forgotten.gov',
    role: 'Pending'
  },
  {
    name: 'John Adams',
    email: 'jadams76@foundingfathers.gov',
    role: 'Volunteer'
  },
  {
    name: 'Henry Clay',
    email: 'greatcompromiser@unelectable.edu',
    role: 'Volunteer'
  },
  {
    name: 'Benjamin Franklin',
    email: 'tobefrankwithyou@unsungheros.net',
    role: 'Volunteer'
  },
  {
    name: 'Alexander Hamilton',
    email: 'bigbanks@dieyoung.com',
    role: 'Volunteer'
  },
  {
    name: 'James K. Polk',
    email: 'napoleonofthestump@forgotten.gov',
    role: 'Pending'
  }
];

export default class AdminDash extends Component {
  render() {
    return (
      <div class={styles.container}>
        <h1 style={{ fontSize: '1.4em', padding: '1rem 2rem' }}>Admin Dashboard</h1>
        <div class={styles.main}>
          <ApplicantList applicants={dummyUsers} />
          <div className={styles["applicant-info-container"]}>
          </div>
        </div>
      </div>
    );
  }
}
