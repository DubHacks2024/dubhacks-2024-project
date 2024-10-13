import { useState } from "react";
import "./App.css";
import { Flashcard } from "./components/Flashcard";
import Flashcards from "./components/Flashcards";
import { TextInput } from "./components/text-input";
import { getChatCompletion, getFlashcards } from "./scripts/openai";

function App() {
	const [streamText, setStreamText] = useState("");
	const [flashcards, setFlashcards] = useState([]);

	const handleSubmit = async (text) => {
		const stream = await getChatCompletion(text);

		let runningStream = "";
		for await (const part of stream) {
			const chunk = part.choices[0]?.delta?.content || "";
			runningStream += chunk;
			setStreamText(runningStream);
		}
	};

	const handleGenerateFlashcards = async (text) => {
		const res = await getFlashcards(text);
		const json = JSON.parse(res.choices[0].message.content);
		setFlashcards(json.flashcards);
	};

	return (
		<div className="App">
			<header className="App-header">
				<TextInput onSubmit={handleSubmit} onGenerateFlashcards={handleGenerateFlashcards} />
				{flashcards.length > 0 && <Flashcards flashcards={flashcards} />}
				<div>{streamText}</div>
			</header>
		</div>
	);
}

export default App;
