'use client';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import WhoWeWorkWithSection from '@/components/WhoWeWorkWithSection';
import TechnologiesSection from '@/components/TechnologiesSection';
import ProjectsSection from '@/components/ProjectsSection';
import TeamSection from '@/components/TeamSection';
import ProcessSection from '@/components/ProcessSection';
import ContactSection from '@/components/ContactSection';
import StickyFooter from '@/components/StickyFooter';
import GameOfLifeBackground from '@/components/GameOfLifeBackground';

export default function QuackStackPortfolio() {
	return (
		<>
			<Navbar />
			<GameOfLifeBackground />
			<HeroSection />
			<ServicesSection />
			<WhoWeWorkWithSection />
			<ProjectsSection />
			<TeamSection />
			<ProcessSection />
			<TechnologiesSection />
			<ContactSection />
			<StickyFooter />
		</>
	);
}
