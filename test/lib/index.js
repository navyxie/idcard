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
			info.age.should.be.equal(25);
		});
		it('it must be ok',function(){
			var info = idCard.info('440882199102104195');
			info.valid.should.be.true();
			info.constellation.should.be.equal("水瓶");
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
	describe('constellation()',function(){
		it('it must be ok',function(){
			idCard.constellation('19910210').should.be.equal("水瓶");
		});
		it('it must be ok',function(){
			idCard.constellation(19910210).should.be.equal("水瓶");
		});
		it('it must be ok',function(){
			idCard.constellation(19910120).should.be.equal("摩羯");
		});
		it('it must be ok',function(){
			idCard.constellation(19910121).should.be.equal("水瓶");
		});
		it('it must be ok',function(){
			idCard.constellation(19910220).should.be.equal("双鱼");
		});
		it('it must be ok',function(){
			idCard.constellation(19910219).should.be.equal("水瓶");
		});
		it('it must be ok',function(){
			idCard.constellation(19910321).should.be.equal("白羊");
		});
		it('it must be ok',function(){
			idCard.constellation(19910320).should.be.equal("双鱼");
		});
		it('it must be ok',function(){
			idCard.constellation(19910421).should.be.equal("金牛");
		});
		it('it must be ok',function(){
			idCard.constellation(19910420).should.be.equal("白羊");
		});
		it('it must be ok',function(){
			idCard.constellation(1991052245).should.be.equal("双子");
		});
		it('it must be ok',function(){
			idCard.constellation('1991-02-10','-').should.be.equal("水瓶");
		});
		it('it must be ok',function(){
			idCard.constellation('1991/03/10','/').should.be.equal("双鱼");
		});			
	});
	describe('getAge()',function(){
		it('should be ok',function(){
			idCard.getAge('19910323').should.be.aboveOrEqual(25);
		})
	})
})
