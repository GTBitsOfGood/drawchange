// NPM Packages
const express = require('express');
const { check, oneOf, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const router = express.Router();

// Local Imports
const Event = require('../models/event');
const User = require('../models/user');


router.route('/')
  .get((req, res) => {
    if (req.query.type === 'new') {
      Event.find().sort({createdAt : -1}).limit(5)
        .then(events => res.status(200).json({ events }))
        .catch(({ errors }) => res.status(500).json({ errors }));
    } else {
      Event.find().sort({date : -1})
        .then(events => res.status(200).json({ events }))
        .catch(({ errors }) => res.status(500).json({ errors }));
    }
  })
  .post([ // TODO Add validations for voluntters Array
    check('name').isAscii().trim().escape(),
    check('date').exists(),
    check('location').isAscii().trim().escape(),
    check('description').isAscii().trim().escape(),
    check('contact').isAscii().trim().escape(),
    check('max_volunteers').isNumeric(),
    check('link').isAscii().trim().escape(),
    check('additional_background_check').isAscii().trim().escape()
    // check('volunteers').custom(value => {
    //   if ()
    // })
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.mapped());
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
  .put([check('id').isMongoId()], oneOf([ // TODO Add validations for voluntters Array
    check('name').isAscii().trim().escape(),
    check('date').exists(),
    check('location').isAscii().trim().escape(),
    check('description').isAscii().trim().escape(),
    check('contact').isAscii().trim().escape(),
    check('max_volunteers').isNumeric(),
    check('volunteers').exists(),
    // check('volunteers').custom(value => {
    //   if ()
    // })
  ]), (req, res, query) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.mapped());
      return res.status(400).json({ errors: errors.mapped() });
    }
    const eventData = matchedData(req);
    eventData.volunteers = req.body.volunteers; // should be removed when volunteer validation is added

    Event.findById(req.params.id)
      .then(event => {
        // if (!event) {
        //   return res.status(404).json({ errors: `No event found with id: ${req.params.id}`});
        // }
        // if (req.query.action) {
        //   if (req.query.action === 'appendVolunteers') {
        //     eventData.volunteers.push(req.body.volunteerId);
        //   } else if (req.query.action === 'removeVolunteers') {
        //     eventData.volunteers.splice(eventData.volunteers.indexOf(req.body.volunteerId), 1);
        //   }
        // }


        if (!event) {
          return res.status(404).json({ errors: `No event found with id: ${req.params.id}`});
        } else if (req.query.action === "appendVolunteers") {
          eventData.volunteers.forEach(volunteerId => event.volunteers.push(volunteerId));
          eventData.events = undefined;
        } else if (req.query.action === "removeVolunteers") {
          eventData.volunteers.forEach(volunteerId =>
            event.volunteers.splice(event.volunteers.indexOf(volunteerId), 1)
          );
          eventData.volunteers = undefined;
        }
        for (const key in event) {
          event[key] = eventData[key] !== undefined ? eventData[key] : event[key];
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
