import { createLucideIcon } from 'lucide-react'

// Lucide v1 removed brand icons. These keep the outline marks the site already used.
export const GithubIcon = createLucideIcon('github', [
	[
		'path',
		{
			d: 'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4',
			key: 'github-mark'
		}
	],
	['path', { d: 'M9 18c-4.51 2-5-2-7-2', key: 'github-tail' }]
])

export const InstagramIcon = createLucideIcon('instagram', [
	[
		'rect',
		{
			width: '20',
			height: '20',
			x: '2',
			y: '2',
			rx: '5',
			ry: '5',
			key: 'instagram-frame'
		}
	],
	[
		'path',
		{
			d: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z',
			key: 'instagram-lens'
		}
	],
	[
		'line',
		{ x1: '17.5', x2: '17.51', y1: '6.5', y2: '6.5', key: 'instagram-dot' }
	]
])

export const LinkedinIcon = createLucideIcon('linkedin', [
	[
		'path',
		{
			d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z',
			key: 'linkedin-body'
		}
	],
	['rect', { width: '4', height: '12', x: '2', y: '9', key: 'linkedin-bar' }],
	['circle', { cx: '4', cy: '4', r: '2', key: 'linkedin-head' }]
])
