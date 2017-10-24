// NPM Packages
const express = require('express');
const router = express.Router();

// Local Imports
const Event = require('../models/event');


router.route('/')
  .get((req, res) => {
      // query params need to be added
      // if (req.query.user) {
      //     Event.find({ responder: req.query.user})
      //     .then(events => {
      //         events
      //       ? res.status(200).json({events})
      //       : res.status(404).json({Error: `No events for user id: ${req.query.user}`});
      //     })
      //   .catch(error => res.status(500).json(error));
      // } else {
    Event.find()
      .then(events => res.status(200).json({ events }))
      .catch(({ errors }) => res.status(500).json({ errors }));
      // }
  });
  // .post((req, res) => {
  //   const { responder, answers, surveyId } = req.body;
  //   const newEvent = new event({responder, answers, survey: surveyId});
  //   newEvent.save()
  //     .then(event => res.status(200).json({ event }))
  //     .catch((errors) => {
  //       res.status(500).json({ errors });
  //     });
  // });


// router.route('/:eventId')
//   .get((req, res) => {
//     Response.findById(req.params.responseId)
//       .then(response => {
//         response
//           ? res.status(200).json({response})
//           : res.status(404).json({Error: `No response found with id: ${req.params.responseId}`});
//       })
//       .catch(({errors}) => res.status(500).json({errors}));
//   })
//   .put((req, res) => {
//     Response.findByIdAndUpdate(req.params.responseId, {$set: req.body}, {new: true})
//     .then(response => {
//       response
//         ? res.status(200).json({response})
//         : res.status(404).json({Error: `No response Found with id: ${req.params.responseId}`});
//     })
//     .catch(({errors}) => res.status(500).json({errors}));
//   })
//   .delete((req, res) => {
//     Response.findByIdAndRemove(req.params.responseId)
//     .then(removed => {
//       removed
//         ? res.status(200).json({removed})
//         : res.status(404).json({Error: `No response Found with id: ${req.params.responseId}`});
//     })
//     .catch(({errors}) => res.status(500).json({errors}));
//   });

module.exports = router;