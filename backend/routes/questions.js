// NPM Packages
const express = require('express');
const router = express.Router();

// Local Imports
const Question = require('../models/question');


router.route('/')
  .get((req, res) => {
    Question.find()
      .then(questions => res.status(200).json({ questions }))
      .catch(({ errors }) => res.status(500).json({ errors }));
  })
  .post((req, res) => {
    const { type, text, choices, answer } = req.body;
    const newQuestion = new Question({ type, text, choices, answer });
    newQuestion.save()
      .then(question => res.status(200).json({ question }))
      .catch((errors) => { res.status(500).json({ errors });});
  });

router.route('/:id')
  .get((req, res) => {
    Question.findById(req.params.id)
      .then(response => {
        response
          ? res.status(200).json({ response })
          : res.status(404).json({ Error: 'No response found with id: ${req.params.id}'});
      })
      .catch(errors => { res.status(500).json({ errors }); });
  })
  .put((req, res) => {
    const { type, text, choices, answer } = req.body;
    Question.findById(req.params.id)
      .then(response => {
        response.type = type || response.type;
        response.text = text || response.text;
        response.choices = choices || response.choices;
        response.answer = answer || response.answer;

        response.save();
        res.status(200).json({ response });
      })
      .catch(({ errors }) => res.status(500).json({ errors }));
  })
  .delete((req, res) => {
    Question.findByIdAndRemove(req.params.id)
      .then(removed => {
        removed
              ? res.status(200).json({removed})
              : res.status(404).json({Error: "No response found with id: ${req.params.id}"});
      })
      .catch(errors => { res.status(500).json({errors});});
  });

module.exports = router;