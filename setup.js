'use strict'
const fs = require('fs')

fs.createReadStream('.env-default')
  .pipe(fs.createWriteStream('.env'))

console.log("Created .env")