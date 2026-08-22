import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [
		tsConfigPaths({ projects: ['./tsconfig.json'] }),
		tailwindcss(),
		tanstackStart({
			server: {
				build: {
					inlineCss: true
				}
			}
		}),
		nitro({ preset: 'node-server' }),
		viteReact({
			babel: {
				plugins: [['babel-plugin-react-compiler', {}]]
			}
		})
	]
})
