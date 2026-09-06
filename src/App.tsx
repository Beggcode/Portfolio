import { CityScene } from "./features/city-grid/CityScene";
import "./App.css";

function App() {
	return (
		<>
			<div className="scene-background">
				<CityScene />
			</div>
			<main className="page-content">
				<h1>Beggcode</h1>
				<p>CS student</p>
			</main>
		</>
	);
}

export default App;
