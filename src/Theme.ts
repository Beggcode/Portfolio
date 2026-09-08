// All scene styling lives here. Logic reads these; nothing sets a colour inline.
export const Theme = {
	background: "#0d0e0d",

	// Noir is the lighting, not the palette: low ambient, one hard key.
	ambientIntensity: 0.12,
	keyLight: {
		position: [8, 6, 3] as [number, number, number],
		intensity: 1.8,
	},

	building: {
		color: "#c0c5ca",
		roughness: 0.7,
		metalness: 0,
	},

	grid: {
		cellColor: "#333333",
		cellThickness: 1,
		sectionColor: "#5c5c5c",
		sectionThickness: 1.5,
		fadeDistance: 35,
		fadeStrength: 1.5,
	},
} as const;
