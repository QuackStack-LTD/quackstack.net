import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { projectId: string } }): Promise<Metadata> {
	// Import the projects data
	const projectsData = await import('@/data/projects.json');
	const project = projectsData.default.find((p) => p.id === params.projectId);

	if (!project) {
		return {
			title: 'Project Not Found | QuackStack',
			description: 'The requested project could not be found.',
		};
	}

	return {
		title: `${project.title} | QuackStack Portfolio`,
		description: project.shortDescription || project.description,
		openGraph: {
			title: project.title,
			description: project.shortDescription || project.description,
			images: [
				{
					url: project.image,
					width: 1200,
					height: 630,
					alt: project.title,
				},
			],
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title: project.title,
			description: project.shortDescription || project.description,
			images: [project.image],
		},
	};
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
	return children;
}
