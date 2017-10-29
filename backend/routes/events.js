// NPM Packages
const express = require('express');
const router = express.Router();

// Local Imports
const Event = require('../models/event');


router.route('/')
  .get((req, res) => {
    Event.find()
      .then(events => res.status(200).json({ events }))
      .catch(({ errors }) => res.status(500).json({ errors }));
  })
  .post((req, res) => {
    const { name, date, location, description, contact, volunteers } = req.body;
    const newEvent = new Event({ name, date, location, description, contact, volunteers });
    newEvent.save()
      .then(event => res.status(200).json({ event }))
      .catch((errors) => { res.status(500).json({ errors });});
  });

router.route('/:id')
  .get((req, res) => {
    Event.findById(req.params.id)
      .then(response => {
        response
          ? res.status(200).json({ response })
          : res.status(404).json({Error: 'No response found with id: ${req.params.id}'});
      })
      .catch(errors => { res.status(500).json({ errors }); });
  })
  .put((req, res) => {
    const { name, date, location, description, contact, volunteers } = req.body;
    Event.findById(req.params.id)
      .then(response => {
        response.name = name || response.name;
        response.date = date || response.date;
        response.location = location || response.location;
        response.description = description || response.description;
        response.contact = contact || response.contact;
        response.volunteers = volunteers || response.volunteers;
        response.save();
        res.status(200).json({ response });
      })
      .catch(({ errors }) => res.status(500).json({ errors }));
  })
  .delete((req, res) => {
    Event.findByIdAndRemove(req.params.id)
      .then(removed => {
        removed
              ? res.status(200).json({removed})
              : res.status(404).json({Error: "No response found with id: ${req.params.id}"});
      })
      .catch(errors => { res.status(500).json({errors});});
  });

module.exports = router;