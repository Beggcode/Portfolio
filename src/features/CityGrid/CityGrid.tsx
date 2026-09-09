import { Building } from "@/features/CityGrid/Building";
import { useCityStore } from "@/shared/group/Store";
import { Theme } from "@/shared/group/Theme";
import { Grid } from "@react-three/drei";

// Rendering only — layout comes from the store.
export function CityGrid() {
	const buildings = useCityStore((s) => s.buildings);
	const { gridSize, spacing } = useCityStore((s) => s.config);

	return (
		<>
			{/* Offset half a cell so buildings sit inside cells, not on the lines.
			    infiniteGrid + fade stops the far edge ending in a hard line. */}
			<Grid
				position={[spacing / 2, 0, spacing / 2]}
				args={[gridSize * spacing, gridSize * spacing]}
				cellSize={spacing}
				cellThickness={Theme.grid.cellThickness}
				cellColor={Theme.grid.cellColor}
				sectionSize={spacing * 5}
				sectionThickness={Theme.grid.sectionThickness}
				sectionColor={Theme.grid.sectionColor}
				infiniteGrid
				fadeDistance={Theme.grid.fadeDistance}
				fadeStrength={Theme.grid.fadeStrength}
			/>
			{buildings.map((b) => (
				<Building key={b.id} position={b.position} height={b.height} />
			))}
		</>
	);
}
