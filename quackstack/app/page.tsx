'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ParallaxBackground from '@/components/ParallaxBackground';
import ParallaxCanvas from '@/components/ParallaxCanvas';
import SectionParallaxBg from '@/components/SectionParallaxBg';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
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

			<div className='relative z-10 bg-background'>
				<HeroSection />
			</div>

			<SectionParallaxBg colorFrom='rgba(251, 146, 60, 0.03)' colorTo='rgba(251, 146, 60, 0.05)'>
				<div className='relative z-10 bg-background/50'>
					<ServicesSection />
				</div>
			</SectionParallaxBg>

			<SectionParallaxBg colorFrom='rgba(251, 146, 60, 0.05)' colorTo='rgba(251, 146, 60, 0.05)'>
				<div className='relative z-10 bg-background/50'>
					<ProjectsSection />
				</div>
			</SectionParallaxBg>

			<SectionParallaxBg colorFrom='rgba(251, 146, 60, 0.05)' colorTo='rgba(251, 146, 60, 0.05)'>
				<div className='relative z-10 bg-background/50'>
					<TeamSection />
				</div>
			</SectionParallaxBg>

			<SectionParallaxBg colorFrom='rgba(251, 146, 60, 0.05)' colorTo='rgba(251, 146, 60, 0.05)'>
				<div className='relative z-10 bg-background/50'>
					<ProcessSection />
				</div>
			</SectionParallaxBg>

			<SectionParallaxBg colorFrom='rgba(251, 146, 60, 0.05)' colorTo='rgba(251, 146, 60, 0.05)'>
				<div className='relative z-10 bg-background/50'>
					<TechnologiesSection />
				</div>
			</SectionParallaxBg>

			<SectionParallaxBg colorFrom='rgba(251, 146, 60, 0.05)' colorTo='rgba(251, 146, 60, 0.08)' className='min-h-[80vh]'>
				<div className='relative z-10 bg-background/50'>
					<ContactSection />
				</div>
			</SectionParallaxBg>

			<StickyFooter />
		</>
	);
}
