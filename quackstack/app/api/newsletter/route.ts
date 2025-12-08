import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const { email } = await request.json();

		// Validate email
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
		}

		const emailResponse = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
			},
			body: JSON.stringify({
				from: 'QuackStack Newsletter <noreply@quackstack.net>',
				to: ['contact@quackstack.net'],
				subject: 'New Newsletter Subscription',
				html: `
					<h2>New Newsletter Subscription</h2>
					<p><strong>Email:</strong> ${email}</p>
					<p><strong>Subscribed at:</strong> ${new Date().toLocaleString()}</p>
				`,
			}),
		});

		if (!emailResponse.ok) {
			throw new Error('Failed to send notification email');
		}

		return NextResponse.json({ success: true, message: 'Subscription successful' });
	} catch (error) {
		console.error('Newsletter subscription error:', error);
		return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
	}
}
