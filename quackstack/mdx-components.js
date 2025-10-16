import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';

export function useMDXComponents() {
	return {
		wrapper: ({ children, metadata }) => {
			// If it's the index page, render plain
			if (!metadata || metadata.title === 'QuackStack Blog') {
				return <div className='container mx-auto px-4 py-8 prose max-w-none'>{children}</div>;
			}

			// For blog posts, render with styling
			const meta = metadata;
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
							{meta.category && <Badge className='mb-4 bg-orange-500/20 text-orange-400 border-orange-500/30'>{meta.category}</Badge>}
							<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6 glow-text leading-tight'>{meta.title}</h1>

							{/* Meta Information */}
							<div className='flex flex-wrap items-center gap-6 text-gray-400 mb-8'>
								{meta.author && (
									<div className='flex items-center'>
										<User className='w-4 h-4 mr-2' />
										{meta.author}
									</div>
								)}
								{meta.date && (
									<div className='flex items-center'>
										<Calendar className='w-4 h-4 mr-2' />
										{new Date(meta.date).toLocaleDateString('en-US', {
											month: 'long',
											day: 'numeric',
											year: 'numeric',
										})}
									</div>
								)}
								{meta.readTime && (
									<div className='flex items-center'>
										<Clock className='w-4 h-4 mr-2' />
										{meta.readTime} min read
									</div>
								)}
							</div>

							{/* Tags */}
							{meta.tags && meta.tags.length > 0 && (
								<div className='flex flex-wrap gap-2 mb-8'>
									{meta.tags.map((tag, index) => (
										<Badge key={index} variant='outline' className='border-orange-500/30 text-orange-300'>
											{tag}
										</Badge>
									))}
								</div>
							)}
						</div>
					</section>

					{/* Article Content */}
					<section className='py-12 px-4 sm:px-6 lg:px-8'>
						<div className='max-w-4xl mx-auto'>
							<article className='prose prose-lg prose-invert max-w-none prose-headings:text-white prose-h1:text-orange-400 prose-h2:text-orange-400 prose-h3:text-white prose-a:text-orange-400 prose-a:no-underline hover:prose-a:text-orange-300 prose-strong:text-white prose-code:text-orange-300 prose-pre:bg-gray-900 prose-pre:border prose-pre:border-orange-500/20'>
								{children}
							</article>
						</div>
					</section>

					{/* CTA Section */}
					<section className='py-16 px-4 sm:px-6 lg:px-8'>
						<div className='max-w-4xl mx-auto text-center'>
							<h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>Enjoyed This Article?</h2>
							<p className='text-xl text-gray-300 mb-8'>Check out our other posts or get in touch to discuss your next project.</p>
							<div className='flex flex-col sm:flex-row gap-4 justify-center'>
								<Link href='/#contact'>
									<Button size='lg' className='bg-orange-500 hover:bg-orange-600 text-white'>
										Get In Touch
									</Button>
								</Link>
								<Link href='/blog'>
									<Button size='lg' variant='outline' className='border-orange-400/60 text-orange-400 hover:bg-orange-400/20'>
										Read More Posts
									</Button>
								</Link>
							</div>
						</div>
					</section>
				</div>
			);
		},
	};
}
