import { act, useState } from "react";
import "./styles/App.css";
import { TextInput } from "./components/text-input";
import logo from "./logo.svg";
import { getChatCompletion } from "./scripts/openai";

function App() {
	const [streamText, setStreamText] = useState("");
	const [active, setActive] = useState('');

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
