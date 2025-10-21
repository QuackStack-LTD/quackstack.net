import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/SectionHeading';

const defaultTeam = [
	{
		name: 'Emil Momchev',
		role: 'Lead Developer',
		image: '/emo.jpg',
		skills: ['React', 'Next.js', 'TypeScript'],
	},
	{
		name: 'Iliyan Sinapov',
		role: 'UI/UX Designer',
		image: '/iliyan.jpg',
		skills: ['Figma', 'Tailwind CSS', 'Branding'],
	},
	{
		name: 'Martin Uzunov',
		role: 'DevOps Engineer',
		image: '/marto.jpg',
		skills: ['AWS', 'Docker', 'CI/CD'],
	},
];

const TeamSection: React.FC = () => {
	// Removed manual scroll transforms & unused hover state

	return (
		<section id='team' className='py-32'>
			<div className='absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_60%,rgba(251,146,60,0.18),transparent_55%)] pointer-events-none' />
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<SectionHeading title='Meet Our Team' subtext='Talented professionals dedicated to bringing your vision to life with expertise and passion.' gradient />
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
					{defaultTeam.map((member, index) => (
						<motion.div key={index} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: index * 0.08 }} whileHover={{ y: -6 }}>
							<Card className='relative overflow-hidden liquid-glass transition-all duration-500 group text-center rounded-xl'>
								<CardContent className='p-6 relative z-10'>
									<div className='relative mb-6'>
										<Image
											src={member.image || '/placeholder.svg'}
											alt={member.name}
											width={128}
											height={128}
											className='w-32 h-32 rounded-full mx-auto object-cover border-4 border-orange-500/30 group-hover:border-orange-400/50 transition-colors duration-300'
											unoptimized
										/>
									</div>
									<h3 className='text-xl font-semibold text-orange-400 mb-2 group-hover:drop-shadow-sm transition-all duration-300'>{member.name}</h3>
									<p className='text-gray-300 mb-4 group-hover:drop-shadow-sm transition-all duration-300'>{member.role}</p>
									<div className='flex flex-wrap justify-center gap-2'>
										{member.skills.map((skill, skillIndex) => (
											<span key={skillIndex} className='bg-orange-500/30 text-orange-300 px-2 py-1 rounded text-sm backdrop-blur-sm border border-orange-500/20'>
												{skill}
											</span>
										))}
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default TeamSection;
