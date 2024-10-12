import { useState } from "react";
import "./App.css";
import { TextInput } from "./components/text-input";
import logo from "./logo.svg";
import { getChatCompletion } from "./scripts/openai";

function App() {
	const [streamText, setStreamText] = useState("");

	const handleSubmit = async (text) => {
		console.log("SUBMIT");
		const stream = await getChatCompletion(text);

		let runningStream = "";
		for await (const part of stream) {
			const chunk = part.choices[0]?.delta?.content || "";
			runningStream += chunk;
			setStreamText(runningStream);
		}
	};

	return (
		<div className="App">
			<header className="App-header">
				<TextInput handleSubmit={handleSubmit} />
				<div>{streamText}</div>
			</header>
		</div>
	);
}

export default App;
