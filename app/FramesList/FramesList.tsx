import React, { useState } from "react";
import { FrameItem, type SourceData } from "./FrameItem";
import FrameContent from "../FrameContent/FrameContent";

export function FramesList({
	query = "",
	favoritesOnly = false,
	favoritesSet,
	onToggleFavorite,
}: {
	query?: string;
	favoritesOnly?: boolean;
	favoritesSet?: Set<string>;
	onToggleFavorite?: (url: string) => void;
}) {
	const q = query.trim().toLowerCase();
	const favs = favoritesSet ?? new Set<string>();

	const [openUrl, setOpenUrl] = useState<string | null>(null);
	const [openTitle, setOpenTitle] = useState<string | undefined>(undefined);

	const handleOpen = (url: string, title?: string) => {
		setOpenUrl(url);
		setOpenTitle(title);
	};

	const closeOverlay = () => {
		setOpenUrl(null);
		setOpenTitle(undefined);
	};

	const filtered = sources.filter((s) => {
		if (q) {
			const nameMatch = s.name.toLowerCase().includes(q);
			const descMatch = (s.description ?? "").toLowerCase().includes(q);
			if (!nameMatch && !descMatch) return false;
		}
		if (favoritesOnly && !favs.has(s.URL)) return false;
		return true;
	});

	return (
		<section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
			<div className="mb-6 flex flex-col gap-3 border-b border-gray-200 pb-5 dark:border-gray-800 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p className="text-sm font-medium text-blue-600 dark:text-blue-400">Source library</p>
					<h2 className="mt-1 text-2xl font-semibold tracking-tight text-gray-950 dark:text-white">
						Frames ready to explore
					</h2>
				</div>
				<p className="text-sm text-gray-600 dark:text-gray-400">{filtered.length} results</p>
			</div>

			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{filtered.map((source) => (
					<FrameItem
						key={source.URL}
						source={source}
						isFavorite={favs.has(source.URL)}
						onToggleFavorite={onToggleFavorite}
						onOpen={handleOpen}
					/>
				))}
			</div>

			{openUrl ? <FrameContent url={openUrl} title={openTitle} onClose={closeOverlay} /> : null}
		</section>
	);
}

export const sources: SourceData[] = [
	{
		name: "Celeste",
		URL: "https://skibidi-math.github.io/celeste/",
		description:
			"Celeste is a platformer game where you climb a mountain. It is really fun, I recommend playing this.",
		category: "Platformer",
	},
	{
		name: "Brotato",
		URL: "404.html",
		description:
			"This was the goated game before Celeste. Its a 2D rougelike where you make combos to kill monsters as a potato.",
		category: "Rougelike",
	},
	{
		name: "Retro Bowl",
		URL: "https://skibidi-math.github.io/retro-bowl/",
		description:
			"Retro bowl is a 2d game where you play American Football. It has a retro style with pixel art graphics..",
		category: "Sports",
	},
	{
		name: "PVZ 1",
		URL: "https://skibidi-math.github.io/pvz1/",
		description:
			"Plants vs. Zombies 1 is a tower defense game where you place plants to defend against waves of zombies.",
		category: "Tower Defense",
	},
	{
		name: "Games Launcher",
		URL: "https://bestcalculatorforstudents.base44.app/Games",
		description:
			"A games launcher made in base44. It has some games that I'm too lazy to directly port here.",
		category: "Other Game Sites",
	},
	{
		name: "20 Minutes Till Dawn",
		URL: "https://skibidi-math.github.io/20-minutes/",
		description:
			"20 Minutes Till Dawn is the full game of the demo 10 Minutes Till Dawn. It is a rougelike where you play as femboys and attack flying octopuses.",
		category: "Roguelike",
	},
	{
		name: "Endoparasitic",
		URL: "https://skibidi-math.github.io/endoparasitic/",
		description: "Use this slot for a second frame, article, dataset, or project link.",
		category: "2D Horror",
	},
	{
		name: "Raldi's Very Legal Pharmacy",
		URL: "https://skibidi-math.github.io/raldi",
		description: "Use this slot for a second frame, article, dataset, or project link.",
		category: "Baldi",
	},
	{
		name: "Hollow Knight",
		URL: "https://skibidi-math.github.io/hollow-knight",
		description: "Use this slot for a second frame, article, dataset, or project link.",
		category: "Metroidvania",
	},
];
