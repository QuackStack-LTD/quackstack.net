'use client';

import { useEffect } from 'react';

/**
 * Applies a heuristic-based reduced-motion/performance class to <html>
 * when on small screens, coarse pointers (touch), or when Save-Data/slow network is detected.
 * Also provides a hook point for future runtime tuning via localStorage flags.
 */
export default function PerformanceTuner() {
	useEffect(() => {
		try {
			const root = document.documentElement;
			const nav: any = navigator as any;
			const saveData = nav?.connection?.saveData;
			const effective = nav?.connection?.effectiveType;
			const slow = typeof effective === 'string' && /(2g|3g)/i.test(effective);
			const coarse = window.matchMedia?.('(pointer: coarse)').matches;
			const small = window.innerWidth < 900;

			const forceReduced = localStorage.getItem('qs:reduced-motion'); // 'on' | 'off' | null
			const shouldReduce = forceReduced === 'on' || (!forceReduced && (saveData || slow || coarse || small));

			if (shouldReduce) {
				root.classList.add('reduced-motion');
			} else {
				root.classList.remove('reduced-motion');
			}
		} catch {}
	}, []);

	return null;
}
