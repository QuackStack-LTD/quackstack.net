'use client';

import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import FadeUp from './FadeUp';
import { useReducedEffects } from '@/hooks/use-reduced-effects';

const HeroSection: React.FC = () => {
	const reduced = useReducedEffects();
	const nakerRef = useRef(null);

	return (
		<section id='home' className='relative flex flex-col items-center justify-center min-h-[70vh] sm:min-h-[90vh] py-20 sm:py-48 text-center z-10 overflow-hidden'>
			<div ref={nakerRef} className='absolute inset-0 -z-10 w-full h-full opacity-[0.35]' />
			<div className='absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_60%,rgba(var(--duck-rgb),0.18),transparent_35%)] pointer-events-none' />

			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
				<div className='space-y-8 md:space-y-16'>
					{reduced ? (
						<>
							<div className='space-y-6 md:space-y-12'>
								<h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight'>
									<span className='block text-foreground mb-1 md:mb-2'>Your vision</span>
									<span className='block text-primary mb-1 md:mb-2'>Brought</span>
									<span className='block text-foreground'>to life.</span>
								</h1>
								<p className='text-lg sm:text-xl md:text-2xl font-thin text-foreground/70 max-w-3xl mx-auto px-4 sm:px-0'>
									We build advanced software solutions and bring your ideas to life with cutting-edge technology and innovative design.
								</p>
							</div>
							<div className='flex flex-col sm:flex-row gap-4 md:gap-6 justify-center px-4 sm:px-0'>
								<Button
									size='lg'
									onClick={() => {
										const contactSection = document.getElementById('contact');
										contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
									}}
									className='relative overflow-hidden cursor-pointer group px-8 py-4 text-lg font-semibold text-primary dark:text-white rounded-2xl backdrop-blur-xl bg-[var(--gradient-primary)] border-[rgba(var(--duck-rgb),0.28)] shadow-[0_8px_32px_0_rgba(var(--duck-rgb),0.37)] hover:shadow-[0_8px_40px_0_rgba(var(--duck-rgb),0.6)] transition-all duration-500 hover:scale-105 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[rgba(var(--duck-rgb),0.12)] before:via-transparent before:to-[rgba(var(--duck-rgb),0.12)] before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 after:absolute after:inset-[1px] after:rounded-2xl after:bg-gradient-to-br after:from-white/10 after:via-transparent after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300'
									style={{
										zIndex: 1,
										background: 'linear-gradient(135deg, rgba(var(--duck-rgb),0.32) 0%, rgba(var(--duck-rgb),0.18) 50%, rgba(var(--duck-rgb),0.32) 100%)',
										backdropFilter: 'blur(16px) saturate(180%)',
										WebkitBackdropFilter: 'blur(16px) saturate(180%)',
										boxShadow: '0 8px 32px 0 rgba(var(--duck-rgb), 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
									}}
									aria-label='Get started with QuackStack'
								>
									<span className='relative z-10 font-light drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300 light:text-orange-300'>Contact Us</span>
									<div className='absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
								</Button>
								<Button
									size='lg'
									onClick={() => {
										const projectsSection = document.getElementById('projects');
										projectsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
									}}
									className='relative overflow-hidden cursor-pointer group px-8 py-4 text-lg font-semibold text-primary dark:text-white rounded-2xl backdrop-blur-xl bg-[var(--gradient-primary)] border-[rgba(var(--duck-rgb),0.28)] shadow-[0_8px_32px_0_rgba(var(--duck-rgb),0.37)] hover:shadow-[0_8px_40px_0_rgba(var(--duck-rgb),0.6)] transition-all duration-500 hover:scale-105 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[rgba(var(--duck-rgb),0.12)] before:via-transparent before:to-[rgba(var(--duck-rgb),0.12)] before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 after:absolute after:inset-[1px] after:rounded-2xl after:bg-gradient-to-br after:from-white/10 after:via-transparent after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300'
									style={{
										zIndex: 1,
										background: 'linear-gradient(135deg, rgba(var(--duck-rgb),0.32) 0%, rgba(var(--duck-rgb),0.18) 50%, rgba(var(--duck-rgb),0.32) 100%)',
										backdropFilter: 'blur(16px) saturate(180%)',
										WebkitBackdropFilter: 'blur(16px) saturate(180%)',
										boxShadow: '0 8px 32px 0 rgba(var(--duck-rgb), 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
									}}
									aria-label='View showcased projects'
								>
									<span className='relative z-10 font-light drop-shadow-sm transition-all duration-300'>View Projects</span>
									<div className='absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
								</Button>
							</div>
						</>
					) : (
						<>
							<FadeUp duration={1} viewport={{ once: true, amount: 0.5 }} className='space-y-6 md:space-y-12'>
								<h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight'>
									<span className='block text-foreground mb-1 md:mb-2'>Your vision</span>
									<span className='block text-primary mb-1 md:mb-2'>Brought</span>
									<span className='block text-foreground'>to life.</span>
								</h1>
								<p className='text-lg sm:text-xl md:text-2xl font-thin text-foreground/70 max-w-3xl mx-auto px-4 sm:px-0'>
									We build advanced software solutions and bring your ideas to life with cutting-edge technology and innovative design.
								</p>
							</FadeUp>
							<FadeUp duration={1.3} delay={0.05} viewport={{ once: true, amount: 0.4 }} className='flex flex-col sm:flex-row gap-4 md:gap-6 justify-center px-4 sm:px-0'>
								<Button
									size='lg'
									onClick={() => {
										const contactSection = document.getElementById('contact');
										contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
									}}
									className='relative overflow-hidden cursor-pointer group px-8 py-4 text-lg font-semibold text-primary dark:text-white rounded-2xl backdrop-blur-xl bg-[var(--gradient-primary)] border-[rgba(var(--duck-rgb),0.28)] shadow-[0_8px_32px_0_rgba(var(--duck-rgb),0.37)] hover:shadow-[0_8px_40px_0_rgba(var(--duck-rgb),0.6)] transition-all duration-500 hover:scale-105 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[rgba(var(--duck-rgb),0.12)] before:via-transparent before:to-[rgba(var(--duck-rgb),0.12)] before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 after:absolute after:inset-[1px] after:rounded-2xl after:bg-gradient-to-br after:from-white/10 after:via-transparent after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300'
									style={{
										zIndex: 1,
										background: 'linear-gradient(135deg, rgba(var(--duck-rgb),0.32) 0%, rgba(var(--duck-rgb),0.18) 50%, rgba(var(--duck-rgb),0.32) 100%)',
										backdropFilter: 'blur(16px) saturate(180%)',
										WebkitBackdropFilter: 'blur(16px) saturate(180%)',
										boxShadow: '0 8px 32px 0 rgba(var(--duck-rgb), 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
									}}
									aria-label='Get started with QuackStack'
								>
									<span className='relative z-10 font-light drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300 light:text-orange-300'>Contact Us</span>
									<div className='absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
								</Button>
								<Button
									size='lg'
									onClick={() => {
										const projectsSection = document.getElementById('projects');
										projectsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
									}}
									className='relative overflow-hidden cursor-pointer group px-8 py-4 text-lg font-semibold text-primary dark:text-white rounded-2xl backdrop-blur-xl bg-[var(--gradient-primary)] border-[rgba(var(--duck-rgb),0.28)] shadow-[0_8px_32px_0_rgba(var(--duck-rgb),0.37)] hover:shadow-[0_8px_40px_0_rgba(var(--duck-rgb),0.6)] transition-all duration-500 hover:scale-105 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[rgba(var(--duck-rgb),0.12)] before:via-transparent before:to-[rgba(var(--duck-rgb),0.12)] before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 after:absolute after:inset-[1px] after:rounded-2xl after:bg-gradient-to-br after:from-white/10 after:via-transparent after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300'
									style={{
										zIndex: 1,
										background: 'linear-gradient(135deg, rgba(var(--duck-rgb),0.32) 0%, rgba(var(--duck-rgb),0.18) 50%, rgba(var(--duck-rgb),0.32) 100%)',
										backdropFilter: 'blur(16px) saturate(180%)',
										WebkitBackdropFilter: 'blur(16px) saturate(180%)',
										boxShadow: '0 8px 32px 0 rgba(var(--duck-rgb), 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
									}}
									aria-label='View showcased projects'
								>
									<span className='relative z-10 font-light drop-shadow-sm transition-all duration-300'>View Projects</span>
									<div className='absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
								</Button>
							</FadeUp>
						</>
					)}
				</div>
			</div>
			{/* <Image src='/laptop.svg' alt='Scroll Down' width={360} height={400} className='mx-auto animate-bounce' draggable='false' /> */}
		</section>
	);
};

export default HeroSection;
