'use client';

import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useMotionValue, useSpring, motion } from 'framer-motion';
import SectionHeading from '@/components/SectionHeading';
import Image from 'next/image';

const HeroSection: React.FC = () => {
	const scrollY = useMotionValue(0);
	// Removed unused hover state
	const smoothScrollY = useSpring(scrollY, { stiffness: 80, damping: 20 });
	const nakerRef = useRef(null);

	useEffect(() => {
		const handleScroll = () => scrollY.set(window.scrollY);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [scrollY]);

	useEffect(() => {
		if (!nakerRef.current) return;
		const script = document.createElement('script');
		script.src = 'https://d23jutsnau9x47.cloudfront.net/back/v1.0.9/viewer.js';
		script.async = true;
		script.setAttribute('data-who', '💎 Made with naker.io 💎');
		script.setAttribute(
			'data-option',
			JSON.stringify({
				environment: {
					gradient: 'radial',
					sensitivity: 0.8,
					colorStart: [59, 48, 0, 1],
					colorEnd: [0, 0, 0, 1],
				},
				particle: {
					life: 5,
					power: 0.01,
					texture: 'https://res.cloudinary.com/naker-io/image/upload/v1566560053/circle_05.png',
					number: 70,
					colorStart: [116, 129, 92, 0.13],
					colorEnd: [198, 188, 107, 0.52],
					sizeStart: 1.71,
					sizeEnd: 3.42,
					direction1: { x: 0, y: 0, z: 100 },
					direction2: { x: 0, y: 0, z: 0 },
				},
				waterMark: false,
			}).replace(/"/g, '|')
		);
		(nakerRef.current as HTMLDivElement).appendChild(script);
		return () => {
			if (nakerRef.current) (nakerRef.current as HTMLDivElement).innerHTML = '';
		};
	}, []);

	return (
		<section id='hero' className='relative flex flex-col items-center justify-center min-h-[90vh] py-48 text-center z-10 bg-section-primary overflow-hidden'>
			<div ref={nakerRef} className='absolute inset-0 -z-10 w-full h-full opacity-[0.35]' />
			<div className='absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_60%,rgba(251,146,60,0.18),transparent_65%)] pointer-events-none' />

			{/* Bottom fade to black */}
			<div className='absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent -z-5 pointer-events-none' />
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
				<div className='space-y-8 md:space-y-16'>
					<motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.5 }} transition={{ duration: 0.7 }} className='space-y-6 md:space-y-12'>
						<h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight'>
							<span className='block text-white mb-1 md:mb-2'>Your vision</span>
							<span
								className='block text-orange-400 glow-text mb-1 md:mb-2'
								style={{ textShadow: `0 0 20px rgba(251, 146, 60, 0.9), 0 0 40px rgba(251, 146, 60, 0.7), 0 0 60px rgba(251, 146, 60, 0.5)`, filter: 'brightness(1.3) saturate(1.2)' }}
							>
								Brought
							</span>
							<span className='block text-white'>to life.</span>
						</h1>
						<p className='text-lg sm:text-xl md:text-2xl font-thin text-gray-300 max-w-3xl mx-auto px-4 sm:px-0'>We build advanced software solutions and bring your ideas to life with cutting-edge technology and innovative design.</p>
					</motion.div>
					<motion.div
						className='flex flex-col sm:flex-row gap-4 md:gap-6 justify-center px-4 sm:px-0'
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: false, amount: 0.4 }}
						transition={{ duration: 0.6, delay: 0.1 }}
					>
						<Button
							size='lg'
							className='relative overflow-hidden cursor-pointer group px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white rounded-xl sm:rounded-2xl backdrop-blur-xl bg-gradient-to-br from-orange-500/30 via-orange-400/20 to-orange-600/30 border border-orange-400/40 shadow-[0_8px_32px_0_rgba(251,146,60,0.37)] hover:shadow-[0_8px_40px_0_rgba(251,146,60,0.6)] transition-all duration-500 hover:scale-105 hover:rotate-1 before:absolute before:inset-0 before:bg-gradient-to-r before:from-orange-300/20 before:via-transparent before:to-orange-500/20 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 after:absolute after:inset-[1px] after:rounded-xl sm:after:rounded-2xl after:bg-gradient-to-br after:from-white/10 after:via-transparent after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300'
							style={{
								zIndex: 1,
								background: 'linear-gradient(135deg, rgba(251,146,60,0.3) 0%, rgba(234,88,12,0.2) 50%, rgba(251,146,60,0.3) 100%)',
								backdropFilter: 'blur(16px) saturate(180%)',
								WebkitBackdropFilter: 'blur(16px) saturate(180%)',
								boxShadow: '0 8px 32px 0 rgba(251, 146, 60, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
							}}
							aria-label='Get started with QuackStack'
						>
							<span className='relative z-10 font-light drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300 '>Contact Us</span>
							<div className='absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500'></div>
						</Button>
						<Button
							size='lg'
							className='relative overflow-hidden cursor-pointer group px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white rounded-xl sm:rounded-2xl backdrop-blur-xl bg-gradient-to-br from-orange-500/30 via-orange-400/20 to-orange-600/30 border border-orange-400/40 shadow-[0_8px_32px_0_rgba(251,146,60,0.37)] hover:shadow-[0_8px_40px_0_rgba(251,146,60,0.6)] transition-all duration-500 hover:scale-105 hover:-rotate-1 before:absolute before:inset-0 before:bg-gradient-to-r before:from-orange-300/20 before:via-transparent before:to-orange-500/20 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 after:absolute after:inset-[1px] after:rounded-xl sm:after:rounded-2xl after:bg-gradient-to-br after:from-white/10 after:via-transparent after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300'
							style={{
								zIndex: 1,
								background: 'linear-gradient(135deg, rgba(251,146,60,0.3) 0%, rgba(234,88,12,0.2) 50%, rgba(251,146,60,0.3) 100%)',
								backdropFilter: 'blur(16px) saturate(180%)',
								WebkitBackdropFilter: 'blur(16px) saturate(180%)',
								boxShadow: '0 8px 32px 0 rgba(251, 146, 60, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
							}}
							aria-label='View showcased projects'
						>
							<span className='relative z-10 font-light drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300'>View Projects</span>
							<div className='absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500'></div>
						</Button>
					</motion.div>
				</div>
			</div>
			{/* <Image src='/laptop.svg' alt='Scroll Down' width={360} height={400} className='mx-auto animate-bounce' draggable='false' /> */}
		</section>
	);
};

export default HeroSection;
