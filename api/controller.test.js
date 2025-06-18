const chai = require('chai');
const request = require('supertest');
const express = require('express');
const controller = require('./controller');

// api/controller.test.js

const expect = chai.expect;

describe('Arithmetic API - Exponential (power) Operation', function () {
    let app;
    before(function () {
        app = express();
        app.get('/arithmetic', controller.calculate);
    });

    describe('Power', function () {
        it('raises a positive integer to a positive integer exponent', function (done) {
            request(app)
                .get('/arithmetic?operation=power&operand1=2&operand2=3')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 8 });
                    done();
                });
        });

        it('raises a positive integer to zero', function (done) {
            request(app)
                .get('/arithmetic?operation=power&operand1=5&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 1 });
                    done();
                });
        });

        it('raises zero to a positive integer', function (done) {
            request(app)
                .get('/arithmetic?operation=power&operand1=0&operand2=5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0 });
                    done();
                });
        });

        it('raises a negative integer to an even exponent', function (done) {
            request(app)
                .get('/arithmetic?operation=power&operand1=-2&operand2=4')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 16 });
                    done();
                });
        });

        it('raises a negative integer to an odd exponent', function (done) {
            request(app)
                .get('/arithmetic?operation=power&operand1=-2&operand2=3')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -8 });
                    done();
                });
        });

        it('raises a floating point number to an integer exponent', function (done) {
            request(app)
                .get('/arithmetic?operation=power&operand1=2.5&operand2=2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 6.25 });
                    done();
                });
        });

        it('raises a number to a negative exponent', function (done) {
            request(app)
                .get('/arithmetic?operation=power&operand1=2&operand2=-2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0.25 });
                    done();
                });
        });

        it('raises a number in exponential notation', function (done) {
            request(app)
                .get('/arithmetic?operation=power&operand1=1e1&operand2=2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 100 });
                    done();
                });
        });

        it('raises a number to an exponent in exponential notation', function (done) {
            request(app)
                .get('/arithmetic?operation=power&operand1=2&operand2=3e0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 8 });
                    done();
                });
        });

        it('raises a number in exponential notation to an exponent in exponential notation', function (done) {
            request(app)
                .get('/arithmetic?operation=power&operand1=1e1&operand2=2e0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 100 });
                    done();
                });
        });

        it('raises zero to zero (should return 1)', function (done) {
            request(app)
                .get('/arithmetic?operation=power&operand1=0&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 1 });
                    done();
                });
        });

        it('raises a negative base to a fractional exponent (should return NaN)', function (done) {
            request(app)
                .get('/arithmetic?operation=power&operand1=-2&operand2=0.5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.be.NaN;
                    done();
                });
        });

        // Additional tests

        it('raises a positive float to a negative float exponent', function (done) {
            request(app)
                .get('/arithmetic?operation=power&operand1=4.5&operand2=-1.5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.be.closeTo(Math.pow(4.5, -1.5), 1e-10);
                    done();
                });
        });

        it('raises a negative float to an odd integer exponent', function (done) {
            request(app)
                .get('/arithmetic?operation=power&operand1=-3.2&operand2=3')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.be.closeTo(Math.pow(-3.2, 3), 1e-10);
                    done();
                });
        });

        it('raises a negative float to an even integer exponent', function (done) {
            request(app)
                .get('/arithmetic?operation=power&operand1=-3.2&operand2=2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.be.closeTo(Math.pow(-3.2, 2), 1e-10);
                    done();
                });
        });

        it('raises a positive number to a very large exponent', function (done) {
            request(app)
                .get('/arithmetic?operation=power&operand1=2&operand2=30')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(Math.pow(2, 30));
                    done();
                });
        });

        it('raises a positive number to a very small (negative) exponent', function (done) {
            request(app)
                .get('/arithmetic?operation=power&operand1=2&operand2=-30')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.be.closeTo(Math.pow(2, -30), 1e-15);
                    done();
                });
        });

        it('returns error for missing operation', function (done) {
            request(app)
                .get('/arithmetic?operand1=2&operand2=3')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body.error).to.match(/Unspecified operation/);
                    done();
                });
        });

        it('returns error for invalid operation', function (done) {
            request(app)
                .get('/arithmetic?operation=invalid&operand1=2&operand2=3')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body.error).to.match(/Invalid operation/);
                    done();
                });
        });

        it('returns error for missing operand1', function (done) {
            request(app)
                .get('/arithmetic?operation=power&operand2=3')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body.error).to.match(/Invalid operand1/);
                    done();
                });
        });

        it('returns error for missing operand2', function (done) {
            request(app)
                .get('/arithmetic?operation=power&operand1=2')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body.error).to.match(/Invalid operand2/);
                    done();
                });
        });

        it('returns error for invalid operand1 format', function (done) {
            request(app)
                .get('/arithmetic?operation=power&operand1=abc&operand2=2')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body.error).to.match(/Invalid operand1/);
                    done();
                });
        });

        it('returns error for invalid operand2 format', function (done) {
            request(app)
                .get('/arithmetic?operation=power&operand1=2&operand2=xyz')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body.error).to.match(/Invalid operand2/);
                    done();
                });
        });

        it('raises a number to a decimal exponent', function (done) {
            request(app)
                .get('/arithmetic?operation=power&operand1=9&operand2=0.5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(3);
                    done();
                });
        });

        it('raises a negative zero to a positive exponent', function (done) {
            request(app)
                .get('/arithmetic?operation=power&operand1=-0&operand2=5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(0);
                    done();
                });
        });

        it('raises a positive number to NaN exponent (should return NaN)', function (done) {
            request(app)
                .get('/arithmetic?operation=power&operand1=2&operand2=NaN')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body.error).to.match(/Invalid operand2/);
                    done();
                });
        });

        it('raises NaN to a positive exponent (should return NaN)', function (done) {
            request(app)
                .get('/arithmetic?operation=power&operand1=NaN&operand2=2')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body.error).to.match(/Invalid operand1/);
                    done();
                });
        });
    });
});

