import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import styles from '../src/styles/App.module.css';
import styled from 'styled-components';

import { Header, Authenticated, Splash } from './components';
import { StyleWrapper } from './components/styled';

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
    overflow: hidden;
  `
};

class App extends Component {
  state = { user: { role: 'admin' } };
  componentWillMount(props) {
    // check url for user id
  }

  fakeAuth = _ => this.setState({ user: { role: null } });

  render() {
    return (
      <BrowserRouter>
        <StyleWrapper>
          <Styled.Container>
            <Header />
            <Styled.Content>
              {this.state.user ? (
                <Authenticated user={this.state.user} />
              ) : (
                <Splash onAuth={this.fakeAuth} />
              )}
            </Styled.Content>
          </Styled.Container>
        </StyleWrapper>
      </BrowserRouter>
    );
  }
}

export default App;
