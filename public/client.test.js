const { expect } = require('chai');
client = require('./client.js');

// public/client.test.js


// Mock XMLHttpRequest for testing
global.XMLHttpRequest = function () {
    this.open = function (method, url, async) {
        this._url = url;
    };
    this.send = function () {
        // Simulate async response
        setTimeout(() => {
            if (this._url.includes('operation=power')) {
                const url = new URL(this._url, 'http://localhost');
                const op1 = parseFloat(url.searchParams.get('operand1'));
                const op2 = parseFloat(url.searchParams.get('operand2'));
                let result = Math.pow(op1, op2);
                if (isNaN(result)) {
                    this.status = 200;
                    this.responseText = JSON.stringify({ result: NaN });
                } else {
                    this.status = 200;
                    this.responseText = JSON.stringify({ result });
                }
            } else if (!this._url.includes('operation=')) {
                this.status = 400;
                this.responseText = '{}';
            } else {
                this.status = 400;
                this.responseText = '{}';
            }
            this.onload();
        }, 0);
    };
};

global.location = { origin: 'http://localhost' };

// Mock DOM functions
global.document = {
    getElementById: () => ({
        innerHTML: "",
        style: { visibility: "hidden" }
    }),
    querySelectorAll: () => []
};

// Import the client.js functions
let client;
before(function () {
});

describe('calculate (power operation)', function () {
    // Helper to override setValue and setError
    let lastValue, lastError, loadingState;
    beforeEach(function () {
        lastValue = undefined;
        lastError = false;
        loadingState = [];
        global.setValue = (n) => { lastValue = n; };
        global.setError = () => { lastError = true; };
        global.setLoading = (l) => { loadingState.push(l); };
    });

    it('raises a positive integer to a positive integer exponent', function (done) {
        client.calculate(2, 3, '^');
        setTimeout(() => {
            expect(lastValue).to.equal(8);
            expect(lastError).to.be.false;
            done();
        }, 10);
    });

    it('raises a positive integer to zero', function (done) {
        client.calculate(5, 0, '^');
        setTimeout(() => {
            expect(lastValue).to.equal(1);
            expect(lastError).to.be.false;
            done();
        }, 10);
    });

    it('raises zero to a positive integer', function (done) {
        client.calculate(0, 5, '^');
        setTimeout(() => {
            expect(lastValue).to.equal(0);
            expect(lastError).to.be.false;
            done();
        }, 10);
    });

    it('raises a negative integer to an even exponent', function (done) {
        client.calculate(-2, 4, '^');
        setTimeout(() => {
            expect(lastValue).to.equal(16);
            expect(lastError).to.be.false;
            done();
        }, 10);
    });

    it('raises a negative integer to an odd exponent', function (done) {
        client.calculate(-2, 3, '^');
        setTimeout(() => {
            expect(lastValue).to.equal(-8);
            expect(lastError).to.be.false;
            done();
        }, 10);
    });

    it('raises a floating point number to an integer exponent', function (done) {
        client.calculate(2.5, 2, '^');
        setTimeout(() => {
            expect(lastValue).to.equal(6.25);
            expect(lastError).to.be.false;
            done();
        }, 10);
    });

    it('raises a number to a negative exponent', function (done) {
        client.calculate(2, -2, '^');
        setTimeout(() => {
            expect(lastValue).to.equal(0.25);
            expect(lastError).to.be.false;
            done();
        }, 10);
    });

    it('raises zero to zero (should return 1)', function (done) {
        client.calculate(0, 0, '^');
        setTimeout(() => {
            expect(lastValue).to.equal(1);
            expect(lastError).to.be.false;
            done();
        }, 10);
    });

    it('raises a negative base to a fractional exponent (should return NaN)', function (done) {
        client.calculate(-2, 0.5, '^');
        setTimeout(() => {
            expect(Number.isNaN(lastValue)).to.be.true;
            expect(lastError).to.be.false;
            done();
        }, 10);
    });

    it('raises a positive float to a negative float exponent', function (done) {
        client.calculate(4.5, -1.5, '^');
        setTimeout(() => {
            expect(lastValue).to.be.closeTo(Math.pow(4.5, -1.5), 1e-10);
            expect(lastError).to.be.false;
            done();
        }, 10);
    });

    it('raises a negative float to an odd integer exponent', function (done) {
        client.calculate(-3.2, 3, '^');
        setTimeout(() => {
            expect(lastValue).to.be.closeTo(Math.pow(-3.2, 3), 1e-10);
            expect(lastError).to.be.false;
            done();
        }, 10);
    });

    it('raises a negative float to an even integer exponent', function (done) {
        client.calculate(-3.2, 2, '^');
        setTimeout(() => {
            expect(lastValue).to.be.closeTo(Math.pow(-3.2, 2), 1e-10);
            expect(lastError).to.be.false;
            done();
        }, 10);
    });

    it('raises a positive number to a very large exponent', function (done) {
        client.calculate(2, 30, '^');
        setTimeout(() => {
            expect(lastValue).to.equal(Math.pow(2, 30));
            expect(lastError).to.be.false;
            done();
        }, 10);
    });

    it('raises a positive number to a very small (negative) exponent', function (done) {
        client.calculate(2, -30, '^');
        setTimeout(() => {
            expect(lastValue).to.be.closeTo(Math.pow(2, -30), 1e-15);
            expect(lastError).to.be.false;
            done();
        }, 10);
    });

    it('returns error for invalid operation', function (done) {
        client.calculate(2, 3, 'invalid');
        setTimeout(() => {
            expect(lastError).to.be.true;
            done();
        }, 10);
    });
});