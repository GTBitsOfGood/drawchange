import React, { Component } from 'react';
import styles from '../../styles/Home.module.css';
import GoogleButton from 'react-google-button';
// import { Button } from 'reactstrap';

class Footer extends Component {
  render() {
    return (
    <div>
      <div className={styles.footerBackground}>
        <div className ={styles.test}>
            <div className={styles.footer}>
                <p>While we greatly need and appreciate all of the volunteer assistance we receive, we do not have a full-time volunteer manager on staff. Thank you in advance for understanding that your application may take a few weeks to get processed.</p>
                <p>If you have been approved, please login here with Google</p>
            </div>
        </div>
        <div>
          <GoogleButton className={styles.googleButton} type="light" onClick={() => { console.log('Google button clicked') }}/>
        </div>
      </div>
      <div className={styles.donate}>
        <div className={styles.donateInner}>
          <p>
            Help Us Continue Our Life-Altering Programming
          </p>
        </div>
        <div className={styles.donateButtonWrapper}>
          <a className={styles.donateButton} rel="noopener noreferrer" target="_blank" href="https://secure.donationpay.org/drawchange/"color="success">Donate</a>
        </div>
      </div>
    </div>
    );
  }
}

export default Footer;
