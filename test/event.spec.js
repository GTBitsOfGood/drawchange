const mongoose = require("mongoose");

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should;
const assert = require('assert');

const Event = require('../backend/models/event');
chai.use(chaiHttp);


describe('Event Model Test Suite', () => {
  describe('Create Event...', () => {
    it('works w/ all fields', (done) => {
      const fields = {
        name: 'Bits of Good Kickoff',
        date: new Date(),
        location: '123 College of Computing',
        description: 'Hackathon for bits of good teams!',
        contact: 'George Burdell -- 123.123.1234'
      };
      const testEvent = new Event(fields);
      testEvent.save(done);
    });
    it('fails w/o all fields', (done) => {
      const fields = {
        date: new Date(),
        location: '123 College of Computing',
        description: 'Hackathon for bits of good teams!',
        contact: 'George Burdell -- 123.123.1234'
      };
      const testEvent = new Event(fields);
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
  describe('Updating Event', () => {
    it('Fields updated', (done) => {
      const fields = {
        description: 'This will be the first meeting of the semester!'
      };
      Event.findOneAndUpdate({name: 'Bits of Good Kickoff'}, fields, done);
    });
  });
  describe('Deleting Event', () => {
    it('Event deleted', (done) => {
      Event.findOneAndRemove({name: 'Bits of Good Kickoff'}, done);
    });
  });
});
// describe('Books', () => {
//   // beforeEach((done) => {
//   //   Book.remove({}, (err) => {
//   //     done();
//   //   });
//   // });
//   describe('/GET book', () => {
//     it('it should GET all the books', (done) => {
//       chai.request(server)
//             .get('/book')
//             .end((err, res) => {
//               res.should.have.status(200);
//               res.body.should.be.a('array');
//               res.body.length.should.be.eql(0);
//               done();
//             });
//     });
//   });
//   /*
//   * Test the /POST route
//   */
//   describe('/POST book', () => {
//     it('it should not POST a book without pages field', (done) => {
//       const book = {
//         title: "The Lord of the Rings",
//         author: "J.R.R. Tolkien",
//         year: 1954
//       };
//       chai.request(server)
//             .post('/book')
//             .send(book)
//             .end((err, res) => {
//               res.should.have.status(200);
//               res.body.should.be.a('object');
//               res.body.should.have.property('errors');
//               res.body.errors.should.have.property('pages');
//               res.body.errors.pages.should.have.property('kind').eql('required');
//               done();
//             });
//     });
//   });
// });