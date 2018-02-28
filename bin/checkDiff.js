// before & after
var _ = require('lodash')
var beforeProvince = require('../lib/province_city_area_code').originProvince;
var beforeCity = require('../lib/province_city_area_code').originCity;
var beforeArea = require('../lib/province_city_area_code').originArea;
var afterProvince = require('../lib/data/province.json');
var afterCity = require('../lib/data/city.json');
var afterArea = require('../lib/data/area.json');

// 检查原来的code是否被改变
// 检查新增了什么

/**
 * 检查两份文件有什么不同
 * @param {Object} before 
 * @param {Object} after 
 */
function check (before, after) {
  var beforeArr = objectToArray(before);
  var afterArr = objectToArray(after);
  var diff = _.differenceWith(afterArr, beforeArr, _.isEqual);
  // console.log(diff, diff.length)
  var results = _.map(diff, function (value) {
    var be = before[value.key];
    var af = after[value.key];
    return {be: be, af: af};
  });
  // console.log(results, results.length);
  results.forEach(function (result) {
    var type = !result.be ? '新增' : '替换'
    console.log(type, ': ', attrDiff(result.be, result.af));
  })
}

function objectToArray (obj) {
  return _.map(obj, function (value, key) {
    return _.assign({}, value, {key: key})
  });
}

function attrDiff (before, after) {
  var afCode = after.code
  var afText = after.text
  if (!before) return 'code ' + afCode + ' text: ' + afText;
  return 'code: ' + before.code + ' 替换为: ' + afCode + ' , text: ' + before.text + ' 替换为: ' + afText;
}

check(beforeArea, afterArea)