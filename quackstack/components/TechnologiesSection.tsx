'use client';

import React from 'react';
import SectionHeading from '@/components/SectionHeading';
import {
	FaReact, FaNodeJs, FaPython, FaAws, FaDocker, FaFigma, FaGithub, FaDatabase,
	FaVuejs, FaAngular, FaPhp, FaSwift, FaJava, FaWordpress, FaShopify, FaSlack,
	FaJenkins, FaRust, FaLinux, FaGitAlt, FaJira, FaSketch, FaMicrosoft, FaHashtag, FaCode
} from 'react-icons/fa';
import {
	SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb, SiPostgresql,
	SiRedis, SiKubernetes, SiTerraform, SiGooglecloud,
	SiVercel, SiCloudflare, SiGraphql, SiFirebase, SiSupabase,
	SiElasticsearch, SiDjango, SiLaravel, SiDotnet, SiSpring,
	SiExpress, SiFlutter, SiKotlin, SiCplusplus, SiSvelte,
	SiBlender, SiCinema4D, SiAdobephotoshop, SiAdobeillustrator,
	SiAdobeaftereffects, SiAdobexd, SiCanva, SiWebflow, SiNotion,
	SiLinear, SiPostman, SiStripe, SiMysql, SiGo,
	SiThreedotjs, SiWebgl, SiGithubactions, SiInvision,
	SiReact as SiReactNative
} from 'react-icons/si';

// Row 1: Languages & Core Frameworks
const row1 = [
	{ name: 'React', icon: <FaReact /> },
	{ name: 'Next.js', icon: <SiNextdotjs /> },
	{ name: 'TypeScript', icon: <SiTypescript /> },
	{ name: 'Python', icon: <FaPython /> },
	{ name: 'Rust', icon: <FaRust /> },
	{ name: 'Go', icon: <SiGo /> },
	{ name: 'Node.js', icon: <FaNodeJs /> },
	{ name: 'Vue.js', icon: <FaVuejs /> },
	{ name: 'Angular', icon: <FaAngular /> },
	{ name: 'Svelte', icon: <SiSvelte /> },
	{ name: 'Java', icon: <FaJava /> },
	{ name: 'C#', icon: <FaHashtag /> },
	{ name: 'C++', icon: <SiCplusplus /> },
	{ name: 'PHP', icon: <FaPhp /> },
	{ name: 'Swift', icon: <FaSwift /> },
	{ name: 'Kotlin', icon: <SiKotlin /> },
	{ name: 'Django', icon: <SiDjango /> },
	{ name: 'Laravel', icon: <SiLaravel /> },
	{ name: '.NET', icon: <SiDotnet /> },
	{ name: 'Spring', icon: <SiSpring /> },
	{ name: 'Express', icon: <SiExpress /> },
	{ name: 'Flutter', icon: <SiFlutter /> },
	{ name: 'React Native', icon: <SiReactNative /> },
	{ name: 'Tailwind CSS', icon: <SiTailwindcss /> },
];

// Row 2: Cloud, DevOps & Databases
const row2 = [
	{ name: 'AWS', icon: <FaAws /> },
	{ name: 'Azure', icon: <FaMicrosoft /> },
	{ name: 'Google Cloud', icon: <SiGooglecloud /> },
	{ name: 'Docker', icon: <FaDocker /> },
	{ name: 'Kubernetes', icon: <SiKubernetes /> },
	{ name: 'Terraform', icon: <SiTerraform /> },
	{ name: 'Linux', icon: <FaLinux /> },
	{ name: 'Vercel', icon: <SiVercel /> },
	{ name: 'Cloudflare', icon: <SiCloudflare /> },
	{ name: 'Jenkins', icon: <FaJenkins /> },
	{ name: 'GitHub Actions', icon: <SiGithubactions /> },
	{ name: 'PostgreSQL', icon: <SiPostgresql /> },
	{ name: 'MongoDB', icon: <SiMongodb /> },
	{ name: 'MySQL', icon: <SiMysql /> },
	{ name: 'Redis', icon: <SiRedis /> },
	{ name: 'Firebase', icon: <SiFirebase /> },
	{ name: 'Supabase', icon: <SiSupabase /> },
	{ name: 'Elasticsearch', icon: <SiElasticsearch /> },
	{ name: 'GraphQL', icon: <SiGraphql /> },
	{ name: 'REST', icon: <FaDatabase /> },
];

