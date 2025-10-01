import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SectionParallaxBg: React.FC<{
	image?: string;
	colorFrom?: string;
	colorTo?: string;
	children: React.ReactNode;
	id?: string;
	className?: string;
	style?: React.CSSProperties;
}> = ({ image, colorFrom = '#0f172a', colorTo = '#fbbf24', children, id, className = '', style }) => {
	const ref = React.useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
	const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
	const scale = useTransform(scrollYProgress, [0, 1], [1.03, 1]);
	const opacity = useTransform(scrollYProgress, [0, 1], [0.85, 1]);

	return (
		<div ref={ref} id={id} className={`relative overflow-hidden ${className}`} style={style}>
			<motion.div
				aria-hidden
				className='absolute inset-0 -z-10 w-full h-full pointer-events-none'
				style={{
					background: image ? `linear-gradient(120deg, ${colorFrom} 0%, ${colorTo} 100%), url(${image}) center/cover no-repeat` : `linear-gradient(120deg, ${colorFrom} 0%, ${colorTo} 100%)`,
					opacity,
					y,
					scale,
					filter: 'brightness(0.97)',
					transition: 'background 0.6s',
				}}
			/>

			{/* Top fade to black */}
			<div className='absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black via-black/60 to-transparent -z-5 pointer-events-none' />

			{/* Bottom fade to black */}
			<div className='absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black via-black/60 to-transparent -z-5 pointer-events-none' />

			{children}
		</div>
	);
};

export default SectionParallaxBg;
