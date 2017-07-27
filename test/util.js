var should = require('should');
var util = require('../lib/util');
describe('#util#', function() {
  describe('verifyBirthday()', function() {
    it('it must be no ok', function() {
      util.verifyBirthday('19910229').should.be.false();
    });
    it('it must be no ok', function() {
      util.verifyBirthday('29910229').should.be.false();
    });
    it('it must be no ok', function() {
      util.verifyBirthday('19910431').should.be.false();
    });
    it('it must be no ok', function() {
      util.verifyBirthday('19910431').should.be.false();
    });
    it('it must be ok', function() {
      util.verifyBirthday('19910210').should.be.true();
    });
    it('it must be ok', function() {
      util.verifyBirthday('20000229').should.be.true();
    });
    it('it must be ok', function() {
      util.verifyBirthday('19910331').should.be.true();
    });
    it('it must be ok', function() {
      util.verifyBirthday('19910430').should.be.true();
    });
  });
  describe('util', function() {
    it('it must be ok', function() {
      util.isObject({}).should.be.true();
    });
    it('it must be ok', function() {
      util.isString({}).should.be.false();
    });
    it('it must be ok', function() {
      util.isFunction({}).should.be.false();
    });
    it('it must be ok', function() {
      util.isNumber({}).should.be.false();
    });
    it('it must be ok', function() {
      util.getDefaultIdcardInfoReturn().should.properties({
        valid: false
      });
    });
    it('it must be ok', function() {
      util.keys({
        a: 1,
        b: 2
      }).should.containDeep(['a', 'b']);
      util.keys([1, 2]).should.be.empty();
    });
    it('it must be ok', function() {
      should(util.randomNum()).undefined();
      util.randomNum(4, 5).should.be.aboveOrEqual(4);
      util.randomNum(4, 5).should.be.belowOrEqual(5);
    });
  })
})