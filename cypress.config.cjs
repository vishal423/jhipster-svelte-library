const { defineConfig } = require('cypress')

module.exports = defineConfig({
	e2e: {
		baseUrl: 'http://localhost:4173',
		video: false,
		retries: 1,
		experimentalSessionAndOrigin: true,
		specPattern: 'cypress/integration/**/*.spec.js',
		supportFile: 'cypress/support/index.js',
	},
})
