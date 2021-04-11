const path = require('path')

const TTL = 60 * 60 * 1

module.exports = {
  env: {
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    API_URL: process.env.API_URL,
    SITE_URL: process.env.SITE_URL,
    LIMIT_RESULT: process.env.LIMIT_RESULT,
    CACHE_TTL: TTL,
    CHECK_PERIOD: TTL * 0.2,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  }
}