// StickyFooter component based on https://github.com/olivierlarose/sticky-footer
import React from 'react';

const Content = () => {
	return (
		<div className='bg-orange-800/100 from-zinc-900 to-black py-8 px-12 h-full w-full flex flex-col justify-between border-t border-orange-500/30 shadow-[0_-8px_32px_rgba(251,146,60,0.15)]'>
			<Section1 />
			<Section2 />
		</div>
	);
};

const Section1 = () => {
	return (
		<div>
			<Nav />
		</div>
	);
};

const Section2 = () => {
	return (
		<div className='flex justify-between items-end'>
			<div className='flex items-center'>
				<img src='/logo.svg' alt='QuackStack Logo' className='h-16 w-auto mr-4' style={{ filter: 'drop-shadow(0 4px 32px #fbbf24cc)' }} />
			</div>
			<p className='text-gray-400'>©copyright 2025 QuackStack Ltd</p>
		</div>
	);
};

const Nav = () => {
	return (
		<div className='flex shrink-0 gap-20'>
			<div className='flex flex-col gap-2'>
				<h3 className='mb-2 uppercase text-orange-400/80 font-semibold'>About</h3>
				<p className='text-gray-300 hover:text-orange-400 transition-colors cursor-pointer'>Home</p>
				<p className='text-gray-300 hover:text-orange-400 transition-colors cursor-pointer'>Projects</p>
				<p className='text-gray-300 hover:text-orange-400 transition-colors cursor-pointer'>Our Mission</p>
				<p className='text-gray-300 hover:text-orange-400 transition-colors cursor-pointer'>Contact Us</p>
			</div>
			<div className='flex flex-col gap-2'>
				<h3 className='mb-2 uppercase text-orange-400/80 font-semibold'>Education</h3>
				<p className='text-gray-300 hover:text-orange-400 transition-colors cursor-pointer'>News</p>
				<p className='text-gray-300 hover:text-orange-400 transition-colors cursor-pointer'>Blog</p>
				<p className='text-gray-300 hover:text-orange-400 transition-colors cursor-pointer'>Learn</p>
				<p className='text-gray-300 hover:text-orange-400 transition-colors cursor-pointer'>Resources</p>
			</div>
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
