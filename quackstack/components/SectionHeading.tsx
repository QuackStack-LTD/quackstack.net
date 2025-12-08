import React from 'react';
import FadeUp from './FadeUp';
import { useReducedEffects } from '@/hooks/use-reduced-effects';

interface SectionHeadingProps {
	eyebrow?: string;
	title: string | React.ReactNode;
	subtext?: string | React.ReactNode;
	align?: 'center' | 'left';
	className?: string;
	gradient?: boolean;
}

const wrapper = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
};

export const SectionHeading: React.FC<SectionHeadingProps> = ({ eyebrow, title, subtext, align = 'center', className = '', gradient }) => {
	const reduced = useReducedEffects();
	const Wrapper: any = reduced ? 'div' : FadeUp;
	const wrapperProps = reduced ? {} : { duration: 0.4, className: '' };

	return (
		<Wrapper {...wrapperProps} className={`mb-16 ${align === 'center' ? 'text-center mx-auto' : ''} max-w-3xl ${className}`}>
			{eyebrow && <div className='uppercase tracking-[0.18em] text-[11px] font-semibold text-primary/80 mb-3'>{eyebrow}</div>}
			<h2 className={`font-bold leading-tight text-black dark:text-white text-4xl md:text-5xl ${gradient ? 'bg-[var(--gradient-primary)] bg-clip-text text-transparent' : ''}`}>{title}</h2>
			{subtext && <p className='mt-5 text-lg md:text-xl text-gray-950 dark:text-gray-300 leading-relaxed'>{subtext}</p>}
		</Wrapper>
	);
};

export default SectionHeading;
