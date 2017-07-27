(function() {
  var root = this;
  var util = require('./util');
  var area_service = require('./area_service');
  var idcardLen = 18;
  var ratioValue = 11;
  var ratio = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; //身份证号码前17位数分别乘以不同的系数
  var matchMap = {
    0: '1',
    1: '0',
    2: 'X',
    3: '9',
    4: '8',
    5: '7',
    6: '6',
    7: '5',
    8: '4',
    9: '3',
    10: '2'
  }; //将这17位数字和系数相乘的结果相加,对11进行求余，得出身份证最后一个字符
  function verify(idcard) {
    if (!util.isString(idcard)) {
      return false;
    }
    if (idcard.length !== idcardLen) {
      return false;
    }
    //验证生日合法性
    if (!util.verifyBirthday(idcard.slice(6, 14))) {
      return false;
    }
    var lastChar = idcard.slice(idcardLen - 1);
    var pre17Char = idcard.slice(0, idcardLen - 1);
    var charList = pre17Char.split('');
    var totleCount = 0;
    if (!/^(\d|X)$/.test(lastChar)) {
      return false;
    }
    for (var i = 0, len = charList.length; i < len; i++) {
      if (isNaN(Number(charList[i]))) {
        return false;
      }
      totleCount += Number(charList[i]) * ratio[i];
    }
    if (matchMap[totleCount % ratioValue] === lastChar) {
      return area_service.hit(idcard);
    } else {
      return false;
    }
  }

  function constellation(birthday, split) {
    var arr = [];
    split = split || '';
    if (!(util.isString(birthday) || util.isNumber(birthday))) {
      return '';
    }
    birthday = birthday.toString();
    if (split) {
      arr = birthday.split(split);
    } else {
      arr[0] = birthday.slice(0, 4);
      arr[1] = birthday.slice(4, 6);
      arr[2] = birthday.slice(6, 8);
    }
    if (!arr[1] && !arr[2]) {
      return '';
    }
    try {
      arr[1] = parseInt(arr[1], 10);
      arr[2] = parseInt(arr[2], 10);
      return valuateConstellation(arr[1], arr[2]);
    } catch (e) {
      return '';
    }

  }

  function valuateConstellation(month, date) {
    var xingzuo = '';
    switch (month) {
      case 3:
        if (date >= 21) {
          xingzuo = '白羊';
        } else {
          xingzuo = '双鱼';
        }
        break;
      case 4:
        if (date >= 21) {
          xingzuo = '金牛';
        } else {
          xingzuo = '白羊';
        }
        break;
      case 5:
        if (date >= 22) {
          xingzuo = '双子';
        } else {
          xingzuo = '金牛';
        }
        break;
      case 6:
        if (date >= 22) {
          xingzuo = '巨蟹';
        } else {
          xingzuo = '双子';
        }
        break;
      case 7:
        if (date >= 23) {
          xingzuo = '狮子';
        } else {
          xingzuo = '巨蟹';
        }
        break;
      case 8:
        if (date >= 23) {
          xingzuo = '处女';
        } else {
          xingzuo = '狮子';
        }
        break;
      case 9:
        if (date >= 24) {
          xingzuo = '天秤';
        } else {
          xingzuo = '处女';
        }
        break;
      case 10:
        if (date >= 24) {
          xingzuo = '天蝎';
        } else {
          xingzuo = '天秤';
        }
        break;
      case 11:
        if (date >= 23) {
          xingzuo = '射手';
        } else {
          xingzuo = '天蝎';
        }
        break;
      case 12:
        if (date >= 22) {
          xingzuo = '摩羯';
        } else {
          xingzuo = '射手';
        }
        break;
      case 1:
        if (date >= 21) {
          xingzuo = '水瓶';
        } else {
          xingzuo = '摩羯';
        }
        break;
      case 2:
        if (date >= 20) {
          xingzuo = '双鱼';
        } else {
          xingzuo = '水瓶';
        }
        break;
    }
    return xingzuo;
  }

  function idcardinfo(idcard) {
    var valid = verify(idcard);
    var info = area_service.idcardinfo(idcard);
    info.valid = valid;
    if (info.birthday) {
      info.constellation = constellation(info.birthday);
    }
    return info;
  }

  function _randomAreaCode(objParam) {
    var areaCodeList = util.keys(area_service.areas);
    var listLen = areaCodeList.length;
    var random = areaCodeList[parseInt(Math.random() * listLen)];
    return random;
  }

  function _randomBirthday() {
    var date = new Date();
    var fullYear = date.getFullYear();
    var minYear = fullYear - 200; //当前年往后200年
    var randomYear = util.randomNum(minYear, fullYear);
    var randomMonth = util.randomNum(1, 12);
    var maxDate = 31;
    switch (randomMonth) {
      case 2:
        if (util.leapYear()) {
          maxDate = 29;
        } else {
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
    var randomDate = util.randomNum(1, maxDate);
    return randomYear + (randomMonth < 10 ? ("0" + randomMonth) : "" + randomMonth) + (randomDate < 10 ? ("0" + randomDate) : "" + randomDate);
  }

  function _randomLocalPolice() {
    var first = util.randomNum(0, 9);
    var second = util.randomNum(0, 9);
    return first + "" + second;
  }

  function _randomSex() {
    return util.randomNum(0, 9);
  }

  function generateIdcard(objParam) {
    if (!util.isObject(objParam)) {
      objParam = {};
    }
    //todo objParam
    var pre17Char = "" + _randomAreaCode() + _randomBirthday() + _randomLocalPolice() + _randomSex();
    return pre17Char + genLastChar(pre17Char);
  }

  function genLastChar(pre17Char) {
    var pre17CharArr = pre17Char.split('');
    var lastChar = 0;
    for (var i = 0; i < pre17CharArr.length; i++) {
      lastChar += pre17CharArr[i] * ratio[i];
    }
    lastChar = matchMap[lastChar % 11];
    return lastChar
  }

  function upgrade15To18(card) {
    var eighteenCard;
    card = card.toString();
    if (card.length === 15) {
      eighteenCard = card.slice(0, 6) + '19' + card.slice(6);
      eighteenCard += genLastChar(eighteenCard);
      return {
        code: 0,
        msg: '身份证15位升级到18位成功',
        card: eighteenCard
      }
    } else {
      return {
        code: -1,
        msg: '不是合法的15位身份证',
        card: card
      }
    }
  }
  var outPut = {
    verify: verify,
    info: idcardinfo,
    generateIdcard: generateIdcard,
    constellation: constellation,
    getAge: area_service.getAge,
    upgrade15To18: upgrade15To18
  }
  if (typeof exports !== 'undefined' || (typeof module !== 'undefined' && module.exports)) {
    module.exports = outPut;
  } else if (typeof define === 'function' && define.amd) {
    define('idCard', [], function() {
      return outPut;
    });
  } else if (typeof define === 'function' && define.cmd) {
    define(function() {
      return outPut;
    })
  } else {
    root.idCard = outPut;
  }
}.call(this));