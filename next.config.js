const path = require('path')

module.exports = {
  env: {
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    API_URL: process.env.API_URL,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}