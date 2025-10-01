'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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
	hidden: { opacity: 0, y: 64, scale: 0.98 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.7,
			stiffness: 80,
			damping: 18,
		},
	},
};

export default function QuackStackPortfolio() {
	// Only keep scroll state for parallax
	const scrollY = useMotionValue(0);
	const footerY = useTransform(scrollY, (v: number) => Math.sin(v * 0.002) * 24);
	const footerScale = useTransform(scrollY, (v: number) => 1 + Math.sin(v * 0.001) * 0.03);
	const smoothScrollY = useSpring(scrollY, { stiffness: 80, damping: 20 });
	const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

	useEffect(() => {
		const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		let scrollScheduled = false;

		const updateScroll = () => {
			scrollScheduled = false;
			scrollY.set(window.scrollY);
		};
		const onScroll = () => {
			if (!scrollScheduled) {
				scrollScheduled = true;
				requestAnimationFrame(updateScroll);
			}
		};

		window.addEventListener('scroll', onScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, [scrollY]);

	return (
		<div className='min-h-screen bg-black text-white overflow-x-hidden relative'>
			<ParallaxCanvas />
			<ParallaxBackground />
			<Navbar />
			<motion.div initial='hidden' whileInView='visible' viewport={{ once: false, amount: 0.2 }} variants={sectionVariants} className='relative z-10'>
				<HeroSection />
			</motion.div>
			<SectionParallaxBg image='/modern-ecommerce-website.png' colorFrom='#1a2233' colorTo='#38bdf8' className='py-32'>
				<motion.div initial='hidden' whileInView='visible' viewport={{ once: false, amount: 0.2 }} variants={sectionVariants} transition={{ delay: 0.08 }} className='relative z-10'>
					<ServicesSection />
				</motion.div>
			</SectionParallaxBg>

			{/* Projects section: remove motion + ancestor transforms so sticky works */}
			<div className='relative z-10'>
				<ProjectsSection />
			</div>
			<SectionParallaxBg image='/professional-designer-portrait.png' colorFrom='#6366f1' colorTo='#a21caf' className='py-32'>
				<motion.div initial='hidden' whileInView='visible' viewport={{ once: false, amount: 0.2 }} variants={sectionVariants} transition={{ delay: 0.32 }} className='relative z-10'>
					<TeamSection />
				</motion.div>
			</SectionParallaxBg>
			<SectionParallaxBg image='/professional-engineer-portrait.png' colorFrom='#f43f5e' colorTo='#fbbf24' className='py-32'>
				<motion.div initial='hidden' whileInView='visible' viewport={{ once: false, amount: 0.2 }} variants={sectionVariants} transition={{ delay: 0.4 }} className='relative z-10'>
					<ProcessSection />
				</motion.div>
			</SectionParallaxBg>

			<SectionParallaxBg image='/placeholder.jpg' colorFrom='#0f766e' colorTo='#f472b6' className='py-20'>
				<motion.div initial='hidden' whileInView='visible' viewport={{ once: false, amount: 0.2 }} variants={sectionVariants} transition={{ delay: 0.16 }} className='relative z-10'>
					<TechnologiesSection />
				</motion.div>
			</SectionParallaxBg>

			<SectionParallaxBg image='/professional-developer-portrait.png' colorFrom='#0ea5e9' colorTo='#fbbf24' className='py-32 min-h-[80vh]'>
				<motion.div initial='hidden' whileInView='visible' viewport={{ once: false, amount: 0.2 }} variants={sectionVariants} transition={{ delay: 0.48 }} className='relative z-10'>
					<ContactSection />
				</motion.div>
			</SectionParallaxBg>
			<StickyFooter />
		</div>
	);
}