// We recommend installing an extension to run mocha tests.
          expect(res.body).to.eql({ result: 8 });
          done();
        

    it('raises a positive integer to zero', function (done) {
      request(app)
        .get('/arithmetic?operation=power&operand1=5&operand2=0')
        .expect(200)
        .end(function (err, res) {
          expect(res.body).to.eql({ result: 1 });
          done();
        });
    });

    it('raises zero to a positive integer', function (done) {
      request(app)
        .get('/arithmetic?operation=power&operand1=0&operand2=5')
        .expect(200)
        .end(function (err, res) {
          expect(res.body).to.eql({ result: 0 });
          done();
        });
    });

    it('raises a negative integer to an even exponent', function (done) {
      request(app)
        .get('/arithmetic?operation=power&operand1=-2&operand2=4')
        .expect(200)
        .end(function (err, res) {
          expect(res.body).to.eql({ result: 16 });
          done();
        });
    });

    it('raises a negative integer to an odd exponent', function (done) {
      request(app)
        .get('/arithmetic?operation=power&operand1=-2&operand2=3')
        .expect(200)
        .end(function (err, res) {
          expect(res.body).to.eql({ result: -8 });
          done();
        });
    });

    it('raises a floating point number to an integer exponent', function (done) {
      request(app)
        .get('/arithmetic?operation=power&operand1=2.5&operand2=2')
        .expect(200)
        .end(function (err, res) {
          expect(res.body).to.eql({ result: 6.25 });
          done();
        });
    });

    it('raises a number to a negative exponent', function (done) {
      request(app)
        .get('/arithmetic?operation=power&operand1=2&operand2=-2')
        .expect(200)
        .end(function (err, res) {
          expect(res.body).to.eql({ result: 0.25 });
          done();
        });
    });

    it('raises a number in exponential notation', function (done) {
      request(app)
        .get('/arithmetic?operation=power&operand1=1e1&operand2=2')
        .expect(200)
        .end(function (err, res) {
          expect(res.body).to.eql({ result: 100 });
          done();
        });
    });

    it('raises a number to an exponent in exponential notation', function (done) {
      request(app)
        .get('/arithmetic?operation=power&operand1=2&operand2=3e0')
        .expect(200)
        .end(function (err, res) {
          expect(res.body).to.eql({ result: 8 });
          done();
        });
    });

    it('raises a number in exponential notation to an exponent in exponential notation', function (done) {
      request(app)
        .get('/arithmetic?operation=power&operand1=1e1&operand2=2e0')
        .expect(200)
        .end(function (err, res) {
          expect(res.body).to.eql({ result: 100 });
          done();
        });
    });

    it('raises zero to zero (should return 1)', function (done) {
      request(app)
        .get('/arithmetic?operation=power&operand1=0&operand2=0')
        .expect(200)
        .end(function (err, res) {
          expect(res.body).to.eql({ result: 1 });
          done();
        });
    });

    it('raises a negative base to a fractional exponent (should return NaN)', function (done) {
      request(app)
        .get('/arithmetic?operation=power&operand1=-2&operand2=0.5')
        .expect(200)
        .end(function (err, res) {
          expect(res.body.result).to.be.NaN;
          done();
        });
    });
  

// We recommend installing an extension to run mocha tests.