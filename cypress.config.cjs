const { defineConfig } = require('cypress')

module.exports = defineConfig({
	e2e: {
		baseUrl: 'http://localhost:3000',
		video: false,
		retries: 1,
		specPattern: 'cypress/integration/**/*.spec.js',
		supportFile: 'cypress/support/index.js',
	},
})
