import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
	eyebrow?: string;
	title: string | React.ReactNode;
	subtext?: string | React.ReactNode;
	align?: 'center' | 'left';
	className?: string;
	gradient?: boolean;
}

const wrapper = {
	hidden: { opacity: 0, y: 32 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any } },
};

export const SectionHeading: React.FC<SectionHeadingProps> = ({ eyebrow, title, subtext, align = 'center', className = '', gradient }) => {
	return (
		<motion.div variants={wrapper} initial='hidden' whileInView='visible' viewport={{ once: false, amount: 0.35 }} className={`mb-16 ${align === 'center' ? 'text-center mx-auto' : ''} max-w-3xl ${className}`}>
			{eyebrow && <div className='uppercase tracking-[0.18em] text-[11px] font-semibold text-orange-400/80 mb-3'>{eyebrow}</div>}
			<h2 className={`font-bold leading-tight text-white text-4xl md:text-5xl ${gradient ? 'bg-[linear-gradient(110deg,#fb923c,#f59e0b,#fb923c)] bg-clip-text text-transparent' : ''}`}>{title}</h2>
			{subtext && <p className='mt-5 text-lg md:text-xl text-gray-300 leading-relaxed'>{subtext}</p>}
		</motion.div>
	);
};

export default SectionHeading;
