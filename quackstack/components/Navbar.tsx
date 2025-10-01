import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Monitor, Menu, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const sectionIds = ['home', 'services', 'technologies', 'projects', 'team', 'process', 'contact'];

const Navbar: React.FC = () => {
	const [currentSection, setCurrentSection] = useState(0);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
	const ThemeIcon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor;

	// Scroll spy effect
	useEffect(() => {
		const handleScroll = () => {
			const offsets = sectionIds.map((id) => {
				const el = document.getElementById(id);
				return el ? el.getBoundingClientRect().top : Infinity;
			});
			const active = offsets.findIndex((offset, idx) => offset > 0 && (idx === 0 || offsets[idx - 1] <= 0));
			setCurrentSection(active === -1 ? sectionIds.length - 1 : active);
		};
		window.addEventListener('scroll', handleScroll);
		handleScroll();
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Close mobile menu on scroll or resize
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				setMobileMenuOpen(false);
			}
		};

		const handleScroll = () => {
			setMobileMenuOpen(false);
		};

		window.addEventListener('resize', handleResize);
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	// Theme toggle
	const toggleTheme = () => {
		setTheme((prev) => (prev === 'light' ? 'dark' : prev === 'dark' ? 'system' : 'light'));
	};

	const handleNavClick = () => {
		setMobileMenuOpen(false);
	};

	return (
		<>
			<nav className='fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-orange-500/20'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex items-center justify-between h-16'>
						{/* Logo */}
						<div className='flex items-center'>
							<Link href='/' className='flex items-center'>
								<div className='w-[120px] sm:w-[180px] h-[36px] sm:h-[54px] flex items-center justify-center'>
									<Image src='/logo.svg' alt='QuackStack Logo' width={180} height={54} className='w-[120px] sm:w-[180px] h-[36px] sm:h-[54px] object-contain drop-shadow-xl' unoptimized priority />
								</div>
							</Link>
						</div>

						{/* Desktop Navigation */}
						<div className='hidden md:flex items-center space-x-1 lg:space-x-2'>
							{sectionIds.map((id, idx) => (
								<a
									key={id}
									href={`#${id}`}
									className={`text-gray-300 hover:text-orange-400 px-2 lg:px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 rounded-md ${currentSection === idx ? 'text-orange-400 font-bold bg-orange-400/10' : ''}`}
								>
									{id.charAt(0).toUpperCase() + id.slice(1)}
								</a>
							))}
							<Link href='/blog' className='text-gray-300 hover:text-orange-400 px-2 lg:px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 rounded-md'>
								Blog
							</Link>
						</div>

						{/* Right side buttons */}
						<div className='flex items-center space-x-2'>
							<Button variant='ghost' size='sm' onClick={toggleTheme} className='text-gray-300 hover:text-orange-400 hover:bg-orange-400/10'>
								<ThemeIcon className='h-4 w-4' />
							</Button>
							<Button variant='ghost' size='sm' className='md:hidden text-gray-300 hover:text-orange-400' onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
								{mobileMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
							</Button>
						</div>
					</div>
				</div>
			</nav>

			{/* Mobile Menu Overlay */}
			{mobileMenuOpen && <div className='fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden' onClick={() => setMobileMenuOpen(false)} />}

			{/* Mobile Menu */}
			<div
				className={`fixed top-16 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-b border-orange-500/20 transform transition-transform duration-300 ease-in-out md:hidden ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
			>
				<div className='px-4 pt-2 pb-6 space-y-1'>
					{sectionIds.map((id, idx) => (
						<a
							key={id}
							href={`#${id}`}
							className={`block px-3 py-3 text-base font-medium transition-all duration-300 rounded-md ${currentSection === idx ? 'text-orange-400 bg-orange-400/10' : 'text-gray-300 hover:text-orange-400 hover:bg-orange-400/5'}`}
							onClick={handleNavClick}
						>
							{id.charAt(0).toUpperCase() + id.slice(1)}
						</a>
					))}
					<Link href='/blog' className='block px-3 py-3 text-base font-medium text-gray-300 hover:text-orange-400 hover:bg-orange-400/5 transition-all duration-300 rounded-md' onClick={handleNavClick}>
						Blog
					</Link>
				</div>
			</div>
		</>
	);
};

export default Navbar;
