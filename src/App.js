import "./App.css";
import { TextInput } from "./components/text-input";
import logo from "./logo.svg";
import { getChatCompletion } from "./scripts/openai";

function App() {
	const handleSubmit = async (text) => {
		console.log("SUBMIT");
		const stream = await getChatCompletion(text);

		for (const chunk in stream) {
			console.log(chunk);
		}
	};

	return (
		<div className="App">
			<header className="App-header">
				<TextInput handleSubmit={handleSubmit} />
			</header>
		</div>
	);
}

export default App;
