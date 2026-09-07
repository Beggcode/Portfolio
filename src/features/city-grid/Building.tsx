type BuildingProps = {
	position: [number, number, number];
	height: number;
};

export function Building({ position, height }: BuildingProps) {
	return (
		<mesh position={position} scale={[1, height, 1]}>
			<boxGeometry />
			<meshStandardMaterial color="#9a9a9a" roughness={0.7} metalness={0} />
		</mesh>
	);
}
