import { create } from "zustand";
import { createCity, type BuildingSpec } from "./features/CityGrid/CityFactory";
import {
	CityConfigSchema,
	type CityConfig,
	type CityConfigInput,
} from "./Schemas";

// Every zustand store lives here.
// The city sits here rather than in CityGrid because the build-up animation and
// the moon both need to read it.
type CityState = {
	config: CityConfig;
	buildings: BuildingSpec[];
	/** Re-tune and regenerate. Throws on an illegal knob. */
	configure: (input: CityConfigInput) => void;
	/** Same config, freshly rolled layout. */
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
		regenerate: () => set({ buildings: createCity(get().config) }),
	};
});
