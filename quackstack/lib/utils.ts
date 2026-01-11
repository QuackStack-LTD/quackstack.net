import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function hasHref(href?: string | null) {
	if (!href) return false;
	const trimmed = href.trim();
	if (!trimmed) return false;
	if (trimmed === '#') return false;
	return true;
}
