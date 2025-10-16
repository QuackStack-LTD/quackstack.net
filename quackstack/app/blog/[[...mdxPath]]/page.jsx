import { generateStaticParamsFor, importPage } from 'nextra/pages';
import { useMDXComponents as getMDXComponents } from '../../../mdx-components';
import { getAllBlogPosts } from '@/lib/blog';
import BlogListing from '@/components/BlogListing';

export const generateStaticParams = generateStaticParamsFor('mdxPath');

export async function generateMetadata(props) {
	const params = await props.params;

	// If no path, it's the index page
	if (!params.mdxPath || params.mdxPath.length === 0) {
		return {
			title: 'QuackStack Blog | Insights & Tutorials',
			description: 'Insights, tutorials, and thoughts from our development team. Stay updated with the latest trends in web development.',
		};
	}

	const { metadata } = await importPage(params.mdxPath);
	return metadata;
}

const Wrapper = getMDXComponents().wrapper;

export default async function Page(props) {
	const params = await props.params;

	// If no path, show the blog listing
	if (!params.mdxPath || params.mdxPath.length === 0) {
		const posts = await getAllBlogPosts();
		return <BlogListing posts={posts} />;
	}

	// Otherwise show the blog post
	const { default: MDXContent, toc, metadata, sourceCode } = await importPage(params.mdxPath);
	return (
		<Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
			<MDXContent {...props} params={params} />
		</Wrapper>
	);
}
