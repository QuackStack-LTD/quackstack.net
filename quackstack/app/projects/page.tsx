'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, ExternalLink, Github, Filter, Search } from 'lucide-react';
import projectsData from '@/data/projects.json';
import { hasHref } from '@/lib/utils';

export default function ProjectsPage() {
	const [selectedCategory, setSelectedCategory] = useState<string>('All');
	const [selectedStatus, setSelectedStatus] = useState<string>('All');
	const [searchQuery, setSearchQuery] = useState('');

	// Get unique categories and statuses
	const categories = ['All', ...Array.from(new Set(projectsData.map((project) => project.category)))];
	const statuses = ['All', ...Array.from(new Set(projectsData.map((project) => project.status)))];

	// Filter projects with search
	const filteredProjects = useMemo(() => {
		return projectsData.filter((project) => {
			const categoryMatch = selectedCategory === 'All' || project.category === selectedCategory;
			const statusMatch = selectedStatus === 'All' || project.status === selectedStatus;

			if (!searchQuery.trim()) {
				return categoryMatch && statusMatch;
			}

			const query = searchQuery.toLowerCase();
			const titleMatch = project.title.toLowerCase().includes(query);
			const descriptionMatch = project.description.toLowerCase().includes(query);
			const techMatch = project.tech?.some((tech: string) => tech.toLowerCase().includes(query));
			const tagsMatch = project.tags?.some((tag: string) => tag.toLowerCase().includes(query));

			return categoryMatch && statusMatch && (titleMatch || descriptionMatch || techMatch || tagsMatch);
		});
	}, [selectedCategory, selectedStatus, searchQuery]);

	return (
		<div className='min-h-screen bg-background text-foreground'>
			{/* Navigation */}
			<div className='fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex items-center justify-between h-16'>
						<Link href='/#projects'>
							<Button variant='ghost' className='text-gray-300 hover:text-primary hover:bg-[rgba(var(--duck-rgb),0.1)]'>
								<ArrowLeft className='w-4 h-4 mr-2' />
								Back to Home
							</Button>
						</Link>
						<h1 className='text-xl font-bold text-primary'>All Projects</h1>
						<div className='w-32'></div> {/* Spacer for centering */}
					</div>
				</div>
			</div>

			{/* Hero Section */}
			<section className='pt-24 pb-12 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-7xl mx-auto text-center'>
					<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6 glow-text'>Our Complete Portfolio</h1>
					<p className='text-xl text-gray-300 max-w-3xl mx-auto mb-8'>Explore our comprehensive collection of projects spanning various technologies and industries.</p>

					<div className='max-w-2xl mx-auto relative'>
						<Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/40 w-5 h-5' />
						<Input
							type='text'
							placeholder='Search projects by name, description, or technology...'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className='w-full pl-12 pr-4 py-6 text-lg bg-background/50 backdrop-blur-sm border-[rgba(var(--duck-rgb),0.3)] focus:border-[rgba(var(--duck-rgb),0.85)] rounded-xl'
						/>
					</div>

					{(searchQuery || selectedCategory !== 'All' || selectedStatus !== 'All') && (
						<p className='mt-4 text-foreground/60'>
							Found {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
						</p>
					)}
				</div>
			</section>

			{/* Filters */}
			<section className='py-8 px-4 sm:px-6 lg:px-8 border-b border-[rgba(var(--duck-rgb),0.2)]'>
				<div className='max-w-7xl mx-auto'>
					<div className='flex items-center gap-4 mb-6'>
						<Filter className='w-5 h-5 text-primary' />
						<h2 className='text-lg font-semibold text-white'>Filter Projects</h2>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						{/* Category Filter */}
						<div>
							<label className='block text-sm font-medium text-gray-400 mb-2'>Category</label>
							<div className='flex flex-wrap gap-2'>
								{categories.map((category) => (
									<Button
										key={category}
										variant={selectedCategory === category ? 'default' : 'outline'}
										size='sm'
										onClick={() => setSelectedCategory(category)}
										className={selectedCategory === category ? 'bg-primary text-white hover:opacity-95' : 'liquid-glass-orange text-primary-contrast'}
									>
										{category}
									</Button>
								))}
							</div>
						</div>

						{/* Status Filter */}
						<div>
							<label className='block text-sm font-medium text-gray-400 mb-2'>Status</label>
							<div className='flex flex-wrap gap-2'>
								{statuses.map((status) => (
									<Button
										key={status}
										variant={selectedStatus === status ? 'default' : 'outline'}
										size='sm'
										onClick={() => setSelectedStatus(status)}
										className={selectedStatus === status ? 'bg-primary text-white hover:opacity-95' : 'liquid-glass-orange text-primary-contrast'}
									>
										{status}
									</Button>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Projects Grid */}
			<section className='py-12 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-7xl mx-auto'>
					<div className='mb-6 flex items-center justify-between'>
						<p className='text-gray-400'>
							Showing {filteredProjects.length} of {projectsData.length} projects
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{filteredProjects.map((project) => (
							<Card key={project.id} className='relative overflow-hidden group liquid-glass-orange text-primary-contrast transition-all duration-500 flex flex-col cursor-pointer rounded-xl'>
								<Link href={`/project/${project.id}`} className='block flex-1'>
									<div className='relative overflow-hidden h-48 bg-black/15'>
										<Image src={project.image} alt={project.title} fill className='object-cover transition-transform duration-300 scale-[0.96] group-hover:scale-[0.985]' />
										<div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300' />
										<div className='absolute top-4 left-4 flex gap-2'>
											<Badge className='bg-[rgba(var(--duck-rgb),0.8)] text-white text-xs'>{project.category}</Badge>
											<Badge className={`text-xs ${project.status === 'Completed' ? 'bg-green-500/80 text-white' : 'bg-[rgba(var(--duck-rgb),0.6)] text-white'}`}>{project.status}</Badge>
										</div>
										{project.featured && <Badge className='absolute top-4 right-4 bg-purple-500/80 text-white text-xs'>Featured</Badge>}
									</div>
									<CardContent className='p-5 flex flex-col flex-1'>
										<div className='flex items-center justify-between mb-2'>
											<h3 className='text-lg font-bold text-white group-hover:text-primary transition-colors duration-300'>{project.title}</h3>
											<ArrowRight className='w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
										</div>
										<p className='text-gray-300 mb-4 leading-relaxed text-sm flex-1 line-clamp-3'>{project.shortDescription || project.description}</p>
										<div className='flex flex-wrap gap-2 mb-4'>
											{project.tech.slice(0, 3).map((tech, index) => (
												<Badge key={index} variant='outline' className='border-[rgba(var(--duck-rgb),0.3)] text-[rgba(var(--duck-rgb),0.9)] text-xs'>
													{tech}
												</Badge>
											))}
											{project.tech.length > 3 && (
												<Badge variant='outline' className='border-[rgba(var(--duck-rgb),0.3)] text-[rgba(var(--duck-rgb),0.9)] text-xs'>
													+{project.tech.length - 3}
												</Badge>
											)}
										</div>
									</CardContent>
								</Link>
								{(hasHref(project.demoUrl) || hasHref(project.githubUrl)) && (
									<div className='px-5 pb-5'>
										<div className='flex space-x-2'>
											{hasHref(project.demoUrl) && (
												<Button
													asChild
													size='sm'
													variant='outline'
													className='relative overflow-hidden cursor-pointer group px-4 py-2 text-sm font-semibold text-primary dark:text-white rounded-lg backdrop-blur-lg bg-[var(--gradient-primary)] border-[rgba(var(--duck-rgb),0.18)] shadow-[0_6px_24px_0_rgba(var(--duck-rgb),0.30)] hover:shadow-[0_6px_30px_0_rgba(var(--duck-rgb),0.5)] transition-all duration-300 hover:scale-105 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[rgba(var(--duck-rgb),0.12)] before:via-transparent before:to-[rgba(var(--duck-rgb),0.12)] before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 after:absolute after:inset-[1px] after:rounded-lg after:bg-gradient-to-br after:from-white/10 after:via-transparent after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300'
													style={{
														zIndex: 1,
														background: 'linear-gradient(135deg, rgba(var(--duck-rgb),0.28) 0%, rgba(var(--duck-rgb),0.14) 50%, rgba(var(--duck-rgb),0.28) 100%)',
														backdropFilter: 'blur(12px) saturate(160%)',
														WebkitBackdropFilter: 'blur(12px) saturate(160%)',
														boxShadow: '0 6px 24px 0 rgba(var(--duck-rgb), 0.30), inset 0 1px 0 0 rgba(255, 255, 255, 0.06)',
													}}
													onClick={(e) => e.stopPropagation()}
												>
													<a href={project.demoUrl} target='_blank' rel='noopener noreferrer'>
														<ExternalLink className='w-4 h-4 mr-2' />
														Live
													</a>
												</Button>
											)}
											{hasHref(project.githubUrl) && (
												<Button
													asChild
													size='sm'
													variant='outline'
													className='relative overflow-hidden cursor-pointer group px-4 py-2 text-sm font-semibold rounded-lg bg-[#0b0b0b] text-[rgba(var(--duck-rgb),0.95)] border-[rgba(var(--duck-rgb),0.12)] hover:shadow-[0_6px_30px_0_rgba(var(--duck-rgb),0.26)] transition-all duration-300 hover:scale-105'
													style={{
														zIndex: 1,
														boxShadow: '0 6px 18px rgba(0,0,0,0.6)',
													}}
													onClick={(e) => e.stopPropagation()}
												>
													<a href={project.githubUrl} target='_blank' rel='noopener noreferrer'>
														<Github className='w-4 h-4 mr-2 text-[rgba(var(--duck-rgb),0.95)]' />
														Code
													</a>
												</Button>
											)}
										</div>
									</div>
								)}
							</Card>
						))}
					</div>

					{filteredProjects.length === 0 && (
						<div className='text-center py-12'>
							<p className='text-gray-400 text-lg'>No projects found matching your search or filters.</p>
							<Button
								onClick={() => {
									setSelectedCategory('All');
									setSelectedStatus('All');
									setSearchQuery('');
								}}
								className='mt-4 liquid-glass-orange text-primary-contrast'
							>
								Clear Filters
							</Button>
						</div>
					)}
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[rgba(var(--duck-rgb),0.08)] to-transparent'>
				<div className='max-w-4xl mx-auto text-center'>
					<h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>Ready to Start Your Project?</h2>
					<p className='text-xl text-gray-300 mb-8'>Let's discuss how we can bring your vision to life with our expertise and creativity.</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
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
							aria-label='Get In Touch'
						>
							<Link href='/#contact'>Get In Touch</Link>
						</Button>
						<Button asChild size='lg' variant='outline' className='liquid-glass-orange'>
							<Link href='/blog'>Read Our Blog</Link>
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
