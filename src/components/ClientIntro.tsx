import TypewriterText from '@/components/TypewriterText'

export default function ClientIntro() {
	return (
		<div className={'pt-20'}>
			<TypewriterText
				text="Der studentische Verein für alle informatikbegeisterten Studierenden der TH Ingolstadt."
				className="text-xl mb-12"
				delay={25}
				preventLayoutJumps={true}
			/>
		</div>
	)
}
