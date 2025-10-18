'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTheme } from 'next-themes';

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
	const { resolvedTheme } = useTheme();

	// Initialize grid
	const initializeGrid = useCallback((numRows: number, numCols: number) => {
		const newGrid: Cell[][] = [];
		for (let i = 0; i < numRows; i++) {
			newGrid[i] = [];
			for (let j = 0; j < numCols; j++) {
				newGrid[i][j] = {
					alive: Math.random() > 0.95, // Even sparser for better performance
					age: 0,
				};
			}
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

	// Handle canvas click to create cells - now works from anywhere on the page
	const handleCanvasClick = useCallback(
		(e: MouseEvent) => {
			const canvas = canvasRef.current;
			if (!canvas) return;

			const x = e.clientX;
			const y = e.clientY;

			const col = Math.floor(x / cellSize);
			const row = Math.floor(y / cellSize);

			if (row >= 0 && row < rows && col >= 0 && col < cols) {
				setGrid((currentGrid) => {
					const newGrid = currentGrid.map((r) => r.map((c) => ({ ...c })));
					// Always create a cell when clicking
					newGrid[row][col].alive = true;
					newGrid[row][col].age = 0;
					return newGrid;
				});
			}
		},
		[cellSize, rows, cols]
	);

	// Add global click listener
	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			handleCanvasClick(e);
		};

		document.addEventListener('click', handleClick);
		return () => document.removeEventListener('click', handleClick);
	}, [handleCanvasClick]);

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

					// Stronger fill with orange glow
					ctx.fillStyle = `rgba(251, 146, 60, ${fadeOpacity * 0.25})`;
					ctx.fillRect(x, y, cellSize, cellSize);

					// Draw bright orange border
					ctx.strokeStyle = `rgba(251, 146, 60, ${fadeOpacity})`;
					ctx.lineWidth = 2;
					ctx.strokeRect(x, y, cellSize, cellSize);

					// Add stronger inner glow effect
					const gradient = ctx.createRadialGradient(x + cellSize / 2, y + cellSize / 2, 0, x + cellSize / 2, y + cellSize / 2, cellSize / 2);
					gradient.addColorStop(0, `rgba(251, 146, 60, ${fadeOpacity * 0.4})`);
					gradient.addColorStop(0.5, `rgba(251, 146, 60, ${fadeOpacity * 0.2})`);
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

			const elapsed = timestamp - lastUpdateRef.current;

			// Update every 1200ms (slower - about 0.8 generations per second for better performance)
			if (elapsed > 2200 && isRunning) {
				updateGrid();
				lastUpdateRef.current = timestamp;
			}

			drawGrid();
			animationFrameRef.current = requestAnimationFrame(animate);
		};

		animationFrameRef.current = requestAnimationFrame(animate);

		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, [updateGrid, drawGrid, isRunning]);

	return (
		<canvas
			ref={canvasRef}
			className='fixed inset-0 w-full h-full pointer-events-none'
			style={{
				opacity: 0.5,
				zIndex: -5,
			}}
		/>
	);
};

export default GameOfLifeBackground;
