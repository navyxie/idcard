var fs = require('fs')
var jsonfile = require('jsonfile')
var _ = require('lodash')
const originArea = require('../lib/province_city_area_code').areas
const originCity = require('../lib/province_city_area_code').citys
const originProvince = require('../lib/province_city_area_code').provinces

const municipality = ['11', '12', '31', '50']

function read () {
  var codeInfo = jsonfile.readFileSync('./govCode.json', { encoding: 'utf-8' })
  const areaArray = _.map(codeInfo, ({text}, code) => [chunkCode(code), text])
  var province = areaArray.filter(t => t[0][1] + t[0][2] === '0000')
  // var city = areaArray.filter(t => (t[0][2] === '00' && t[0][1] === '01') || (municipality.indexOf(t[0][0]) !== -1 && t[0][1] !== '00'))
  const city = areaArray.filter(t => {
    if (municipality.includes(t[0][0])) {
      // 处理直辖市逻辑
      return t[0][1] !== '00'
    } else {
      // 非直辖市
      return t[0][1] + t[0][2] !== '0000' && t[0][2] === '00'
    }
  })
  const area = areaArray.filter(t => t[0][1] + t[0][2] !== '0000' && t[0][2] !== '00')
  const districts = city
    .filter(t => !municipality.includes(t[0][0])) // 去掉直辖市
    .map(t => [[t[0][0], t[0][1], '01'], '市辖区'])
  genProvince(province)
  genCity(city)
  genArea([...area, ...districts])
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
  var writeData = _.assign({}, /**originProvince, **/ jsonData)
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
      '02': '县',
      '03': '市'
    }
    _.set(data, cityCode, {
      code: isMunicipality ? cityCode + '00' : codes.join(''),
      text: isMunicipality ? municipalityText[codes[1]] : text
    })
    return data
  }, {})
  var writeData = _.assign({}, /**originCity, **/ jsonData)
  jsonfile.writeFileSync('./lib/data/city.json', writeData, {spaces: 2, EOL: '\r\n'})
}

function genArea (area) {
  var jsonData = area.reduce((data, areaInfo) => {
    var codes = areaInfo[0]
    var text = areaInfo[1]
    var isDistricts = codes[2] === '01'
    _.set(data, codes[0] + codes[1] + codes[2], {
      code: codes.join(''),
      text: isDistricts ? '市辖区' : text
    })
    return data
  }, {})
  var writeData = _.assign({}, /** originArea, **/ jsonData)
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
