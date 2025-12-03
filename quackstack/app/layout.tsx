import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import PerformanceTuner from '@/components/PerformanceTuner';

export const metadata: Metadata = {
	title: 'Quackstack Portfolio',
	description: 'Showcasing our work and projects',
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
					<PerformanceTuner />
					<div className='bg-[rgba(255,255,255,0.11)] dark:bg-[rgba(0,0,0,0.565)] '>{children}</div>
				</ThemeProvider>
				{/* <Analytics /> */}
			</body>
		</html>
	);
}
