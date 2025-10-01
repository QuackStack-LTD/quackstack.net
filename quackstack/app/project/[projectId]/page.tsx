'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Clock } from 'lucide-react';
import projectsData from '@/data/projects.json';

interface ProjectPageProps {
	params: {
		projectId: string;
	};
}

export default function ProjectPage({ params }: ProjectPageProps) {
	const project = projectsData.find((p) => p.id === params.projectId);

	if (!project) {
		notFound();
	}

	return (
		<div className='min-h-screen bg-black text-white'>
			{/* Navigation */}
			<div className='fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-orange-500/20'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex items-center justify-between h-16'>
						<Link href='/#projects'>
							<Button variant='ghost' className='text-gray-300 hover:text-orange-400 hover:bg-orange-400/10'>
								<ArrowLeft className='w-4 h-4 mr-2' />
								Back to Projects
							</Button>
						</Link>
						<div className='flex space-x-4'>
							{project.demoUrl && (
								<Button asChild className='bg-orange-500 hover:bg-orange-600 text-white'>
									<a href={project.demoUrl} target='_blank' rel='noopener noreferrer'>
										<ExternalLink className='w-4 h-4 mr-2' />
										Live Demo
									</a>
								</Button>
							)}
							{project.githubUrl && (
								<Button asChild variant='outline' className='border-orange-400/60 text-orange-400 hover:bg-orange-400/20'>
									<a href={project.githubUrl} target='_blank' rel='noopener noreferrer'>
										<Github className='w-4 h-4 mr-2' />
										Code
									</a>
								</Button>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Hero Section */}
			<section className='pt-24 pb-12 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-7xl mx-auto'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
						<div>
							<Badge variant='outline' className='mb-4 border-orange-500/30 text-orange-400'>
								{project.category}
							</Badge>
							<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6 glow-text'>{project.title}</h1>
							<p className='text-xl text-gray-300 mb-8 leading-relaxed'>{project.shortDescription}</p>

							{/* Project Info */}
							<div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
								<div className='text-center'>
									<Calendar className='w-6 h-6 text-orange-400 mx-auto mb-2' />
									<p className='text-sm text-gray-400'>Date</p>
									<p className='text-white font-medium'>
										{new Date(project.projectDate).toLocaleDateString('en-US', {
											month: 'short',
											year: 'numeric',
										})}
									</p>
								</div>
								<div className='text-center'>
									<Clock className='w-6 h-6 text-orange-400 mx-auto mb-2' />
									<p className='text-sm text-gray-400'>Duration</p>
									<p className='text-white font-medium'>{project.duration}</p>
								</div>
								<div className='text-center'>
									<Users className='w-6 h-6 text-orange-400 mx-auto mb-2' />
									<p className='text-sm text-gray-400'>Team</p>
									<p className='text-white font-medium'>{project.teamSize} members</p>
								</div>
								<div className='text-center'>
									<div className='w-6 h-6 bg-orange-400 rounded-full mx-auto mb-2 flex items-center justify-center'>
										<div className='w-3 h-3 bg-white rounded-full'></div>
									</div>
									<p className='text-sm text-gray-400'>Status</p>
									<p className='text-white font-medium'>{project.status}</p>
								</div>
							</div>

							{/* Tech Stack */}
							<div className='flex flex-wrap gap-2'>
								{project.tech.map((tech, index) => (
									<Badge key={index} className='bg-orange-500/20 text-orange-300 border-orange-500/30'>
										{tech}
									</Badge>
								))}
							</div>
						</div>

						{/* Main Image */}
						<div className='relative'>
							<div className='aspect-video relative overflow-hidden rounded-lg border border-orange-500/20'>
								<Image src={project.image} alt={project.title} fill className='object-cover' priority />
								<div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Project Details */}
			<section className='py-12 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-7xl mx-auto'>
					<div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
						{/* Main Content */}
						<div className='lg:col-span-2 space-y-12'>
							{/* Challenge */}
							<Card className='liquid-glass rounded-xl'>
								<CardContent className='p-8'>
									<h2 className='text-2xl font-bold text-orange-400 mb-4'>The Challenge</h2>
									<p className='text-gray-300 leading-relaxed'>{project.challenge}</p>
								</CardContent>
							</Card>

							{/* Solution */}
							<Card className='liquid-glass rounded-xl'>
								<CardContent className='p-8'>
									<h2 className='text-2xl font-bold text-orange-400 mb-4'>Our Solution</h2>
									<p className='text-gray-300 leading-relaxed'>{project.solution}</p>
								</CardContent>
							</Card>

							{/* Results */}
							<Card className='liquid-glass rounded-xl'>
								<CardContent className='p-8'>
									<h2 className='text-2xl font-bold text-orange-400 mb-4'>Results & Impact</h2>
									<ul className='space-y-3'>
										{project.results.map((result, index) => (
											<li key={index} className='flex items-start'>
												<div className='w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0' />
												<span className='text-gray-300'>{result}</span>
											</li>
										))}
									</ul>
								</CardContent>
							</Card>

							{/* Additional Images */}
							{project.images && project.images.length > 1 && (
								<div>
									<h2 className='text-2xl font-bold text-white mb-6'>Project Gallery</h2>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
										{project.images.slice(1).map((image, index) => (
											<div key={index} className='aspect-video relative overflow-hidden rounded-lg border border-orange-500/20'>
												<Image src={image} alt={`${project.title} screenshot ${index + 2}`} fill className='object-cover' />
											</div>
										))}
									</div>
								</div>
							)}
						</div>

						{/* Sidebar */}
						<div className='space-y-8'>
							{/* Features */}
							<Card className='liquid-glass rounded-xl'>
								<CardContent className='p-6'>
									<h3 className='text-xl font-bold text-orange-400 mb-4'>Key Features</h3>
									<ul className='space-y-2'>
										{project.features.map((feature, index) => (
											<li key={index} className='flex items-start'>
												<div className='w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0' />
												<span className='text-gray-300 text-sm'>{feature}</span>
											</li>
										))}
									</ul>
								</CardContent>
							</Card>

							{/* Project Tags */}
							<Card className='liquid-glass rounded-xl'>
								<CardContent className='p-6'>
									<h3 className='text-xl font-bold text-orange-400 mb-4'>Tags</h3>
									<div className='flex flex-wrap gap-2'>
										{project.tags.map((tag, index) => (
											<Badge key={index} variant='outline' className='border-orange-500/30 text-orange-300 text-xs'>
												{tag}
											</Badge>
										))}
									</div>
								</CardContent>
							</Card>

							{/* Client Info */}
							<Card className='liquid-glass rounded-xl'>
								<CardContent className='p-6'>
									<h3 className='text-xl font-bold text-orange-400 mb-4'>Project Details</h3>
									<div className='space-y-3'>
										<div>
											<p className='text-sm text-gray-400'>Client</p>
											<p className='text-white font-medium'>{project.client}</p>
										</div>
										<div>
											<p className='text-sm text-gray-400'>Category</p>
											<p className='text-white font-medium'>{project.category}</p>
										</div>
										<div>
											<p className='text-sm text-gray-400'>Project Date</p>
											<p className='text-white font-medium'>
												{new Date(project.projectDate).toLocaleDateString('en-US', {
													month: 'long',
													day: 'numeric',
													year: 'numeric',
												})}
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-500/10 to-transparent'>
				<div className='max-w-4xl mx-auto text-center'>
					<h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>Have a Similar Project in Mind?</h2>
					<p className='text-xl text-gray-300 mb-8'>Let's discuss how we can bring your vision to life with our expertise and creativity.</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<Button asChild size='lg' className='bg-orange-500 hover:bg-orange-600 text-white'>
							<Link href='/#contact'>Get In Touch</Link>
						</Button>
						<Button asChild size='lg' variant='outline' className='border-orange-400/60 text-orange-400 hover:bg-orange-400/20'>
							<Link href='/#projects'>View All Projects</Link>
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
