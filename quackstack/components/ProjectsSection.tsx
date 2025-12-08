import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import FadeUp from './FadeUp';
import { useReducedEffects } from '@/hooks/use-reduced-effects';
import projectsData from '@/data/projects.json';

const ProjectsSection: React.FC = () => {
	const reduced = useReducedEffects();
	const featuredProjects = projectsData.filter((project) => project.featured);

	return (
		<section id='projects' className='relative py-24 overflow-hidden'>
			{/* Particle background effect */}
			<div className='absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_60%,rgba(var(--duck-rgb),0.18),transparent_45%)] pointer-events-none' />

			<div className='max-w-7xl mx-auto px-6 relative z-20'>
				{reduced ? (
					<>
						<h2 className='text-4xl md:text-5xl font-bold text-foreground mb-8 glow-text text-center'>Featured Projects</h2>
						<p className='text-lg text-foreground/70 max-w-3xl mx-auto mb-12 text-center'>Explore our portfolio of successful projects that showcase our expertise and innovation.</p>
					</>
				) : (
					<>
						<FadeUp duration={0.4} className='text-4xl md:text-5xl font-bold text-foreground mb-8 glow-text text-center'>
							Featured Projects
						</FadeUp>
						<FadeUp duration={0.4} delay={0.05} className='text-lg text-foreground/70 max-w-3xl mx-auto mb-12 text-center'>
							Explore our portfolio of successful projects that showcase our expertise and innovation.
						</FadeUp>
					</>
				)}

				<div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
					{featuredProjects.map((project, index) => {
						const cardContent = (
							<Card className='relative overflow-hidden group liquid-glass hover:liquid-glass-orange transition-all duration-500 flex flex-col cursor-pointer rounded-xl h-full'>
								<Link href={`/project/${project.id}`} className='block flex-1'>
									<div className='relative overflow-hidden h-44 z-10'>
										<Image src={project.image || '/placeholder.svg'} alt={project.title} width={600} height={176} className='w-full h-44 object-cover transition-transform duration-300 hover:scale-105' loading='lazy' />
										<div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300' />
										{project.status && <Badge className='absolute top-4 left-4 bg-[rgba(var(--duck-rgb),0.8)] text-white text-xs'>{project.status}</Badge>}
									</div>
									<CardContent className='p-5 flex flex-col flex-1 relative z-10'>
										<div className='flex items-center justify-between mb-2'>
											<h3 className='text-lg font-semibold text-primary dark:text-primary group-hover:drop-shadow-sm transition-all duration-300'>{project.title}</h3>
											<ArrowRight className='w-4 h-4 text-primary dark:text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
										</div>
										<p className='text-foreground/80 mb-3 leading-relaxed text-sm flex-1 group-hover:drop-shadow-sm transition-all duration-300'>{project.description}</p>
										<div className='flex flex-wrap gap-2 mb-4'>
											{project.tech.slice(0, 3).map((tech, techIndex) => (
												<span key={techIndex} className='bg-[rgba(var(--duck-rgb),0.12)] text-primary dark:text-primary px-2 py-1 rounded text-xs backdrop-blur-sm border border-[rgba(var(--duck-rgb),0.18)]'>
													{tech}
												</span>
											))}
											{project.tech.length > 3 && (
												<span className='bg-[rgba(var(--duck-rgb),0.12)] text-primary dark:text-primary px-2 py-1 rounded text-xs backdrop-blur-sm border border-[rgba(var(--duck-rgb),0.18)]'>+{project.tech.length - 3}</span>
											)}
										</div>
									</CardContent>
								</Link>
								<div className='px-5 pb-5 relative z-10'>
									<div className='flex space-x-2'>
										{project.demoUrl && (
											<Button
												asChild
												aria-label={`Open live demo for ${project.title}`}
												size='sm'
												variant='outline'
												className='border-[rgba(var(--duck-rgb),0.28)] dark:border-[rgba(var(--duck-rgb),0.28)] text-primary dark:text-primary hover:bg-[rgba(var(--duck-rgb),0.12)] hover:text-primary dark:hover:text-primary bg-transparent backdrop-blur-sm hover:border-[rgba(var(--duck-rgb),0.28)] transition-all duration-300'
												onClick={(e) => e.stopPropagation()}
											>
												<a href={project.demoUrl} target='_blank' rel='noopener noreferrer'>
													<ExternalLink className='w-4 h-4 mr-2' />
													Live
												</a>
											</Button>
										)}
										{project.githubUrl && (
											<Button
												asChild
												aria-label={`View source code for ${project.title}`}
												size='sm'
												variant='outline'
												className='border-[rgba(var(--duck-rgb),0.28)] dark:border-[rgba(var(--duck-rgb),0.28)] text-primary dark:text-primary hover:bg-[rgba(var(--duck-rgb),0.12)] hover:text-primary dark:hover:text-primary bg-transparent backdrop-blur-sm hover:border-[rgba(var(--duck-rgb),0.28)] transition-all duration-300'
												onClick={(e) => e.stopPropagation()}
											>
												<a href={project.githubUrl} target='_blank' rel='noopener noreferrer'>
													<Github className='w-4 h-4 mr-2' />
													Code
												</a>
											</Button>
										)}
									</div>
								</div>
							</Card>
						);

						return reduced ? (
							<div key={project.id}>{cardContent}</div>
						) : (
							<FadeUp key={project.id} duration={1} delay={Math.min(index * 0.1, 0.35)}>
								{cardContent}
							</FadeUp>
						);
					})}
				</div>

				{/* View All Projects Button */}
				{projectsData.length > featuredProjects.length &&
					(reduced ? (
						<div className='text-center mt-12'>
							<Button
								size='lg'
								className='relative overflow-hidden cursor-pointer group px-8 py-4 text-lg font-semibold text-primary dark:text-white rounded-2xl backdrop-blur-xl bg-[var(--gradient-primary)] border-[rgba(var(--duck-rgb),0.28)] shadow-[0_8px_32px_0_rgba(var(--duck-rgb),0.37)] hover:shadow-[0_8px_40px_0_rgba(var(--duck-rgb),0.6)] transition-all duration-500 hover:scale-105 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[rgba(var(--duck-rgb),0.12)] before:via-transparent before:to-[rgba(var(--duck-rgb),0.12)] before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 after:absolute after:inset-[1px] after:rounded-2xl after:bg-gradient-to-br after:from-white/10 after:via-transparent after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300'
								style={{
									zIndex: 1,
									background: 'linear-gradient(135deg, rgba(var(--duck-rgb),0.32) 0%, rgba(var(--duck-rgb),0.18) 50%, rgba(var(--duck-rgb),0.32) 100%)',
									backdropFilter: 'blur(16px) saturate(180%)',
									WebkitBackdropFilter: 'blur(16px) saturate(180%)',
									boxShadow: '0 8px 32px 0 rgba(var(--duck-rgb), 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
								}}
								asChild
								aria-label='View all projects'
							>
								<Link href='/projects'>
									View All Projects
									<ArrowRight className='w-4 h-4 ml-2' />
								</Link>
							</Button>
						</div>
					) : (
						<FadeUp duration={1} delay={0.2} className='text-center mt-12'>
							<Button
								size='lg'
								className='relative overflow-hidden cursor-pointer group px-8 py-4 text-lg font-semibold text-primary dark:text-white rounded-2xl backdrop-blur-xl bg-[var(--gradient-primary)] border-[rgba(var(--duck-rgb),0.28)] shadow-[0_8px_32px_0_rgba(var(--duck-rgb),0.37)] hover:shadow-[0_8px_40px_0_rgba(var(--duck-rgb),0.6)] transition-all duration-500 hover:scale-105 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[rgba(var(--duck-rgb),0.12)] before:via-transparent before:to-[rgba(var(--duck-rgb),0.12)] before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 after:absolute after:inset-[1px] after:rounded-2xl after:bg-gradient-to-br after:from-white/10 after:via-transparent after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300'
								style={{
									zIndex: 1,
									background: 'linear-gradient(135deg, rgba(var(--duck-rgb),0.32) 0%, rgba(var(--duck-rgb),0.18) 50%, rgba(var(--duck-rgb),0.32) 100%)',
									backdropFilter: 'blur(16px) saturate(180%)',
									WebkitBackdropFilter: 'blur(16px) saturate(180%)',
									boxShadow: '0 8px 32px 0 rgba(var(--duck-rgb), 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
								}}
								asChild
								aria-label='View all projects'
							>
								<Link href='/projects'>
									View All Projects
									<ArrowRight className='w-4 h-4 ml-2' />
								</Link>
							</Button>
						</FadeUp>
					))}
			</div>
		</section>
	);
};

export default ProjectsSection;
