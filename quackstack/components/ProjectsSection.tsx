import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import projectsData from '@/data/projects.json';

const ProjectsSection: React.FC = () => {
	// Get only featured projects for the main section
	const featuredProjects = projectsData.filter((project) => project.featured);

	return (
		<section id='projects' className='relative py-24 overflow-hidden'>
			{/* Particle background effect */}
			<div className='absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_60%,rgba(251,146,60,0.18),transparent_65%)] pointer-events-none' />

			<div className='max-w-7xl mx-auto px-6 relative z-20'>
				<h2 className='text-4xl md:text-5xl font-bold text-white mb-8 glow-text text-center'>Featured Projects</h2>
				<p className='text-lg text-gray-300 max-w-3xl mx-auto mb-12 text-center'>Explore our portfolio of successful projects that showcase our expertise and innovation.</p>

				<div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
					{featuredProjects.map((project) => (
						<Card key={project.id} className='relative overflow-hidden group liquid-glass hover:liquid-glass-orange transition-all duration-500 flex flex-col cursor-pointer rounded-xl'>
							<Link href={`/project/${project.id}`} className='block flex-1'>
								<div className='relative overflow-hidden h-44 z-10'>
									<Image src={project.image || '/placeholder.svg'} alt={project.title} width={600} height={176} className='w-full h-44 object-cover transition-transform duration-300 hover:scale-105' loading='lazy' />
									<div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300' />
									{project.status && <Badge className='absolute top-4 left-4 bg-orange-500/80 text-white text-xs'>{project.status}</Badge>}
								</div>
								<CardContent className='p-5 flex flex-col flex-1 relative z-10'>
									<div className='flex items-center justify-between mb-2'>
										<h3 className='text-lg font-semibold text-orange-400 group-hover:drop-shadow-sm transition-all duration-300'>{project.title}</h3>
										<ArrowRight className='w-4 h-4 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
									</div>
									<p className='text-gray-200 mb-3 leading-relaxed text-sm flex-1 group-hover:drop-shadow-sm transition-all duration-300'>{project.description}</p>
									<div className='flex flex-wrap gap-2 mb-4'>
										{project.tech.slice(0, 3).map((tech, techIndex) => (
											<span key={techIndex} className='bg-orange-500/30 text-orange-300 px-2 py-1 rounded text-xs backdrop-blur-sm border border-orange-500/20'>
												{tech}
											</span>
										))}
										{project.tech.length > 3 && <span className='bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs backdrop-blur-sm border border-orange-500/20'>+{project.tech.length - 3}</span>}
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
											className='border-orange-400/60 text-orange-400 hover:bg-orange-400/20 hover:text-orange-300 bg-transparent backdrop-blur-sm hover:border-orange-300 transition-all duration-300'
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
											className='border-orange-400/60 text-orange-400 hover:bg-orange-400/20 hover:text-orange-300 bg-transparent backdrop-blur-sm hover:border-orange-300 transition-all duration-300'
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
					))}
				</div>

				{/* View All Projects Button */}
				{projectsData.length > featuredProjects.length && (
					<div className='text-center mt-12'>
						<Button asChild size='lg' className='liquid-glass-orange text-white'>
							<Link href='/projects'>
								View All Projects
								<ArrowRight className='w-4 h-4 ml-2' />
							</Link>
						</Button>
					</div>
				)}
			</div>
		</section>
	);
};

export default ProjectsSection;
