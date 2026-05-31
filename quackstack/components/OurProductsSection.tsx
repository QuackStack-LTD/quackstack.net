'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import SectionHeading from '@/components/SectionHeading';
import FadeUp from './FadeUp';
import { useReducedEffects } from '@/hooks/use-reduced-effects';
import { ExternalLink, Pen, Box } from 'lucide-react';

const products = [
	{
		name: 'QSign',
		tagline: 'Brand every signature you make.',
		description:
			'A desktop signing client for physical tokens and smart cards. Customize signature appearance, placement, and overlays — then sign with your eIDAS-compliant certificate. B-Trust compatible.',
		icon: <Pen className='w-8 h-8' />,
		status: 'Live',
		url: 'https://qsign.quackstack.net',
		color: 'from-indigo-500/20 via-blue-500/10 to-indigo-400/20',
		glowColor: 'rgba(124, 107, 240, 0.35)',
		image: '/qsign-screenshot.png',
	},
	{
		name: 'QubStack',
		tagline: 'Build 3D worlds in your browser.',
		description:
			'A powerful browser-based 3D scene editor with real-time preview, PBR materials, AR/VR support, and cloud saves. No downloads, no installs — just create.',
		icon: <Box className='w-8 h-8' />,
		status: 'Live',
		url: 'https://qubstack.quackstack.net/start',
		color: 'from-amber-500/20 via-orange-500/10 to-yellow-500/20',
		glowColor: 'rgba(232, 162, 58, 0.35)',
		image: 'https://qubstack.quackstack.net/screenshot1.png',
	},
];

const OurProductsSection: React.FC = () => {
	const reduced = useReducedEffects();

	return (
		<section id='products' className='py-32 relative overflow-hidden'>
			{/* Background glow */}
			<div
				className='absolute inset-0 -z-10 pointer-events-none'
				style={{
					background:
						'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(var(--duck-rgb), 0.10), transparent 70%)',
				}}
			/>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
				<SectionHeading
					eyebrow='In-House Products'
					title='Our Products'
					subtext="We build products for our clients — and we build them for ourselves too. Here are a few we're shipping under our own brand."
					gradient
				/>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
					{products.map((product, index) => {
						const cardContent = (
							<Card
								key={product.name}
								className='relative overflow-hidden group py-0 liquid-glass hover:liquid-glass-orange transition-all duration-500 rounded-2xl h-full flex flex-col'
							>
								{/* Gradient accent top bar */}
								<div
									className={`h-1.5 w-full bg-gradient-to-r ${product.color}`}
								/>

								{/* Image area — placeholder until user provides images */}
								<div className='relative w-full h-64 bg-gradient-to-br from-black/5 to-black/15 dark:from-white/5 dark:to-white/10 flex items-center justify-center overflow-hidden'>
									{product.image ? (
										<img
											src={product.image}
											alt={product.name}
											className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
										/>
									) : (
										<div className='flex flex-col items-center justify-center gap-3 text-foreground/30'>
											<div
												className='p-4 rounded-2xl transition-all duration-500 group-hover:scale-110'
												style={{
													background: `linear-gradient(135deg, ${product.glowColor}, transparent)`,
												}}
											>
												<span className='text-foreground/60'>
													{product.icon}
												</span>
											</div>
										</div>
									)}
									{/* Overlay glow on hover */}
									<div
										className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'
										style={{
											background: `radial-gradient(circle at 50% 80%, ${product.glowColor}, transparent 70%)`,
										}}
									/>
									<Badge className='absolute top-4 left-4 bg-[rgba(var(--duck-rgb),0.8)] text-white text-xs'>
										{product.status}
									</Badge>
								</div>

								<CardContent className='p-6 sm:p-8 flex flex-col flex-1 relative z-10'>
									<h3 className='text-2xl font-bold text-primary dark:text-primary mb-1 group-hover:drop-shadow-sm transition-all duration-300'>
										{product.name}
									</h3>
									<p className='text-sm font-medium text-foreground/50 mb-4 italic'>
										{product.tagline}
									</p>
									<p className='text-foreground/70 leading-relaxed mb-6 flex-1 group-hover:drop-shadow-sm transition-all duration-300'>
										{product.description}
									</p>

									{product.url && (
										<div>
											<Button
												asChild
												size='sm'
												variant='outline'
												className='border-[rgba(var(--duck-rgb),0.28)] text-primary hover:bg-[rgba(var(--duck-rgb),0.12)] hover:text-primary bg-transparent backdrop-blur-sm hover:border-[rgba(var(--duck-rgb),0.28)] transition-all duration-300'
											>
												<a
													href={product.url}
													target='_blank'
													rel='noopener noreferrer'
												>
													<ExternalLink className='w-4 h-4 mr-2' />
													Visit {product.name}
												</a>
											</Button>
										</div>
									)}
								</CardContent>
							</Card>
						);

						return reduced ? (
							<div key={product.name} className='group'>
								{cardContent}
							</div>
						) : (
							<FadeUp
								key={product.name}
								duration={1}
								delay={index * 0.15}
								className='group'
							>
								{cardContent}
							</FadeUp>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default OurProductsSection;
