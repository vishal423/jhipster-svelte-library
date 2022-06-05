module.exports = {
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.svelte$': 'svelte-jester',
	},
	testMatch: ['<rootDir>/(src/**/*.spec.js)'],
	transformIgnorePatterns: [],
	moduleFileExtensions: ['js', 'svelte'],
	extensionsToTreatAsEsm: ['.svelte'],
	moduleNameMapper: {
		'^\\$lib(.*)$': '<rootDir>/src/lib$1',
	},
	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
	resolver: 'jest-svelte-resolver',
	coverageDirectory: '<rootDir>/.svelte-kit/jest-coverage/',
	cacheDirectory: '<rootDir>/.svelte-kit/jest-cache',
	reporters: ['default'],
}
