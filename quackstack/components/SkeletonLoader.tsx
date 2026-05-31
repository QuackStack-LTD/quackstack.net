'use client';

import React from 'react';

/**
 * Full-page skeleton loader that mimics the QuackStack landing page layout.
 * Renders animated shimmer placeholders for: Navbar, Hero, Services, Tech,
 * Projects, Team, and Contact sections. Designed to be shown while the real
 * page hydrates / loads heavy components.
 */

/* ── tiny helper ─────────────────────────────────────────────────── */
const Bone = ({
	className = '',
	style,
}: {
	className?: string;
	style?: React.CSSProperties;
}) => (
	<div
		className={`skeleton-bone ${className}`}
		style={style}
	/>
);

/* ── section skeletons ───────────────────────────────────────────── */

const NavbarSkeleton = () => (
	<div className='skeleton-navbar'>
		<div className='skeleton-navbar-inner'>
			<Bone className='skeleton-logo' />
			<div className='skeleton-nav-links'>
				{Array.from({ length: 7 }).map((_, i) => (
					<Bone key={i} className='skeleton-nav-link' />
				))}
			</div>
			<Bone className='skeleton-nav-icon' />
		</div>
	</div>
);

const HeroSkeleton = () => (
	<div className='skeleton-hero'>
		<div className='skeleton-hero-inner'>
			<Bone className='skeleton-hero-line-1' />
			<Bone className='skeleton-hero-line-2' />
			<Bone className='skeleton-hero-line-3' />
			<Bone className='skeleton-hero-subtitle' />
			<div className='skeleton-hero-buttons'>
				<Bone className='skeleton-hero-btn' />
				<Bone className='skeleton-hero-btn' />
			</div>
		</div>
	</div>
);

const SectionHeadingSkeleton = () => (
	<div className='skeleton-section-heading'>
		<Bone className='skeleton-heading-title' />
		<Bone className='skeleton-heading-subtitle' />
	</div>
);

const ServicesSkeleton = () => (
	<div className='skeleton-section'>
		<SectionHeadingSkeleton />
		<div className='skeleton-services-grid'>
			{Array.from({ length: 4 }).map((_, i) => (
				<div key={i} className='skeleton-service-card'>
					<Bone className='skeleton-service-icon' />
					<Bone className='skeleton-service-title' />
					<Bone className='skeleton-service-desc' />
					<Bone className='skeleton-service-desc-2' />
				</div>
			))}
		</div>
	</div>
);

const TechSkeleton = () => (
	<div className='skeleton-section'>
		<SectionHeadingSkeleton />
		<div className='skeleton-tech-grid'>
			{Array.from({ length: 8 }).map((_, i) => (
				<Bone key={i} className='skeleton-tech-icon' />
			))}
		</div>
	</div>
);

const ProjectsSkeleton = () => (
	<div className='skeleton-section'>
		<SectionHeadingSkeleton />
		<div className='skeleton-projects-grid'>
			{Array.from({ length: 3 }).map((_, i) => (
				<div key={i} className='skeleton-project-card'>
					<Bone className='skeleton-project-image' />
					<div className='skeleton-project-body'>
						<Bone className='skeleton-project-title' />
						<Bone className='skeleton-project-desc' />
						<Bone className='skeleton-project-desc-2' />
						<div className='skeleton-project-tags'>
							<Bone className='skeleton-project-tag' />
							<Bone className='skeleton-project-tag' />
							<Bone className='skeleton-project-tag' />
						</div>
					</div>
				</div>
			))}
		</div>
	</div>
);

const TeamSkeleton = () => (
	<div className='skeleton-section'>
		<SectionHeadingSkeleton />
		<div className='skeleton-team-grid'>
			{Array.from({ length: 3 }).map((_, i) => (
				<div key={i} className='skeleton-team-card'>
					<Bone className='skeleton-team-avatar' />
					<Bone className='skeleton-team-name' />
					<Bone className='skeleton-team-role' />
				</div>
			))}
		</div>
	</div>
);

const ContactSkeleton = () => (
	<div className='skeleton-section'>
		<SectionHeadingSkeleton />
		<div className='skeleton-contact-form'>
			<Bone className='skeleton-input' />
			<Bone className='skeleton-input' />
			<Bone className='skeleton-textarea' />
			<Bone className='skeleton-submit-btn' />
		</div>
	</div>
);

/* ── main export ─────────────────────────────────────────────────── */

const SkeletonLoader: React.FC = () => (
	<>
		<NavbarSkeleton />
		<HeroSkeleton />
		<ServicesSkeleton />
		<TechSkeleton />
		<ProjectsSkeleton />
		<TeamSkeleton />
		<ContactSkeleton />
	</>
);

export default SkeletonLoader;
