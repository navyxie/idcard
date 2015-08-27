var should = require('should');
var util = require('../../lib/util');
describe('#util#',function(){
	describe('verifyBirthday()',function(){
		it('it must be no ok',function(){
			util.verifyBirthday('19910229').should.be.false();
		});
		it('it must be no ok',function(){
			util.verifyBirthday('29910229').should.be.false();
		});
		it('it must be no ok',function(){
			util.verifyBirthday('19910431').should.be.false();
		});
		it('it must be no ok',function(){
			util.verifyBirthday('19910431').should.be.false();
		});
		it('it must be ok',function(){
			util.verifyBirthday('19910210').should.be.true();
		});
		it('it must be ok',function(){
			util.verifyBirthday('20000229').should.be.true();
		});
		it('it must be ok',function(){
			util.verifyBirthday('19910331').should.be.true();
		});
		it('it must be ok',function(){
			util.verifyBirthday('19910430').should.be.true();
		});
	});
})