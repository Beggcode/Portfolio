import { Theme } from "@/shared/group/Theme";
import "./App.css";
import { CityScene } from "./features/CityGrid/CityScene";

function App() {
	return (
		<>
			<div
				className="scene-background"
				style={{ background: Theme.background }}
			>
				<CityScene />
			</div>
			<main className="page-content"></main>
		</>
	);
}

export default App;
