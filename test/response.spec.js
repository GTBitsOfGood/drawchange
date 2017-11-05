// NPM Imports
const chaiHttp = require('chai-http');
const chai = require('chai');

// Local Imports & Config
const Response = require('../backend/models/response');
const Question = require('../backend/models/question');
const Survey = require('../backend/models/survey');
const User = require('../backend/models/user');
const server = require('../server');
const should = chai.should;
chai.use(chaiHttp);


// Constants to use for testing
const QUESTION1 = new Question('question1', 'input');
const QUESTION2 = new Question('question2', 'input');
const QUESTION3 = new Question('question3', 'input');
const USER = new User({
  first_name: 'Georgie',
  last_name: 'Burdell',
  password: 'testpass',
  email: 'gburdell3@gatech.edu',
  street_address: '123 Cherry Lane',
  city: 'Atlanta',
  state: 'Georgia',
  zip_code: '30332',
  phone_number: '1231231234',
  date_of_birth: new Date('1/01/1990')
});
const SURVEY = new Survey({
  name: 'Test Survey',
  description: 'Test Survey is for testing purposes',
  questions: [QUESTION1, QUESTION2]
});
const PROPER_FIELDS = {
  survey_id: '',
  user_id: '',
  answers: [QUESTION1, QUESTION2]
};
const BAD_FIELDS = {
  survey_id: '',
  user_id: ''
};

const UPDATE_FIELDS = {
  answers: [QUESTION3, QUESTION2]
};

let id = 'too slow';

// Response Model Testing (CRUD)
describe('Response Model Test Suite', () => {
  describe('Create Response...', () => {
    before( () => {
      return new Promise((resolve, reject) => {
        const createUser = USER.save();
        const createSurvey = SURVEY.save();
        Promise.all([createUser, createSurvey])
          .then(([user, survey]) => {
            PROPER_FIELDS.user_id = user._id;
            BAD_FIELDS.user_id = user._id;
            PROPER_FIELDS.survey_id = survey._id;
            BAD_FIELDS.survey_id = survey._id;
            resolve();
          })
          .catch(reject)
      })
    });
    it('works w/ all fields', (done) => {

      const testResponse = new Response(PROPER_FIELDS);
      testResponse.save(done);
    });
    it('fails w/o all fields', (done) => {
      const testResponse = new Response(BAD_FIELDS);
      testResponse.save((err) => {
        should().exist(err);
        done();
      });
    });
  });
  describe('Read Response...', () => {

    it('works when document exists', (done) => {
      Response.findOne({name: 'Bits of Good Kickoff'}, done);
    });
    it('fails when document does not exist', (done) => {
      Response.findOne({name: 'This response does not exist'}, (err, results) => {
        should().not.exist(err);
        should().not.exist(results);

        done();
      });
    });
  });
  describe('Update Response...', () => {
    it('works when you pass in fields to update', (done) => {
      Response.findOneAndUpdate({name: 'Bits of Good Kickoff'}, UPDATE_FIELDS, done);
    });
  });
  describe('Delete Response', () => {
    it('works when the Response exists already', (done) => {
      Response.findOneAndRemove({name: 'Bits of Good Kickoff'}, done);
    });
  });
});

// trick server into thinking we are logged in...
server.request.user = true;


// API Testing (CRUD)
describe('Response RESTful Endpoints Test Suite', () => {
  describe('POST /api/responses/', () => {
    it ('works when proper body sent', (done) => {
      chai.request(server)
        .post('/api/responses/')
        .send(PROPER_FIELDS)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('response');
          res.body.response.should.be.a('object');
          id = res.body.response._id;
          done();
        });
    })
    it ('fails when proper body not sent', (done) => {
      chai.request(server)
        .post('/api/responses/')
        .send(BAD_FIELDS)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    })
  })

  describe('GET /api/responses/', () => {
    it ('works with no body sent', (done) => {
      chai.request(server)
        .get('/api/responses/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('responses');
          res.body.responses.should.be.a('array');
          done();
        });
    })


  })

  describe('GET /api/responses/:id', () => {
    it ('works with a valid id', (done) => {
      chai.request(server)
        .get(`/api/responses/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('response');
          res.body.response.should.be.a('object');
          done();
        });
    })

    it ('fails with a valid id that is not in DB', (done) => {
      chai.request(server)
        .get(`/api/responses/59f6130e6f22a25c35d72ce9`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('errors');
          done();
        });
    })

    it ('fails with an invalid id ', (done) => {
      chai.request(server)
        .get(`/api/responses/asdfaksdlj213lkj`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('errors');
          done();
        });
    })
  })

  describe('PUT /api/responses/:id', () => {
    it ('works with a valid id', (done) => {
      chai.request(server)
        .put(`/api/responses/${id}`)
        .send(UPDATE_FIELDS)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('response');
          res.body.response.should.be.a('object');
          done();
        });
    })

    it ('fails with an valid id that is not in DB', (done) => {
      chai.request(server)
        .put(`/api/responses/59f6130e6f22a25c35d72ce9`)
        .send(UPDATE_FIELDS)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('errors');
          done();
        });
    })

    it ('fails with an invalid id ', (done) => {
      chai.request(server)
        .put(`/api/responses/asdfaksdlj213lkj`)
        .send(UPDATE_FIELDS)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('errors');
          done();
        });
    })


  })

  describe('DELETE /api/responses/:id', () => {
    after(() => {
      return new Promise((resolve, reject) => {
        const createUser = User.findByIdAndRemove(PROPER_FIELDS.user_id);
        const createSurvey = Survey.findByIdAndRemove(PROPER_FIELDS.survey_id);
        Promise.all([createUser, createSurvey])
          .then(resolve)
          .catch(reject)
      })
    })
    it ('works with a valid id', (done) => {
      chai.request(server)
        .delete(`/api/responses/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('removed');
          res.body.removed.should.be.a('object');
          done();
        });
    })

    it ('fails with a valid id that is not in DB', (done) => {
      chai.request(server)
        .delete(`/api/responses/59f6130e6f22a25c35d72ce9`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('errors');
          done();
        });
    })

    it ('fails with an invalid id ', (done) => {
      chai.request(server)
        .delete(`/api/responses/asdfaksdlj213lkj`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('errors');
          done();
        });
    })

  })
})
