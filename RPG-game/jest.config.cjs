module.exports = {
  clearMocks: true,
  collectCoverageFrom: [
    'src/js/weapons/**/*.js',
    '!src/js/weapons/**/__tests__/**'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  coverageThreshold: {
    global: {
      lines: 70
    }
  },
  testEnvironment: 'node'
};
