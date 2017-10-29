const mongoose = require("mongoose");

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const assert = require('assert');

const User = require('../backend/models/user');
chai.use(chaiHttp);

describe('User Model', () => {
  describe('Create User', () => {
    it('User created', (done) => {
      const fields = {
        first_name: 'George',
        last_name: 'Burdell',
        email: 'gburdell@gatech.edu',
        street_address: '123 Cherry St.',
        city: 'Atlanta',
        state: 'Georgia',
        zip_code: '30332',
        phone_number: '123.123.1234',
        date_of_birth: new Date('1/31/1990')
      };
      const testUser = new User(fields);
      testUser.save(done);
    });
  });
  describe('Updating User', () => {
    it('Fields updated', (done) => {
      const fields = {
        street_address: '456 Techwood DR.',
        phone_number: '456.456.5678'
      };
      User.findOneAndUpdate({first_name: 'George'}, fields, done);
    });
  });
  describe('Deleting User', () => {
    it('User deleted', (done) => {
      User.findOneAndRemove({first_name: 'George'}, done);
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