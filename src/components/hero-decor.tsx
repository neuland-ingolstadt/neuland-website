import { Code, Groups, Rocket, Terminal } from './hero-icons'

type Tile = { icon: React.ReactNode; active?: boolean; x: number; y: number }

const SIZE = 72

function TileBox({
	icon,
	active
}: {
	icon: React.ReactNode
	active?: boolean
}) {
	return (
		<div
			className="relative flex items-center justify-center border border-terminal-window-border bg-black"
			style={{ width: SIZE, height: SIZE }}
		>
			<div
				className={`absolute inset-2 border ${active ? 'border-terminal-cyan' : 'border-terminal-window-border'}`}
				style={{
					backgroundImage:
						'radial-gradient(rgba(35,255,136,0.45) 1px, transparent 1px)',
					backgroundSize: '6px 6px'
				}}
			/>
			<div className="relative text-terminal-text">{icon}</div>
			<span
				className={`absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 border ${active ? 'border-terminal-cyan bg-black' : 'border-terminal-window-border bg-black'}`}
			/>
		</div>
	)
}

function Cluster({ side }: { side: 'left' | 'right' }) {
	const tiles: Tile[] =
		side === 'left'
			? [
					{ icon: <Terminal />, x: 0, y: 0 },
					{ icon: <Code />, x: 96, y: -24, active: true },
					{ icon: <Rocket />, x: 24, y: 104 }
				]
			: [
					{ icon: <Groups />, x: 0, y: 0, active: true },
					{ icon: <Rocket />, x: 56, y: 112 }
				]
	return (
		<div
			className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 xl:block ${side === 'left' ? 'left-0 -translate-x-1/4' : 'right-0 translate-x-1/4'}`}
			style={{ width: 200, height: 260 }}
			aria-hidden="true"
		>
			<svg
				className="absolute inset-0 h-full w-full overflow-visible text-terminal-window-border"
				fill="none"
				stroke="currentColor"
				strokeDasharray="1 5"
				strokeLinecap="round"
				strokeWidth="2"
			>
				<title>decor</title>
				<path d="M 36 72 V 128 H 36 M 72 36 H 96" />
				<path
					d={
						side === 'left'
							? 'M 0 36 H -120 M 60 176 V 230 H 260'
							: 'M 36 72 V 140 H 92 M 36 0 V -60 H 200'
					}
				/>
				<path
					className="text-terminal-cyan"
					stroke="#23ff88"
					strokeDasharray="none"
					d={side === 'left' ? 'M -40 36 V 110 H -8' : 'M 130 184 V 236 H 260'}
				/>
			</svg>
			{tiles.map((t, i) => (
				<div key={i} className="absolute" style={{ left: t.x, top: t.y + 40 }}>
					<TileBox icon={t.icon} active={t.active} />
				</div>
			))}
		</div>
	)
}

export default function HeroDecor() {
	return (
		<>
			<Cluster side="left" />
			<Cluster side="right" />
		</>
	)
}
