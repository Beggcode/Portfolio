import "./App.css";
import { Theme } from "./Theme";
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
