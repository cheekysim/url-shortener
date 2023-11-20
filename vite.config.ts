import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 4006,
		strictPort: true,
		proxy: {
			'/api': {
				target: 'http://localhost:4005/api',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			}
		}
	},
	preview: {
		open: true,
		port: 4006,
		strictPort: true,
		proxy: {
			'/api': {
				target: 'http://192.168.1.75:4005/api',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			}
		}
	}
});
