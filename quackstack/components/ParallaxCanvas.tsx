'use client';
import React, { useRef, useEffect } from 'react';
import { useSpring, useMotionValue } from 'framer-motion';

interface ParallaxCanvasProps {
	className?: string;
	depth?: number; // number of parallax layers
	particleCount?: number;
	speedFactor?: number; // overall scroll speed multiplier
	glow?: boolean;
}

// Flashy, reusable animated canvas background with multi-layer parallax + particles + gradient blobs
const ParallaxCanvas: React.FC<ParallaxCanvasProps> = ({ className = '', depth = 4, particleCount = 90, speedFactor = 0.3, glow = true }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const scrollY = useMotionValue(0);
	const smoothX = useSpring(mouseX, { stiffness: 60, damping: 15 });
	const smoothY = useSpring(mouseY, { stiffness: 60, damping: 15 });
	const smoothScroll = useSpring(scrollY, { stiffness: 50, damping: 20 });

	useEffect(() => {
		const handleMouse = (e: MouseEvent) => {
			mouseX.set(e.clientX);
			mouseY.set(e.clientY);
		};
		const handleScroll = () => scrollY.set(window.scrollY);
		window.addEventListener('mousemove', handleMouse);
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('mousemove', handleMouse);
			window.removeEventListener('scroll', handleScroll);
		};
	}, [mouseX, mouseY, scrollY]);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let width = (canvas.width = window.innerWidth);
		let height = (canvas.height = window.innerHeight);

		const handleResize = () => {
			width = canvas.width = window.innerWidth;
			height = canvas.height = window.innerHeight;
		};
		window.addEventListener('resize', handleResize);

		// Pre-generate particles
		const particles = Array.from({ length: particleCount }, () => ({
			x: Math.random() * width,
			y: Math.random() * height,
			r: 1 + Math.random() * 3,
			z: Math.random(), // depth factor 0-1
			vx: (Math.random() - 0.5) * 0.15,
			vy: (Math.random() - 0.5) * 0.15,
			o: 0.25 + Math.random() * 0.6,
		}));

		const gradientBlob = (g: CanvasGradient, alpha: number) => {
			ctx.globalAlpha = alpha;
			ctx.fillStyle = g as any;
			ctx.beginPath();
			ctx.arc(0, 0, 1, 0, Math.PI * 2);
			ctx.fill();
			ctx.globalAlpha = 1;
		};

		const draw = () => {
			if (!canvas) return;
			ctx.clearRect(0, 0, width, height);

			const scroll = smoothScroll.get();
			const mx = smoothX.get();
			const my = smoothY.get();

			// Background gradient
			const bgGrad = ctx.createLinearGradient(0, 0, width, height);
			bgGrad.addColorStop(0, '#030712');
			bgGrad.addColorStop(0.45, '#1e1b4b');
			bgGrad.addColorStop(0.75, '#312e81');
			bgGrad.addColorStop(1, '#0f172a');
			ctx.fillStyle = bgGrad;
			ctx.fillRect(0, 0, width, height);

			// Blobs
			const blobs = 5;
			for (let i = 0; i < blobs; i++) {
				const px = (Math.sin(scroll * 0.0003 + i) * 0.25 + 0.5) * width + (mx - width / 2) * 0.03 * (i / blobs);
				const py = (Math.cos(scroll * 0.0004 + i) * 0.25 + 0.5) * height + (my - height / 2) * 0.03 * (i / blobs);
				const radius = (0.25 + i * 0.15) * Math.min(width, height) * 0.6;
				const g = ctx.createRadialGradient(px, py, radius * 0.1, px, py, radius);
				g.addColorStop(0, `rgba(${250 - i * 40},146,60,0.55)`);
				g.addColorStop(1, 'rgba(10,10,20,0)');
				ctx.globalCompositeOperation = 'lighter';
				ctx.fillStyle = g;
				ctx.beginPath();
				ctx.arc(px, py, radius, 0, Math.PI * 2);
				ctx.fill();
				ctx.globalCompositeOperation = 'source-over';
			}

			// Parallax layers: faint grid / lines
			for (let layer = 0; layer < depth; layer++) {
				const layerOffset = scroll * speedFactor * (layer / depth) + (mx - width / 2) * 0.01 * (layer / depth);
				ctx.save();
				ctx.translate(layerOffset, 0);
				ctx.globalAlpha = 0.04 + layer * 0.05;
				ctx.strokeStyle = `rgba(255,255,255,${0.05 + layer * 0.05})`;
				const spacing = 140 - layer * 18;
				ctx.beginPath();
				for (let x = -spacing * 2; x < width + spacing * 2; x += spacing) {
					ctx.moveTo(x, 0);
					ctx.lineTo(x + spacing * 0.4, height);
				}
				ctx.stroke();
				ctx.restore();
			}

			// Particles
			particles.forEach((p) => {
				p.x += p.vx;
				p.y += p.vy;
				if (p.x < -10) p.x = width + 10;
				else if (p.x > width + 10) p.x = -10;
				if (p.y < -10) p.y = height + 10;
				else if (p.y > height + 10) p.y = -10;
				const parallaxX = (mx - width / 2) * 0.02 * p.z;
				const parallaxY = (my - height / 2) * 0.02 * p.z + scroll * 0.02 * (p.z - 0.5);
				ctx.beginPath();
				ctx.fillStyle = `rgba(255,180,120,${p.o})`;
				ctx.arc(p.x + parallaxX, p.y + parallaxY, p.r * (0.6 + p.z * 0.8), 0, Math.PI * 2);
				ctx.fill();
				if (glow) {
					ctx.beginPath();
					ctx.fillStyle = `rgba(255,140,60,${p.o * 0.35})`;
					ctx.arc(p.x + parallaxX, p.y + parallaxY, p.r * 3, 0, Math.PI * 2);
					ctx.fill();
				}
			});

			requestAnimationFrame(draw);
		};

		draw();

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [depth, particleCount, speedFactor, glow, smoothX, smoothY, smoothScroll]);

	return (
		<div className={`fixed inset-0 -z-20 pointer-events-none ${className}`}>
			<canvas ref={canvasRef} className='w-full h-full block' />
			<div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(255,255,255,0.06),transparent_70%)] mix-blend-overlay' />
		</div>
	);
};

export default ParallaxCanvas;
