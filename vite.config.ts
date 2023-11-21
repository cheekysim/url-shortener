import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 4006,
		strictPort: true,
		proxy: {
			'/api': {
				target: 'http://localhost:4005/api/v1',
				changeOrigin: true,
				rewrite: (path) => path.replace(/\/api/, ''),
				configure: (proxy) => {
					proxy.on('error', (err) => {
						console.log('proxy error', err);
					});
					proxy.on('proxyReq', (proxyReq, req) => {
						console.log('Sending Request to the Target:', req.method, req.url);
					});
					proxy.on('proxyRes', (proxyRes, req) => {
						console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
					});
				}
			}
		}
	},
	preview: {
		open: true,
		port: 4006,
		strictPort: true,
		proxy: {
			'/api': {
				target: 'http://192.168.1.75:4005/api/v1',
				changeOrigin: true,
				rewrite: (path) => path.replace(/\/api/, '')
			}
		}
	}
});
