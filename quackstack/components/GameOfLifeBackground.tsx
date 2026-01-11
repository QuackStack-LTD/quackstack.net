'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTheme } from 'next-themes';
import { useReducedEffects } from '@/hooks/use-reduced-effects';

interface Cell {
	alive: boolean;
	age: number; // Track age for fading effect
}

const GameOfLifeBackground: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [grid, setGrid] = useState<Cell[][]>([]);
	const [isRunning, setIsRunning] = useState(true);
	const [cellSize, setCellSize] = useState(25);
	const [rows, setRows] = useState(0);
	const [cols, setCols] = useState(0);
	const animationFrameRef = useRef<number>();
	const lastUpdateRef = useRef<number>(0);
	const lastDrawRef = useRef<number>(0);
	const { resolvedTheme } = useTheme();
	const reduced = useReducedEffects();

	// read CSS variable for duck/yellow color so canvas can match UI tokens
	const duckRgbRef = useRef('255, 212, 59');

	useEffect(() => {
		if (typeof window === 'undefined') return;
		const computed = getComputedStyle(document.documentElement).getPropertyValue('--duck-rgb');
		if (computed) {
			duckRgbRef.current = computed.trim() || duckRgbRef.current;
		}
	}, [resolvedTheme]);

	// Classic Game of Life patterns - small and subtle
	const patterns = {
		blinker: [
			[0, -1],
			[0, 0],
			[0, 1],
		],
		beacon: [
			[0, 0],
			[0, 1],
			[1, 0],
			[2, 3],
			[3, 2],
			[3, 3],
		],
		block: [
			[0, 0],
			[0, 1],
			[1, 0],
			[1, 1],
		],
	};

	// Place a pattern at a specific location
	const placePattern = (grid: Cell[][], pattern: number[][], centerRow: number, centerCol: number) => {
		pattern.forEach(([dr, dc]) => {
			const r = centerRow + dr;
			const c = centerCol + dc;
			if (r >= 0 && r < grid.length && c >= 0 && c < grid[0].length) {
				grid[r][c] = { alive: true, age: 0 };
			}
		});
	};

	// Initialize grid with cool patterns
	const initializeGrid = useCallback((numRows: number, numCols: number) => {
		const newGrid: Cell[][] = [];
		for (let i = 0; i < numRows; i++) {
			newGrid[i] = [];
			for (let j = 0; j < numCols; j++) {
				newGrid[i][j] = { alive: false, age: 0 };
			}
		}

		// Place small gliders scattered around

		// Place some small oscillators (blinkers)
		for (let i = 0; i < 8; i++) {
			const row = Math.floor(Math.random() * numRows);
			const col = Math.floor(Math.random() * numCols);
			placePattern(newGrid, patterns.blinker, row, col);
		}

		// Place a few beacons
		for (let i = 0; i < 4; i++) {
			const row = Math.floor((numRows / 5) * (i + 1));
			const col = Math.floor((numCols / 5) * ((i % 4) + 1));
			placePattern(newGrid, patterns.beacon, row, col);
		}

		// Place some static blocks for variety
		for (let i = 0; i < 6; i++) {
			const row = Math.floor(Math.random() * numRows);
			const col = Math.floor(Math.random() * numCols);
			placePattern(newGrid, patterns.block, row, col);
		}

		return newGrid;
	}, []);

	// Handle resize
	useEffect(() => {
		const updateDimensions = () => {
			if (canvasRef.current) {
				const canvas = canvasRef.current;
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;

				const newRows = Math.floor(window.innerHeight / cellSize);
				const newCols = Math.floor(window.innerWidth / cellSize);

				setRows(newRows);
				setCols(newCols);
				setGrid(initializeGrid(newRows, newCols));
			}
		};

		updateDimensions();
		window.addEventListener('resize', updateDimensions);
		return () => window.removeEventListener('resize', updateDimensions);
	}, [cellSize, initializeGrid]);

	// Count neighbors
	const countNeighbors = useCallback(
		(grid: Cell[][], row: number, col: number) => {
			let count = 0;
			const directions = [
				[-1, -1],
				[-1, 0],
				[-1, 1],
				[0, -1],
				[0, 1],
				[1, -1],
				[1, 0],
				[1, 1],
			];

			for (const [dx, dy] of directions) {
				const newRow = row + dx;
				const newCol = col + dy;

				if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
					if (grid[newRow][newCol].alive) count++;
				}
			}

			return count;
		},
		[rows, cols]
	);

	// Update game state
	const updateGrid = useCallback(() => {
		setGrid((currentGrid) => {
			const newGrid: Cell[][] = currentGrid.map((row) => row.map((cell) => ({ ...cell })));

			for (let i = 0; i < rows; i++) {
				for (let j = 0; j < cols; j++) {
					const neighbors = countNeighbors(currentGrid, i, j);
					const cell = currentGrid[i][j];

					if (cell.alive) {
						// Cell survives if it has 2 or 3 neighbors
						if (neighbors === 2 || neighbors === 3) {
							newGrid[i][j].alive = true;
							newGrid[i][j].age = Math.min(cell.age + 1, 30); // Max age 30 for smoother fading
						} else {
							newGrid[i][j].alive = false;
							newGrid[i][j].age = 0;
						}
					} else {
						// Dead cell becomes alive if it has exactly 3 neighbors
						if (neighbors === 3) {
							newGrid[i][j].alive = true;
							newGrid[i][j].age = 0;
						}
					}
				}
			}

			return newGrid;
		});
	}, [rows, cols, countNeighbors]);

	// Note: this canvas is pointer-events-none; avoid global click listeners.

	// Draw grid
	const drawGrid = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		// Clear canvas
		const isDark = resolvedTheme === 'dark';
		ctx.fillStyle = isDark ? '#000000' : '#ffffff';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Draw cells
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				const cell = grid[i][j];
				if (cell.alive) {
					const x = j * cellSize;
					const y = i * cellSize;

					// Calculate opacity based on age for smoother fading effect
					const fadeOpacity = Math.max(0.2, 1 - cell.age / 30);

					// Stronger fill with brand duck/yellow glow
					const duck = duckRgbRef.current;
					ctx.fillStyle = `rgba(${duck}, ${fadeOpacity * 0.25})`;
					ctx.fillRect(x, y, cellSize, cellSize);

					// Draw bright border using duck color
					ctx.strokeStyle = `rgba(${duck}, ${fadeOpacity})`;
					ctx.lineWidth = 2;
					ctx.strokeRect(x, y, cellSize, cellSize);

					// Add stronger inner glow effect using duck color
					const gradient = ctx.createRadialGradient(x + cellSize / 2, y + cellSize / 2, 0, x + cellSize / 2, y + cellSize / 2, cellSize / 2);
					gradient.addColorStop(0, `rgba(${duck}, ${fadeOpacity * 0.4})`);
					gradient.addColorStop(0.5, `rgba(${duck}, ${fadeOpacity * 0.2})`);
					gradient.addColorStop(1, 'transparent');
					ctx.fillStyle = gradient;
					ctx.fillRect(x, y, cellSize, cellSize);
				}
			}
		}
	}, [grid, rows, cols, cellSize, resolvedTheme]);

	// Animation loop
	useEffect(() => {
		const animate = (timestamp: number) => {
			if (!lastUpdateRef.current) lastUpdateRef.current = timestamp;
			if (!lastDrawRef.current) lastDrawRef.current = timestamp;

			// Skip expensive work when tab is hidden
			if (typeof document !== 'undefined' && document.hidden) {
				animationFrameRef.current = requestAnimationFrame(animate);
				return;
			}

			const elapsed = timestamp - lastUpdateRef.current;
			const elapsedDraw = timestamp - lastDrawRef.current;

			// Update every 1200ms (slower - about 0.8 generations per second for better performance)
			if (elapsed > 1200 && isRunning) {
				updateGrid();
				lastUpdateRef.current = timestamp;
			}

			// Cap draw rate to reduce CPU/GPU usage
			if (elapsedDraw > 60) {
				drawGrid();
				lastDrawRef.current = timestamp;
			}
			animationFrameRef.current = requestAnimationFrame(animate);
		};

		animationFrameRef.current = requestAnimationFrame(animate);

		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, [updateGrid, drawGrid, isRunning]);

	if (reduced) return null;

	return (
		<canvas
			ref={canvasRef}
			className='fixed inset-0 w-full h-full pointer-events-none'
			style={{
				opacity: 0.3,
				zIndex: -5,
			}}
		/>
	);
};

export default GameOfLifeBackground;
