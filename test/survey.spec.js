// NPM Imports
const chaiHttp = require('chai-http');
const chai = require('chai');

// Local Imports & Config
const Survey = require('../backend/models/survey');
const Question = require('../backend/models/question');
const server = require('../server');
const should = chai.should;
chai.use(chaiHttp);

// Constants to use for testing
const QUESTION1 = new Question('question1', 'input');
const QUESTION2 = new Question('question2', 'input');
const QUESTION3 = new Question('question3', 'input');
const PROPER_FIELDS = {
  name: 'Test Survey',
  description: 'Test Survey is for testing purposes',
  questions: [QUESTION1, QUESTION2]
};

const BAD_FIELDS = {
  name: 'Test Survey',
  description: 'Test Survey is for testing purposes'
};

const UPDATE_FIELDS = {
  questions: [QUESTION3, QUESTION2]
};

let id = 'too slow';


// Starting Survey Model Testing (CRUD)
describe('Survey Model Test Suite', () => {
  describe('Create Survey...', () => {
    it('works w/ all fields', (done) => {

      const testSurvey = new Survey(PROPER_FIELDS);
      testSurvey.save(done);
    });
    it('fails w/o all fields', (done) => {
      const testSurvey = new Survey(BAD_FIELDS);
      testSurvey.save((err) => {
        should().exist(err);
        done();
      });
    });
  });
  describe('Read Survey...', () => {
    it('works when document exists', (done) => {
      Survey.findOne({name: 'Test Survey'}, done);
    });
    it('fails when document does not exist', (done) => {
      Survey.findOne({name: 'This Survey does not exist'}, (err, results) => {
        should().not.exist(err);
        should().not.exist(results);

        done();
      });
    });
  });
  describe('Update Survey...', () => {
    it('works when you pass in fields to update', (done) => {
      Survey.findOneAndUpdate({name: 'Test Survey'}, UPDATE_FIELDS, done);
    });
  });
  describe('Delete Survey', () => {
    it('works when the Survey exists already', (done) => {
      Survey.findOneAndRemove({name: 'Test Survey'}, done);
    });
  });
});

// Starting API Testing (CRUD)
describe('Survey RESTful Endpoints Test Suite', () => {
  describe('POST /api/surveys/', () => {
    it ('works when proper body sent', (done) => {
      chai.request(server)
        .post('/api/surveys/')
        .send(PROPER_FIELDS)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('survey');
          res.body.survey.should.be.a('object');
          id = res.body.survey._id;
          done();
        });
    })
    it ('fails when proper body not sent', (done) => {
      chai.request(server)
        .post('/api/surveys/')
        .send(BAD_FIELDS)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    })
  })

  describe('GET /api/surveys/', () => {
    it ('works with no body sent', (done) => {
      chai.request(server)
        .get('/api/surveys/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('surveys');
          res.body.surveys.should.be.a('array');
          done();
        });
    })


  })

  describe('GET /api/surveys/:id', () => {
    it ('works with a valid id', (done) => {
      chai.request(server)
        .get(`/api/surveys/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('survey');
          res.body.survey.should.be.a('object');
          done();
        });
    })

    it ('fails with a valid id that is not in DB', (done) => {
      chai.request(server)
        .get(`/api/surveys/59f6130e6f22a25c35d72ce9`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('errors');
          done();
        });
    })

    it ('fails with an invalid id ', (done) => {
      chai.request(server)
        .get(`/api/surveys/asdfaksdlj213lkj`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('errors');
          done();
        });
    })
  })

  describe('PUT /api/surveys/:id', () => {
    it ('works with a valid id', (done) => {
      chai.request(server)
        .put(`/api/surveys/${id}`)
        .send(UPDATE_FIELDS)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('survey');
          res.body.survey.should.be.a('object');
          done();
        });
    })

    it ('fails with an valid id that is not in DB', (done) => {
      chai.request(server)
        .put(`/api/surveys/59f6130e6f22a25c35d72ce9`)
        .send(UPDATE_FIELDS)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('errors');
          done();
        });
    })

    it ('fails with an invalid id ', (done) => {
      chai.request(server)
        .put(`/api/surveys/asdfaksdlj213lkj`)
        .send(UPDATE_FIELDS)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('errors');
          done();
        });
    })


  })

  describe('DELETE /api/surveys/:id', () => {
    it ('works with a valid id', (done) => {
      chai.request(server)
        .delete(`/api/surveys/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('removed');
          res.body.removed.should.be.a('object');
          done();
        });
    })

    it ('fails with a valid id that is not in DB', (done) => {
      chai.request(server)
        .delete(`/api/surveys/59f6130e6f22a25c35d72ce9`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('errors');
          done();
        });
    })

    it ('fails with an invalid id ', (done) => {
      chai.request(server)
        .delete(`/api/surveys/asdfaksdlj213lkj`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('errors');
          done();
        });
    })

  })
})
