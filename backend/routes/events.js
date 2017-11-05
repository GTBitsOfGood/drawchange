// NPM Packages
const express = require('express');
const { check, oneOf, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const router = express.Router();

// Local Imports
const Event = require('../models/event');


router.route('/')
  .get((req, res) => {
    Event.find()
      .then(events => res.status(200).json({ events }))
      .catch(({ errors }) => res.status(500).json({ errors }));
  })
  .post([ //TODO Add validations for voluntters Array
    check('name').isAscii().trim().escape(),
    check('date').exists(),
    check('location').isAscii().trim().escape(),
    check('description').isAscii().trim().escape(),
    check('contact').isAscii().trim().escape(),
    check('max_volunteers').isNumeric(),
    // check('volunteers').custom(value => {
    //   if ()
    // })
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    const eventData = matchedData(req);
    eventData.volunteers = req.body.volunteers; // should be removed when volunteer validation is added
    const newEvent = new Event(eventData);
    newEvent.save()
      .then(event => res.status(200).json({ event }))
      .catch(errors => res.status(500).json({ errors }));
  });

router.route('/:id')
  .get([ check('id').isMongoId() ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    Event.findById(req.params.id)
      .then(event => {
        event
          ? res.status(200).json({ event })
          : res.status(404).json({ errors: `No response found with id: ${req.params.id}`});
      })
      .catch(errors => { res.status(500).json({ errors }); });
  })
  .put([check('id').isMongoId()], oneOf([ //TODO Add validations for voluntters Array
    check('name').isAscii().trim().escape(),
    check('date').exists(),
    check('location').isAscii().trim().escape(),
    check('description').isAscii().trim().escape(),
    check('contact').isAscii().trim().escape(),
    check('max_volunteers').isNumeric(),
    // check('volunteers').custom(value => {
    //   if ()
    // })
  ]), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    const eventData = matchedData(req);
    eventData.volunteers = req.body.volunteers; // should be removed when volunteer validation is added

    Event.findById(req.params.id)
      .then(event => {
        if (!event) {
          return res.status(404).json({ errors: `No event found with id: ${req.params.id}`});
        }

        for (let key in event) {
          event[key] = eventData[key] !== undefined ? eventData[key] : event[key]
        }
        event.save();
        return res.status(200).json({ event });
      })
      .catch(( errors ) => res.status(500).json({ errors }) );
  })
  .delete([check('id').isMongoId()], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    Event.findByIdAndRemove(req.params.id)
      .then(removed => {
        removed
              ? res.status(200).json({ removed })
              : res.status(404).json({ errors: `No response found with id: ${req.params.id}`});
      })
      .catch(errors => { res.status(500).json({ errors });});
  });

module.exports = router;