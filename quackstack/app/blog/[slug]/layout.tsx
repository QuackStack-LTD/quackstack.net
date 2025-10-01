import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
	// Import the blog data
	const blogData = await import('@/data/blog.json');
	const post = blogData.default.find((p) => p.slug === params.slug);

	if (!post) {
		return {
			title: 'Post Not Found | QuackStack Blog',
			description: 'The requested blog post could not be found.',
		};
	}

	return {
		title: `${post.title} | QuackStack Blog`,
		description: post.excerpt,
		openGraph: {
			title: post.title,
			description: post.excerpt,
			images: [
				{
					url: post.image,
					width: 1200,
					height: 630,
					alt: post.title,
				},
			],
			type: 'article',
			publishedTime: post.publishedAt,
			modifiedTime: post.updatedAt,
			authors: [post.author],
			tags: post.tags,
		},
		twitter: {
			card: 'summary_large_image',
			title: post.title,
			description: post.excerpt,
			images: [post.image],
		},
	};
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
	return children;
}
