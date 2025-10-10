'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactSection: React.FC = () => {
	// Removed custom cursor hover tracking state (unused after cursor simplification)
	const [form, setForm] = useState({ first: '', last: '', email: '', subject: '', message: '' });
	const [submitted, setSubmitted] = useState(false);

	// Removed scroll-based manual transforms to prevent overlap

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitted(true);
		setTimeout(() => setSubmitted(false), 3500);
	};

	return (
		<section id='contact' className='py-32 bg-black/50 relative overflow-hidden'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.4 }} transition={{ duration: 0.7 }} className='text-center mb-20'>
					<h2 className='text-4xl md:text-5xl font-bold text-white mb-6 glow-text'>Contact Us</h2>
					<p className='text-xl text-gray-300 max-w-3xl mx-auto'>We are here to assist you with any questions you may have.</p>
				</motion.div>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-start'>
					<motion.div className='space-y-8' initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.3 }} transition={{ duration: 0.6 }}>
						<div>
							<h3 className='text-2xl font-semibold text-orange-400 mb-6'>Get in Touch</h3>
							<div className='space-y-6'>
								<div className='flex items-center space-x-4 hover:scale-105 transition-transform duration-300'>
									<div className='w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center'>
										<Mail className='w-6 h-6 text-orange-400' />
									</div>
									<div className='flex flex-col'>
										<p className='text-gray-300'>Email</p>
										<p className='text-white font-medium'>contact@quackstack.net</p>
									</div>
								</div>
								<div className='flex items-center space-x-4 hover:scale-105 transition-transform duration-300'>
									<div className='w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center'>
										<Phone className='w-6 h-6 text-orange-400' />
									</div>
									<div>
										<p className='text-gray-300'>Phone</p>
										<p className='text-white font-medium'>(+1) 676767676767</p>
									</div>
								</div>
								<div className='flex items-center space-x-4 hover:scale-105 transition-transform duration-300'>
									<div className='w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center'>
										<MapPin className='w-6 h-6 text-orange-400' />
									</div>
									<div>
										<p className='text-gray-300'>Location</p>
										<p className='text-white font-medium'>Vraca</p>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
					<motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.3 }} transition={{ duration: 0.6, delay: 0.1 }}>
						<Card className='liquid-glass rounded-xl'>
							<CardContent className='p-8'>
								<form className='space-y-6' onSubmit={handleSubmit} autoComplete='off'>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
										<div>
											<label htmlFor='first' className='block text-sm font-medium text-gray-300 mb-2'>
												First Name
											</label>
											<Input
												id='first'
												name='first'
												value={form.first}
												onChange={handleChange}
												className='bg-gray-700/50 border-gray-600 text-white focus:border-orange-400 focus:ring-2 focus:ring-orange-400 backdrop-blur-sm transition-all duration-200'
												placeholder='John'
												required
												autoComplete='off'
											/>
										</div>
										<div>
											<label htmlFor='last' className='block text-sm font-medium text-gray-300 mb-2'>
												Last Name
											</label>
											<Input
												id='last'
												name='last'
												value={form.last}
												onChange={handleChange}
												className='bg-gray-700/50 border-gray-600 text-white focus:border-orange-400 focus:ring-2 focus:ring-orange-400 backdrop-blur-sm transition-all duration-200'
												placeholder='Doe'
												required
												autoComplete='off'
											/>
										</div>
									</div>
									<div>
										<label htmlFor='email' className='block text-sm font-medium text-gray-300 mb-2'>
											Email
										</label>
										<Input
											id='email'
											name='email'
											type='email'
											value={form.email}
											onChange={handleChange}
											className='bg-gray-700/50 border-gray-600 text-white focus:border-orange-400 focus:ring-2 focus:ring-orange-400 backdrop-blur-sm transition-all duration-200'
											placeholder='john@example.com'
											required
											autoComplete='off'
										/>
									</div>
									<div>
										<label htmlFor='subject' className='block text-sm font-medium text-gray-300 mb-2'>
											Subject
										</label>
										<Input
											id='subject'
											name='subject'
											value={form.subject}
											onChange={handleChange}
											className='bg-gray-700/50 border-gray-600 text-white focus:border-orange-400 focus:ring-2 focus:ring-orange-400 backdrop-blur-sm transition-all duration-200'
											placeholder='Project Inquiry'
											required
											autoComplete='off'
										/>
									</div>
									<div>
										<label htmlFor='message' className='block text-sm font-medium text-gray-300 mb-2'>
											Message
										</label>
										<Textarea
											id='message'
											name='message'
											value={form.message}
											onChange={handleChange}
											className='bg-gray-700/50 border-gray-600 text-white focus:border-orange-400 focus:ring-2 focus:ring-orange-400 min-h-32 backdrop-blur-sm transition-all duration-200'
											placeholder='Tell us about your project...'
											required
											autoComplete='off'
										/>
									</div>
									<Button
										type='submit'
										className='w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 transition-all duration-300 hover:scale-105 hover:shadow-orange-500/50 hover:shadow-lg focus:ring-2 focus:ring-orange-400 focus:outline-none text-lg rounded-lg'
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
