import { motion } from 'framer-motion';
import React from 'react';

interface AnimatedBackgroundProps {
	windowSize: { width: number; height: number };
	smoothMouseX: any;
	smoothMouseY: any;
	smoothScrollY: any;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ windowSize, smoothMouseX, smoothMouseY, smoothScrollY }) => {
	const [mounted, setMounted] = React.useState(false);
	React.useEffect(() => setMounted(true), []);
	if (!mounted) return null;
	return (
		<motion.div className='fixed inset-0 overflow-hidden pointer-events-none z-0' initial={false} animate={false}>
			<svg width={windowSize.width} height={windowSize.height} className='absolute inset-0 w-full h-full' style={{ display: 'block' }}>
				{/* Animated lines */}
				{[...Array(4)].map((_, i) => {
					const baseY = 120 + i * 180;
					const amplitude = 40 + i * 10;
					const freq = 0.003 + i * 0.001;
					const mouseInfluence = (smoothMouseX.get() - windowSize.width / 2) * 0.08;
					let path = '';
					for (let x = 0; x <= windowSize.width; x += 20) {
						const y = baseY + Math.sin((x + smoothScrollY.get() * 0.7) * freq) * amplitude + mouseInfluence * Math.sin(x * 0.002 + i);
						path += x === 0 ? `M${x},${y}` : ` L${x},${y}`;
					}
					return <motion.path key={i} d={path} stroke={`rgba(251,146,60,${0.18 + i * 0.07})`} strokeWidth={3 + i} fill='none' style={{ filter: `blur(${i}px)` }} initial={false} animate={false} />;
				})}
				{/* Animated clouds */}
				{[...Array(6)].map((_, i) => {
					const cx = (windowSize.width / 7) * (i + 1) + Math.sin(smoothScrollY.get() * 0.0007 + i) * 60 + (smoothMouseX.get() - windowSize.width / 2) * 0.04;
					const cy = 100 + i * 120 + Math.cos(smoothScrollY.get() * 0.0009 + i) * 40 + (smoothMouseY.get() - windowSize.height / 2) * 0.03;
					const rx = 110 + Math.sin(smoothScrollY.get() * 0.0005 + i) * 18;
					const ry = 48 + Math.cos(smoothScrollY.get() * 0.0006 + i) * 10;
					return <motion.ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill={`url(#cloud${i})`} opacity={0.18 + i * 0.07} style={{ filter: `blur(${8 + i * 2}px)` }} initial={false} animate={false} />;
				})}
				{/* Gradients for clouds */}
				<defs>
					{[...Array(6)].map((_, i) => (
						<radialGradient key={i} id={`cloud${i}`} cx='50%' cy='50%' r='50%'>
							<stop offset='0%' stopColor='#fb923c' stopOpacity='0.7' />
							<stop offset='100%' stopColor='#ea580c' stopOpacity='0.2' />
						</radialGradient>
					))}
				</defs>
			</svg>
		</motion.div>
	);
};

export default AnimatedBackground;
