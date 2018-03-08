const fetch = require('node-fetch')
const cheerio = require('cheerio')
const _ = require('lodash')
const jsonfile = require('jsonfile')

async function getWebsiteData(url) {
  const fetchResult = await fetch(url)
  const html = await fetchResult.text()
  const $ = cheerio.load(html)
  const fileName = $('tr').first().text().trim()
  const codeInfo = $('tr').slice(3, -4).map((i, elem) => {
    const node = cheerio(elem)
    const [code, name] = node.children('td')
      .filter((i, elem) => !_.isEmpty(cheerio(elem).text().trim()))
      .map((i, elem) => cheerio(elem).text().trim())
      .get()
    return { code, name }
  }).get().filter(i => !(_.isEmpty(i.code) || _.isEmpty(i.name)))
  return { fileName, codeInfo }
}

function genJson({ fileName, codeInfo }) {
  const jsonData = codeInfo.reduce((data, { code, name }) => {
    const [province, city, area] = _.chunk(code, 2)
    data[code] = {
      code, text: name,
      provinceCode: province.join(''),
      cityCode: [...province, ...city].join(''),
      areaCode: [...province, ...city, ...area].join('')
    }
    return data
  }, {})
  jsonfile.writeFileSync(`./history/${fileName}.json`, jsonData, { spaces: 2, EOL: '\r\n' })
  return 'success'
}

async function run() {
  const url = process.argv[2]
  if (_.isEmpty(url)) throw new Error('请传入网址')
  const data = await getWebsiteData(url)
  const result = genJson(data)
  return result
}

run()
  .then(result => console.log(result))
  .catch(error => console.error(error))