import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ShareButton from '@/components/ShareButton';
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
				<div className='min-h-screen bg-background text-foreground'>
					{/* Navigation */}
					<div className='fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border'>
						<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
							<div className='flex items-center justify-between h-16'>
								<Link href='/blog'>
									<Button variant='ghost' className='text-foreground/70 hover:text-primary hover:bg-[rgba(var(--duck-rgb),0.08)]'>
										<ArrowLeft className='w-4 h-4 mr-2' />
										Back to Blog
									</Button>
								</Link>
								<ShareButton title={meta.title} text={meta.excerpt} />
							</div>
						</div>
					</div>

					{/* Hero Section */}
					<section className='pt-24 pb-12 px-4 sm:px-6 lg:px-8'>
						<div className='max-w-4xl mx-auto'>
							{meta.category && <Badge className='mb-4 bg-[rgba(var(--duck-rgb),0.18)] text-primary border-[rgba(var(--duck-rgb),0.28)]'>{meta.category}</Badge>}
							<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6 glow-text leading-tight'>{meta.title}</h1>

							{/* Meta Information */}
							<div className='flex flex-wrap items-center gap-6 text-foreground/60 mb-8'>
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
										<Badge key={index} variant='outline' className='border-[rgba(var(--duck-rgb),0.28)] text-primary'>
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
							<article className='prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-h1:text-primary prose-h2:text-primary prose-h3:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:text-[rgba(var(--duck-rgb),0.85)] prose-strong:text-foreground prose-code:text-primary prose-pre:bg-muted prose-pre:border prose-pre:border-[rgba(var(--duck-rgb),0.2)] prose-p:text-foreground/80'>
								{children}
							</article>
						</div>
					</section>

					{/* CTA Section */}
					<section className='py-16 px-4 sm:px-6 lg:px-8'>
						<div className='max-w-4xl mx-auto text-center'>
							<h2 className='text-3xl md:text-4xl font-bold text-foreground mb-6'>Enjoyed This Article?</h2>
							<p className='text-xl text-foreground/70 mb-8'>Check out our other posts or get in touch to discuss your next project.</p>
							<div className='flex flex-col sm:flex-row gap-4 justify-center'>
								<Link href='/#contact'>
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
									>
										Get In Touch
									</Button>
								</Link>
								<Link href='/blog'>
									<Button size='lg' variant='outline' className='border-[rgba(var(--duck-rgb),0.6)] text-primary hover:bg-[rgba(var(--duck-rgb),0.12)]'>
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
