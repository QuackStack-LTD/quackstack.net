'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';
import blogData from '@/data/blog.json';

interface BlogPostPageProps {
	params: {
		slug: string;
	};
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
	const post = blogData.find((p) => p.slug === params.slug);

	if (!post) {
		notFound();
	}

	const relatedPosts = blogData.filter((p) => p.id !== post.id && p.tags.some((tag) => post.tags.includes(tag))).slice(0, 3);

	// Function to render markdown-like content
	const renderContent = (content: string) => {
		// Split content by double newlines to create paragraphs
		const paragraphs = content.split('\n\n');

		return paragraphs.map((paragraph, index) => {
			// Handle headers
			if (paragraph.startsWith('# ')) {
				return (
					<h1 key={index} className='text-3xl md:text-4xl font-bold text-white mb-6 glow-text'>
						{paragraph.replace('# ', '')}
					</h1>
				);
			}
			if (paragraph.startsWith('## ')) {
				return (
					<h2 key={index} className='text-2xl md:text-3xl font-bold text-orange-400 mb-4 mt-8'>
						{paragraph.replace('## ', '')}
					</h2>
				);
			}
			if (paragraph.startsWith('### ')) {
				return (
					<h3 key={index} className='text-xl md:text-2xl font-bold text-white mb-3 mt-6'>
						{paragraph.replace('### ', '')}
					</h3>
				);
			}

			// Handle code blocks
			if (paragraph.includes('```')) {
				const lines = paragraph.split('\n');
				const codeContent = lines.slice(1, -1).join('\n');
				const language = lines[0].replace('```', '');

				return (
					<div key={index} className='mb-6'>
						<div className='bg-gray-900 rounded-lg p-4 border border-orange-500/20'>
							<div className='text-xs text-orange-400 mb-2'>{language}</div>
							<pre className='text-gray-300 overflow-x-auto'>
								<code>{codeContent}</code>
							</pre>
						</div>
					</div>
				);
			}

			// Handle lists
			if (paragraph.includes('\n1. ') || paragraph.includes('\n- ')) {
				const listItems = paragraph.split('\n').filter((line) => line.startsWith('1. ') || line.startsWith('- '));
				const isOrdered = listItems[0]?.startsWith('1. ');

				return (
					<div key={index} className='mb-6'>
						{isOrdered ? (
							<ol className='list-decimal list-inside space-y-2 text-gray-300'>
								{listItems.map((item, itemIndex) => (
									<li key={itemIndex}>{item.replace(/^\d+\. /, '')}</li>
								))}
							</ol>
						) : (
							<ul className='list-disc list-inside space-y-2 text-gray-300'>
								{listItems.map((item, itemIndex) => (
									<li key={itemIndex}>{item.replace(/^- /, '')}</li>
								))}
							</ul>
						)}
					</div>
				);
			}

			// Handle regular paragraphs
			if (paragraph.trim()) {
				return (
					<p key={index} className='text-gray-300 leading-relaxed mb-6'>
						{paragraph}
					</p>
				);
			}

			return null;
		});
	};

