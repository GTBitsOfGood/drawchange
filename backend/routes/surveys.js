// NPM Packages
const express = require('express');
const { check, oneOf, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const router = express.Router();

// Local Imports
const Survey = require('../models/survey');


router.route('/')
  .get((req, res) => {
    Survey.find()
      .then(surveys => res.status(200).json({ surveys }))
      .catch(errors => res.status(500).json({ errors }));
  })
  .post([ //TODO Add validations for voluntters Array
    check('name').isAscii().trim().escape(),
    check('description').isAscii().trim().escape(),
    check('questions').exists()
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    const surveyData = matchedData(req);
    surveyData.responses = req.body.responses;
    const newSurvey = new Survey(surveyData);
    newSurvey.save()
      .then(survey => res.status(200).json({ survey }))
      .catch(errors=> es.status(500).json({ errors }));
  });

router.route('/:id')
  .get([ check('id').isMongoId() ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    Survey.findById(req.params.id)
      .then(survey => {
        survey
          ? res.status(200).json({ survey })
          : res.status(404).json({ errors: `No Survey found with id: ${req.params.id}`});
      })
      .catch(errors => res.status(500).json({ errors }));
  })
  .put([check('id').isMongoId()], oneOf([ //TODO Add validations for voluntters Array
    check('name').isAscii().trim().escape(),
    check('description').isAscii().trim().escape(),
    check('questions').exists()
  ]), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    const surveyData = matchedData(req);
    surveyData.responses = req.body.responses;
    Survey.findById(req.params.id)
      .then(survey => {

        if (!survey) {
          return res.status(404).json({ errors: `No Survey found with id: ${req.params.id}`});
        }

        for (let key in survey) {
          survey[key] = surveyData[key] !== undefined ? surveyData[key] : survey[key]
        }
        survey.save();
        return res.status(200).json({ survey });
      })
      .catch(errors  => res.status(500).json({ errors }));
  })
  .delete([ check('id').isMongoId() ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    Survey.findByIdAndRemove(req.params.id)
      .then(removed => {
        removed
              ? res.status(200).json({ removed })
              : res.status(404).json({ errors: `No Survey found with id: ${req.params.id}` });
      })
      .catch(errors => { res.status(500).json({ errors });});
  });

module.exports = router;