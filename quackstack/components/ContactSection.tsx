'use client';

import React, { useState } from 'react';
import FadeUp from './FadeUp';
import { useReducedEffects } from '@/hooks/use-reduced-effects';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

const ContactSection: React.FC = () => {
	const [form, setForm] = useState({ first: '', last: '', email: '', subject: '', message: '' });
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			});

			if (!response.ok) {
				throw new Error('Failed to send message');
			}

			setSubmitted(true);
			setForm({ first: '', last: '', email: '', subject: '', message: '' });
			setTimeout(() => setSubmitted(false), 3500);
		} catch (err) {
			setError('Failed to send message. Please try again or email us directly.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<section id='contact' className='py-16'>
			<div className='max-w-6xl mx-auto px-4'>
				<div className='grid gap-12 lg:grid-cols-2 items-start'>
					{(() => {
						const reduced = useReducedEffects();
						const left = (
							<>
								<h3 className='text-2xl font-semibold text-primary dark:text-primary mb-6'>Get in Touch</h3>
								<div className='space-y-6'>
									<div className='flex items-center space-x-4 hover:scale-105 transition-transform duration-300'>
										<div className='w-12 h-12 bg-[rgba(var(--duck-rgb),0.12)] rounded-full flex items-center justify-center'>
											<Mail className='w-6 h-6 text-primary dark:text-primary' />
										</div>
										<div className='flex flex-col'>
											<p className='text-foreground/60'>Email</p>
											<a href='mailto:contact@quackstack.net' className='text-foreground font-medium hover:underline'>
												contact@quackstack.net
											</a>
										</div>
									</div>

									<div className='flex items-center space-x-4 hover:scale-105 transition-transform duration-300'>
										<div className='w-12 h-12 bg-[rgba(var(--duck-rgb),0.12)] rounded-full flex items-center justify-center'>
											<Phone className='w-6 h-6 text-primary dark:text-primary' />
										</div>
										<div>
											<p className='text-foreground/60'>Phone</p>
											<p className='text-foreground font-medium'>(+359) 893 058 517</p>
										</div>
									</div>

									<div className='flex items-center space-x-4 hover:scale-105 transition-transform duration-300'>
										<div className='w-12 h-12 bg-[rgba(var(--duck-rgb),0.12)] rounded-full flex items-center justify-center'>
											<MapPin className='w-6 h-6 text-primary dark:text-primary' />
										</div>
										<div>
											<p className='text-foreground/60'>Location</p>
											<p className='text-foreground font-medium'>Remote, Bulgaria</p>
										</div>
									</div>
								</div>
							</>
						);

						return reduced ? (
							<div className='space-y-8'>{left}</div>
						) : (
							<FadeUp duration={0.6} className='space-y-8'>
								{left}
							</FadeUp>
						);
					})()}

					{(() => {
						const reduced = useReducedEffects();
						const right = (
							<Card className='liquid-glass text-primary-contrast rounded-xl'>
								<CardContent className='p-8'>
									<form className='space-y-6' onSubmit={handleSubmit} autoComplete='off'>
										<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
											<div>
												<label htmlFor='first' className='block text-sm font-medium text-foreground/70 mb-2'>
													First Name
												</label>
												<Input
													id='first'
													name='first'
													value={form.first}
													onChange={handleChange}
													className='bg-background/50 border-border text-foreground focus:border-[rgba(var(--duck-rgb),0.6)] dark:focus:border-[rgba(var(--duck-rgb),0.6)] focus:ring-2 focus:ring-[rgba(var(--duck-rgb),0.18)] dark:focus:ring-[rgba(var(--duck-rgb),0.18)] backdrop-blur-sm transition-all duration-200'
													placeholder='John'
													required
													autoComplete='off'
												/>
											</div>

											<div>
												<label htmlFor='last' className='block text-sm font-medium text-foreground/70 mb-2'>
													Last Name
												</label>
												<Input
													id='last'
													name='last'
													value={form.last}
													onChange={handleChange}
													className='bg-background/50 border-border text-foreground focus:border-[rgba(var(--duck-rgb),0.6)] dark:focus:border-[rgba(var(--duck-rgb),0.6)] focus:ring-2 focus:ring-[rgba(var(--duck-rgb),0.18)] dark:focus:ring-[rgba(var(--duck-rgb),0.18)] backdrop-blur-sm transition-all duration-200'
													placeholder='Doe'
													required
													autoComplete='off'
												/>
											</div>
										</div>

										<div>
											<label htmlFor='email' className='block text-sm font-medium text-foreground/70 mb-2'>
												Email
											</label>
											<Input
												id='email'
												name='email'
												type='email'
												value={form.email}
												onChange={handleChange}
												className='bg-background/50 border-border text-foreground focus:border-[rgba(var(--duck-rgb),0.6)] dark:focus:border-[rgba(var(--duck-rgb),0.6)] focus:ring-2 focus:ring-[rgba(var(--duck-rgb),0.18)] dark:focus:ring-[rgba(var(--duck-rgb),0.18)] backdrop-blur-sm transition-all duration-200'
												placeholder='john@example.com'
												required
												autoComplete='off'
											/>
										</div>

										<div>
											<label htmlFor='subject' className='block text-sm font-medium text-foreground/70 mb-2'>
												Subject
											</label>
											<Input
												id='subject'
												name='subject'
												value={form.subject}
												onChange={handleChange}
												className='bg-background/50 border-border text-foreground focus:border-[rgba(var(--duck-rgb),0.6)] dark:focus:border-[rgba(var(--duck-rgb),0.6)] focus:ring-2 focus:ring-[rgba(var(--duck-rgb),0.18)] dark:focus:ring-[rgba(var(--duck-rgb),0.18)] backdrop-blur-sm transition-all duration-200'
												placeholder='Project Inquiry'
												required
												autoComplete='off'
											/>
										</div>

										<div>
											<label htmlFor='message' className='block text-sm font-medium text-foreground/70 mb-2'>
												Message
											</label>
											<Textarea
												id='message'
												name='message'
												value={form.message}
												onChange={handleChange}
												className='bg-background/50 border-border text-foreground focus:border-[rgba(var(--duck-rgb),0.6)] dark:focus:border-[rgba(var(--duck-rgb),0.6)] focus:ring-2 focus:ring-[rgba(var(--duck-rgb),0.18)] dark:focus:ring-[rgba(var(--duck-rgb),0.18)] min-h-32 backdrop-blur-sm transition-all duration-200'
												placeholder='Tell us about your project...'
												required
												autoComplete='off'
											/>
										</div>

										<Button
											type='submit'
											className='w-full relative overflow-hidden cursor-pointer group px-8 py-4 text-lg font-semibold text-primary dark:text-white rounded-2xl backdrop-blur-xl bg-[var(--gradient-primary)] border-[rgba(var(--duck-rgb),0.28)] shadow-[0_8px_32px_0_rgba(var(--duck-rgb),0.37)] hover:shadow-[0_8px_40px_0_rgba(var(--duck-rgb),0.6)] transition-all duration-500 hover:scale-105 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[rgba(var(--duck-rgb),0.12)] before:via-transparent before:to-[rgba(var(--duck-rgb),0.12)] before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 after:absolute after:inset-[1px] after:rounded-2xl after:bg-gradient-to-br after:from-white/10 after:via-transparent after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300'
											style={{
												zIndex: 1,
												background: 'linear-gradient(135deg, rgba(var(--duck-rgb),0.32) 0%, rgba(var(--duck-rgb),0.18) 50%, rgba(var(--duck-rgb),0.32) 100%)',
												backdropFilter: 'blur(16px) saturate(180%)',
												WebkitBackdropFilter: 'blur(16px) saturate(180%)',
												boxShadow: '0 8px 32px 0 rgba(var(--duck-rgb), 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
											}}
											disabled={submitted || loading}
										>
											{loading ? 'Sending...' : submitted ? 'Message Sent!' : 'Send Message'}
										</Button>

										{submitted && <div className='text-center text-green-400 font-semibold mt-2 animate-fade-in-up'>Thank you! We received your message.</div>}
										{error && <div className='text-center text-red-400 font-semibold mt-2'>{error}</div>}
									</form>
								</CardContent>
							</Card>
						);

						return reduced ? (
							<div>{right}</div>
						) : (
							<FadeUp duration={0.6} delay={0.1}>
								{right}
							</FadeUp>
						);
					})()}
				</div>
			</div>
		</section>
	);
};

export default ContactSection;
