
import { act, useState } from "react";
import "./styles/App.css";
import { TextInput } from "./components/text-input";
import { getFlashcards, getQuiz, getSummary } from "./scripts/openai";

function App() {
	const [streamText, setStreamText] = useState("");
	const [active, setActive] = useState('');
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
			const response = await getQuiz(text);
			const json = JSON.parse(response.choices[0].message.content);
			console.log(json.quiz);
			setQuiz(json.quiz);
		}
	};

	const select = (evt) => {
		let options = document.querySelectorAll("#right > nav li");
		for (let i = 0; i < options.length; i++) {
			let curr = options[i];
			curr.classList.remove('active');
		}
		evt.target.classList.add('active');
		setActive(evt.target.id);
	}

	const display = () => {
		if (active === 'summary') {
			return <article>
				<h1>SUMMARY</h1>
			</article>;
		} else if (active === 'quiz') {
			return <article>
				<h1>QUIZ</h1>
			</article>;
		} else if (active === 'discussion') {
			return <article>
				<h1>DISCUSSION</h1>
			</article>;
		} else if (active === 'flashcards') {
			return <article>
				<h1>FLASHCARDS</h1>
			</article>;
		}
	}

	return (
		<>
			<section id="left">
				<div className="text-input">
					<TextInput handleSubmit={handleSubmit} />
					<div>{streamText}</div>
				</div>
			</section>
			<section id="right">
				<nav>
					<ul>
						<li id="summary" onClick={select}>Summary</li>
						<li id="quiz" onClick={select}>Quiz</li>
						<li id="discussion" onClick={select}>Discussion</li>
						<li id="flashcards" onClick={select}>Flashcards</li>
					</ul>
				</nav>
				{display()}
			</section>
		</>
	);
}

export default App;
