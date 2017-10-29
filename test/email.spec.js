const mongoose = require("mongoose");

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const assert = require('assert');

const Email = require('../backend/models/email');
const User = require('../backend/models/user');

chai.use(chaiHttp);

describe('Email Model', () => {
  describe('Create Email', () => {
    it('fails w/o all required fields', (done) => {
      const fields = {
        from: 'George Burdell',
        subject: 'GT Bits of Good Kickoff',
        text: 'Our first meeting will be tomorrow!',
        is_sent: true,
        sent_on: new Date('10/29/2017'),
        is_html: true
      };
      const testEmail = new Email(fields);
      testEmail.save((err) => {
        should.exist(err);
        done();
      });
    });
    it('fails with no recipients', (done) => {
      const fields = {
        from: 'George Burdell',
        subject: 'Intro Meeting',
        text: 'Come by tomorrow!',
        recipients: [],
        is_sent: true,
        sent_on: new Date('05/29/2014'),
        is_html: true
      };
      const testEmail = new Email(fields);
      testEmail.save((err) => {
        should.exist(err);
        done();
      });
    });
    it('works with all required fields', (done) => {
      const fields = {
        from: 'George Burdell',
        subject: 'Intro Meeting',
        text: 'Come by tomorrow!',
        recipients: [new User('Jim', 'Acosta', 'jim@me.com', '25 Cox St', 'Atlanta', 'GA', '30332', '555.555.5555', new Date('10/12/1940'))],
        is_sent: true,
        sent_on: new Date('05/29/2014'),
        is_html: true
      };
      const testEmail = new Email(fields);
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
      Email.findOneAndUpdate({from: 'George'}, fields, done);
    });
  });
  describe('Deleting Email', () => {
    it('Email deleted', (done) => {
      Email.findOneAndRemove({first_name: 'George'}, done);
    });
  });
});