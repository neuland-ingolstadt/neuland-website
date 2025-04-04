import path from 'node:path'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
// biome-ignore lint/correctness/noUnusedVariables: config file
export default defineConfig(({ mode }) => ({
	server: {
		host: '::',
		port: 8080
	},
	plugins: [react()].filter(Boolean),
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	assetsInclude: ['**/*.md']
}))
