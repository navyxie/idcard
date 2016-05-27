var should = require('should');
var area_service = require('../lib/area_service');
describe('area_service',function(){
	describe('#hit()',function(){
		it('should be ok',function(){
			area_service.hit('440882199102104195');
		});
		it('should not be ok',function(){
			area_service.hit('40002003010202260X');
		});	
	});
	describe('#idcardinfo()',function(){
		it('should be ok',function(){
			area_service.idcardinfo('440882199102104195').should.have.properties({'birthday':19910210,gender:'M',address:"广东省湛江市雷州市"});
		});
		it('should be ok',function(){
			area_service.idcardinfo('440711198806181519').should.have.properties({'birthday':19880618,gender:'M',address:"广东省江门市郊区"});
		});	
		it('should be ok',function(){
			area_service.idcardinfo('441900198410125825').should.have.properties({'birthday':19841012,gender:'F',address:"广东省东莞市"});
		});
		it('should be ok',function(){
			area_service.idcardinfo('150301197707291508').should.have.properties({'birthday':19770729,gender:'F',address:"内蒙古自治区乌海市市辖区"});
		});	
		it('should be ok',function(){
			area_service.idcardinfo('65282419840210443X').should.have.properties({'birthday':19840210,gender:'M',address:"新疆维吾尔自治区巴音郭楞蒙古自治州若羌县"});
		});	
		it('should not be ok',function(){
			area_service.idcardinfo('40002003010202260X').should.have.properties({'valid':false});
		});	
	});
	describe('#getAge()',function(){
		it('should be ok',function(){
			area_service.getAge(19910210).should.be.aboveOrEqual(25);
		})
	})
})