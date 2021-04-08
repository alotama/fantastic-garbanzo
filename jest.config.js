module.exports = {
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `<rootDir>/__mocks__/fileMock.js`,
    "^@utils/helpers": "<rootDir>/utils/helpers/index.js",
    "^@utils/parsers": "<rootDir>/utils/parsers/index.js",
    "^@utils/template": "<rootDir>/utils/template/index.js",
    "^@utils/fetchers": "<rootDir>/utils/fetchers/index.js",
    "^@components/(.*)$": "<rootDir>/utils/fetchers/index.js",
  }
}