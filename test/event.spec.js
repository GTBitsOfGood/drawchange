// NPM Imports
const chaiHttp = require('chai-http');
const chai = require('chai');

// Local Imports & Config
const Event = require('../backend/models/event');
const server = require('../server');
const should = chai.should;
chai.use(chaiHttp);

// Constants for Testing
const PROPER_FIELDS = {
  name: 'Bits of Good Kickoff',
  date: new Date(),
  location: '123 College of Computing',
  description: 'Hackathon for bits of good teams!',
  contact: 'George Burdell -- 123.123.1234',
  max_volunteers: 10
};

const BAD_FIELDS = {
  date: new Date(),
  location: '123 College of Computing',
  description: 'Hackathon for bits of good teams!',
  contact: 'George Burdell -- 123.123.1234',
  max_volunteers: 10
};

const UPDATE_FIELDS = {
  description: 'This will be the first meeting of the semester!'
};

let id = 'too slow';


// Event Model Testing (CRUD)
describe('Event Model Test Suite', () => {
  describe('Create Event...', () => {
    it('works w/ all fields', (done) => {

      const testEvent = new Event(PROPER_FIELDS);
      testEvent.save(done);
    });
    it('fails w/o all fields', (done) => {
      const testEvent = new Event(BAD_FIELDS);
      testEvent.save((err) => {
        should().exist(err);
        done();
      });
    });
  });
  describe('Read Event...', () => {
    it('works when document exists', (done) => {
      Event.findOne({name: 'Bits of Good Kickoff'}, done);
    });
    it('fails when document does not exist', (done) => {
      Event.findOne({name: 'This event does not exist'}, (err, results) => {
        should().not.exist(err);
        should().not.exist(results);

        done();
      });
    });
  });
  describe('Update Event...', () => {
    it('works when you pass in fields to update', (done) => {
      Event.findOneAndUpdate({name: 'Bits of Good Kickoff'}, UPDATE_FIELDS, done);
    });
  });
  describe('Delete Event', () => {
    it('works when the event exists already', (done) => {
      Event.findOneAndRemove({name: 'Bits of Good Kickoff'}, done);
    });
  });
});


// API Testing (CRUD)
describe('Event RESTful Endpoints Test Suite', () => {
  describe('POST /api/events/', () => {
    it ('works when proper body sent', (done) => {
      chai.request(server)
        .post('/api/events/')
        .send(PROPER_FIELDS)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('event');
          res.body.event.should.be.a('object');
          id = res.body.event._id;
          done();
        });
    })
    it ('fails when proper body not sent', (done) => {
      chai.request(server)
        .post('/api/events/')
        .send(BAD_FIELDS)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    })
  })

  describe('GET /api/events/', () => {
    it ('works with no body sent', (done) => {
      chai.request(server)
        .get('/api/events/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('events');
          res.body.events.should.be.a('array');
          done();
        });
    })


  })

  describe('GET /api/events/:id', () => {
    it ('works with a valid id', (done) => {
      chai.request(server)
        .get(`/api/events/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('event');
          res.body.event.should.be.a('object');
          done();
        });
    })

    it ('fails with a valid id that is not in DB', (done) => {
      chai.request(server)
        .get(`/api/events/59f6130e6f22a25c35d72ce9`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('errors');
          done();
        });
    })

    it ('fails with an invalid id ', (done) => {
      chai.request(server)
        .get(`/api/events/asdfaksdlj213lkj`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('errors');
          done();
        });
    })
  })

  describe('PUT /api/events/:id', () => {
    it ('works with a valid id', (done) => {
      chai.request(server)
        .put(`/api/events/${id}`)
        .send(UPDATE_FIELDS)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('event');
          res.body.event.should.be.a('object');
          done();
        });
    })

    it ('fails with an valid id that is not in DB', (done) => {
      chai.request(server)
        .put(`/api/events/59f6130e6f22a25c35d72ce9`)
        .send(UPDATE_FIELDS)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('errors');
          done();
        });
    })

    it ('fails with an invalid id ', (done) => {
      chai.request(server)
        .put(`/api/events/asdfaksdlj213lkj`)
        .send(UPDATE_FIELDS)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('errors');
          done();
        });
    })


  })

  describe('DELETE /api/events/:id', () => {
    it ('works with a valid id', (done) => {
      chai.request(server)
        .delete(`/api/events/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('removed');
          res.body.removed.should.be.a('object');
          done();
        });
    })

    it ('fails with a valid id that is not in DB', (done) => {
      chai.request(server)
        .delete(`/api/events/59f6130e6f22a25c35d72ce9`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('errors');
          done();
        });
    })

    it ('fails with an invalid id ', (done) => {
      chai.request(server)
        .delete(`/api/events/asdfaksdlj213lkj`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('errors');
          done();
        });
    })

  })
})
