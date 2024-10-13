import React, { useState } from "react";
import "../styles/quiz.css";

function MultiChoice({ problem }) {
	const [selectedOption, setSelectedOption] = useState(-1);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleOptionChange = (event) => {
		console.log(event.target.value);
		setSelectedOption(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setIsSubmitted(!isSubmitted);
	};

	const renderOptions = () => {
		const optionsList = [];
		for (let i = 0; i < problem.options.length; i++) {
			optionsList.push(
				<div>
					<label>
						<input
							type="radio"
							value={i}
							checked={selectedOption == i}
							onChange={handleOptionChange}
							disabled={isSubmitted}
						></input>
						{problem.options[i]}
					</label>
					<br></br>
				</div>
			);
		}
		return optionsList;
	};

	const display = (
		<div className="">
			<h2>{problem.prompt}</h2>
			<div>
				{renderOptions()}
				<button onClick={handleSubmit} type="submit">
					Submit
				</button>
			</div>
			<br></br>
		</div>
	);

	if (!isSubmitted) {
		return <li className="quiz-section">{display}</li>;
	} else if (selectedOption == problem.answer) {
		return (
			<li className="quiz-section">
				{display}
				<span style={{ color: "green", fontSize: "24px" }}>&#10004; Correct!</span>
			</li>
		);
	} else {
		return (
			<li className="quiz-section">
				{display}
				<span style={{ fontSize: "24px" }}>❌ Incorrect</span>
				<p>{problem.explanation}</p>
			</li>
		);
	}
}

export default MultiChoice;
