import React from 'react';
import Image from 'next/image';
import { GraduationCap, Code2, Handshake, Users, Heart, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import SectionHeading from '@/components/SectionHeading';
import FadeUp from './FadeUp';
import { useReducedEffects } from '@/hooks/use-reduced-effects';

type Partner = {
	name: string;
	role: string;
	icon?: React.ReactNode;
	imageUrl?: string;
	invertOnLight?: boolean;
};

const partners: Partner[] = [
	{
		name: 'Частно Училище Света София',
		role: 'Client',
		imageUrl: '/sveta_sofia_logo.webp',
	},
	{
		name: 'Mindhub',
		role: 'Partner',
		imageUrl: '/m-hub.png',
	},
	{
		name: 'Sensory Theatre Sofia',
		role: 'Client',
		imageUrl: '/sensatory_theatre_sofia.png',
		invertOnLight: true,
	},
	{
		name: 'Chestitka.bg',
		role: 'Client',
		imageUrl: '/chestitka.png',
	},
	// {
	// 	name: 'BNI Triumph',
	// 	role: 'Group Organization',
	// 	imageUrl: '/bni.png',
	// },
	{
		name: 'Hack TUES',
		role: 'Sponsored by us',
		imageUrl: '/hack_tues_logo-last.png',
	},
	{
		name: 'Horreror',
		role: 'Client',
		imageUrl: '/horreror.jpg'
	},
	{
		name: 'Sanista',
		role: 'Client',
		imageUrl: '/sanista.png'
	},
	// {
	// 	name: 'Kvadra',
	// 	role: 'Client',
	// 	imageUrl: '/kvadra.png'
	// },
	{
		name: 'John Atanasoff School',
		role: 'Partner',
		imageUrl: '/John_Atanasof_school.png'
	},
	// {
	// 	name: 'TUES',
	// 	role: 'Partner',
	// 	imageUrl: '/TUES_School.png'
	// },
	{
		name: 'Technokids',
		role: 'Client',
		icon: <BookOpen className="w-10 h-10 mb-3 text-primary opacity-80 group-hover:opacity-100 transition-opacity" />
	},
	{
		name: 'NSICC',
		role: 'Client & Partner',
		imageUrl: '/nsicc.svg'
	},
	// {
	// 	name: 'DevHubOne',
	// 	role: 'Partner',
	// 	imageUrl: '/DevHubOne.webp'
	// },
	{
		name: 'Upgrade Vision AI',
		role: 'Partner',
		imageUrl: '/upgrade_vision_ai.png',
		invertOnLight: true
	},
	// {
	// 	name: 'Codbex',
	// 	role: 'Partner',
	// 	imageUrl: '/codbex.svg'
	// },
	{
		name: 'SCAS',
		role: 'Client & Partner',
		imageUrl: '/SCAS.png'
	}
];

const WhoWeWorkWithSection: React.FC = () => {
	const reduced = useReducedEffects();
	return (
		<section id='who-we-work-with' className='py-20 relative'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
				<SectionHeading title='Who We Work With' subtext='We are proud to support and collaborate with an incredible network of clients, partners, events, and group organizations that share our vision for innovation.' />
				<div className='flex flex-wrap justify-center gap-6 mt-12'>

					{partners.map((partner, index) => {
						const cardContent = (
							<Card className='relative overflow-hidden liquid-glass hover:liquid-glass-orange transition-all duration-300 ease-out group-hover:shadow-lg rounded-xl flex flex-col items-center justify-center p-6 h-40 w-full'>
								<CardContent className='p-0 flex flex-col items-center justify-center text-center w-full h-full'>
									{partner.imageUrl ? (
										<div className="relative w-full h-20 mb-3">
											<Image src={partner.imageUrl} alt={`${partner.name} logo`} fill className={`object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-sm ${partner.invertOnLight ? 'invert dark:invert-0' : ''}`} sizes="160px" />
										</div>
									) : (
										partner.icon
									)}
									<span className='text-sm font-semibold text-foreground/80 group-hover:text-foreground transition-colors leading-tight mb-1'>{partner.name}</span>
									<span className='text-[10px] uppercase tracking-wider text-primary/70 font-medium'>{partner.role}</span>
								</CardContent>
							</Card>
						);

						return reduced ? (
							<div key={index} className='group relative w-[calc(50%-12px)] sm:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]'>
								{cardContent}
							</div>
						) : (
							<FadeUp key={index} duration={0.8} delay={index * 0.1} className='group relative w-[calc(50%-12px)] sm:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]'>
								{cardContent}
							</FadeUp>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default WhoWeWorkWithSection;
