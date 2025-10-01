// StickyFooter component based on https://github.com/olivierlarose/sticky-footer
import React from 'react';

import { useEffect, useRef, useState } from 'react';

const StickyFooter: React.FC = () => {
	const [scrollY, setScrollY] = useState(0);
	const footerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Parallax effect: background color shifts slightly with scroll
	const bgOpacity = 0.85 + 0.15 * Math.sin(scrollY * 0.002);
	const shadowStrength = 0.2 + 0.2 * Math.abs(Math.sin(scrollY * 0.002));

	return (
		<footer
			ref={footerRef}
			className='sticky-footer w-full text-gray-400 border-t border-orange-500/20 py-16 flex flex-col items-center justify-center mt-auto relative overflow-hidden'
			style={{
				background: `rgba(0,0,0,${bgOpacity})`,
				boxShadow: `0 -8px 48px 0 rgba(251,191,36,${shadowStrength})`,
				minHeight: '220px',
				zIndex: 10,
			}}
		>
			<div className='max-w-7xl w-full flex flex-col md:flex-row items-center justify-between px-4'>
				<div className='flex items-center mb-4 md:mb-0'>
					<img src='/logo.svg' alt='QuackStack Logo' className='h-16 w-auto mr-4' style={{ filter: 'drop-shadow(0 4px 32px #fbbf24cc)' }} />
				</div>
				<div className='text-base text-center md:text-right space-y-1'>
					<p className='hover:text-orange-400 transition-colors duration-200 cursor-pointer'>Terms & Privacy</p>
					<p className='tracking-wide font-semibold'>Copyright © 2024 QuackStack Ltd</p>
				</div>
			</div>
			<div className='absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-[60vw] h-32 bg-gradient-to-t from-orange-500/30 to-transparent rounded-full blur-2xl pointer-events-none' />
		</footer>
	);
};

export default StickyFooter;
