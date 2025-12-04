'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Twitter, Linkedin, Mail, Link as LinkIcon } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

type Props = {
	title?: string;
	text?: string;
};

export default function ShareButton({ title, text }: Props) {
	const [open, setOpen] = useState(false);
	const [copied, setCopied] = useState(false);
	const ref = useRef<HTMLDivElement | null>(null);

	const url = typeof window !== 'undefined' ? window.location.href : '';

	useEffect(() => {
		const onDoc = (e: MouseEvent) => {
			if (!ref.current) return;
			if (!ref.current.contains(e.target as Node)) setOpen(false);
		};
		document.addEventListener('mousedown', onDoc);
		return () => document.removeEventListener('mousedown', onDoc);
	}, []);

	const handleShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({ title, text, url });

				// show a small confirmation toast when native share is invoked
				toast({ title: 'Share', description: 'Opened native share sheet' });
			} catch (err) {
				// user cancelled or share failed — fallback to menu
				setOpen(true);
			}
			return;
		}
		setOpen((v) => !v);
	};

	const copyLink = async () => {
		try {
			await navigator.clipboard.writeText(url);
			setCopied(true);
			toast({ title: 'Copied', description: 'Link copied to clipboard' });
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			// ignore
		}
	};

	const tweetHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent((text || title || '') + ' ' + url)}`;
	const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
	const mailHref = `mailto:?subject=${encodeURIComponent(title || '')}&body=${encodeURIComponent((text || '') + '\n\n' + url)}`;

	return (
		<div ref={ref} className='relative inline-block'>
			<Button variant='ghost' onClick={handleShare} className='text-foreground/70 hover:text-primary hover:bg-[rgba(var(--duck-rgb),0.08)] flex items-center' aria-expanded={open} aria-haspopup='menu'>
				<Share2 className='w-4 h-4 mr-2' />
				Share
			</Button>

			{open && (
				<div className='absolute right-0 mt-2 w-56 bg-card text-card-foreground rounded-lg shadow-lg p-3 z-50 animate-fade-in-up-fast'>
					<div className='flex flex-col gap-2'>
						<button
							onClick={() => {
								copyLink();
								setOpen(false);
							}}
							className='w-full flex items-center gap-2 text-sm px-3 py-2 rounded-md text-foreground bg-[rgba(var(--duck-rgb),0.06)] hover:bg-[rgba(var(--duck-rgb),0.12)] transition'
						>
							<LinkIcon className='w-4 h-4' />
							<span className='flex-1 text-left'>{copied ? 'Copied link ✓' : 'Copy link'}</span>
						</button>

						<a
							href={tweetHref}
							target='_blank'
							rel='noopener noreferrer'
							onClick={() => setOpen(false)}
							className='w-full flex items-center gap-2 text-sm px-3 py-2 rounded-md text-foreground bg-[rgba(var(--duck-rgb),0.04)] hover:bg-[rgba(var(--duck-rgb),0.10)] transition'
						>
							<Twitter className='w-4 h-4 text-sky-400' />
							<span className='flex-1 text-left'>Twitter</span>
						</a>

						<a
							href={linkedinHref}
							target='_blank'
							rel='noopener noreferrer'
							onClick={() => setOpen(false)}
							className='w-full flex items-center gap-2 text-sm px-3 py-2 rounded-md text-foreground bg-[rgba(var(--duck-rgb),0.04)] hover:bg-[rgba(var(--duck-rgb),0.10)] transition'
						>
							<Linkedin className='w-4 h-4 text-indigo-500' />
							<span className='flex-1 text-left'>LinkedIn</span>
						</a>

						<a href={mailHref} onClick={() => setOpen(false)} className='w-full flex items-center gap-2 text-sm px-3 py-2 rounded-md text-foreground bg-[rgba(var(--duck-rgb),0.04)] hover:bg-[rgba(var(--duck-rgb),0.10)] transition'>
							<Mail className='w-4 h-4 text-rose-500' />
							<span className='flex-1 text-left'>Email</span>
						</a>
					</div>
				</div>
			)}
		</div>
	);
}
