// NPM Packages
const express = require('express');
const router = express.Router();

// Local Imports
const Survey = require('../models/survey');


router.route('/')
  .get((req, res) => {
    Survey.find()
      .then(surveys => res.status(200).json({ surveys }))
      .catch(({ errors }) => res.status(500).json({ errors }));
  })
  .post((req, res) => {
    const { name, description, questions, responses } = req.body;
    const newSurvey = new Survey({ name, description, questions, responses });
    newSurvey.save()
      .then(survey => res.status(200).json({ survey }))
      .catch((errors) => { res.status(500).json({ errors });});
  });

router.route('/:id')
  .get((req, res) => {
    Survey.findById(req.params.id)
      .then(response => {
        response
          ? res.status(200).json({ response })
          : res.status(404).json({ Error: 'No Survey found with id: ${req.params.id}'});
      })
      .catch(errors => { res.status(500).json({ errors }); });
  })
  .put((req, res) => {
    const { name, description, questions, responses } = req.body;
    Survey.findById(req.params.id)
      .then(response => {
        response.name = name || response.name;
        response.description = description || response.description;
        response.questions = questions || response.questions;
        response.responses = responses || response.responses;

        response.save();
        res.status(200).json({ response });
      })
      .catch(({ errors }) => res.status(500).json({ errors }));
  })
  .delete((req, res) => {
    Survey.findByIdAndRemove(req.params.id)
      .then(removed => {
        removed
              ? res.status(200).json({removed})
              : res.status(404).json({Error: "No Survey found with id: ${req.params.id}"});
      })
      .catch(errors => { res.status(500).json({errors});});
  });

module.exports = router;