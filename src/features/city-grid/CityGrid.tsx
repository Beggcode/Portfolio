import { useState } from "react";
import { Grid } from "@react-three/drei";
import { Building } from "./Building";

type CityGridProps = {
	gridSize?: number;
	spacing?: number;
};

// TODO: density — every cell gets a building right now, which is what makes
// the grid read as one solid mass. Only some cells should build; the rest stay
// bare so the floor grid shows through. Comes after the camera step.
export function CityGrid({ gridSize = 10, spacing = 1.2 }: CityGridProps) {
	const [buildings] = useState(() => {
		const result = [];
		for (let i = 0; i < gridSize * gridSize; i++) {
			const col = i % gridSize;
			const row = Math.floor(i / gridSize);
			const x = (col - gridSize / 2) * spacing;
			const z = (row - gridSize / 2) * spacing;
			const height = Math.random() * 4 + 0.5;
			result.push({
				position: [x, height / 2, z] as [number, number, number],
				height,
			});
		}
		return result;
	});

	return (
		<>
			{/* The floor the city grows out of. Offset by half a cell so buildings
			    sit inside cells rather than straddling the lines — building centres
			    land on multiples of `spacing`, which is where the lines would be.
			    infiniteGrid + fade is what keeps the far edge from ending in a hard
			    visible line short of the horizon. */}
			<Grid
				position={[spacing / 2, 0, spacing / 2]}
				args={[gridSize * spacing, gridSize * spacing]}
				cellSize={spacing}
				cellThickness={1}
				cellColor="#1f1f1f"
				sectionSize={spacing * 5}
				sectionThickness={1.5}
				sectionColor="#4a4a4a"
				infiniteGrid
				fadeDistance={35}
				fadeStrength={1.5}
			/>
			{buildings.map((b, i) => (
				<Building key={i} position={b.position} height={b.height} />
			))}
		</>
	);
}
