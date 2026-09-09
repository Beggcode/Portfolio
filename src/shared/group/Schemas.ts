import { z } from "zod";

// Every zod schema lives here.

// Source of truth for the city knobs: types, defaults and legal ranges.
// The ranges catch a mistyped value instead of silently building a weird city.
export const CityConfigSchema = z
	.object({
		/** Fixed by default so the skyline is the same on every reload. */
		seed: z.number().int().default(1),
		gridSize: z.number().int().min(1).max(200).default(10),
		/** World units between cell centres. */
		spacing: z.number().positive().default(1.6),
		/** Chance a cell builds at the centre of the grid. */
		coreDensity: z.number().min(0).max(1).default(0.65),
		/** Chance a cell builds out at the corners. */
		edgeDensity: z.number().min(0).max(1).default(0.45),
		/** Core-to-edge falloff. 1 is linear; higher means a tighter downtown. */
		falloff: z.number().positive().default(1),
		/** Height floor. Footprint is 1 unit, so below this reads as flat. */
		minHeight: z.number().positive().default(3),
		/** Tallest downtown building. */
		maxHeight: z.number().positive().default(7),
	})
	.refine((c) => c.maxHeight > c.minHeight, {
		message: "maxHeight must be greater than minHeight",
		path: ["maxHeight"],
	});

/** Resolved config — every field present. */
export type CityConfig = z.infer<typeof CityConfigSchema>;

/** What callers may pass — all optional. */
export type CityConfigInput = z.input<typeof CityConfigSchema>;

export const defaultCityConfig: CityConfig = CityConfigSchema.parse({});
