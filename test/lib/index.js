var should = require('should');
var idCard = require('../../lib/index');
describe('#idCard#',function(){
	describe('verify()',function(){
		it('it must be no ok',function(){
			idCard.verify('440882199102104190').should.be.false();
		});
		it('it must be ok',function(){
			idCard.verify('380882199102104199').should.be.true();
		});
	});
})