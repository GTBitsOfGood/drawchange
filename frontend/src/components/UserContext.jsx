import React from 'react';

export const UserContext = React.createContext();

const initialState = {
  authenticating: false,
  user: {},
  userRole: null
};

export class UserContextProvider extends React.Component {
  state = initialState;

  authUser = response => {
    this.setState({ authenticating: true });

    const token =
      response && response.accessToken
        ? response.accessToken
        : localStorage.getItem('access_token');

    if (token === '' || token == null) {
      this.setState(initialState);
      return;
    }

    const tokenBlob = new Blob([JSON.stringify({ access_token: token }, null, 2)], {
      type: 'application/json'
    });
    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default'
    };
    fetch('/auth/google', options)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => {
        localStorage.setItem('access_token', token);
        response.json().then(user => {
          this.setState({
            user: user,
            userRole: user ? user.role : null,
            authenticating: false
          });
        });
      })
      .catch(error => {
        localStorage.setItem('access_token', '');
        this.setState(initialState);
      });
  };

  logoutUser = () => {
    localStorage.setItem('access_token', '');
    this.setState(initialState);
    fetch('/auth/logout');
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          authUser: this.authUser,
          logoutUser: this.logoutUser
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
