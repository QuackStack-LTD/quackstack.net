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

const CustomCursor: React.FC<CustomCursorProps> = ({ isHovering, isHoveringLink, smoothMouseX, smoothMouseY, cursorRef }) => (
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
		<Image src='/cursor.png' alt='Custom cursor' width={32} height={32} className='w-full h-full object-contain' priority unoptimized />
	</motion.div>
);

export default CustomCursor;
