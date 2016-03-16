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
			idCard.verify('44522119901117536X').should.be.false();
		});
		it('it must be ok',function(){
			var randIdcard = idCard.generateIdcard();
			idCard.verify(randIdcard).should.be.true();
		});
	});
	describe('info()',function(){
		it('it must be ok',function(){
			var info = idCard.info('440882199102104195');
			info.valid.should.be.true();
			info.province.code.should.be.equal("440000");
		});
		it('it must be ok',function(){
			var info = idCard.info('44522119901117536X');
			info.valid.should.be.false();
			info.province.code.should.be.equal("440000");
		});
		it('it must be ok',function(){
			var info = idCard.info('14522119901117536X');
			info.valid.should.be.false();
			info.city.should.be.empty();
			info.province.code.should.be.equal("140000");
		});
		it('it must be not ok',function(){
			var info = idCard.info('04522119901117536X');
			info.valid.should.be.false();
			should.not.exist(info.province);
		});
	});
})
