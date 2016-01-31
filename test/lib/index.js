var should = require('should');
var idCard = require('../../lib/index');
describe('#idCard#',function(){
	describe('verify()',function(){
		it('it must be no ok',function(){
			idCard.verify('440882199102104190').should.be.false();
		});
		it('it must be ok',function(){
			idCard.verify('440882199102104195').should.be.true();
		});
		it('it must be ok',function(){
			var randIdcard = idCard.generateIdcard();
			idCard.verify(randIdcard).should.be.true();
		});
	});
})
