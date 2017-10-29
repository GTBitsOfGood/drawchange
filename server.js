// NPM Imports
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const app = express();

// Local Imports & Constants
require('dotenv').config(); // load env vars
const PORT = process.env.PORT || 3000;
const api = require('./backend/routes');

<<<<<<< HEAD
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');
=======

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });
mongoose.Promise = global.Promise;
>>>>>>> models

app.use(express.static(path.join(__dirname, 'public')));


// Route API Calls to seperate router
app.use('/api', api);

// Render React page
app.get('/*', (request, response) => {
  response.sendFile(__dirname + '/public/index.html'); // For React/Redux
});

app.listen(PORT, error => {
  error
    ? console.error(error)
    : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});

<<<<<<< HEAD
// Connection URL
var url = 'dummy url';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to MongoDB!!");
    db.close();
});
=======

module.exports = app;
>>>>>>> models
