import { useState } from "react";
import "./App.css";
import { Flashcard } from "./components/Flashcard";
import Flashcards from "./components/Flashcards";
import Quiz from "./components/Quiz";
import { TextInput } from "./components/text-input";
import { getFlashcards, getQuiz, getSummary } from "./scripts/openai";

function App() {
	const [streamText, setStreamText] = useState("");
	const [flashcards, setFlashcards] = useState([]);
	const [quiz, setQuiz] = useState([]);

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
		} else if (type === "flashcards") {
			const response = await getFlashcards(text);
			const json = JSON.parse(response.choices[0].message.content);

			setFlashcards(json.flashcards);
		} else {
			// const response = await getQuiz(text);
			// const json = JSON.parse(response.choices[0].message.content);
			// console.log(json.quiz);
			setQuiz([
				{
					prompt: "What is the general form of a linear equation?",
					options: ["ax + b = c", "x + b = c", "ax + b = 0", "ax = c + b"],
					answer: 0,
					explanation:
						"A linear equation is in the form ax + b = c, where a, b, and c are constants, and x is the variable we need to solve for.",
				},
				{
					prompt: "In the equation 3x + 5 = 14, what is the solution for x?",
					options: ["3", "5", "2", "7"],
					answer: 0,
					explanation:
						"To solve for x, first subtract 5 from both sides to get 3x = 9. Then, divide by 3 to find x = 3.",
				},
				{
					prompt: "How do you eliminate the fraction in the equation (1/2)x = 4?",
					options: [
						"Add 4 to both sides",
						"Multiply by 2 on both sides",
						"Add 1 to both sides",
						"Multiply by 1/2 on both sides",
					],
					answer: 1,
					explanation: "To eliminate the fraction, multiply both sides by 2 to get x = 8.",
				},
				{
					prompt: "What is the first step to solve the equation 2x - 4 = 10?",
					options: [
						"Subtract 4 from both sides",
						"Add 4 to both sides",
						"Divide by 2 on both sides",
						"Multiply by 2 on both sides",
					],
					answer: 0,
					explanation: "The first step is to subtract 4 from both sides to get 2x = 14.",
				},
				{
					prompt: "What is the key step in solving linear equations?",
					options: [
						"Multiplying both sides",
						"Adding random numbers",
						"Isolating the variable",
						"Ignoring constants",
					],
					answer: 2,
					explanation:
						"The key step in solving linear equations is to isolate the variable by performing operations to get it alone on one side of the equation.",
				},
			]);
		}
	};

	return (
		<div className="App">
			<header className="App-header">
				<TextInput onSubmit={handleSubmit} />
				{flashcards.length > 0 && <Flashcards flashcards={flashcards} />}
				{quiz.length > 0 && <Quiz quiz={quiz} />}

				<div>{streamText}</div>
			</header>
		</div>
	);
}

export default App;
