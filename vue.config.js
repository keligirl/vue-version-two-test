// vue.config.js
const path = require('path')
const fs = require('fs')
module.exports = {
  devServer: {
    open: true,
    https: {
      cert: fs.readFileSync(path.join(__dirname, 'src/ssl/cert.crt')),
      key: fs.readFileSync(path.join(__dirname, 'src/ssl/cert.key'))
    }
  }
}
