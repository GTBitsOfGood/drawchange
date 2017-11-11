// NPM Imports
const chaiHttp = require('chai-http');
const chai = require('chai');
const assertArrays = require('chai-arrays');

// Local Imports & Config
const User = require('../backend/models/user');
const server = require('../server');
const should = chai.should;
const expect = chai.expect;
chai.use(chaiHttp);
chai.use(assertArrays);
// Allows the middleware to think we're already authenticated.

// Constants for Testing
const PROPER_FIELDS = {
  first_name: 'Georgie',
  last_name: 'Burdell',
  password: 'testpass123',
  role: 'admin',
  email: 'gburdell3@gatech.edu',
  street_address: '123 Cherry Lane',
  city: 'Atlanta',
  state: 'Georgia',
  zip_code: '30332',
  phone_number: '1231231234',
  date_of_birth: new Date('1/01/1990')
};

const BAD_FIELDS = {
  first_name: 'Georgie',
  last_name: 'Burdell',
  role: 'admin',
  email: 'gburdell3@gatech.edu',
  street_address: '123 Cherry Lane',
  city: 'Atlanta',
  state: 'Georgia'
};

const UPDATE_FIELDS = {
  street_address: '840 Techwood DR'
};

let id = 'too slow';


// Start User Model Testing (CRUD)
describe('User Model Test Suite', () => {
  describe('Create User...', () => {
    it('works w/ all fields', (done) => {
      const testUser = new User(PROPER_FIELDS);
      testUser.save(done);
    });
    it('fails w/o all fields', (done) => {
      const testUser = new User(BAD_FIELDS);
      testUser.save((err) => {
        should().exist(err);
        return done();
      });
    });
  });
  describe('Read User...', () => {
    it('works when document exists', (done) => {
      User.findOne({last_name: 'Burdell'}, done);
    });
    it('fails when document does not exist', (done) => {
      User.findOne({last_name: 'Smith'}, (err, results) => {
        should().not.exist(err);
        should().not.exist(results);
        return done();
      });
    });
  });
  describe('Update User...', () => {
    it('works when you pass in fields to update', (done) => {
      User.findOneAndUpdate({last_name: 'Burdell'}, UPDATE_FIELDS, done);
    });
  });
  describe('Delete User', () => {
    it('works when the User exists already', (done) => {
      User.findOneAndRemove({last_name: 'Burdell'}, done);
    });
  });
});

// Start API Testing (CRUD)
describe('User RESTful Endpoints Test Suite', () => {
  describe('POST /api/users/', () => {
    it('works when proper body sent', (done) => {
      chai.request(server)
        .post('/api/users/')
        .send(PROPER_FIELDS)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('user');
          res.body.user.should.be.a('object');
          id = res.body.user._id;
          return done();
        });
    });
    it('fails when proper body not sent', (done) => {
      chai.request(server)
        .post('/api/users/')
        .send(BAD_FIELDS)
        .end((err, res) => {
          res.should.have.status(400);
          return done();
        });
    });
  });

  // trick server into thinking we are logged in...
  server.request.user = true;

  describe('GET /api/users/', () => {
    it('works with no body sent', (done) => {
      chai.request(server)
        .get('/api/users/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('users');
          res.body.users.should.be.a('array');
          return done();
        });
    });
  });

  describe('GET /api/users/:id', () => {
    it('works with a valid id', (done) => {
      chai.request(server)
        .get(`/api/users/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('user');
          res.body.user.should.be.a('object');
          return done();
        });
    });

    it('fails with a valid id that is not in DB', (done) => {
      chai.request(server)
        .get(`/api/users/59f6130e6f22a25c35d72ce9`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('errors');
          return done();
        });
    });

    it('fails with an invalid id ', (done) => {
      chai.request(server)
        .get(`/api/users/asdfaksdlj213lkj`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('errors');
          return done();
        });
    });
  });

  describe('PUT /api/users/:id', () => {
    it('works with a valid id', (done) => {
      chai.request(server)
        .put(`/api/users/${id}`)
        .send(UPDATE_FIELDS)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('user');
          res.body.user.should.be.a('object');
          return done();
        });
    });

    it ('works when a query param (add event) is passed', (done) => {
      chai.request(server)
        .put(`/api/users/${id}?action=appendEvents`)
        .send({events: ['507f191e810c19729de860ea']})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('user');
          res.body.user.should.be.a('object');
          let eventArr = res.body.user.events;
          expect(eventArr).to.be.containing('507f191e810c19729de860ea');
          return done();
        });
    });

    it ('works when a query param (remove event) is passed', (done) => {
      chai.request(server)
        .put(`/api/users/${id}?action=removeEvents`)
        .send({events: ['507f191e810c19729de860ea']})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('user');
          res.body.user.should.be.a('object');
          let eventArr = res.body.user.events;
          expect(eventArr).not.to.be.containing('507f191e810c19729de860ea');
          return done();
        });
    });


    it('fails with an valid id that is not in DB', (done) => {
      chai.request(server)
        .put(`/api/users/59f6130e6f22a25c35d72ce9`)
        .send(UPDATE_FIELDS)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('errors');
          return done();
        });
    });

    it('fails with an invalid id ', (done) => {
      chai.request(server)
        .put(`/api/users/asdfaksdlj213lkj`)
        .send(UPDATE_FIELDS)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('errors');
          return done();
        });
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('fails with a valid id that is not in DB', (done) => {
      chai.request(server)
        .delete(`/api/users/59f6130e6f22a25c35d72ce9`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('errors');
          return done();
        });
    });

    it('fails with an invalid id ', (done) => {
      chai.request(server)
        .delete(`/api/users/asdfaksdlj213lkj`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('errors');
          return done();
        });
    });
    it('works with a valid id', (done) => {
      chai.request(server)
        .delete(`/api/users/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('removed');
          res.body.removed.should.be.a('object');
          return done();
        });
    });
  });
});
