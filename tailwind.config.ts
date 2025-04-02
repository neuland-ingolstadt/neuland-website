import type { Config } from 'tailwindcss'

export default {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}'
	],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// Original colors
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Terminal-themed colors (less green-heavy)
				terminal: {
					bg: '#121212',
					text: '#E0E0E0', // Changed from green to light gray
					cyan: '#2eceff',
					highlight: '#33cbf9',
					darkGreen: '#003300',
					muted: '#006600',
					mediumGreen: '#34df34',
					lightGreen: '#40ff40',
					window: '#111111',
					windowBorder: '#333333',
					windowTitle: '#414141'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				cursor: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0' }
				},
				typewriter: {
					to: { width: '100%' }
				},
				blink: {
					'0%': { opacity: '1' },
					'50%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				glitch: {
					'0%, 100%': {
						opacity: '1',
						textShadow: '0 0 0 rgba(64, 255, 64, 0.7)'
					},
					'10%': {
						opacity: '0.9',
						textShadow:
							'3px 0 0 rgba(64, 255, 64, 0.6), -1px 0 0 rgba(64, 255, 64, 0.6)'
					},
					'20%': {
						opacity: '0.95',
						textShadow:
							'-3px 0 0 rgba(64, 255, 64, 0.7), 1px 0 0 rgba(64, 255, 64, 0.7)'
					},
					'30%': {
						opacity: '1',
						textShadow: '0 0 0 rgba(64, 255, 64, 0.8)'
					},
					'40%': {
						opacity: '0.8',
						textShadow:
							'2px -2px 0 rgba(64, 255, 64, 0.6), -2px 2px 0 rgba(64, 255, 64, 0.6)'
					},
					'50%': {
						opacity: '0.9',
						textShadow:
							'-1px 1px 0 rgba(64, 255, 64, 0.7), 1px -1px 0 rgba(64, 255, 64, 0.7)'
					},
					'60%': {
						opacity: '0.93',
						textShadow:
							'2px 2px 0 rgba(64, 255, 64, 0.6), -2px -2px 0 rgba(64, 255, 64, 0.6)'
					},
					'70%': {
						opacity: '0.85',
						textShadow:
							'-2px 0 0 rgba(64, 255, 64, 0.5), 2px 0 0 rgba(64, 255, 64, 0.5)'
					},
					'80%': {
						opacity: '0.97',
						textShadow:
							'0 1px 0 rgba(64, 255, 64, 0.8), 0 -1px 0 rgba(64, 255, 64, 0.8)'
					},
					'90%': {
						opacity: '0.9',
						textShadow:
							'1px 1px 0 rgba(64, 255, 64, 0.7), -1px -1px 0 rgba(64, 255, 64, 0.7)'
					}
				},
				matrix: {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(100%)' }
				},
				'cyberpunk-glow': {
					'0%, 100%': {
						filter:
							'drop-shadow(0 0 4px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 3px rgba(46, 206, 255, 0.8))'
					},
					'33%': {
						filter:
							'drop-shadow(0 0 4px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 6px rgba(46, 206, 255, 0.9))'
					},
					'66%': {
						filter:
							'drop-shadow(0 0 3px rgba(255, 255, 255, 0.7)) drop-shadow(0 0 6px rgba(46, 206, 255, 0.7))'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				cursor: 'cursor 1s infinite step-end',
				typewriter: 'typewriter 2s steps(40) forwards',
				blink: 'blink 1s infinite',
				scanline: 'scanline 8s linear infinite',
				glitch: 'glitch 3500ms infinite ease-in-out',
				matrix: 'matrix 20s linear infinite',
				cyberpunk: 'cyberpunk-glow 1.5s ease-in-out infinite'
			},
			fontFamily: {
				mono: ['mono', 'monospace']
			}
		}
	},
	plugins: [require('tailwindcss-animate')]
} satisfies Config
