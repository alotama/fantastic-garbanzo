const path = require('path')

module.exports = {
  env: {
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    API_URL: process.env.API_URL,
    SITE_URL: process.env.SITE_URL,
    LIMIT_RESULT: process.env.LIMIT_RESULT,
    CACHE_TTL: 9000,
    CHECK_PERIOD: 10000,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  }
}