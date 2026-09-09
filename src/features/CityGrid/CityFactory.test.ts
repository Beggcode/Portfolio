import { createCity } from "@/features/CityGrid/CityFactory";
import { CityConfigSchema } from "@/shared/group/Schemas";
import { describe, expect, it } from "vitest";

const config = (over = {}) => CityConfigSchema.parse(over);

describe("createCity", () => {
	it("gives the same city for the same seed", () => {
		expect(createCity(config({ seed: 5 }))).toEqual(
			createCity(config({ seed: 5 })),
		);
	});

	it("gives a different city for a different seed", () => {
		expect(createCity(config({ seed: 5 }))).not.toEqual(
			createCity(config({ seed: 6 })),
		);
	});

	it("never builds below minHeight", () => {
		const c = config({ minHeight: 3, maxHeight: 7 });
		for (const b of createCity(c)) expect(b.height).toBeGreaterThanOrEqual(3);
	});

	it("never builds above maxHeight", () => {
		const c = config({ minHeight: 1, maxHeight: 5 });
		for (const b of createCity(c)) expect(b.height).toBeLessThanOrEqual(5);
	});

	it("sits every building on the ground", () => {
		for (const b of createCity(config()))
			expect(b.position[1]).toBeCloseTo(b.height / 2);
	});

	it("gives every building a unique cell", () => {
		const ids = createCity(config()).map((b) => b.id);
		expect(new Set(ids).size).toBe(ids.length);
	});

	it("builds nothing at zero density", () => {
		expect(createCity(config({ coreDensity: 0, edgeDensity: 0 }))).toHaveLength(
			0,
		);
	});

	it("builds every cell at full density", () => {
		expect(
			createCity(config({ coreDensity: 1, edgeDensity: 1, gridSize: 6 })),
		).toHaveLength(36);
	});

	it("packs the core denser than the edges", () => {
		const gridSize = 20;
		const c = config({ gridSize, coreDensity: 0.9, edgeDensity: 0.1 });
		const centre = (gridSize - 1) / 2;
		const maxDistance = Math.hypot(centre, centre);

		let core = 0;
		let edge = 0;
		for (const b of createCity(c)) {
			const [col, row] = b.id.split("-").map(Number);
			const d = Math.hypot(col - centre, row - centre) / maxDistance;
			if (d < 0.35) core++;
			else if (d > 0.75) edge++;
		}
		// far more cells exist out at the rim, so raw counts understate this
		expect(core).toBeGreaterThan(edge);
	});

	it("builds taller downtown than at the rim", () => {
		const gridSize = 20;
		const c = config({ gridSize, coreDensity: 1, edgeDensity: 1 });
		const centre = (gridSize - 1) / 2;
		const maxDistance = Math.hypot(centre, centre);

		const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
		const core: number[] = [];
		const edge: number[] = [];
		for (const b of createCity(c)) {
			const [col, row] = b.id.split("-").map(Number);
			const d = Math.hypot(col - centre, row - centre) / maxDistance;
			if (d < 0.3) core.push(b.height);
			else if (d > 0.8) edge.push(b.height);
		}
		expect(mean(core)).toBeGreaterThan(mean(edge));
	});
});

describe("CityConfigSchema", () => {
	it("fills defaults from nothing", () => {
		expect(CityConfigSchema.parse({})).toMatchObject({ seed: 1, gridSize: 10 });
	});

	it.each([
		["coreDensity above 1", { coreDensity: 8 }],
		["negative falloff", { falloff: -1 }],
		["fractional gridSize", { gridSize: 10.5 }],
		["maxHeight below minHeight", { minHeight: 5, maxHeight: 2 }],
	])("rejects %s", (_label, bad) => {
		expect(CityConfigSchema.safeParse(bad).success).toBe(false);
	});
});
