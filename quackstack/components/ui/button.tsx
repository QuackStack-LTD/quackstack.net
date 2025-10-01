import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	"relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-orange-400/70",
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
				destructive: 'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/40 dark:bg-destructive/60',
				outline: 'border border-border/60 bg-background/60 hover:bg-background/80 shadow-xs dark:bg-input/30 dark:border-input dark:hover:bg-input/50 backdrop-blur-sm',
				secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
				ghost: 'hover:bg-accent/60 hover:text-accent-foreground dark:hover:bg-accent/40',
				link: 'text-primary underline-offset-4 hover:underline hover:text-primary/90',
				gradient: 'text-black font-semibold shadow-md hover:shadow-lg bg-[linear-gradient(90deg,#fb923c,#f59e0b,#fb923c)] bg-[length:200%_100%] animate-none hover:bg-[position:100%] transition-[background-position] ease-linear',
				glass: 'backdrop-blur-md bg-white/10 border border-white/15 hover:bg-white/15 hover:border-white/25 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]',
				soft: 'bg-orange-400/15 text-orange-300 hover:bg-orange-400/25 hover:text-orange-200 border border-orange-400/20',
				'outline-soft': 'border border-white/15 hover:border-white/35 bg-gradient-to-br from-white/5 to-white/0',
				'ghost-soft': 'text-orange-300 hover:text-orange-200 hover:bg-orange-400/10',
				subtle: 'bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)] border border-white/5',
			},
			size: {
				default: 'h-10 px-5 py-2.5 has-[>svg]:px-4',
				sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-xs',
				lg: 'h-12 rounded-lg px-7 has-[>svg]:px-6 text-base',
				icon: 'size-10',
				pill: 'h-11 px-8 rounded-full',
			},
			glow: {
				true: 'hover:shadow-[0_0_0_1px_rgba(251,146,60,0.4),0_8px_32px_-4px_rgba(251,146,60,0.55)]',
				false: '',
			},
			elevate: {
				true: 'hover:translate-y-[-2px] active:translate-y-0',
				false: '',
			},
		},
		compoundVariants: [
			{ variant: 'gradient', glow: true, class: 'shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_8px_30px_-6px_rgba(251,146,60,0.6)]' },
			{ variant: 'glass', glow: true, class: 'shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_4px_22px_-4px_rgba(255,255,255,0.25)]' },
		],
		defaultVariants: {
			variant: 'default',
			size: 'default',
			glow: false,
			elevate: false,
		},
	}
);

function Button({ className, variant, size, glow, elevate, asChild = false, ...props }: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : 'button';
	return <Comp data-slot='button' className={cn(buttonVariants({ variant, size, glow, elevate, className }))} {...props} />;
}

export { Button, buttonVariants };
