'use client';
import { motion } from 'framer-motion';
import React from 'react';
import Image from 'next/image';

interface CustomCursorProps {
	isHovering: boolean;
	isHoveringLink: boolean;
	smoothMouseX: any;
	smoothMouseY: any;
	cursorRef: React.RefObject<HTMLDivElement>;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ isHovering, isHoveringLink, smoothMouseX, smoothMouseY, cursorRef }) => {
	const [enabled, setEnabled] = React.useState(false);

	React.useEffect(() => {
		if (typeof window === 'undefined') return;
		const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
		const noHover = window.matchMedia && window.matchMedia('(hover: none)').matches;
		setEnabled(!(coarse || noHover));
	}, []);

	if (!enabled) return null;

	return (
		<motion.div
			ref={cursorRef}
			className={`fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999]`}
			style={{
				x: smoothMouseX,
				y: smoothMouseY,
				translateX: '-50%',
				translateY: '-50%',
			}}
		>
			<Image src='/new-cursors/normal.webp' alt='Custom cursor' width={32} height={32} className='w-full h-full object-contain' priority unoptimized />
		</motion.div>
	);
};

export default CustomCursor;
