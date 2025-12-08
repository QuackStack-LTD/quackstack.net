'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface FadeUpProps extends HTMLMotionProps<'div'> {
	delay?: number;
	duration?: number;
}

const FadeUp: React.FC<FadeUpProps> = ({ children, delay = 0, duration = 0.42, className = '', style, ...rest }) => {
	return (
		<motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }} className={className} style={style} {...rest}>
			{children}
		</motion.div>
	);
};

export default FadeUp;
