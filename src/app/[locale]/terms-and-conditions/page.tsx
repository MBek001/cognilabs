import type { Metadata } from 'next'
import { SITE_URL } from '~/lib/seo'
import Footer from '~/components/Footer'

// NOTE: This is a generic Terms & Conditions template for an IT services company.
// Have it reviewed by a lawyer before relying on it legally.

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const title = 'Terms and Conditions — Cognilabs'
	const description =
		'Terms and conditions governing the use of the Cognilabs website and IT services in Uzbekistan.'
	return {
		title,
		description,
		alternates: {
			canonical: `${SITE_URL}/${locale}/terms-and-conditions`,
			languages: {
				en: `${SITE_URL}/en/terms-and-conditions`,
				uz: `${SITE_URL}/uz/terms-and-conditions`,
				ru: `${SITE_URL}/ru/terms-and-conditions`,
				'x-default': `${SITE_URL}/en/terms-and-conditions`,
			},
		},
		robots: { index: true, follow: true },
	}
}

const sections: { heading: string; body: string[] }[] = [
	{
		heading: '1. Acceptance of Terms',
		body: [
			'By accessing or using the Cognilabs website (www.cognilabs.org) or engaging our services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the website or our services.',
		],
	},
	{
		heading: '2. Services',
		body: [
			'Cognilabs provides IT and software development services, including web development, mobile application development, AI solutions, Telegram bots, CRM/ERP systems, UI/UX design, and related digital services. The scope, timeline, and pricing of each engagement are defined in a separate written agreement or proposal.',
		],
	},
	{
		heading: '3. Use of the Website',
		body: [
			'You agree to use the website lawfully and not to attempt to disrupt, damage, or gain unauthorized access to any part of it. You may not use the website to transmit harmful code or to infringe the rights of others.',
		],
	},
	{
		heading: '4. Intellectual Property',
		body: [
			'All content on this website — including text, graphics, logos, and code — is the property of Cognilabs or its licensors and is protected by applicable intellectual property laws. Ownership of deliverables produced under a client engagement is governed by the relevant service agreement.',
		],
	},
	{
		heading: '5. Payment and Refunds',
		body: [
			'Fees, payment schedules, and refund conditions are set out in the individual service agreement for each project. Unless otherwise agreed in writing, invoices are due within the period stated on the invoice.',
		],
	},
	{
		heading: '6. Client Responsibilities',
		body: [
			'Clients agree to provide timely access to information, content, approvals, and resources reasonably required to deliver the services. Delays caused by the client may affect timelines and costs.',
		],
	},
	{
		heading: '7. Warranties and Disclaimer',
		body: [
			'The website is provided on an "as is" and "as available" basis without warranties of any kind, express or implied. We do not warrant that the website will be uninterrupted, error-free, or free of harmful components.',
		],
	},
	{
		heading: '8. Limitation of Liability',
		body: [
			'To the maximum extent permitted by law, Cognilabs shall not be liable for any indirect, incidental, or consequential damages arising from the use of the website or services. Our total liability for any claim shall not exceed the amount paid for the specific service giving rise to the claim.',
		],
	},
	{
		heading: '9. Third-Party Links and Services',
		body: [
			'The website may contain links to third-party websites or use third-party services. We are not responsible for the content, policies, or practices of any third party.',
		],
	},
	{
		heading: '10. Termination',
		body: [
			'We may suspend or terminate access to the website at our discretion if these Terms are violated. Termination of service engagements is governed by the applicable service agreement.',
		],
	},
	{
		heading: '11. Governing Law',
		body: [
			'These Terms are governed by the laws of the Republic of Uzbekistan. Any disputes shall be subject to the jurisdiction of the competent courts of Uzbekistan, unless otherwise agreed in a service agreement.',
		],
	},
	{
		heading: '12. Changes to These Terms',
		body: [
			'We may update these Terms from time to time. The updated version will be posted on this page with a revised effective date. Continued use of the website constitutes acceptance of the updated Terms.',
		],
	},
	{
		heading: '13. Contact',
		body: [
			'For questions about these Terms, contact us at info@cognilabs.org or visit www.cognilabs.org.',
		],
	},
]

export default function TermsPage() {
	return (
		<div className='bg-black'>
			<div className='max-w-4xl mx-auto py-10 pt-40 px-4 text-white'>
				<h1 className='text-3xl md:text-4xl font-bold mb-2'>Terms and Conditions</h1>
				<p className='text-gray-400 mb-10'>
					Please read these terms carefully before using our website or services.
				</p>

				<div className='space-y-8'>
					{sections.map(section => (
						<section key={section.heading}>
							<h2 className='text-2xl font-semibold mb-3'>{section.heading}</h2>
							{section.body.map((paragraph, i) => (
								<p key={i} className='text-gray-300 leading-relaxed'>
									{paragraph}
								</p>
							))}
						</section>
					))}
				</div>
			</div>
			<Footer />
		</div>
	)
}
