'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactSection: React.FC = () => {
	const [form, setForm] = useState({ first: '', last: '', email: '', subject: '', message: '' });
	const [submitted, setSubmitted] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitted(true);
		setTimeout(() => setSubmitted(false), 3500);
	};

	return (
		<section id='contact' className='py-32 bg-transparent relative overflow-hidden border-b border-[rgba(var(--duck-rgb),0.12)]'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7 }} className='text-center mb-20'>
					<h2 className='text-4xl md:text-5xl font-bold text-foreground mb-6 glow-text'>Contact Us</h2>
					<p className='text-xl text-foreground/70 max-w-3xl mx-auto'>We are here to assist you with any questions you may have.</p>
				</motion.div>
				<div className='grid gap-12 lg:grid-cols-2 items-start'>
					<motion.div className='space-y-8' initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
						<div>
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
						</div>
					</motion.div>

					<motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: 0.1 }}>
						<Card className='liquid-glass-orange text-primary-contrast rounded-xl'>
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
										className='w-full liquid-glass-orange text-primary-contrast font-semibold py-3 transition-all duration-300 hover:scale-105 shadow-[0_8px_32px_0_rgba(var(--duck-rgb),0.22)] focus:ring-2 focus:ring-[rgba(var(--duck-rgb),0.35)] focus:outline-none text-lg rounded-lg'
										disabled={submitted}
									>
										{submitted ? 'Message Sent!' : 'Send Message'}
									</Button>
									{submitted && <div className='text-center text-green-400 font-semibold mt-2 animate-fade-in-up'>Thank you! We received your message.</div>}
								</form>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default ContactSection;
