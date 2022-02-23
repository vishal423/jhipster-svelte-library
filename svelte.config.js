import adapter from '@sveltejs/adapter-auto';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					'jhipster-svelte-library': path.resolve('src/lib'),
				},
			},
		},
	},
};

export default config;
