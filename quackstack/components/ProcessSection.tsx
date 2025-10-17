import React from 'react';
import { motion } from 'framer-motion';

const phases = [
	{ step: '01', title: 'Discovery', color: 'bg-green-500', description: 'Understanding your needs and goals' },
	{ step: '02', title: 'Design', color: 'bg-blue-500', description: 'Creating wireframes and prototypes' },
	{ step: '03', title: 'Development', color: 'bg-orange-500', description: 'Building your solution with best practices' },
	{ step: '04', title: 'Testing', color: 'bg-purple-500', description: 'Quality assurance and optimization' },
	{ step: '05', title: 'Launch', color: 'bg-red-500', description: 'Deployment and go-live support' },
];

// Container fades & slides in once in view
const containerVariants = {
	hidden: { opacity: 0, y: 40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			when: 'beforeChildren',
			staggerChildren: 0.12,
		},
	},
};

// Each phase card: slight upward motion & scale, with stagger from container
const itemVariants = {
	hidden: { opacity: 0, y: 32, scale: 0.9, rotateX: -8 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		rotateX: 0,
		transition: { type: 'spring' as const, stiffness: 120, damping: 18, mass: 0.9 },
	},
};

// Subtle pulsing glow for the sequence line
const lineVariants = {
	hidden: { scaleX: 0, opacity: 0 },
	visible: { scaleX: 1, opacity: 1, transition: { duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] as any } },
};

const ProcessSection: React.FC = () => {
	return (
		<section id='process' className='relative py-32 overflow-hidden'>
			<motion.div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20' initial='hidden' whileInView='visible' viewport={{ once: false, amount: 0.3 }} variants={containerVariants}>
				{/* Top fade to black */}

				<div className='text-center mb-20'>
					<h2 className='text-4xl md:text-5xl font-bold text-white mb-6 glow-text'>Development Process</h2>
					<p className='text-xl text-gray-300 max-w-3xl mx-auto'>Our development process follows a proven methodology to ensure quality, efficiency, and client satisfaction at every step.</p>
				</div>
				{/* Wrapper: on xl keep all in one row (no wrap) to prevent last item wrapping */}
				<div className='relative'>
					{/* Animated horizontal connector line (only on xl) */}
					<motion.div
						variants={lineVariants}
						className='hidden xl:block absolute top-[48px] sm:top-[56px] left-0 right-0 h-px origin-left'
						style={{
							background: 'linear-gradient(90deg, rgba(251,146,60,0) 0%, rgba(251,146,60,0.6) 15%, rgba(251,146,60,0.9) 50%, rgba(251,146,60,0.6) 85%, rgba(251,146,60,0) 100%)',
							boxShadow: '0 0 12px -2px rgba(251,146,60,0.6)',
						}}
					/>
					<div className='flex flex-col sm:flex-row sm:flex-wrap xl:flex-nowrap items-stretch justify-center gap-8 sm:gap-12'>
						{phases.map((phase, index) => (
							<motion.div key={index} variants={itemVariants} className='group w-full sm:w-56 flex flex-col items-center relative' whileHover={{ y: -8 }}>
								<div
									className={`w-12 h-12 sm:w-16 sm:h-16 ${phase.color} rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg ring-2 ring-orange-400/0 group-hover:ring-orange-400/60 transition-all duration-300`}
									style={{ boxShadow: '0 4px 18px -2px rgba(251,146,60,0.45)' }}
								>
									{phase.step}
								</div>
								<h3 className='text-orange-400 font-semibold mt-3 sm:mt-4 mb-2 tracking-wide group-hover:text-orange-300 transition-colors text-center'>{phase.title}</h3>
								<p className='text-gray-300 text-center text-sm leading-relaxed px-4 sm:px-0'>{phase.description}</p>
								{/* mini glowing connector on xl except last */}
								{index < phases.length - 1 && (
									<motion.span
										className='hidden xl:block absolute top-[48px] sm:top-[56px] right-[-24px] w-12 h-[2px] rounded-full'
										style={{
											background: 'linear-gradient(90deg, rgba(251,146,60,0.85), rgba(251,146,60,0))',
											filter: 'drop-shadow(0 0 6px rgba(251,146,60,0.7))',
										}}
										initial={{ scaleX: 0, opacity: 0 }}
										whileInView={{ scaleX: 1, opacity: 1 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
									/>
								)}
							</motion.div>
						))}
					</div>
				</div>
			</motion.div>
		</section>
	);
};

export default ProcessSection;
