import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SectionHeading from '@/components/SectionHeading';
import { Code, MonitorSmartphone, Rocket, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReducedEffects } from '@/hooks/use-reduced-effects';

const defaultServices = [
	{
		title: 'Custom Software',
		description: 'Tailored solutions for your business needs.',
		icon: <Code />,
	},
	{
		title: 'Mobile Apps',
		description: 'iOS & Android apps with beautiful UX.',
		icon: <MonitorSmartphone />,
	},
	{
		title: 'Product Launch',
		description: 'From MVP to scale, we help you launch.',
		icon: <Rocket />,
	},
	{
		title: 'Team Augmentation',
		description: 'Boost your team with our experts.',
		icon: <Users />,
	},
];

const cardVariants = {
	hidden: { opacity: 0, y: 40, scale: 0.95 },
	visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
};

const ServicesSection: React.FC = () => {
	const reduced = useReducedEffects();
	return (
		<section id='services' className='py-32 relative'>
			<div
				className='absolute inset-0 opacity-60'
				style={{
					background: 'radial-gradient(circle at center, rgba(var(--duck-rgb), 0.85) 0%, rgba(var(--duck-rgb), 0.18) 10%, transparent 50%)',
				}}
			/>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
				<SectionHeading title='What we offer' subtext='Our team delivers exceptional software solutions, supporting you through every step of your digital transformation journey.' gradient />
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
					{defaultServices.map((service, index) => (
						<motion.div
							key={index}
							className='group relative'
							initial={reduced ? false : 'hidden'}
							whileInView={reduced ? undefined : 'visible'}
							viewport={reduced ? undefined : { once: true, amount: 0.3 }}
							variants={reduced ? undefined : cardVariants}
						>
							<Card className='relative overflow-hidden liquid-glass hover:liquid-glass-orange transition-all duration-500 ease-out group-hover:shadow-xl rounded-xl'>
								<CardContent className='p-6 relative z-10'>
									<div className='text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:drop-shadow-sm text-primary dark:text-primary'>{service.icon}</div>
									<h3 className='text-xl font-semibold text-primary dark:text-primary mb-3 group-hover:drop-shadow-sm transition-all duration-300'>{service.title}</h3>
									<p className='text-foreground/70 leading-relaxed group-hover:drop-shadow-sm transition-all duration-300'>{service.description}</p>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
				<motion.div
					className='text-center mt-16'
					initial={reduced ? false : { opacity: 0, y: 24 }}
					whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
					viewport={reduced ? undefined : { once: true, amount: 0.4 }}
					transition={reduced ? undefined : { duration: 0.4 }}
				>
					<Button
						onClick={() => {
							const contactSection = document.getElementById('contact');
							contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
						}}
						size='lg'
						className='relative overflow-hidden cursor-pointer group px-8 py-4 text-lg font-semibold text-primary dark:text-white rounded-2xl backdrop-blur-xl bg-[var(--gradient-primary)] border-[rgba(var(--duck-rgb),0.28)] shadow-[0_8px_32px_0_rgba(var(--duck-rgb),0.37)] hover:shadow-[0_8px_40px_0_rgba(var(--duck-rgb),0.6)] transition-all duration-500 hover:scale-105 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[rgba(var(--duck-rgb),0.12)] before:via-transparent before:to-[rgba(var(--duck-rgb),0.12)] before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 after:absolute after:inset-[1px] after:rounded-2xl after:bg-gradient-to-br after:from-white/10 after:via-transparent after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300'
						style={{
							zIndex: 1,
							background: 'linear-gradient(135deg, rgba(var(--duck-rgb),0.32) 0%, rgba(var(--duck-rgb),0.18) 50%, rgba(var(--duck-rgb),0.32) 100%)',
							backdropFilter: 'blur(16px) saturate(180%)',
							WebkitBackdropFilter: 'blur(16px) saturate(180%)',
							boxShadow: '0 8px 32px 0 rgba(var(--duck-rgb), 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
						}}
						aria-label='Contact us about services'
					>
						<span className='relative z-10 drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300'>Contact Us</span>
						<div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500'></div>
					</Button>
				</motion.div>
			</div>
		</section>
	);
};

export default ServicesSection;
