import { Canvas } from "@react-three/fiber";
import { CityGrid } from "./CityGrid";

export function CityScene() {
	return (
		<Canvas camera={{ position: [10, 12, 10], fov: 50 }}>
			<ambientLight intensity={0.3} />
			<directionalLight position={[5, 10, 5]} intensity={1} />
			<CityGrid />
		</Canvas>
	);
}
