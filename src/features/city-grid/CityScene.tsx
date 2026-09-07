import { Canvas } from "@react-three/fiber";
import { CityGrid } from "./CityGrid";

type Vec3 = [number, number, number];

/*
 * Locked in with OrbitControls, then hardcoded. Tilted ~21deg down on purpose:
 * the cell tops have to be visible for the grid -> city reveal to read. A level
 * camera flattens them into slivers and the animation has nothing to land on.
 *
 * These two travel together. CAMERA_TARGET is not the origin, and R3F aims a
 * new camera at [0,0,0] by default, so the lookAt in onCreated is load-bearing
 * — drop it and you get the right vantage point aimed at the wrong thing.
 */
const CAMERA_POSITION: Vec3 = [4.73, 6.49, 5.21];
const CAMERA_TARGET: Vec3 = [2.7, 5.34, 2.98];

/*
 * TODO: the moon — a rising key light that drags the shadows with it and
 * settles low near the right of frame.
 *
 * Do this AFTER density. Shadows cast across a solid mass of buildings show
 * almost nothing; the image only works once bare cells let long shadows fall
 * across visible floor. Building it first means tuning it against the wrong
 * picture.
 *
 * Shape of it:
 *   1. One source of truth for the moon's angle — a single number, eased from
 *      "just above the horizon" to its resting angle. Derive BOTH the moon
 *      mesh's position and the directionalLight's position from it, the same
 *      way CAMERA_POSITION/CAMERA_TARGET travel together above. Two positions
 *      animated independently will drift and the shadows will stop matching.
 *   2. Drive it from useFrame with an ease-out on elapsed time, not a linear
 *      ramp — the "settling" is the whole feeling, and linear won't settle.
 *   3. The moon itself is a flat bright disc. No glow, no colour. In noir it
 *      reads as a hole punched in the sky.
 *
 * "Near the right corner" is a screen-space idea and the camera is locked, so
 * it has to become a world position. Easiest way: temporarily put
 * OrbitControls back, park a sphere where it looks right, read the numbers.
 * Same workflow as the camera. Don't try to derive it on paper.
 *
 * Shadows, once enabled:
 *   - <Canvas shadows>, castShadow on the light, castShadow/receiveShadow on
 *     the buildings, receiveShadow on the floor.
 *   - A directionalLight's shadow camera is orthographic and defaults to a
 *     small box. Size shadow-camera-left/right/top/bottom to cover the city or
 *     shadows silently vanish at the edges. This is the usual first bug.
 *   - The shadow map re-renders every frame while the light moves. That is the
 *     real cost here, on an element that sits behind the whole site. Once the
 *     moon settles, gl.shadowMap.autoUpdate = false freezes it for free.
 *
 * Watch for: a low moon makes gorgeous long shadows and also stretches them
 * far past the grid. That interacts with fadeDistance on the floor.
 */
export function CityScene() {
	return (
		<Canvas
			camera={{ position: CAMERA_POSITION, fov: 50 }}
			onCreated={({ camera }) => camera.lookAt(...CAMERA_TARGET)}
		>
			<color attach="background" args={["#0a0a0a"]} />
			{/* Noir is carried by the lighting, not the palette. Ambient stays
			    very low so unlit faces fall to near-black, and one hard, bright
			    key light from a low raking angle does all the work — that split
			    between a silver lit face and a black unlit one is the look. */}
			<ambientLight intensity={0.12} />
			<directionalLight position={[8, 6, 3]} intensity={1.8} />
			<CityGrid />
		</Canvas>
	);
}
