import { createCity, type BuildingSpec } from "@/features/CityGrid/CityFactory";
import {
	CityConfigSchema,
	type CityConfig,
	type CityConfigInput,
} from "@/shared/group/Schemas";
import { create } from "zustand";

// Every zustand store lives here.
// The city sits here rather than in CityGrid because the build-up animation and
// the moon both need to read it.
type CityState = {
	config: CityConfig;
	buildings: BuildingSpec[];
	/** Re-tune and regenerate. Throws on an illegal knob. */
	configure: (input: CityConfigInput) => void;
	/** New seed, new layout. */
	regenerate: () => void;
};

export const useCityStore = create<CityState>((set, get) => {
	const config = CityConfigSchema.parse({});
	return {
		config,
		buildings: createCity(config),
		configure: (input) => {
			const next = CityConfigSchema.parse(input);
			set({ config: next, buildings: createCity(next) });
		},
		regenerate: () => {
			const next = {
				...get().config,
				seed: Math.floor(Math.random() * 2 ** 31),
			};
			set({ config: next, buildings: createCity(next) });
		},
	};
});
