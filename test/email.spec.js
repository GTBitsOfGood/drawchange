const mongoose = require("mongoose");

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const assert = require('assert');

const Email = require('../backend/models/email');
const User = require('../backend/models/user');

chai.use(chaiHttp);

const BAD_REQUEST_NO_RECIPIENTS = {
  from: 'George Burdell',
  subject: 'GT Bits of Good Kickoff',
  text: 'Our first meeting will be tomorrow!',
  is_sent: true,
  sent_on: new Date('10/29/2017'),
  is_html: true
};

const BAD_REQUEST_EMPTY_RECIPIENTS = {
  from: 'George Burdell',
  subject: 'Intro Meeting',
  text: 'Come by tomorrow!',
  recipients: [],
  is_sent: true,
  sent_on: new Date('05/29/2014'),
  is_html: true
};

const GOOD_REQUEST = {
  from: 'George Burdell',
  subject: 'Intro Meeting',
  text: 'Come by tomorrow!',
  recipients: [new User('Jim', 'Acosta', 'jim@me.com', '25 Cox St', 'Atlanta', 'GA', '30332', '555.555.5555', new Date('10/12/1940'))],
  is_sent: true,
  sent_on: new Date('05/29/2014'),
  is_html: true
};

const UPDATE = {
  from: 'George'
};

describe('Email Model Tests', () => {
  describe('Create Email', () => {
    it('fails w/o all required fields', (done) => {
      const testEmail = new Email(BAD_REQUEST_NO_RECIPIENTS);
      testEmail.save((err) => {
        should.exist(err);
        done();
      });
    });
    it('fails with no recipients', (done) => {
      const testEmail = new Email(BAD_REQUEST_EMPTY_RECIPIENTS);
      testEmail.save((err) => {
        should.exist(err);
        done();
      });
    });
    it('works with all required fields', (done) => {
      const testEmail = new Email(GOOD_REQUEST);
      testEmail.save((err) => {
        should.not.exist(err);
        done();
      });
    });
  });
  describe('Updating Email', () => {
    it('Email updated', (done) => {
      const fields = {
        subject: 'GT Bits of Good Mandatory Email',
        is_html: false
      };
      Email.findOneAndUpdate(UPDATE, fields, done);
    });
  });
  describe('Deleting Email', () => {
    it('Email deleted', (done) => {
      Email.findOneAndRemove({from: 'George'}, done);
    });
  });
});

//REST endpoints test suite
describe('Email REST Endpoints Test Suite', () => {

  describe('GET /api/emails/', () => {
    it('works with no body sent', (done) => {
      chai.request(server)
        .get('/api/emails/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('emails');
          res.body.emails.should.be.a('array');
          done();
        });
    });
  });

  describe('GET /api/emails/:id', () => {

    it ('fails with a valid id that is not in DB', (done) => {
      chai.request(server)
        .get(`/api/emails/59f6130e6f22a25c10d72ce9`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('errors');
          done();
        });
    });

    it ('fails with an invalid id', (done) => {
      chai.request(server)
        .get(`/api/emails/asdfaksdlj213lkj`)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.have.property('errors');
          done();
        });
    });

  });

  describe('POST /api/emails/', () => {

    it('works with proper body', (done) => {
      chai.request(server)
        .post('/api/emails/')
        .send(GOOD_REQUEST)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('email')
          res.body.email.should.be.a('object');
          done();
        });
    });

    it('fails with incorrect body', (done) => {
      chai.request(server)
        .post('/api/emails/')
        .send(BAD_REQUEST_EMPTY_RECIPIENTS)
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });
  });

  describe('PUT /api/emails/:id', () => {
    it ('fails with an valid id that is not in DB', (done) => {
      chai.request(server)
        .put('/api/emails/59f6130e6f22a25c35d72ce9')
        .send(UPDATE)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('errors');
          done();
        });
    });
    it ('fails with an invalid id ', (done) => {
      chai.request(server)
        .put('/api/emails/asdfaksdlj213lkj')
        .send(UPDATE)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.have.property('errors');
          done();
        });
    });
  });

  describe('DELETE /api/email/:id', () => {

    it ('fails with a valid id that is not in DB', (done) => {
      chai.request(server)
        .delete(`/api/emails/59f6130e6f22a25c35d72ce9`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('errors');
          done();
        });
    });

    it ('fails with an invalid id ', (done) => {
      chai.request(server)
        .delete(`/api/emails/asdfaksdlj213lkj`)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.have.property('errors');
          done();
        });
    });

  });

});



