import nextra from 'nextra';

// Configure Nextra 4 with blog path
const withNextra = nextra({
	contentDirBasePath: '/blog',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		unoptimized: true,
	},
	pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

export default withNextra(nextConfig);
