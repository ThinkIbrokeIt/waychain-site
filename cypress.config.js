const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://waychain.org',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    video: false,
    defaultCommandTimeout: 15000,
    requestTimeout: 15000,
    retries: {
      runMode: 1,
      openMode: 0,
    },
    env: {
      // The live RPC endpoint the site reads from.
      rpcUrl: 'https://api.waychain.org',
    },
  },
});
