// NPM Packages
const express = require('express');
const { check, oneOf, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const router = express.Router();

// Local Imports
const Response = require('../models/response');


router.route('/')
  .get((req, res) => {
    Response.find()
      .then(responses => res.status(200).json({ responses }))
      .catch(({ errors }) => res.status(500).json({ errors }));
  })
  .post([ //TODO Add better validation for answers Array
    check('survey_id').isMongoId(),
    check('user_id').isMongoId(),
    check('answers').exists()
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    const responseData = matchedData(req);
    const newResponse = new Response(responseData);
    newResponse.save()
      .then(response => res.status(200).json({ response }))
      .catch(errors => res.status(500).json({ errors }));
  });

router.route('/:id')
  .get([ check('id').isMongoId() ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    Response.findById(req.params.id)
      .then(result => {
        result
          ? res.status(200).json({ response: result })
          : res.status(404).json({ errors: `No response found with id: ${req.params.id}`});
      })
      .catch(errors => { res.status(500).json({ errors }); });
  })
  .put([check('id').isMongoId()], oneOf([ //TODO Add validations for voluntters Array
    check('survey_id').isMongoId(),
    check('user_id').isMongoId(),
    check('answers').exists()
  ]), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    const responseData = matchedData(req);
    Response.findById(req.params.id)
      .then(response => {
        if (!response) {
          return res.status(404).json({ errors: `No response found with id: ${req.params.id}`});
        }

        for (let key in response) {
          response[key] = responseData[key] !== undefined ? responseData[key] : response[key]
        }


        response.save();
        return res.status(200).json({ response });
      })
      .catch( errors  => res.status(500).json({ errors }));
  })
  .delete([ check('id').isMongoId() ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    Response.findByIdAndRemove(req.params.id)
      .then(removed => {
        removed
              ? res.status(200).json({ removed })
              : res.status(404).json({ errors: `No response found with id: ${req.params.id}` });
      })
      .catch(errors => { res.status(500).json({errors});});
  });

module.exports = router;