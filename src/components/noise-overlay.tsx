import { useId } from 'react'

export default function NoiseOverlay({ opacity = 0.05 }: { opacity?: number }) {
	const id = `noise-${useId().replace(/:/g, '')}`

	return (
		<svg
			aria-hidden="true"
			className="absolute inset-0 h-full w-full"
			xmlns="http://www.w3.org/2000/svg"
		>
			<filter id={id} x="0" y="0" width="100%" height="100%">
				<feTurbulence
					type="fractalNoise"
					baseFrequency="0.8"
					numOctaves="3"
					stitchTiles="stitch"
				/>
				<feColorMatrix type="saturate" values="0" />
			</filter>
			<rect
				width="100%"
				height="100%"
				filter={`url(#${id})`}
				opacity={opacity}
			/>
		</svg>
	)
}
