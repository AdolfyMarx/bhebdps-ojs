module.exports = {
  clearMocks: true,
  restoreMocks: true,
  silent: true,
  collectCoverageFrom: [
    'src/js/weapons/**/*.js',
    '!src/js/weapons/**/__tests__/**',
    'src/js/characters/**/*.js',
    '!src/js/characters/**/__tests__/**',
    'src/js/game.js'
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
