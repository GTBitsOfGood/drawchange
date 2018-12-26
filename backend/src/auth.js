// npm imports
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Local imports
const UserCreds = require('./models/userCreds');

// Global variables
const PORT_URL_COMPONENT = `:${process.env.PORT || 3000}`;
const AUTH_CALLBACK_URL = `${process.env.BASE_URL}${PORT_URL_COMPONENT}/auth/google/callback`;

/**
 * Initializes passport and authentication-related endpoints for the entire express application.
 */
function initAuth(app) {

  // Middleware to use passport
  app.use(passport.initialize());
  app.use(passport.session());

  // For saving user creds in cookie
  passport.serializeUser((userCreds, done) => {
    return done(null, userCreds.id);
  });

  // For retrieving user creds object from cookie
  passport.deserializeUser((userCredsIdString, done) => {
    const userCredsId = mongoose.Types.ObjectId(userCredsIdString);
    UserCreds.findById(userCredsId, (err, userCreds) => {
      return done(err, userCreds);
    });
  });

  // Google Auth config via passport
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: AUTH_CALLBACK_URL
    },
    (accessToken, refreshToken, profile, done) => {
      UserCreds.findOne({ googleId: profile.id })
        .then(userCreds => {
          if (userCreds) {
            // User credentials were found, first update access and refresh tokens
            userCreds.accessToken = accessToken;
            userCreds.refreshToken = refreshToken;
            return userCreds.save();
          }

          // First time login, create the UserCreds document
          const newUserCreds = new UserCreds({
            googleId: profile.id,
            accessToken,
            refreshToken,
            userDataId: null  // User does not have any data in the system yet
          });
          return newUserCreds.save();
        })
        .then(savedUserCreds => {
          // Return updated user creds
          done(null, savedUserCreds);
        })
        .catch(err => {
          done(err);
        });
    }
  ));

  // User must visit this endpoint in their web browser to authenticate with google
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
  );

  // User will be redirected to here after authentication via Google
  app.get('/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/loginRedirect?userId=error' // Occurs if user denies google auth, etc.
    }),
    (req, res) => {
      // Authentication successful, redirect to correct page based on linked user data
      if (req.user.userDataId) {
        // User creds have linked user data
        return res.redirect(`/loginRedirect?userId=${req.user.userDataId}`);
      } else {
        // First time user, no linked user data
        return res.redirect('/loginRedirect?userId=null');
      }
    }
  );

  // Logout Route
  app.get('/auth/logout', (req, res, next) => {
    req.logout();
    req.session.destroy(err => {
      if (err) {
        return next(err);
      }
      res.clearCookie('connect.sid', {path: '/'});
      res.redirect('/');
    });
  });

}

module.exports = {
  initAuth,
  /**
   * Express middleware to check if current user is authenticated.
   */
  isAuthenticated: (req, res, next) => {
    return req.user ? next() : res.status(401).json({
      error: 'User not authenticated (must sign in)'
    });
  }
};
