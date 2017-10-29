// NPM Packages
const express = require('express');
const router = express.Router();

// Local Imports
const Response = require('../models/response');


router.route('/')
  .get((req, res) => {
    Response.find()
      .then(responses => res.status(200).json({ responses }))
      .catch(({ errors }) => res.status(500).json({ errors }));
  })
  .post((req, res) => {
    const { survey_id, user_id, answers } = req.body;
    const newResponse = new Response({ survey_id, user_id, answers });
    newResponse.save()
      .then(result => res.status(200).json({ response: result }))
      .catch((errors) => { res.status(500).json({ errors });});
  });

router.route('/:id')
  .get((req, res) => {
    Response.findById(req.params.id)
      .then(result => {
        result
          ? res.status(200).json({ response: result })
          : res.status(404).json({ Error: 'No response found with id: ${req.params.id}'});
      })
      .catch(errors => { res.status(500).json({ errors }); });
  })
  .put((req, res) => {
    const { survey_id, user_id, answers } = req.body;
    Response.findById(req.params.id)
      .then(result => {
        result.survey_id = survey_id || result.survey_id;
        result.user_id = user_id || result.user_id;
        result.answers = answers || result.answers;

        result.save();
        res.status(200).json({ response: result });
      })
      .catch(({ errors }) => res.status(500).json({ errors }));
  })
  .delete((req, res) => {
    Response.findByIdAndRemove(req.params.id)
      .then(removed => {
        removed
              ? res.status(200).json({removed})
              : res.status(404).json({Error: "No response found with id: ${req.params.id}"});
      })
      .catch(errors => { res.status(500).json({errors});});
  });

module.exports = router;