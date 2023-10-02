import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'

const config = defineConfig({
	plugins: [sveltekit()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './vitest-setup.js',
		css: true,
		coverage: {
			reportsDirectory: './.svelte-kit/js-coverage/',
			exclude: ['.svelte-kit']
		}
	},
})

export default config
