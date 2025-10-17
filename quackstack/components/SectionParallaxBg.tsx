import React from 'react';

const SectionParallaxBg: React.FC<{
	image?: string;
	colorFrom?: string;
	colorTo?: string;
	children: React.ReactNode;
	id?: string;
	className?: string;
	style?: React.CSSProperties;
}> = ({ image, colorFrom = '#111827', colorTo = '#fb923c', children, id, className = '', style }) => {
	return (
		<div id={id} className={`relative ${className}`} style={style}>
			<div
				aria-hidden
				className='absolute inset-0 -z-10 w-full h-full pointer-events-none'
				style={{
					background: `linear-gradient(180deg, ${colorFrom} 0%, ${colorFrom} 40%, ${colorTo} 60%, ${colorTo} 100%)`,
				}}
			/>
			{children}
		</div>
	);
};

export default SectionParallaxBg;
