export default {
	projectLink: 'https://github.com/valentinasenov/quackstack',
	docsRepositoryBase: 'https://github.com/valentinasenov/quackstack/blob/main',
	titleSuffix: ' – QuackStack Blog',
	logo: <span>QuackStack Blog</span>,
	head: (
		<>
			<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			<meta name='description' content='QuackStack Blog – Modern web development, React, Next.js, TypeScript, and more.' />
			<meta name='og:title' content='QuackStack Blog' />
		</>
	),
	search: true,
	prevLinks: true,
	nextLinks: true,
	footer: <span>MIT {new Date().getFullYear()} © QuackStack.</span>,
	darkMode: true,
	editLink: {
		text: 'Edit this page on GitHub',
		pattern: 'https://github.com/valentinasenov/quackstack/edit/main/pages/blog/{{filename}}.mdx',
	},
	feedback: {
		content: 'Question? Give us feedback →',
		labels: 'feedback',
	},
	navigation: true,
	toc: {
		float: true,
	},
	unstable_faviconGlyph: '🦆',
};
