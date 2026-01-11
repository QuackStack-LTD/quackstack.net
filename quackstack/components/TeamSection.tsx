import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import FadeUp from './FadeUp';
import SectionHeading from '@/components/SectionHeading';

const defaultTeam = [
	{
		name: 'Martin Uzunov',
		role: 'Chief Executive Officer',
		image: '/marto.jpg',
		skills: ['AWS', 'Docker', 'CI/CD'],
	},
	{
		name: 'Emil Momchev',
		role: 'Chief Product Officer',
		image: '/emo.jpg',
		skills: ['React', 'Next.js', 'TypeScript'],
	},
	{
		name: 'Iliyan Sinapov',
		role: 'Chief Technology Officer',
		image: '/iliyan.jpg',
		skills: ['Figma', 'Tailwind CSS', 'Branding'],
	},
];

const TeamSection: React.FC = () => {
	// Removed manual scroll transforms & unused hover state
	const team = defaultTeam;
	const centerLastInTwoCol = team.length % 2 === 1;
	const remainderLg = team.length % 3;

	return (
		<section id='team' className='py-32 relative'>
			<div
				className='absolute inset-0 opacity-60'
				style={{
					background: 'radial-gradient(circle at center, rgba(var(--duck-rgb), 0.85) 0%, rgba(var(--duck-rgb), 0.18) 10%, transparent 50%)',
				}}
			/>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<SectionHeading title='Meet Our Team' subtext='Talented professionals dedicated to bringing your vision to life with expertise and passion.' gradient />
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
					{team.map((member, index) => (
						// On lg (3 cols), shift the last row to start at col 2 when uneven.
						// On md (2 cols), span both cols for the last item when uneven.
						<FadeUp
							key={index}
							duration={1}
							delay={index * 0.1}
							whileHover={{ y: -6 }}
							className={[
								'w-full',
								centerLastInTwoCol && index === team.length - 1 ? 'md:col-span-2 md:justify-self-center lg:col-span-1' : '',
								(remainderLg === 1 && index === team.length - 1) || (remainderLg === 2 && index === team.length - 2) ? 'lg:col-start-2' : '',
							]
								.filter(Boolean)
								.join(' ')}
						>
							<Card className='relative overflow-hidden liquid-glass transition-all duration-500 group text-center rounded-xl w-full'>
								<CardContent className='p-6 relative z-10'>
									<div className='relative mb-6'>
										<Image
											src={member.image || '/placeholder.svg'}
											alt={member.name}
											width={128}
											height={128}
											className='w-32 h-32 rounded-full mx-auto object-cover border-4 border-[rgba(var(--duck-rgb),0.12)] group-hover:border-[rgba(var(--duck-rgb),0.28)] transition-colors duration-300'
											unoptimized
										/>
									</div>
									<h3 className='text-xl font-semibold text-primary dark:text-primary mb-2 group-hover:drop-shadow-sm transition-all duration-300'>{member.name}</h3>
									<p className='text-foreground/70 mb-4 group-hover:drop-shadow-sm transition-all duration-300'>{member.role}</p>
									<div className='flex flex-wrap justify-center gap-2'>
										{member.skills.map((skill, skillIndex) => (
											<span key={skillIndex} className='bg-[rgba(var(--duck-rgb),0.12)] text-primary dark:text-primary px-2 py-1 rounded text-sm backdrop-blur-sm border border-[rgba(var(--duck-rgb),0.18)]'>
												{skill}
											</span>
										))}
									</div>
								</CardContent>
							</Card>
						</FadeUp>
					))}
				</div>
			</div>
		</section>
	);
};

export default TeamSection;
