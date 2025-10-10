'use client';
import React from 'react';

interface ParallaxCanvasProps {
	className?: string;
}

// Lightweight static background to replace heavy canvas animations
const ParallaxCanvas: React.FC<ParallaxCanvasProps> = ({ className = '' }) => {
	return (
		<div
			className={`fixed inset-0 pointer-events-none z-0 ${className}`}
			style={{
				background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.1) 0%, rgba(30, 41, 59, 0.05) 100%)',
			}}
		/>
	);
};

export default ParallaxCanvas;
