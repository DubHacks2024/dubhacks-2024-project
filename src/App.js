import { act, useState } from "react";
import Flashcards from "./components/Flashcards";
import Quiz from "./components/Quiz";
import { TextInput } from "./components/text-input";
import { getFlashcards, getQuiz, getSummary } from "./scripts/openai";
import "./styles/App.css";

function App() {
	const [streamText, setStreamText] = useState("");
	const [active, setActive] = useState("");
	const [flashcards, setFlashcards] = useState([]);
	const [quiz, setQuiz] = useState([]);

	const handleSubmit = async (text, type) => {
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
			curr.classList.remove("active");
		}
		evt.target.classList.add("active");
		setActive(evt.target.id);
	};

	const display = () => {
		if (active === "summary") {
			return <article>{streamText}</article>;
		} else if (active === "quiz") {
			return (
				<article>
					<Quiz quiz={quiz} />
				</article>
			);
		} else if (active === "discussion") {
			return (
				<article>
					<h1>DISCUSSION</h1>
				</article>
			);
		} else if (active === "flashcards") {
			return (
				<article>
					<Flashcards flashcards={flashcards} />
				</article>
			);
		}
	};

	return (
		<>
			<section id="left">
				<div className="text-input">
					<TextInput onSubmit={handleSubmit} />
				</div>
			</section>
			<section id="right">
				<nav>
					<ul>
						<li id="summary" onClick={select}>
							Summary
						</li>
						<li id="quiz" onClick={select}>
							Quiz
						</li>
						<li id="discussion" onClick={select}>
							Discussion
						</li>
						<li id="flashcards" onClick={select}>
							Flashcards
						</li>
					</ul>
				</nav>
				{display()}
			</section>
		</>
	);
}

export default App;
