// import { useEffect, useState } from 'react';

/**
 * DISABLED: Was returning true when the app should reduce motion/effects either due to
 * OS-level setting, heuristics (class applied by PerformanceTuner), or explicit override.
 * Now always returns false so all animations play on every device including mobile.
 * To restore, uncomment the original implementation below.
 */
export function useReducedEffects() {
	// const [reduced, setReduced] = useState(false);

	// useEffect(() => {
	// 	try {
	// 		const root = document.documentElement;
	// 		const hasClass = root.classList.contains('reduced-motion');
	// 		const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	// 		const override = localStorage.getItem('qs:reduced-motion') === 'on';
	// 		setReduced(Boolean(hasClass || media || override));
	// 	} catch {
	// 		setReduced(false);
	// 	}
	// }, []);

	// return reduced;

	return false;
}
