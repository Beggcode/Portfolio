import type { CityConfig } from "../../Schemas";

export type Vec3 = [number, number, number];

export type BuildingSpec = {
	id: string;
	position: Vec3;
	height: number;
};

// Pure: same config + same random in, same city out.
// `random` is injectable so a seeded generator can be dropped in later.
export function createCity(
	config: CityConfig,
	random: () => number = Math.random,
): BuildingSpec[] {
	const {
		gridSize,
		spacing,
		coreDensity,
		edgeDensity,
		falloff,
		minHeight,
		maxHeight,
	} = config;

	const buildings: BuildingSpec[] = [];

	// Cell coords: the centre of a 10x10 grid sits at 4.5, between cells.
	const centre = (gridSize - 1) / 2;
	const maxDistance = Math.hypot(centre, centre);

	for (let i = 0; i < gridSize * gridSize; i++) {
		const col = i % gridSize;
		const row = Math.floor(i / gridSize);

		// 0 downtown, 1 at the corners. Drives both density and height.
		const distance = Math.hypot(col - centre, row - centre) / maxDistance;
		const core = (1 - distance) ** falloff;

		const chance = edgeDensity + (coreDensity - edgeDensity) * core;
		if (random() > chance) continue;

		const x = (col - gridSize / 2) * spacing;
		const z = (row - gridSize / 2) * spacing;

		// Only the part above minHeight is scaled, or short edge buildings end up
		// flatter than their own footprint.
		const height =
			minHeight + random() * (maxHeight - minHeight) * (0.55 + 0.45 * core);

		buildings.push({
			// Keyed by cell, not index — index keys shift when density changes.
			id: `${col}-${row}`,
			position: [x, height / 2, z],
			height,
		});
	}

	return buildings;
}
