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

			<div className='relative z-10'>
				<HeroSection />
			</div>

			<SectionParallaxBg colorFrom='#0a0a0a' colorTo='#1a0b05'>
				<div className='relative z-10'>
					<ServicesSection />
				</div>
			</SectionParallaxBg>

			<SectionParallaxBg colorFrom='#1a0b05' colorTo='#1a0b05'>
				<div className='relative z-10'>
					<ProjectsSection />
				</div>
			</SectionParallaxBg>

			<SectionParallaxBg colorFrom='#1a0b05' colorTo='#1a0b05'>
				<div className='relative z-10'>
					<TeamSection />
				</div>
			</SectionParallaxBg>

			<SectionParallaxBg colorFrom='#1a0b05' colorTo='#1a0b05'>
				<div className='relative z-10'>
					<ProcessSection />
				</div>
			</SectionParallaxBg>

			<SectionParallaxBg colorFrom='#1a0b05' colorTo='#1a0b05'>
				<div className='relative z-10'>
					<TechnologiesSection />
				</div>
			</SectionParallaxBg>

			<SectionParallaxBg colorFrom='#1a0b05' colorTo='#1a0b05' className='min-h-[80vh]'>
				<div className='relative z-10'>
					<ContactSection />
				</div>
			</SectionParallaxBg>

			<StickyFooter />
		</>
	);
}
