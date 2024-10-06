import js from '@eslint/js'
import svelte from 'eslint-plugin-svelte'
import cypress from 'eslint-plugin-cypress/flat'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

/** @type {import('eslint').Linter.Config[]} */
export default [
	js.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	cypress.configs.recommended,
	cypress.configs.globals,
	{
		ignores: [
			'.svelte-kit',
			'node_modules',
		],
	},
	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.browser,
				vi: true
			},
		},
		rules: {
			'no-unused-vars': 'off'
		},
	},
];
