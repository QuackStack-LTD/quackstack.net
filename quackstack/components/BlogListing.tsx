'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Calendar, Clock, Search } from 'lucide-react';
import { BlogPost } from '@/lib/blog';

interface BlogListingProps {
	posts: BlogPost[];
}

export default function BlogListing({ posts }: BlogListingProps) {
	const [searchQuery, setSearchQuery] = useState('');

	// Filter posts based on search query
	const filteredPosts = useMemo(() => {
		if (!searchQuery.trim()) return posts;

		const query = searchQuery.toLowerCase();
		return posts.filter((post) => {
			const titleMatch = post.title.toLowerCase().includes(query);
			const excerptMatch = post.excerpt.toLowerCase().includes(query);
			const categoryMatch = post.category?.toLowerCase().includes(query);
			const tagsMatch = post.tags?.some((tag) => tag.toLowerCase().includes(query));

			return titleMatch || excerptMatch || categoryMatch || tagsMatch;
		});
	}, [posts, searchQuery]);

	const featuredPosts = filteredPosts.filter((post) => post.featured);
	const otherPosts = filteredPosts.filter((post) => !post.featured);

	return (
		<div className='min-h-screen bg-background text-foreground'>
			{/* Navigation */}
			<div className='fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex items-center justify-between h-16'>
						<Link href='/'>
							<Button variant='ghost' className='text-foreground/70 hover:text-primary hover:bg-[rgba(var(--duck-rgb),0.08)]'>
								<ArrowLeft className='w-4 h-4 mr-2' />
								Back to Home
							</Button>
						</Link>
						<h1 className='text-xl font-bold text-primary'>QuackStack Blog</h1>
						<div className='w-32'></div> {/* Spacer for centering */}
					</div>
				</div>
			</div>

			{/* Hero Section */}
			<section className='pt-24 pb-12 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-7xl mx-auto text-center'>
					<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6 glow-text'>Our Blog</h1>
					<p className='text-xl text-foreground/70 max-w-3xl mx-auto mb-8'>Insights, tutorials, and thoughts from our development team. Stay updated with the latest trends in web development, design, and technology.</p>

					{/* Search Bar */}
					<div className='max-w-2xl mx-auto relative'>
						<Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/40 w-5 h-5' />
						<Input
							type='text'
							placeholder='Search posts by title, category, or tags...'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className='w-full pl-12 pr-4 py-6 text-lg bg-background/50 backdrop-blur-sm border-[rgba(var(--duck-rgb),0.22)] focus:border-[rgba(var(--duck-rgb),0.85)] rounded-xl'
						/>
					</div>

					{searchQuery && (
						<p className='mt-4 text-foreground/60'>
							Found {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
						</p>
					)}
				</div>
			</section>

			{/* Featured Posts */}
			{featuredPosts.length > 0 && (
				<section className='py-12 px-4 sm:px-6 lg:px-8'>
					<div className='max-w-7xl mx-auto'>
						<h2 className='text-3xl font-bold text-foreground mb-8'>Featured Posts</h2>
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
							{featuredPosts.map((post) => (
								<Card key={post.slug} className='relative overflow-hidden group liquid-glass hover:liquid-glass-orange transition-all duration-500 rounded-xl'>
									<div className='relative overflow-hidden h-64'>
										<Image src={post.image || ''} alt={post.title} fill className='object-cover transition-transform duration-300 hover:scale-105' />
										<div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300' />
										<Badge className='absolute top-4 left-4 bg-[rgba(var(--duck-rgb),0.85)] text-white'>Featured</Badge>
									</div>
									<CardContent className='p-6'>
										<div className='flex items-center space-x-4 text-sm text-gray-400 mb-3'>
											<div className='flex items-center'>
												<Calendar className='w-4 h-4 mr-1' />
												{new Date(post.date).toLocaleDateString('en-US', {
													month: 'short',
													day: 'numeric',
													year: 'numeric',
												})}
											</div>
											<div className='flex items-center'>
												<Clock className='w-4 h-4 mr-1' />
												{post.readTime} min read
											</div>
										</div>
										<h3 className='text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300'>{post.title}</h3>
										<p className='text-foreground/70 mb-4 leading-relaxed'>{post.excerpt}</p>
										<div className='flex flex-wrap gap-2 mb-4'>
											{post.tags?.slice(0, 3).map((tag, index) => (
												<Badge key={index} variant='outline' className='border-[rgba(var(--duck-rgb),0.3)] text-[rgba(var(--duck-rgb),0.9)] text-xs'>
													{tag}
												</Badge>
											))}
										</div>
										<Link href={`/blog/${post.slug}`}>
											<Button
												variant='outline'
												className='relative overflow-hidden cursor-pointer group px-4 py-2 text-sm font-semibold text-primary dark:text-white rounded-lg backdrop-blur-lg bg-[var(--gradient-primary)] border-[rgba(var(--duck-rgb),0.18)] shadow-[0_6px_24px_0_rgba(var(--duck-rgb),0.30)] hover:shadow-[0_6px_30px_0_rgba(var(--duck-rgb),0.5)] transition-all duration-300 hover:scale-105 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[rgba(var(--duck-rgb),0.12)] before:via-transparent before:to-[rgba(var(--duck-rgb),0.12)] before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 after:absolute after:inset-[1px] after:rounded-lg after:bg-gradient-to-br after:from-white/10 after:via-transparent after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300'
												style={{
													zIndex: 1,
													background: 'linear-gradient(135deg, rgba(var(--duck-rgb),0.28) 0%, rgba(var(--duck-rgb),0.14) 50%, rgba(var(--duck-rgb),0.28) 100%)',
													backdropFilter: 'blur(12px) saturate(160%)',
													WebkitBackdropFilter: 'blur(12px) saturate(160%)',
													boxShadow: '0 6px 24px 0 rgba(var(--duck-rgb), 0.30), inset 0 1px 0 0 rgba(255, 255, 255, 0.06)',
												}}
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

			{/* All Posts Grid */}
			<section className='py-12 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-7xl mx-auto'>
					<h2 className='text-3xl font-bold text-foreground mb-8'>All Posts</h2>
					{filteredPosts.length === 0 ? (
						<div className='text-center py-16'>
							<p className='text-xl text-foreground/60'>No posts found matching your search.</p>
							<Button onClick={() => setSearchQuery('')} variant='outline' className='mt-4 border-[rgba(var(--duck-rgb),0.6)] text-primary hover:bg-[rgba(var(--duck-rgb),0.12)]'>
								Clear Search
							</Button>
						</div>
					) : (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
							{filteredPosts.map((post) => (
								<Card key={post.slug} className='relative overflow-hidden group liquid-glass hover:liquid-glass-orange transition-all duration-500 flex flex-col rounded-xl'>
									<div className='relative overflow-hidden h-48'>
										<Image src={post.image || ''} alt={post.title} fill className='object-cover transition-transform duration-300 hover:scale-105' />
										<div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300' />
										<Badge className='absolute top-4 left-4 bg-[rgba(var(--duck-rgb),0.85)] text-white text-xs'>{post.category}</Badge>
									</div>
									<CardContent className='p-5 flex flex-col flex-1'>
										<div className='flex items-center space-x-4 text-xs text-gray-400 mb-3'>
											<div className='flex items-center'>
												<Calendar className='w-3 h-3 mr-1' />
												{new Date(post.date).toLocaleDateString('en-US', {
													month: 'short',
													day: 'numeric',
													year: 'numeric',
												})}
											</div>
											<div className='flex items-center'>
												<Clock className='w-3 h-3 mr-1' />
												{post.readTime} min
											</div>
										</div>
										<h3 className='text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2'>{post.title}</h3>
										<p className='text-foreground/70 mb-4 leading-relaxed text-sm flex-1 line-clamp-3'>{post.excerpt}</p>
										<div className='flex flex-wrap gap-1 mb-4'>
											{post.tags?.slice(0, 2).map((tag, index) => (
												<Badge key={index} variant='outline' className='border-[rgba(var(--duck-rgb),0.3)] text-[rgba(var(--duck-rgb),0.9)] text-xs'>
													{tag}
												</Badge>
											))}
										</div>
										<Link href={`/blog/${post.slug}`}>
											<Button
												size='sm'
												variant='outline'
												className='w-full relative overflow-hidden cursor-pointer group px-4 py-2 text-sm font-semibold text-primary dark:text-white rounded-lg backdrop-blur-lg bg-[var(--gradient-primary)] border-[rgba(var(--duck-rgb),0.18)] shadow-[0_6px_24px_0_rgba(var(--duck-rgb),0.30)] hover:shadow-[0_6px_30px_0_rgba(var(--duck-rgb),0.5)] transition-all duration-300 hover:scale-105 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[rgba(var(--duck-rgb),0.12)] before:via-transparent before:to-[rgba(var(--duck-rgb),0.12)] before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 after:absolute after:inset-[1px] after:rounded-lg after:bg-gradient-to-br after:from-white/10 after:via-transparent after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300'
												style={{
													zIndex: 1,
													background: 'linear-gradient(135deg, rgba(var(--duck-rgb),0.28) 0%, rgba(var(--duck-rgb),0.14) 50%, rgba(var(--duck-rgb),0.28) 100%)',
													backdropFilter: 'blur(12px) saturate(160%)',
													WebkitBackdropFilter: 'blur(12px) saturate(160%)',
													boxShadow: '0 6px 24px 0 rgba(var(--duck-rgb), 0.30), inset 0 1px 0 0 rgba(255, 255, 255, 0.06)',
												}}
											>
												Read More
											</Button>
										</Link>
									</CardContent>
								</Card>
							))}
						</div>
					)}
				</div>
			</section>

			{/* Newsletter Section */}
			<section className='py-16 px-4 sm:px-6 lg:px-8 bg-[linear-gradient(90deg,rgba(var(--duck-rgb),0.08),transparent)]'>
				<div className='max-w-4xl mx-auto text-center'>
					<h2 className='text-3xl md:text-4xl font-bold text-foreground mb-6'>Stay Updated</h2>
					<p className='text-xl text-foreground/70 mb-8'>Subscribe to our newsletter to get the latest insights and updates delivered to your inbox.</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto'>
						<input
							type='email'
							placeholder='Enter your email'
							className='flex-1 px-4 py-3 bg-background/50 border border-[rgba(var(--duck-rgb),0.3)] rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:border-[rgba(var(--duck-rgb),0.85)] backdrop-blur-sm'
						/>
						<Button
							className='relative overflow-hidden cursor-pointer group px-6 py-3 text-base font-semibold text-primary dark:text-white rounded-lg backdrop-blur-lg bg-[var(--gradient-primary)] border-[rgba(var(--duck-rgb),0.28)] shadow-[0_8px_32px_0_rgba(var(--duck-rgb),0.34)] hover:shadow-[0_8px_40px_0_rgba(var(--duck-rgb),0.6)] transition-all duration-350 hover:scale-105 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[rgba(var(--duck-rgb),0.12)] before:via-transparent before:to-[rgba(var(--duck-rgb),0.12)] before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 after:absolute after:inset-[1px] after:rounded-lg after:bg-gradient-to-br after:from-white/10 after:via-transparent after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300'
							style={{
								zIndex: 1,
								background: 'linear-gradient(135deg, rgba(var(--duck-rgb),0.32) 0%, rgba(var(--duck-rgb),0.18) 50%, rgba(var(--duck-rgb),0.32) 100%)',
								backdropFilter: 'blur(14px) saturate(180%)',
								WebkitBackdropFilter: 'blur(14px) saturate(180%)',
								boxShadow: '0 8px 32px 0 rgba(var(--duck-rgb), 0.34), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
							}}
						>
							Subscribe
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
