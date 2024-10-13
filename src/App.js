import { useState } from "react";
import "./App.css";
import { Flashcard } from "./components/Flashcard";
import Flashcards from "./components/Flashcards";
import { TextInput } from "./components/text-input";
import { getFlashcards, getSummary } from "./scripts/openai";

function App() {
	const [streamText, setStreamText] = useState("");
	const [flashcards, setFlashcards] = useState([]);

	const handleSubmit = async (text, type) => {
		// const response = await fetch("/api/openai", {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify({
		// 		query: text,
		// 		type: type,
		// 	}),
		// });

		// //stream text only if summary
		// if (type === "summary" && response.body && typeof response.body.getReader === "function") {
		// 	const reader = response.body.getReader();

		// 	// Create a TextDecoder to decode the binary data to a string
		// 	const decoder = new TextDecoder();
		// 	let runningSumText = "";
		// 	const readStream = async () => {
		// 		while (true) {
		// 			const { done, value } = await reader.read();
		// 			if (done) break;

		// 			// Decode the chunk of data to a string using TextDecoder
		// 			const chunk = decoder.decode(value, { stream: true });

		// 			// keep running answer
		// 			runningSumText += chunk;
		// 			// Update state with as streamed data comes in to get that typing effect
		// 			//format text before updating state

		// 			setStreamText(runningSumText);
		// 		}
		// 	};

		// 	// Start reading and processing the stream
		// 	readStream();
		// }

		if (type === "summary") {
			const stream = await getSummary(text);
			let runningStream = "";
			for await (const part of stream) {
				const chunk = part.choices[0]?.delta?.content || "";
				runningStream += chunk;
				setStreamText(runningStream);
			}
			return;
		}

		const response = await getFlashcards(text);

		const json = JSON.parse(response.choices[0].message.content);
		if (type === "flashcards") {
			setFlashcards(json.flashcards);
		} else {
		}
	};

	return (
		<div className="App">
			<header className="App-header">
				<TextInput onSubmit={handleSubmit} />
				{flashcards.length > 0 && <Flashcards flashcards={flashcards} />}
				<div>{streamText}</div>
			</header>
		</div>
	);
}

export default App;
