import { importPage } from 'nextra/pages';
import fs from 'fs';
import path from 'path';

export interface BlogPost {
	slug: string;
	title: string;
	excerpt: string;
	author: string;
	date: string;
	category?: string;
	tags?: string[];
	image?: string;
	readTime?: number;
	featured?: boolean;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
	const contentDir = path.join(process.cwd(), 'content');
	const files = fs.readdirSync(contentDir).filter((file) => file.endsWith('.mdx') && file !== 'index.mdx');

	const posts = await Promise.all(
		files.map(async (filename) => {
			const slug = filename.replace('.mdx', '');
			try {
				const { metadata } = await importPage([slug]);
				const meta = metadata as any;

				return {
					slug,
					title: meta?.title || 'Untitled',
					excerpt: meta?.excerpt || '',
					author: meta?.author || 'QuackStack Team',
					date: meta?.date || new Date().toISOString(),
					category: meta?.category || 'Development',
					tags: meta?.tags || [],
					image: meta?.image || `https://placehold.co/800x600/1a1a1a/f97316?text=${encodeURIComponent(slug)}`,
					readTime: meta?.readTime || 5,
					featured: meta?.featured || false,
				} as BlogPost;
			} catch (error) {
				console.error(`Error loading ${filename}:`, error);
				return null;
			}
		})
	);

	// Filter out nulls and sort by date (newest first)
	const validPosts = posts.filter((post): post is BlogPost => post !== null);
	return validPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
