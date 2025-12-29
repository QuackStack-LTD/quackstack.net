import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
	metadataBase: new URL('https://quackstack.net'),
	title: 'QuackStack - Web Development & Design Studio',
	description: 'We build modern, scalable web applications using cutting-edge technologies. Specializing in React, Next.js, and full-stack development.',
	keywords: ['web development', 'design', 'react', 'next.js', 'full-stack', 'UI/UX'],
	authors: [{ name: 'QuackStack Ltd.' }],
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://quackstack.net',
		siteName: 'QuackStack',
		title: 'QuackStack - Web Development & Design Studio',
		description: 'We build modern, scalable web applications using cutting-edge technologies. Specializing in React, Next.js, and full-stack development.',
		images: [
			{
				url: '/og-image.png',
				width: 1200,
				height: 630,
				alt: 'QuackStack - Web Development & Design Studio',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'QuackStack - Web Development & Design Studio',
		description: 'We build modern, scalable web applications using cutting-edge technologies.',
		images: ['/og-image.png'],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
				<ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
					<div className='bg-[rgba(255,255,255,0.3)] dark:bg-[rgba(0,0,0,0.565)] '>{children}</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
