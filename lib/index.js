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
	function _randomAreaCode(objParam){
		var areaCodeList = util.keys(area_service.areas);
		var listLen = areaCodeList.length;
		var random = areaCodeList[parseInt(Math.random()*listLen)];
		return random;
	}
	function _randomBirthday(){
		var date = new Date();
		var fullYear = date.getFullYear();
		var minYear = fullYear-200;//当前年往后200年
		var randomYear = util.randomNum(minYear,fullYear);
		var randomMonth = util.randomNum(1,12);
		var maxDate = 31;
		switch(randomMonth){
			case 2:
				if(util.leapYear()){
					maxDate = 29;
				}else{
					maxDate = 28;
				}
				break;
			case 4:
			case 6:
			case 9:
			case 11:
				maxDate = 30;
				break;
		}
		var randomDate = util.randomNum(1,maxDate);
		return randomYear + (randomMonth < 10 ? ("0"+randomMonth) : ""+randomMonth) + (randomDate < 10 ? ("0"+randomDate) : ""+randomDate);
	}
	function _randomLocalPolice(){
		var first = util.randomNum(0,9);
		var second = util.randomNum(0,9);
		return first + "" + second;
	}
	function _randomSex(){
		return util.randomNum(0,9);
	}
	function generateIdcard(objParam){
		if(!util.isObject(objParam)){
			objParam = {};
		}
		//todo objParam
		var pre17Char = "" + _randomAreaCode() + _randomBirthday()  + _randomLocalPolice() + _randomSex();
		var pre17CharArr = pre17Char.split('');
		var lastChar = 0;
		for(var i = 0 ; i < pre17CharArr.length ; i++){
			lastChar += pre17CharArr[i]*ratio[i];
		}
		lastChar = matchMap[lastChar%11];
		return pre17Char + lastChar;
	}
	var outPut = {
		verify:verify,
		info:idcardinfo,
		generateIdcard:generateIdcard
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