	return (
		<div className='min-h-screen bg-black text-white'>
			{/* Navigation */}
			<div className='fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-orange-500/20'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex items-center justify-between h-16'>
						<Link href='/blog'>
							<Button variant='ghost' className='text-gray-300 hover:text-orange-400 hover:bg-orange-400/10'>
								<ArrowLeft className='w-4 h-4 mr-2' />
								Back to Blog
							</Button>
						</Link>
						<Button variant='ghost' className='text-gray-300 hover:text-orange-400 hover:bg-orange-400/10'>
							<Share2 className='w-4 h-4 mr-2' />
							Share
						</Button>
					</div>
				</div>
			</div>

			{/* Hero Section */}
			<section className='pt-24 pb-12 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-4xl mx-auto'>
					<Badge className='mb-4 bg-orange-500/20 text-orange-400 border-orange-500/30'>{post.category}</Badge>
					<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6 glow-text leading-tight'>{post.title}</h1>

					{/* Meta Information */}
					<div className='flex flex-wrap items-center gap-6 text-gray-400 mb-8'>
						<div className='flex items-center'>
							<User className='w-4 h-4 mr-2' />
							{post.author}
						</div>
						<div className='flex items-center'>
							<Calendar className='w-4 h-4 mr-2' />
							{new Date(post.publishedAt).toLocaleDateString('en-US', {
								month: 'long',
								day: 'numeric',
								year: 'numeric',
							})}
						</div>
						<div className='flex items-center'>
							<Clock className='w-4 h-4 mr-2' />
							{post.readTime} min read
						</div>
					</div>

					{/* Tags */}
					<div className='flex flex-wrap gap-2 mb-8'>
						{post.tags.map((tag, index) => (
							<Badge key={index} variant='outline' className='border-orange-500/30 text-orange-300'>
								{tag}
							</Badge>
						))}
					</div>

					{/* Featured Image */}
					<div className='aspect-video relative overflow-hidden rounded-lg border border-orange-500/20 mb-12'>
						<Image src={post.image} alt={post.title} fill className='object-cover' priority />
						<div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
					</div>
				</div>
			</section>

			{/* Article Content */}
			<section className='py-12 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-4xl mx-auto'>
					<article className='prose prose-lg prose-invert max-w-none'>{renderContent(post.content)}</article>
				</div>
			</section>

			{/* Related Posts */}
			{relatedPosts.length > 0 && (
				<section className='py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-500/5 to-transparent'>
					<div className='max-w-7xl mx-auto'>
						<h2 className='text-3xl font-bold text-white mb-8'>Related Posts</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
							{relatedPosts.map((relatedPost) => (
								<Card key={relatedPost.id} className='relative overflow-hidden group liquid-glass hover:liquid-glass-orange transition-all duration-500 rounded-xl'>
									<div className='relative overflow-hidden h-48'>
										<Image src={relatedPost.image} alt={relatedPost.title} fill className='object-cover transition-transform duration-300 hover:scale-105' />
										<div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300' />
									</div>
									<CardContent className='p-5'>
										<div className='flex items-center space-x-4 text-xs text-gray-400 mb-3'>
											<div className='flex items-center'>
												<Calendar className='w-3 h-3 mr-1' />
												{new Date(relatedPost.publishedAt).toLocaleDateString('en-US', {
													month: 'short',
													day: 'numeric',
													year: 'numeric',
												})}
											</div>
											<div className='flex items-center'>
												<Clock className='w-3 h-3 mr-1' />
												{relatedPost.readTime} min
											</div>
										</div>
										<h3 className='text-lg font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300 line-clamp-2'>{relatedPost.title}</h3>
										<p className='text-gray-300 mb-4 leading-relaxed text-sm line-clamp-3'>{relatedPost.excerpt}</p>
										<Link href={`/blog/${relatedPost.slug}`}>
											<Button
												size='sm'
												variant='outline'
												className='w-full border-orange-400/60 text-orange-400 hover:bg-orange-400/20 hover:text-orange-300 bg-transparent backdrop-blur-sm hover:border-orange-300 transition-all duration-300'
											>
												Read More
											</Button>
										</Link>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>
			)}

			{/* CTA Section */}
			<section className='py-16 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-4xl mx-auto text-center'>
					<h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>Enjoyed This Article?</h2>
					<p className='text-xl text-gray-300 mb-8'>Check out our other posts or get in touch to discuss your next project.</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<Button asChild size='lg' className='bg-orange-500 hover:bg-orange-600 text-white'>
							<Link href='/#contact'>Get In Touch</Link>
						</Button>
						<Button asChild size='lg' variant='outline' className='border-orange-400/60 text-orange-400 hover:bg-orange-400/20'>
							<Link href='/blog'>Read More Posts</Link>
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
