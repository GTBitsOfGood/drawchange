// NPM Imports
const chaiHttp = require('chai-http');
const chai = require('chai');

// Local Imports & Config
const Email = require('../backend/models/email');
const server = require('../server');
const should = chai.should;
chai.use(chaiHttp);

// Constants for Testing
const PROPER_FIELDS = {
  from: 'Bits of Good',
  subject: 'Bits of Good Kickoff!',
  text: 'email text blah blah',
  recipients: [{user: 'George'}],
  is_html: false,
};


const BAD_FIELDS = {
  from: 'Bits of Good',
  subject: 'Bits of Good Kickoff!',
  text: 'email text blah blah',
  is_html: false,
};

const UPDATE_FIELDS = {
  text: '<h1>email text blah blah</h1>',
  is_html: true
};

let id = 'too slow';

// Testing Email Model (CRUD)
describe('Email Model Test Suite', () => {
  describe('Create Email...', () => {
    it('works w/ all fields', (done) => {

      const testEmail = new Email(PROPER_FIELDS);
      testEmail.save(done);
    });
    it('fails w/o all fields', (done) => {
      const testEmail = new Email(BAD_FIELDS);
      testEmail.save((err) => {
        should().exist(err);
        done();
      });
    });
  });
  describe('Read Email...', () => {
    it('works when document exists', (done) => {
      Email.findOne({from: 'Bits of Good'}, done);
    });
    it('fails when document does not exist', (done) => {
      Email.findOne({from: 'Bits of Good falseeee'}, (err, results) => {
        should().not.exist(err);
        should().not.exist(results);

        done();
      });
    });
  });
  describe('Update Email...', () => {
    it('works when you pass in fields to update', (done) => {
      Email.findOneAndUpdate({from: 'Bits of Good'}, UPDATE_FIELDS, done);
    });
  });
  describe('Delete Email', () => {
    it('works when the Email exists already', (done) => {
      Email.findOneAndRemove({from: 'Bits of Good'}, done);
    });
  });
});

// Testing API (CRUD)
describe('Email RESTful Endpoints Test Suite', () => {
  describe('POST /api/emails/', () => {
    it ('works when proper body sent', (done) => {
      chai.request(server)
        .post('/api/emails/')
        .send(PROPER_FIELDS)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('email');
          res.body.email.should.be.a('object');
          id = res.body.email._id;
          done();
        });
    })
    it ('fails when proper body not sent', (done) => {
      chai.request(server)
        .post('/api/emails/')
        .send(BAD_FIELDS)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    })
  })

  describe('GET /api/emails/', () => {
    it ('works with no body sent', (done) => {
      chai.request(server)
        .get('/api/emails/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('emails');
          res.body.emails.should.be.a('array');
          done();
        });
    })


  })

  describe('GET /api/emails/:id', () => {
    it ('works with a valid id', (done) => {
      chai.request(server)
        .get(`/api/emails/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('email');
          res.body.email.should.be.a('object');
          done();
        });
    })

    it ('fails with a valid id that is not in DB', (done) => {
      chai.request(server)
        .get(`/api/emails/59f6130e6f22a25c35d72ce9`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('errors');
          done();
        });
    })

    it ('fails with an invalid id ', (done) => {
      chai.request(server)
        .get(`/api/emails/asdfaksdlj213lkj`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('errors');
          done();
        });
    })
  })

  describe('PUT /api/emails/:id', () => {
    it ('works with a valid id', (done) => {
      chai.request(server)
        .put(`/api/emails/${id}`)
        .send(UPDATE_FIELDS)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('email');
          res.body.email.should.be.a('object');
          done();
        });
    })

    it ('fails with an valid id that is not in DB', (done) => {
      chai.request(server)
        .put(`/api/emails/59f6130e6f22a25c35d72ce9`)
        .send(UPDATE_FIELDS)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('errors');
          done();
        });
    })

    it ('fails with an invalid id ', (done) => {
      chai.request(server)
        .put(`/api/emails/asdfaksdlj213lkj`)
        .send(UPDATE_FIELDS)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('errors');
          done();
        });
    })


  })

  describe('DELETE /api/emails/:id', () => {
    it ('works with a valid id', (done) => {
      chai.request(server)
        .delete(`/api/emails/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('removed');
          res.body.removed.should.be.a('object');
          done();
        });
    })

    it ('fails with a valid id that is not in DB', (done) => {
      chai.request(server)
        .delete(`/api/emails/59f6130e6f22a25c35d72ce9`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('errors');
          done();
        });
    })

    it ('fails with an invalid id ', (done) => {
      chai.request(server)
        .delete(`/api/emails/asdfaksdlj213lkj`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('errors');
          done();
        });
    })

  })
})
