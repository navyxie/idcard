var fs = require('fs')
var jsonfile = require('jsonfile')
var _ = require('lodash')
var originArea = require('../lib/province_city_area_code').areas
var originCity = require('../lib/province_city_area_code').citys
var originProvince = require('../lib/province_city_area_code').provinces

var municipality = ['11', '12', '31', '50']

function read () {
  var txt = fs.readFileSync('./code.txt', { encoding: 'utf-8' })
  var areaArray = txt.split('\n').map(t => t.split('\t').filter(t => !!t).map(t => t.trim())).map(t => {
    return [chunkCode(t[0]), t[1]]
  })
  // return areaArray
  var province = areaArray.filter(t => t[0][1] + t[0][2] === '0000')
  var city = areaArray.filter(t => (t[0][2] === '00' && t[0][1] === '01') || (municipality.indexOf(t[0][0]) !== -1 && t[0][1] !== '00'))
  var area = areaArray.filter(t => t[0][1] + t[0][2] !== '0000' && t[0][2] !== '00')
  genProvince(province)
  genCity(city)
  genArea(area)
// return area
}

function chunkCode (code) {
  var codeNumbers = code.split('')
  var province = codeNumbers[0] + codeNumbers[1]
  var city = codeNumbers[2] + codeNumbers[3]
  var area = codeNumbers[4] + codeNumbers[5]
  return [province, city, area]
}

function genProvince (province) {
  var jsonData = province.reduce((data, provinceInfo) => {
    var codes = provinceInfo[0]
    var text = provinceInfo[1]
    _.set(data, codes[0], {
      code: codes.join(''),
      text: text
    })
    return data
  }, {})
  var writeData = _.assign({}, originProvince, jsonData)
  jsonfile.writeFileSync('./lib/data/province.json', writeData, {spaces: 2, EOL: '\r\n'})
}

function genCity (city) {
  var jsonData = city.reduce((data, cityInfo) => {
    var codes = cityInfo[0]
    var text = cityInfo[1]
    var isMunicipality = municipality.indexOf(codes[0]) !== -1
    var cityCode = codes[0] + codes[1]    
    var municipalityText = {
      '01': '市辖区',
      '02': '县'
    }
    _.set(data, cityCode, {
      code: isMunicipality ? cityCode + '00' : codes.join(''),
      text: isMunicipality ? municipalityText[codes[1]] : text
    })
    return data
  }, {})
  var writeData = _.assign({}, originCity, jsonData)
  jsonfile.writeFileSync('./lib/data/city.json', writeData, {spaces: 2, EOL: '\r\n'})
}

function genArea (area) {
  var jsonData = area.reduce((data, areaInfo) => {
    var codes = areaInfo[0]
    var text = areaInfo[1]
    _.set(data, codes[0] + codes[1] + codes[2], {
      code: codes.join(''),
      text: text
    })
    return data
  }, {})
  var writeData = _.assign({}, originArea, jsonData)
  jsonfile.writeFileSync('./lib/data/area.json', writeData, {spaces: 2, EOL: '\r\n'})
}

function originCodes () {
  var origin = require('./lib/province_city_area_code')
  var provinces = origin.provinces
  var citys = origin.citys
  var areas = origin.areas
  var fixProvinces = _.chain(provinces).mapKeys(function (value, key) { return value.code }).mapValues(function (value) { return value.text }).value()
  var fixcitys = _.chain(citys).mapKeys(function (value, key) { return value.code }).mapValues(function (value) { return value.text }).value()
  var fixareas = _.chain(areas).mapKeys(function (value, key) { return value.code }).mapValues(function (value) { return value.text }).value()
  var txt = fs.readFileSync('./code.txt', { encoding: 'utf-8' })
  var areaArray = txt.split('\n')
  var originObject = _.merge({}, fixProvinces, fixcitys, fixareas)
  return originObject
}

if (!module.parent) {
  console.log(read())
  // console.log(originCodes())
}
