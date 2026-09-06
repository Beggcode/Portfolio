import { useState } from "react";
import { Building } from "./Building";

type CityGridProps = {
	gridSize?: number;
	spacing?: number;
};

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
			{buildings.map((b, i) => (
				<Building key={i} position={b.position} height={b.height} />
			))}
		</>
	);
}
