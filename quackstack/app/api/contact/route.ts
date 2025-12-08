import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const { first, last, email, subject, message } = await request.json();

		if (!first || !last || !email || !subject || !message) {
			return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
		}

		const emailResponse = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
			},
			body: JSON.stringify({
				from: 'QuackStack Contact Form <noreply@quackstack.net>',
				to: ['contact@quackstack.net'],
				subject: `New Contact: ${subject}`,
				html: `
					<h2>New Contact Form Submission</h2>
					<p><strong>From:</strong> ${first} ${last}</p>
					<p><strong>Email:</strong> ${email}</p>
					<p><strong>Subject:</strong> ${subject}</p>
					<p><strong>Message:</strong></p>
					<p>${message.replace(/\n/g, '<br>')}</p>
				`,
			}),
		});

		if (!emailResponse.ok) {
			throw new Error('Failed to send email');
		}

		return NextResponse.json({ success: true, message: 'Email sent successfully' });
	} catch (error) {
		console.error('Contact form error:', error);
		return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
	}
}
