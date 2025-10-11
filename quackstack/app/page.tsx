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

const sectionVariants = {
	hidden: { opacity: 0, y: 32 },
	visible: { opacity: 1, y: 0 },
};

export default function QuackStackPortfolio() {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return (
			<div className='min-h-screen bg-black text-white overflow-x-hidden relative'>
				<Navbar />
				<HeroSection />
				<ServicesSection />
				<ProjectsSection />
				<TechnologiesSection />
				<TeamSection />
				<ProcessSection />
				<ContactSection />
				<StickyFooter />
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-black text-white overflow-x-hidden relative'>
			<Navbar />

			<motion.div initial='hidden' whileInView='visible' viewport={{ once: true, amount: 0.2 }} variants={sectionVariants} transition={{ duration: 0.6, ease: 'easeOut' }} className='relative z-10'>
				<HeroSection />
			</motion.div>

			<SectionParallaxBg image='/modern-ecommerce-website.png' colorFrom='#1a2233' colorTo='#38bdf8' className='py-32'>
				<motion.div initial='hidden' whileInView='visible' viewport={{ once: true, amount: 0.2 }} variants={sectionVariants} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }} className='relative z-10'>
					<ServicesSection />
				</motion.div>
			</SectionParallaxBg>

			{/* Projects section: remove motion + ancestor transforms so sticky works */}
			<div className='relative z-10'>
				<ProjectsSection />
			</div>

			<SectionParallaxBg image='/professional-designer-portrait.png' colorFrom='#6366f1' colorTo='#a21caf' className='py-32'>
				<motion.div initial='hidden' whileInView='visible' viewport={{ once: true, amount: 0.2 }} variants={sectionVariants} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }} className='relative z-10'>
					<TeamSection />
				</motion.div>
			</SectionParallaxBg>

			<SectionParallaxBg image='/professional-engineer-portrait.png' colorFrom='#f43f5e' colorTo='#fbbf24' className='py-32'>
				<motion.div initial='hidden' whileInView='visible' viewport={{ once: true, amount: 0.2 }} variants={sectionVariants} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }} className='relative z-10'>
					<ProcessSection />
				</motion.div>
			</SectionParallaxBg>

			<SectionParallaxBg image='/placeholder.jpg' colorFrom='#0f766e' colorTo='#f472b6' className='py-20'>
				<motion.div initial='hidden' whileInView='visible' viewport={{ once: true, amount: 0.2 }} variants={sectionVariants} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }} className='relative z-10'>
					<TechnologiesSection />
				</motion.div>
			</SectionParallaxBg>

			<SectionParallaxBg image='/professional-developer-portrait.png' colorFrom='#0ea5e9' colorTo='#fbbf24' className='py-32 min-h-[80vh]'>
				<motion.div initial='hidden' whileInView='visible' viewport={{ once: true, amount: 0.2 }} variants={sectionVariants} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }} className='relative z-10'>
					<ContactSection />
				</motion.div>
			</SectionParallaxBg>

			<StickyFooter />
		</div>
	);
}
