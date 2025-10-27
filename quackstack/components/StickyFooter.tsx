// StickyFooter component based on https://github.com/olivierlarose/sticky-footer
import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

const Content = () => {
	return (
		<div className='bg-[#1e0c02] py-12 px-6 sm:px-12 h-full w-full flex flex-col justify-between border-t border-orange-500/50 shadow-[0_-8px_32px_rgba(251,146,60,0.25)]'>
			<Section1 />
			<Section2 />
		</div>
	);
};

const Section1 = () => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
			<Nav />
			<ContactInfo />
		</div>
	);
};

const Section2 = () => {
	return (
		<div className='flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-orange-500/20'>
			<div className='flex items-center'>
				<img src='/logo.svg' alt='QuackStack Logo' className='h-12 w-auto' style={{ filter: 'drop-shadow(0 4px 32px #fbbf24cc)' }} />
			</div>
			<div className='flex flex-col sm:flex-row items-center gap-4 text-sm'>
				<Link href='/tos' className='text-gray-300 hover:text-orange-400 transition-colors cursor-pointer'>
					Terms of Service
				</Link>
				<span className='hidden sm:inline text-gray-500'>•</span>
				<Link href='/privacy' className='text-gray-300 hover:text-orange-400 transition-colors cursor-pointer'>
					Privacy Policy
				</Link>
			</div>
			<p className='text-gray-400 text-sm'>© 2025 QuackStack Ltd. All rights reserved.</p>
		</div>
	);
};

const Nav = () => {
	return (
		<>
			<div className='flex flex-col gap-2'>
				<h3 className='mb-2 uppercase text-orange-400 font-semibold text-sm'>Company</h3>
				<a href='#home' className='text-gray-300 hover:text-orange-400 transition-colors cursor-pointer text-sm'>
					Home
				</a>
				<a href='#projects' className='text-gray-300 hover:text-orange-400 transition-colors cursor-pointer text-sm'>
					Projects
				</a>
				<a href='#team' className='text-gray-300 hover:text-orange-400 transition-colors cursor-pointer text-sm'>
					Our Team
				</a>
				<a href='#contact' className='text-gray-300 hover:text-orange-400 transition-colors cursor-pointer text-sm'>
					Contact Us
				</a>
			</div>
			<div className='flex flex-col gap-2'>
				<h3 className='mb-2 uppercase text-orange-400 font-semibold text-sm'>Resources</h3>
				<Link href='/blog' className='text-gray-300 hover:text-orange-400 transition-colors cursor-pointer text-sm'>
					Blog
				</Link>
				<a href='#services' className='text-gray-300 hover:text-orange-400 transition-colors cursor-pointer text-sm'>
					Services
				</a>
				<a href='#technologies' className='text-gray-300 hover:text-orange-400 transition-colors cursor-pointer text-sm'>
					Technologies
				</a>
				<a href='#process' className='text-gray-300 hover:text-orange-400 transition-colors cursor-pointer text-sm'>
					Process
				</a>
			</div>
		</>
	);
};

const ContactInfo = () => {
	return (
		<div className='flex flex-col gap-2'>
			<h3 className='mb-2 uppercase text-orange-400 font-semibold text-sm'>Contact</h3>
			<a href='mailto:hello@quackstack.net' className='flex items-center gap-2 text-gray-300 hover:text-orange-400 transition-colors cursor-pointer text-sm group'>
				<Mail className='w-4 h-4 text-orange-400 group-hover:text-orange-300' />
				hello@quackstack.net
			</a>
			<a href='tel:+1234567890' className='flex items-center gap-2 text-gray-300 hover:text-orange-400 transition-colors cursor-pointer text-sm group'>
				<Phone className='w-4 h-4 text-orange-400 group-hover:text-orange-300' />
				+1 (234) 567-890
			</a>
			<div className='flex items-center gap-2 text-gray-300 text-sm'>
				<MapPin className='w-4 h-4 text-orange-400' />
				London, United Kingdom
			</div>
			<a href='https://linkedin.com/company/quackstack' target='_blank' rel='noopener noreferrer' className='flex items-center gap-2 text-gray-300 hover:text-orange-400 transition-colors cursor-pointer text-sm group mt-2'>
				<Linkedin className='w-4 h-4 text-orange-400 group-hover:text-orange-300' />
				LinkedIn
			</a>
		</div>
	);
};

const StickyFooter: React.FC = () => {
	return (
		<div className='relative h-[500px]' style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}>
			<div className='fixed bottom-0 h-[500px] w-full'>
				<Content />
			</div>
		</div>
	);
};

export default StickyFooter;
