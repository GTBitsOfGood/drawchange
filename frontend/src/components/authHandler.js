export default (accessToken, onAuthCallback) => {
  const tokenBlob = new Blob([JSON.stringify({ access_token: accessToken }, null, 2)], {
    type: 'application/json'
  });
  const options = {
    method: 'POST',
    body: tokenBlob,
    mode: 'cors',
    cache: 'default'
  };
  fetch('/auth/google', options).then(r => {
    localStorage.setItem('access_token', accessToken);
    r.json().then(user => onAuthCallback(user));
  });
};
