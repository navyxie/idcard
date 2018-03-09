const fs = require('fs')
const jsonfile = require('jsonfile')

const historyFiles = fs.readdirSync('./history')
const historyFilesData = historyFiles.map(location => jsonfile.readFileSync(`./history/${location}`))
const jsonData = historyFilesData.reduce((total, file) => Object.assign({} , total, file), {})
jsonfile.writeFileSync('./govCode.json', jsonData, { spaces: 2, EOL: '\r\n' })