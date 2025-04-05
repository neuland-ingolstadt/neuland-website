import TypewriterText from '@/components/TypewriterText'
import type React from 'react'

interface HeaderIntroTextProps {
	className?: string
}

const HeaderIntroText: React.FC<HeaderIntroTextProps> = ({
	className = ''
}) => {
	return (
		<div className={`pt-20 ${className}`}>
			<TypewriterText
				text="Der studentische Verein für alle informatikbegeisterten Studierenden der TH Ingolstadt."
				className="text-xl mb-12"
				delay={30}
				preventLayoutJumps={true}
			/>
		</div>
	)
}

export default HeaderIntroText
