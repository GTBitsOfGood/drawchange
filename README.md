# drawchange Volunteer & Event Managemnt System
[![Known Vulnerabilities](https://snyk.io/test/github/gtbitsofgood/drawchange/badge.svg)](https://snyk.io/test/github/gtbitsofgood/drawchange)

## Overview

This portal is meant to be used by Atlanta nonprofit drawchange to manage their volunteers and events. New volunteers will register an account, be vetted by an administrator, then sign up for volunteer events through this portal.



## Running

Install dependencies: `$ npm install` or `$ yarn`

Fire up a development server: `$ npm run dev`

Once the server is running, you can visit `http://localhost:3000/`

## File layout

- **Frontend React**
    - The top level application Container is in `frontend/containers/AppContainer.js`
    - CSS styles are in `frontend/assets/stylesheets/base.scss`
- **Backend Express**
    - Entry point is `server.js`
    - API routes are under `backend/routes.js`
    - API routes are served under `http://localhost:3000/api`

## Production Build

To build your production assets and run the server:

```
$ npm start
```

## Deploying to Heroku

This app is set up for deployment to Heroku!

_This assumes you have already have a Heroku account and have the
[Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed_

```
$ heroku login
$ heroku create -a name-of-your-app
$ git push heroku master
$ heroku open
```

Heroku will follow the `build` command in your `package.json` and compile assets with `webpack.prod.config.js`. It runs the Express web server in `server.js`.

If you're unfamiliar with Heroku deployment (or just need a refresher), they have a really great walkthrough [here](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction).

## Running on Glitch

1. Go to https://glitch.com/edit/#!/horizons-hackathon-react and click
  `Remix this 🎤`
1. Click `Show` at the top to preview your app!
