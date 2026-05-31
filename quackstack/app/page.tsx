'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import WhoWeWorkWithSection from '@/components/WhoWeWorkWithSection';
import TechnologiesSection from '@/components/TechnologiesSection';
import ProjectsSection from '@/components/ProjectsSection';
import OurProductsSection from '@/components/OurProductsSection';
import TeamSection from '@/components/TeamSection';
import ProcessSection from '@/components/ProcessSection';
import ContactSection from '@/components/ContactSection';
import StickyFooter from '@/components/StickyFooter';
import GameOfLifeBackground from '@/components/GameOfLifeBackground';
import SkeletonLoader from '@/components/SkeletonLoader';

export default function QuackStackPortfolio() {
	const [loading, setLoading] = useState(true);
	const [hiding, setHiding] = useState(false);

	useEffect(() => {
		// Wait for next frame so the real content has painted,
		// then begin the fade-out transition.
		const raf = requestAnimationFrame(() => {
			setHiding(true);
			// Remove skeleton from DOM after the CSS fade-out completes
			const timeout = setTimeout(() => setLoading(false), 500);
			return () => clearTimeout(timeout);
		});
		return () => cancelAnimationFrame(raf);
	}, []);

	return (
		<>
			{loading && (
				<div className={`skeleton-page${hiding ? ' skeleton-hide' : ''}`} aria-hidden='true'>
					<SkeletonLoader />
				</div>
			)}
			<Navbar />
			<GameOfLifeBackground />
			<HeroSection />
			<ServicesSection />
			<TechnologiesSection />
			<WhoWeWorkWithSection />
			<OurProductsSection />
			<ProjectsSection />
			<TeamSection />
			<ProcessSection />
			<ContactSection />
			<StickyFooter />
		</>
	);
}

