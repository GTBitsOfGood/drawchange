import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import authHandler from './components/authHandler';

import { Header, Authenticated, Splash } from './components';
import { StyleWrapper, RequestProvider } from './components/Shared';

const Styled = {
  Container: styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  `,
  Content: styled.main`
    flex: 1;
    overflow-y: scroll;
  `
};

class App extends Component {
  state = { isAuthenticated: false, user: { role: null }, token: '' };

  fakeAuth = _ => this.setState({ user: { role: null } });

  logout = e => {
    e.preventDefault();
    this.setState({ isAuthenticated: false, user: null });
    axios.get('/auth/logout');
  };
  auth = user => {
    this.setState({ isAuthenticated: true, user });
  };
  componentDidMount = () => {
    const token = localStorage.getItem('access_token') || null;
    authHandler(token, this.auth);
  };

  render() {
    const { isAuthenticated, user } = this.state;
    return (
      <Router>
        <StyleWrapper>
          <RequestProvider>
            <Styled.Container>
              <Header
                onLogout={this.logout}
                loggedIn={isAuthenticated}
                role={user ? user.role : null}
              />
              <Styled.Content>
                {user && user.role ? <Authenticated user={user} /> : <Splash onAuth={this.auth} />}
              </Styled.Content>
            </Styled.Container>
          </RequestProvider>
        </StyleWrapper>
      </Router>
    );
  }
}

export default App;
