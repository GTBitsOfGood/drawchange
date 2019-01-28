import React, { Component } from 'react';
import styles from '../../styles/AdminDash.module.css';
import ApplicantList from './ApplicantList';
import ApplicantInfo from './AppInfo';
import { Button, Input } from 'reactstrap';
import Filters from './Filters';

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
  constructor() {
    super();
    this.state = {
      selectedApplicantIndex: 0,
      showFilterModal: false
    };
    this.onSelectApplicant = this.onSelectApplicant.bind(this);
    this.onShowFilterModal = this.onShowFilterModal.bind(this);
  }
  onSelectApplicant(index) {
    this.setState({
      selectedApplicantIndex: index
    });
  }
  onShowFilterModal() {
    this.setState({
      showFilterModal: !this.state.showFilterModal
    });
  }
  render() {
    const { selectedApplicantIndex, showFilterModal } = this.state;
    return (
      <div className={styles.container}>
        <h1 style={{ fontSize: '1.4em', padding: '1rem 2rem' }}>Admin Dashboard</h1>
        <div className={styles.main}>
          <ApplicantList
            applicants={dummyUsers}
            selectApplicantCallback={this.onSelectApplicant}
            selectedIndex={selectedApplicantIndex}
          >
            <div class={styles['filter-container']}>
              <Input placeholder="Search by content" />
              <Button onClick={this.onShowFilterModal}>Filter</Button>
            </div>
          </ApplicantList>
          <div className={styles['applicant-info-container']}>
            <ApplicantInfo {...dummyUsers[selectedApplicantIndex]} />
          </div>
        </div>
        <Filters show={showFilterModal} toggleCallback={this.onShowFilterModal} />
      </div>
    );
  }
}
