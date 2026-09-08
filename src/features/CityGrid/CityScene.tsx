import { Canvas } from "@react-three/fiber";
import { Theme } from "../../Theme";
import { CityGrid } from "./CityGrid";

type Vec3 = [number, number, number];

// Rooftop vantage — the camera sits partway up a mid-rise, not above the city.
// Don't level it out or pull it back.
// CAMERA_TARGET isn't the origin, so the lookAt below is load-bearing.
const CAMERA_POSITION: Vec3 = [4.73, 6.49, 5.21];
const CAMERA_TARGET: Vec3 = [2.7, 5.34, 2.98];

/*
 * TODO: moon — rising key light, shadows follow it, settles low right of frame.
 * Do it after the build-up animation.
 *
 *   - One eased angle drives both the moon mesh and the light, or they drift.
 *   - Ease-out, not linear. The settling is the point.
 *   - Find its resting spot with OrbitControls, same as the camera.
 *   - Shadows: size shadow-camera-left/right/top/bottom to cover the city or
 *     they silently vanish. Once settled, gl.shadowMap.autoUpdate = false.
 */
export function CityScene() {
	return (
		<Canvas
			camera={{ position: CAMERA_POSITION, fov: 50 }}
			onCreated={({ camera }) => camera.lookAt(...CAMERA_TARGET)}
		>
			<color attach="background" args={[Theme.background]} />
			<ambientLight intensity={Theme.ambientIntensity} />
			<directionalLight
				position={Theme.keyLight.position}
				intensity={Theme.keyLight.intensity}
			/>
			<CityGrid />
		</Canvas>
	);
}
