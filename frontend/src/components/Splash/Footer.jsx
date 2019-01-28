import React, { Component } from 'react';
import styles from '../../styles/Home.module.css';
// import GoogleButton from 'react-google-button';
import { GoogleLogin } from 'react-google-login';
// import { Button } from 'reactstrap';

class Footer extends Component {
  onGoogleClick = _ => {
    console.log('here');
    window.location = 'localhost:3001/auth/google';
  };

  googleResponse = response => {
    console.log('google response', response);
    const tokenBlob = new Blob([JSON.stringify({ access_token: response.accessToken }, null, 2)], {
      type: 'application/json'
    });
    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default'
    };
    fetch('/auth/google', options).then(r => {
      // const token = r.headers.get('x-auth-token');
      // console.log('token', token);
      r.json().then(user => {
        // if (token) {
        console.log('woot we get here!', user);
        // this.setState({ isAuthenticated: true, user, token });
        this.props.onAuth(user);
        // }
      });
    });
  };

  loginFailed = _ => alert('Something went wrong. Please try again');

  render() {
    return (
      <div>
        <div className={styles.footerBackground}>
          <div>
            <div className={styles.footer}>
              <p>
                While we greatly need and appreciate all of the volunteer assistance we receive, we
                do not have a full-time volunteer manager on staff. Thank you in advance for
                understanding that your application may take a few weeks to get processed.
              </p>
              <p>If you have been approved, please login here with Google</p>
            </div>
          </div>
          <div>
            {/* <GoogleButton
              className={styles.googleButton}
              type="light"
              // onClick={this.props.googleClick}
              onClick={this.onGoogleClick}
              
            /> */}
            <GoogleLogin
              clientId="664357147813-mcoqj5m0cc3en7hfdgl9botpie9k4qvm.apps.googleusercontent.com"
              buttonText="Sign in with Google"
              // responseType="code"
              onSuccess={this.googleResponse}
              onFailure={this.loginFailed}
            />
          </div>
        </div>
        <div className={styles.donate}>
          <div className={styles.donateInner}>
            <p>Help Us Continue Our Life-Altering Programming</p>
          </div>
          <div className={styles.donateButtonWrapper}>
            <a
              className={styles.donateButton}
              rel="noopener noreferrer"
              target="_blank"
              href="https://secure.donationpay.org/drawchange/"
              color="success"
            >
              Donate
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
