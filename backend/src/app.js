const path = require('path');
const logger = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);

const api = require('./routes');
const app = express();

// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI,
  err => {
    if (err) throw err;
    console.log('Conected to MongoDB');
  }
);
mongoose.Promise = global.Promise;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: true,
    saveUninitialized: false
  })
);

app.use(express.static(path.join(__dirname, 'public')));

// Route API Calls to seperate router
app.use('/api', api);

// Render React page
app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); // For React/Redux
});

module.exports = app;
