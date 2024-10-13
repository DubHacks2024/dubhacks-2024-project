import React, { useState } from "react";

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
							checked={selectedOption === i}
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
		<div>
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
	console.log(isSubmitted);

	if (isSubmitted == false && selectedOption == -1) {
		return <div>{display}</div>;
	} else if (selectedOption == problem.answer) {
		return (
			<div>
				{display}
				<span style={{ color: "green", fontSize: "24px" }}>&#10004;</span>
			</div>
		);
	} else {
		return (
			<div>
				{display}
				<span style={{ fontSize: "24px" }}>❌</span>
				{problem.explanation}
			</div>
		);
	}
}

export default MultiChoice;
