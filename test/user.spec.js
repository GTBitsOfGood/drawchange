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
  bio: {
    first_name: 'Georgie',
    last_name: 'Burdell',
    password: 'testpass123',
    role: 'admin',
    email: 'gburdell5@gatech.edu',
    street_address: '123 Cherry Lane',
    city: 'Atlanta',
    state: 'Georgia',
    zip_code: '30332',
    phone_number: '1231231234',
    date_of_birth: new Date('1/01/1990'),
    languages: 'spanish, french'
  },
  history: {
    volunteer_interest_cause: 'this is a response',
    volunteer_support: 'this is a response',
    volunteer_commitment: 'this is a response',
    skills_qualifications: 'this is a response',
    previous_volunteer_experience: 'this is a response'
  },
  availability: {
    weekday_mornings: true,
    weekday_afternoons: true,
    weekday_evenings: true,
    weekend_mornings: false,
    weekend_afternoons: false,
    weekend_evenings: false,
  },
  skills_interests: {
    admin_in_office: true,
    admin_virtual: true,
    atlanta_shelter: true,
    orlando_shelter: true,
    graphic_web_design: true,
    special_events: true,
    grant_writing: true,
    writing_editing: true,
    social_media: true,
    fundraising: false,
    finance: false,
    office_maintenance_housekeeping: false,
    international_projects: false,
    volunteer_coordination: false,
    outreach: false,
  },
  referral: {
    friend: true,
    newsletter: false,
    event: false,
    volunteer_match: false,
    internet: false,
    social_media: false,
  },
  employment: {
    name: 'This is my emplyment info... lol',
    position: 'This is my emplyment info... lol',
    duration: 'This is my emplyment info... lol',
    location: 'This is my emplyment info... lol',
    previous_name: 'This is my emplyment info... lol',
    previous_reason_for_leaving: 'This is my emplyment info... lol',
    previous_location: 'This is my emplyment info... lol'
  },
  reference: {
    name: 'my reference',
    phone_number: 'my reference',
    email: 'reference@gmail.com',
    relationship: 'my reference',
    duration: 'my reference'
  },
  criminal: {
    felony: true,
    sexual_violent: false,
    drugs: false,
    driving: false,
    explanation: 'whoops'
  },
  ice: {
    name: 'dont have an accident :D',
    relationship: 'dont have an accident :D',
    phone_number: 'dont have an accident :D',
    email: 'ice@gmail.com',
    address: 'dont have an accident :D',
  },
  permissions: {
    comments: 'goog comments ',
    reference: true,
    personal_image: true,
    email_list: true,
    signature: 'Yo Dawg'
  }

};


const BAD_FIELDS = {
  bio: {
    first_name: 'Georgie',
    last_name: 'Burdell',
    role: 'admin',
    email: 'gburdell3@gatech.edu',
    street_address: '123 Cherry Lane',
    city: 'Atlanta',
    state: 'Georgia'
  }
};

const UPDATE_FIELDS = {
  bio: {
    first_name: 'Georgie',
    last_name: 'Burdell',
    role: 'admin',
    email: 'gburdell3@gatech.edu',
    street_address: '123 Cherry Lane',
    city: 'Atlanta',
    state: 'Georgia',
  },
  history: {
    volunteer_interest_cause: 'this was updated ;P',
    volunteer_support: 'this was updated ;P',
    volunteer_commitment: 'this was updated ;P',
    skills_qualifications: 'this was updated ;P',
    previous_volunteer_experience: 'this was updated ;P'
  },
};

let id = 'too slow';


// Start User Model Testing (CRUD)
describe('User Model Test Suite', () => {
  describe('Create User...', () => {
    it('works w/ all fields', (done) => {
      const testUser = new User(PROPER_FIELDS);
      testUser.save((err, user) => {
        should().not.exist(err);
        should().exist(user);
        return done();
      });
    });
    it('fails w/o all fields', (done) => {
      const testUser = new User(BAD_FIELDS);
      testUser.save((err, user) => {
        should().exist(err);
        should().not.exist(user);
        return done();
      });
    });
  });
  describe('Read User...', () => {
    it('works when document exists', (done) => {
      User.findOne({ 'bio.last_name': 'Burdell' }, (err, user) => {
        should().not.exist(err);
        should().exist(user);
        return done();
      });
    });
    it('fails when document does not exist', (done) => {
      User.findOne({'bio.last_name': 'Smith'}, (err, results) => {
        should().not.exist(err);
        should().not.exist(results);
        return done();
      });
    });
  });
  describe('Update User...', () => {
    it('works when you pass in fields to update', (done) => {
      User.findOneAndUpdate({ 'bio.last_name': 'Burdell' }, UPDATE_FIELDS, (err, user) => {
        should().not.exist(err);
        should().exist(user);
        return done();
      });
    });
  });
  describe('Delete User', () => {
    it('works when the User exists already', (done) => {
      User.findOneAndRemove({'bio.last_name': 'Burdell'}, (err, user) => {
        should().not.exist(err);
        should().exist(user);
        return done();
      });
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

    it('works when a query param (add event) is passed', (done) => {
      chai.request(server)
        .put(`/api/users/${id}?action=appendEvents`)
        .send({ events: ['507f191e810c19729de860ec', '507f191e810c19729de860ea', '507f191e810c19729de860eb']})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('user');
          res.body.user.should.be.a('object');
          const eventArr = res.body.user.events;
          expect(eventArr).to.be.containing('507f191e810c19729de860ea');
          expect(eventArr).to.be.containing('507f191e810c19729de860eb');
          expect(eventArr).to.be.containing('507f191e810c19729de860ec');
          return done();
        });
    });

    it('works when a query param (remove event) is passed', (done) => {
      chai.request(server)
        .put(`/api/users/${id}?action=removeEvents`)
        .send({events: ['507f191e810c19729de860ea']})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('user');
          res.body.user.should.be.a('object');
          const eventArr = res.body.user.events;
          expect(eventArr).not.to.be.containing('507f191e810c19729de860ea');
          expect(eventArr).to.be.containing('507f191e810c19729de860eb');
          expect(eventArr).to.be.containing('507f191e810c19729de860ec');
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
