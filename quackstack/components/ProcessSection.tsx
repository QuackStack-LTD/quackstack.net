import React from 'react';
import FadeUp from './FadeUp';
import { useReducedEffects } from '@/hooks/use-reduced-effects';

const phases = [
	{ step: '01', title: 'Discovery', color: 'bg-green-500', description: 'Understanding your needs and goals' },
	{ step: '02', title: 'Design', color: 'bg-blue-500', description: 'Creating wireframes and prototypes' },
	{ step: '03', title: 'Development', color: 'bg-[var(--duck-500)]', description: 'Building your solution with best practices' },
	{ step: '04', title: 'Testing', color: 'bg-purple-500', description: 'Quality assurance and optimization' },
	{ step: '05', title: 'Launch', color: 'bg-red-500', description: 'Deployment and go-live support' },
];

const ProcessSection: React.FC = () => {
	const reduced = useReducedEffects();

	return (
		<section id='process' className='relative py-36 overflow-hidden'>
			{reduced ? (
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20'>
					<div className='text-center mb-20'>
						<h2 className='text-4xl md:text-5xl font-bold text-foreground mb-6 glow-text'>Development Process</h2>
						<p className='text-xl text-foreground/70 max-w-3xl mx-auto'>Our development process follows a proven methodology to ensure quality, efficiency, and client satisfaction at every step.</p>
					</div>
					<div className='relative'>
						{/* Connecting line */}
						<div className='hidden xl:block absolute top-6 sm:top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[rgba(var(--duck-rgb),0.3)] to-transparent -z-10' />
						<div className='flex flex-col sm:flex-row sm:flex-wrap xl:flex-nowrap items-stretch justify-center gap-8 sm:gap-12'>
							{phases.map((phase, index) => (
								<div key={index} className='flex flex-col items-center group relative'>
									<div
										className={`w-12 h-12 sm:w-16 sm:h-16 ${phase.color} rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg ring-2 ring-[rgba(var(--duck-rgb),0)] group-hover:ring-[rgba(var(--duck-rgb),0.6)] transition-all duration-300`}
										style={{ boxShadow: '0 4px 18px -2px rgba(var(--duck-rgb),0.45)' }}
									>
										{phase.step}
									</div>
									<h3 className='text-primary dark:text-primary font-semibold mt-3 sm:mt-4 mb-2 tracking-wide group-hover:text-primary dark:group-hover:text-primary transition-colors text-center'>{phase.title}</h3>
									<p className='text-foreground/70 text-center text-sm leading-relaxed px-4 sm:px-0'>{phase.description}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			) : (
				<FadeUp className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20' duration={1} viewport={{ once: true, amount: 0.3 }}>
					<div className='text-center mb-20'>
						<h2 className='text-4xl md:text-5xl font-bold text-foreground mb-6 glow-text'>Development Process</h2>
						<p className='text-xl text-foreground/70 max-w-3xl mx-auto'>Our development process follows a proven methodology to ensure quality, efficiency, and client satisfaction at every step.</p>
					</div>
					<div className='relative'>
						{/* Connecting line */}
						<div className='hidden xl:block absolute top-6 sm:top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[rgba(var(--duck-rgb),0.3)] to-transparent -z-10' />
						<div className='flex flex-col sm:flex-row sm:flex-wrap xl:flex-nowrap items-stretch justify-center gap-8 sm:gap-12'>
							{phases.map((phase, index) => (
								<FadeUp key={index} duration={1} delay={index * 0.1} className='flex flex-col items-center group relative'>
									<div
										className={`w-12 h-12 sm:w-16 sm:h-16 ${phase.color} rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg ring-2 ring-[rgba(var(--duck-rgb),0)] group-hover:ring-[rgba(var(--duck-rgb),0.6)] transition-all duration-300`}
										style={{ boxShadow: '0 4px 18px -2px rgba(var(--duck-rgb),0.45)' }}
									>
										{phase.step}
									</div>
									<h3 className='text-primary dark:text-primary font-semibold mt-3 sm:mt-4 mb-2 tracking-wide group-hover:text-primary dark:group-hover:text-primary transition-colors text-center'>{phase.title}</h3>
									<p className='text-foreground/70 text-center text-sm leading-relaxed px-4 sm:px-0'>{phase.description}</p>
								</FadeUp>
							))}
						</div>
					</div>
				</FadeUp>
			)}
		</section>
	);
};

export default ProcessSection;
