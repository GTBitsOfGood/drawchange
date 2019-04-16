import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { Header, Authenticated, Splash, UserContext } from './components';
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
  componentDidMount = () => {
    this.context.authUser();
  };

  render() {
    return (
      <Router>
        <StyleWrapper>
          <RequestProvider>
            <UserContext.Consumer>
              {({ userRole, authenticating }) => (
                <Styled.Container>
                  <Header onLogout={this.logout} loggedIn={userRole != null} role={userRole} />
                  <Styled.Content>
                    {userRole !== 'admin' && userRole !== 'volunteer' && <Redirect to="/" />}
                    {userRole && <Authenticated />}
                    {!userRole && !authenticating && <Splash />}
                    {/* otherwise, we're authenticating, so just don't show a component yet */}
                  </Styled.Content>
                </Styled.Container>
              )}
            </UserContext.Consumer>
          </RequestProvider>
        </StyleWrapper>
      </Router>
    );
  }
}

App.contextType = UserContext;

export default App;
