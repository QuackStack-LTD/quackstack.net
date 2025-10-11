import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from '@/components/SectionHeading';
import { FaReact, FaNodeJs, FaPython, FaAws, FaDocker, FaFigma, FaGithub, FaDatabase } from 'react-icons/fa';

const defaultTechnologies = [
	{ name: 'React', icon: <FaReact /> },
	{ name: 'Node.js', icon: <FaNodeJs /> },
	{ name: 'Python', icon: <FaPython /> },
	{ name: 'AWS', icon: <FaAws /> },
	{ name: 'Docker', icon: <FaDocker /> },
	{ name: 'Figma', icon: <FaFigma /> },
	{ name: 'GitHub', icon: <FaGithub /> },
	{ name: 'SQL', icon: <FaDatabase /> },
];

const TechnologiesSection: React.FC = () => {
	const prefersReducedMotion = useReducedMotion();

	return (
		<section className='py-24 bg-black/40 overflow-hidden'>
			<SectionHeading title='Technologies We Master' subtext='A curated stack enabling rapid, resilient product delivery.' gradient />
			<div className='relative'>
				<motion.div
					className='flex space-x-12'
					initial={prefersReducedMotion ? false : { x: 0 }}
					animate={prefersReducedMotion ? undefined : { x: ['0%', '-50%'] }}
					transition={prefersReducedMotion ? undefined : { duration: 30, ease: 'linear', repeat: Infinity }}
				>
					{[...defaultTechnologies, ...defaultTechnologies].map((tech, index) => (
						<motion.div
							key={index}
							whileHover={prefersReducedMotion ? undefined : { scale: 1.12 }}
							className='flex-shrink-0 relative overflow-hidden group px-8 py-4 rounded-full border border-orange-500/40 hover:border-orange-400/60 transition-all duration-500 cursor-pointer backdrop-blur-xl bg-gradient-to-br from-orange-500/20 via-orange-400/10 to-orange-600/20 hover:shadow-[0_8px_32px_0_rgba(251,146,60,0.25)] hover:shadow-orange-500/30 before:absolute before:inset-0 before:bg-gradient-to-r before:from-orange-300/10 before:via-transparent before:to-orange-500/10 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 after:absolute after:inset-[1px] after:rounded-full after:bg-gradient-to-br after:from-white/5 after:via-transparent after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300 flex items-center space-x-3'
							style={{
								backdropFilter: 'blur(16px) saturate(150%)',
								WebkitBackdropFilter: 'blur(16px) saturate(150%)',
								boxShadow: '0 4px 16px 0 rgba(251, 146, 60, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
							}}
						>
							<span className='text-2xl relative z-10 group-hover:drop-shadow-sm transition-all duration-300'>{tech.icon}</span>
							<span className='text-orange-400 font-medium whitespace-nowrap relative z-10 group-hover:drop-shadow-sm transition-all duration-300'>{tech.name}</span>
							<div className='absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default TechnologiesSection;
