import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

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
  state = { isAuthenticated: true, user: { role: 'admin' }, token: '' };

  fakeAuth = _ => this.setState({ user: { role: null } });

  logout = e => {
    e.preventDefault();
    this.setState({ isAuthenticated: false, user: null });
    axios.get('/auth/logout');
  };
  auth = user => {
    this.setState({ isAuthenticated: true, user });
  };

  render() {
    return (
      <BrowserRouter>
        <StyleWrapper>
          <RequestProvider>
            <Styled.Container>
              <Header onLogout={this.logout} loggedIn={this.state.isAuthenticated} />
              <Styled.Content>
                {this.state.user ? (
                  <Authenticated user={this.state.user} />
                ) : (
                  <Splash onAuth={this.fakeAuth} />
                )}
              </Styled.Content>
            </Styled.Container>
          </RequestProvider>
        </StyleWrapper>
      </BrowserRouter>
    );
  }
}

export default App;
