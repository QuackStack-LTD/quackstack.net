// ParallaxBackground based on https://github.com/olivierlarose/background-image-parallax
import React, { useEffect, useRef } from 'react';

const ParallaxBackground: React.FC = () => {
	const bgRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleScroll = () => {
			if (!bgRef.current) return;
			const scrollY = window.scrollY;
			bgRef.current.style.backgroundPositionY = `${-scrollY * 0.3}px`;
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div
			ref={bgRef}
			className='fixed inset-0 -z-10 w-full h-full bg-cover bg-center transition-all duration-300'
			style={{
				backgroundImage: "url('/placeholder.jpg')", // Replace with your image
				backgroundAttachment: 'scroll',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				willChange: 'background-position',
			}}
		/>
	);
};

export default ParallaxBackground;
