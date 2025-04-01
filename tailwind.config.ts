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
					window: '#1E1E1E',
					windowBorder: '#333333',
					windowTitle: '#555555'
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
				scanline: {
					'0%': { transform: 'translateY(0%)' },
					'100%': { transform: 'translateY(100%)' }
				},
				glitch: {
					'0%, 100%': { clipPath: 'inset(50% 0 50% 0)' },
					'10%': { clipPath: 'inset(0% 0 85% 0)' },
					'20%': { clipPath: 'inset(25% 0 60% 0)' },
					'30%': { clipPath: 'inset(50% 0 50% 0)' },
					'40%': { clipPath: 'inset(15% 0 65% 0)' },
					'50%': { clipPath: 'inset(38% 0 61% 0)' },
					'60%': { clipPath: 'inset(75% 0 23% 0)' },
					'70%': { clipPath: 'inset(5% 0 69% 0)' },
					'80%': { clipPath: 'inset(82% 0 17% 0)' },
					'90%': { clipPath: 'inset(32% 0 41% 0)' }
				},
				matrix: {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(100%)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				cursor: 'cursor 1s infinite step-end',
				typewriter: 'typewriter 2s steps(40) forwards',
				blink: 'blink 1s infinite',
				scanline: 'scanline 8s linear infinite',
				glitch: 'glitch 500ms infinite',
				matrix: 'matrix 20s linear infinite'
			},
			fontFamily: {
				mono: ['mono', 'monospace']
			}
		}
	},
	plugins: [require('tailwindcss-animate')]
} satisfies Config