// Row 3: Design, Creative & Tools
const row3 = [
	{ name: 'Figma', icon: <FaFigma /> },
	{ name: 'Adobe XD', icon: <SiAdobexd /> },
	{ name: 'Photoshop', icon: <SiAdobephotoshop /> },
	{ name: 'Illustrator', icon: <SiAdobeillustrator /> },
	{ name: 'After Effects', icon: <SiAdobeaftereffects /> },
	{ name: 'Blender', icon: <SiBlender /> },
	{ name: 'Cinema 4D', icon: <SiCinema4D /> },
	{ name: 'Canva', icon: <SiCanva /> },
	{ name: 'Sketch', icon: <FaSketch /> },
	{ name: 'InVision', icon: <SiInvision /> },
	{ name: 'Three.js', icon: <SiThreedotjs /> },
	{ name: 'WebGL', icon: <SiWebgl /> },
	{ name: 'Git', icon: <FaGitAlt /> },
	{ name: 'GitHub', icon: <FaGithub /> },
	{ name: 'VS Code', icon: <FaCode /> },
	{ name: 'Jira', icon: <FaJira /> },
	{ name: 'Notion', icon: <SiNotion /> },
	{ name: 'Linear', icon: <SiLinear /> },
	{ name: 'Slack', icon: <FaSlack /> },
	{ name: 'Postman', icon: <SiPostman /> },
	{ name: 'Stripe', icon: <SiStripe /> },
	{ name: 'Shopify', icon: <FaShopify /> },
	{ name: 'WordPress', icon: <FaWordpress /> },
	{ name: 'Webflow', icon: <SiWebflow /> },
];

const rows = [
	{ items: row1, duration: 60, direction: 'normal' as const },
	{ items: row2, duration: 70, direction: 'reverse' as const },
	{ items: row3, duration: 55, direction: 'normal' as const },
];

const TechnologiesSection: React.FC = () => {
	return (
		<section id='technologies' className='py-32 overflow-hidden relative'>
			<div className='absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_40%,rgba(var(--duck-rgb),0.18),transparent_25%)] pointer-events-none' />
			<SectionHeading title='Technologies We Master' subtext='Languages, frameworks, cloud platforms, databases, design tools, and everything in between.' gradient />

			<style>{`
				@keyframes tech-scroll {
					from { transform: translateX(0); }
					to { transform: translateX(-50%); }
				}
				.tech-row {
					display: flex;
					width: max-content;
					gap: 1rem;
				}
				.tech-row-wrapper {
					overflow: hidden;
					position: relative;
					-webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
					mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
				}
				.tech-pill {
					flex-shrink: 0;
					display: flex;
					align-items: center;
					gap: 0.625rem;
					padding: 0.625rem 1.25rem;
					border-radius: 9999px;
					border: 1px solid rgba(var(--duck-rgb), 0.14);
					background: linear-gradient(135deg, rgba(var(--duck-rgb), 0.08), rgba(var(--duck-rgb), 0.03));
					cursor: default;
					transition: border-color 0.3s, box-shadow 0.3s;
					white-space: nowrap;
				}
				.tech-pill:hover {
					border-color: rgba(var(--duck-rgb), 0.35);
					box-shadow: 0 4px 20px 0 rgba(var(--duck-rgb), 0.2);
				}
				.tech-pill .tech-icon {
					font-size: 1.125rem;
					color: var(--foreground);
					opacity: 0.6;
					transition: opacity 0.3s, color 0.3s;
				}
				.tech-pill:hover .tech-icon {
					opacity: 1;
					color: hsl(var(--primary));
				}
				.tech-pill .tech-name {
					font-size: 0.875rem;
					font-weight: 500;
					color: var(--foreground);
					opacity: 0.7;
					transition: opacity 0.3s, color 0.3s;
				}
				.tech-pill:hover .tech-name {
					opacity: 1;
					color: hsl(var(--primary));
				}
			`}</style>

			<div className='flex flex-col gap-5 mt-4'>
				{rows.map((row, rowIndex) => (
					<div key={rowIndex} className='tech-row-wrapper'>
						<div
							className='tech-row'
							style={{
								animation: `tech-scroll ${row.duration}s linear infinite`,
								animationDirection: row.direction,
							}}
						>
							{/* Duplicate items for seamless loop */}
							{[...row.items, ...row.items].map((tech, index) => (
								<div key={index} className='tech-pill'>
									<span className='tech-icon'>{tech.icon}</span>
									<span className='tech-name'>{tech.name}</span>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default TechnologiesSection;
