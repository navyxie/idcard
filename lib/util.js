var nativeKeys = Object.keys;
var util = {
  isObject: function(obj) {
    return util.isType(obj, 'Object');
  },
  isString: function(str) {
    return util.isType(str, 'String');
  },
  isFunction: function(fn) {
    return util.isType(fn, 'Function');
  },
  isNumber: function(fn) {
    return util.isType(fn, 'Number');
  },
  isType: function(obj, type) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
  },
  verifyBirthday: function(birthday) {
    //验证生日合法性
    if (!util.isString(birthday) || birthday.length !== 8) {
      return false;
    }
    var year = birthday.slice(0, 4),
      month = birthday.slice(4, 6),
      date = birthday.slice(6, 8);
    var flag = false;
    if (isNaN(Number(year)) || isNaN(Number(month)) || isNaN(Number(date))) {
      return false;
    }
    year = Number(year), month = Number(month), date = Number(date);
    if (year > new Date().getFullYear()) {
      return false;
    }
    var FebDay = 28;
    if (util.leapYear(year)) {
      FebDay = 29;
    }
    switch (month) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        flag = util.inRange(date, 1, 31);
        break;
      case 2:
        flag = util.inRange(date, 1, FebDay);
        break;
      case 4:
      case 6:
      case 9:
      case 11:
        flag = util.inRange(date, 1, 30);
        break;
    }
    return flag;
  },
  leapYear: function(year) {
    if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
      return true;
    } else {
      return false;
    }
  },
  inRange: function(val, min, max) {
    if (val >= min && val <= max) {
      return true;
    }
    return false;
  },
  getDefaultIdcardInfoReturn: function() {
    return {
      valid: false
    };
  },
  keys: function(obj) {
    if (!util.isObject(obj)) {
      return [];
    }
    if (util.isFunction(nativeKeys)) {
      return nativeKeys(obj)
    }
    var keys = [];
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        keys.push(i);
      }
    }
    return keys;
  },
  randomNum: function(min, max) {
    if (isNaN(min) || isNaN(max)) {
      return undefined;
    }
    if (min > max) {
      var tmp = max;
      max = min;
      min = tmp;
    }
    return min + parseInt((Math.random() * (max - min)));
  }
}
module.exports = util;