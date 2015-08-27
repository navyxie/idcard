(function(){
	var root = this;
	var util = require('./util');
	var area_service = require('./area_service');
	var idcardLen = 18;
	var ratioValue = 11;
	var ratio = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];//身份证号码前17位数分别乘以不同的系数
	var matchMap = {0:'1',1:'0',2:'X',3:'9',4:'8',5:'7',6:'6',7:'5',8:'4',9:'3',10:'2'};//将这17位数字和系数相乘的结果相加,对11进行求余，得出身份证最后一个字符
	function verify(idcard){
		if(!util.isString(idcard)){
			return false;
		}
		if(idcard.length !== idcardLen){
			return false;
		}
		//验证生日合法性
		if(!util.verifyBirthday(idcard.slice(6,14))){
			return false;
		}
		var lastChar = idcard.slice(idcardLen-1);
		var pre17Char = idcard.slice(0,idcardLen-1);
		var charList = pre17Char.split('');
		var totleCount = 0;
		if(!/^(\d|X)$/.test(lastChar)){
			return false;
		}
		for(var i = 0 , len = charList.length ; i < len ; i++){
			if(isNaN(Number(charList[i]))){
				return false;
			}
			totleCount += Number(charList[i])*ratio[i];
		}
		if(matchMap[totleCount % ratioValue] === lastChar){
			return area_service.hit(idcard);
		}else{
			return false;
		}
	}
	function idcardinfo(idcard){
		if(!verify(idcard)){
			return util.getDefaultIdcardInfoReturn();
		}
		return area_service.idcardinfo(idcard);
	}
	var outPut = {
		verify:verify,
		info:idcardinfo
	}
	if (typeof exports !== 'undefined' || (typeof module !== 'undefined' && module.exports)){
		module.exports = outPut;
	}else if(typeof define === 'function' && define.amd){
		define('idCard', [], function(){
			return outPut;
		});
	}else if(typeof define === 'function' && define.cmd){
		define(function(){
			return outPut;
		})
	}else{
		root.idCard = outPut;
	}
}.call(this));