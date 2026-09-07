import "./App.css";
import { CityScene } from "./features/city-grid/CityScene";

function App() {
	return (
		<>
			<div className="scene-background">
				<CityScene />
			</div>
			<main className="page-content"></main>
		</>
	);
}

export default App;
