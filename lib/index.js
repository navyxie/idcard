(function(){
	var root = this;
	var util = {
		isFunction:function(fn){
			return util.isType(fn,'Function');
		},
		isObject:function(obj){
			return util.isType(obj,'Object');
		},
		isArray:function(arr){
			return util.isType(arr,'Array');
		},
		isString:function(str){
			return util.isType(str,'String');
		},
		isType:function(obj,type){
			return Object.prototype.toString.call(obj) === '[object '+type+']';
		},
		extend:function(destination,source,deep){
			for(var key in source){
				if(source.hasOwnProperty(key) && source[key]){
					if(deep && util.isObject(source[key])){
						destination[key] = util.extend({},source[key],deep);
					}else{
						destination[key] = source[key];
					}
					
				}
			}
			return destination;
		},
		clone:function(obj,deep){
			if(!util.isObject(obj)){
				return obj;
			}
			return util.isArray(obj) ? obj.slice() : util.extend({},obj,deep);
		},
		makeArray:function(arr){
			var result = [];
			if(!(util.isArray(arr) || util.isType(arr,'Arguments'))){
				return result;
			}
			for(var i = 0 , len = arr.length ; i < len ; i++){
				result.push(arr[i]);
			}
			return result;
		},
		mixture:function(source,destination){
			if((util.isFunction(source) || util.isObject(source) || util.isArray()) && util.isObject(destination)){
				var keys = Object.keys(destination);
				for(var i = 0 , len = keys.length ; i < len ; i++){
					if(destination.hasOwnProperty(keys[i])){
						if(source[keys[i]]){
							throw new Error('source function hasOwnProperty : '+keys[i]);
						}
						source[keys[i]] = destination[keys[i]];
					}
				}
			}
			return;
		}
	}
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
		var lastChar = idcard.slice(idcardLen-1);
		var pre17Char = idcard.slice(0,idcardLen-1);
		var charList = pre17Char.split('');
		var totleCount = 0;
		if(!/^(\d|X)$/.test(lastChar)){
			return false;
		}
		//todo,添加对生日的判断
		for(var i = 0 , len = charList.length ; i < len ; i++){
			if(isNaN(Number(charList[i]))){
				return false;
			}
			totleCount += Number(charList[i])*ratio[i];
		}
		if(matchMap[totleCount % ratioValue] === lastChar){
			return true;
		}else{
			return false;
		}
	}
	var outPut = {
		verify:verify
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