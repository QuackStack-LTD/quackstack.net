// StickyFooter component based on https://github.com/olivierlarose/sticky-footer
'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import ThemedLogo from './ThemedLogo';

const Content = () => {
	return (
		<div className='bg-gradient-to-b from-[rgba(var(--duck-rgb),0.18)] via-[rgba(var(--duck-rgb),0.08)] to-[rgba(var(--duck-rgb),0.02)] py-12 px-6 sm:px-12 h-full w-full flex flex-col justify-between shadow-[0_-10px_40px_rgba(var(--duck-rgb),0.28)]'>
			<Section1 />
			<Section2 />
		</div>
	);
};

const Section1 = () => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left'>
			<Nav />
			<ContactInfo />
		</div>
	);
};

const Section2 = () => {
	return (
		<div className='flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4 pt-8 text-center sm:text-left'>
			<div className='flex items-center'>
				<ThemedLogo width={220} height={72} className='w-[120px] sm:w-[220px] h-12 object-contain drop-shadow-xl' />
			</div>
			<div className='flex flex-col sm:flex-row items-center gap-4 text-sm'>
				<Link href='/tos' className='text-foreground/70 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer'>
					Terms of Service
				</Link>
				<span className='hidden sm:inline text-foreground/40'>•</span>
				<Link href='/privacy' className='text-foreground/70 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer'>
					Privacy Policy
				</Link>
			</div>
			<p className='text-foreground/60 text-sm'>© 2025 QuackStack Ltd. All rights reserved.</p>
		</div>
	);
};

const Nav = () => {
	return (
		<>
			<div className='flex flex-col gap-2 items-center md:items-start'>
				<h3 className='mb-2 uppercase text-primary dark:text-primary font-semibold text-sm'>Company</h3>
				<a href='#home' className='text-foreground/70 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer text-sm'>
					Home
				</a>
				<a href='#projects' className='text-foreground/70 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer text-sm'>
					Projects
				</a>
				<a href='#team' className='text-foreground/70 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer text-sm'>
					Our Team
				</a>
				<a href='#contact' className='text-foreground/70 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer text-sm'>
					Contact Us
				</a>
			</div>
			<div className='flex flex-col gap-2 items-center md:items-start'>
				<h3 className='mb-2 uppercase text-primary dark:text-primary font-semibold text-sm'>Resources</h3>
				<Link href='/blog' className='text-foreground/70 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer text-sm'>
					Blog
				</Link>
				<a href='#services' className='text-foreground/70 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer text-sm'>
					Services
				</a>
				<a href='#technologies' className='text-foreground/70 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer text-sm'>
					Technologies
				</a>
				<a href='#process' className='text-foreground/70 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer text-sm'>
					Process
				</a>
			</div>
		</>
	);
};

const ContactInfo = () => {
	return (
		<div className='flex flex-col gap-2 items-center md:items-start'>
			<h3 className='mb-2 uppercase text-primary dark:text-primary font-semibold text-sm'>Contact</h3>
			<a href='mailto:contact@quackstack.net' className='flex items-center gap-2 text-foreground/70 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer text-sm group'>
				<Mail className='w-4 h-4 text-primary dark:text-primary group-hover:text-primary dark:group-hover:text-primary' />
				contact@quackstack.net
			</a>
			<a href='tel:+1234567890' className='flex items-center gap-2 text-foreground/70 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer text-sm group'>
				<Phone className='w-4 h-4 text-primary dark:text-primary group-hover:text-primary dark:group-hover:text-primary' />
				+359 893 058 517
			</a>
			<div className='flex items-center gap-2 text-foreground/70 text-sm'>
				<MapPin className='w-4 h-4 text-primary dark:text-primary' />
				Remote, Bulgaria
			</div>
			<a
				href='https://www.linkedin.com/company/106319048'
				target='_blank'
				rel='noopener noreferrer'
				className='flex items-center gap-2 text-foreground/70 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer text-sm group mt-2'
			>
				<Linkedin className='w-4 h-4 text-primary dark:text-primary group-hover:text-primary dark:group-hover:text-primary' />
				LinkedIn
			</a>
		</div>
	);
};

const StickyFooter: React.FC = () => {
	return (
		/* On small screens we avoid a huge fixed element - make footer flow normally */
		<div className='relative md:h-[500px] h-auto' style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}>
			<div className='w-full md:fixed md:bottom-0 md:h-[500px] h-auto bg-background'>
				<Content />
			</div>
		</div>
	);
};

export default StickyFooter;
