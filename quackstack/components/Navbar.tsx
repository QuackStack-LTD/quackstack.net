'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Monitor, Menu, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import ThemedLogo from '@/components/ThemedLogo';

const sectionIds = ['home', 'services', 'technologies', 'projects', 'team', 'process', 'contact'];

const Navbar: React.FC = () => {
	const [currentSection, setCurrentSection] = useState<string>(sectionIds[0]);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { theme, resolvedTheme, setTheme } = useTheme();

	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	const ThemeIcon = mounted ? (theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor) : Sun;

	useEffect(() => {
		// Use IntersectionObserver for accurate + cheap section tracking.
		const elements = sectionIds.map((id) => ({ id, el: document.getElementById(id) })).filter((x): x is { id: string; el: HTMLElement } => Boolean(x.el));

		if (elements.length === 0) return;

		const ratios = new Map<string, number>();
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					ratios.set((entry.target as HTMLElement).id, entry.isIntersecting ? entry.intersectionRatio : 0);
				}

				let bestId = elements[0].id;
				let bestRatio = -1;
				for (const { id } of elements) {
					const r = ratios.get(id) ?? 0;
					if (r > bestRatio) {
						bestRatio = r;
						bestId = id;
					}
				}

				// If nothing is intersecting (e.g. fast scroll), pick the last section above the viewport center.
				if (bestRatio <= 0) {
					const viewportMid = window.innerHeight * 0.5;
					let fallbackId = elements[0].id;
					for (const { id, el } of elements) {
						const top = el.getBoundingClientRect().top;
						if (top <= viewportMid) fallbackId = id;
					}
					bestId = fallbackId;
				}
				setCurrentSection((prev) => (prev === bestId ? prev : bestId));
			},
			{
				root: null,
				// Consider a section "active" around the middle of the viewport.
				rootMargin: '-45% 0px -50% 0px',
				threshold: [0, 0.15, 0.35, 0.55, 0.75, 1],
			}
		);

		for (const { el } of elements) observer.observe(el);
		return () => observer.disconnect();
		// eslint-disable-next-line react-hooks/exhaustive-deps
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

	const toggleTheme = () => {
		const next = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
		setTheme(next);
	};

	const handleNavClick = () => {
		setMobileMenuOpen(false);
	};

	return (
		<>
			<nav className='fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex items-center justify-between h-16'>
						{/* Logo */}
						<div className='flex items-center'>
							<Link href='/' className='flex items-center'>
								<div className='w-[120px] sm:w-[180px] h-[36px] sm:h-[54px] flex items-center justify-center'>
									<ThemedLogo width={180} height={54} className='w-[120px] sm:w-[180px] h-[36px] sm:h-[54px] object-contain drop-shadow-xl' />
								</div>
							</Link>
						</div>

						{/* Desktop Navigation */}
						<div className='hidden md:flex items-center space-x-1 lg:space-x-2'>
							{sectionIds.map((id, idx) => (
								<a
									key={id}
									href={`#${id}`}
									className={`text-foreground/70 hover:text-primary dark:hover:text-primary px-2 lg:px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 rounded-md ${
										currentSection === id ? 'text-primary font-bold bg-[rgba(var(--duck-rgb),0.08)]' : ''
									}`}
								>
									{id.charAt(0).toUpperCase() + id.slice(1)}
								</a>
							))}
							<Link href='/blog' className='text-foreground/70 hover:text-primary dark:hover:text-primary px-2 lg:px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 rounded-md'>
								Blog
							</Link>
						</div>

						{/* Right side buttons */}
						<div className='flex items-center space-x-2'>
							<Button aria-label='Toggle theme' variant='ghost' size='sm' onClick={toggleTheme} className='text-foreground/70 hover:text-primary dark:hover:text-primary hover:bg-[rgba(var(--duck-rgb),0.08)]'>
								<ThemeIcon className='h-4 w-4' />
							</Button>
							<Button variant='ghost' size='sm' className='md:hidden text-foreground/70 hover:text-primary dark:hover:text-primary' onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
								{mobileMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
							</Button>
						</div>
					</div>
				</div>
			</nav>

			{/* Mobile Menu Overlay */}
			{mobileMenuOpen && <div className='fixed inset-0 z-40 bg-background/70 backdrop-blur-sm md:hidden' onClick={() => setMobileMenuOpen(false)} />}

			{/* Mobile Menu */}
			<div className={`fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border transform transition-transform duration-300 ease-in-out md:hidden ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
				<div className='px-4 pt-2 pb-6 space-y-1'>
					{sectionIds.map((id, idx) => (
						<a
							key={id}
							href={`#${id}`}
							className={`block px-3 py-3 text-base font-medium transition-all duration-300 rounded-md ${
								currentSection === id ? 'text-primary dark:text-primary bg-[rgba(var(--duck-rgb),0.08)]' : 'text-foreground/70 hover:text-primary dark:hover:text-primary hover:bg-[rgba(var(--duck-rgb),0.05)]'
							}`}
							onClick={handleNavClick}
						>
							{id.charAt(0).toUpperCase() + id.slice(1)}
						</a>
					))}
					<Link
						href='/blog'
						className='block px-3 py-3 text-base font-medium text-foreground/70 hover:text-primary dark:hover:text-primary hover:bg-[rgba(var(--duck-rgb),0.05)] transition-all duration-300 rounded-md'
						onClick={handleNavClick}
					>
						Blog
					</Link>
				</div>
			</div>
		</>
	);
};

export default Navbar;
