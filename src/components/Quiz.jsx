import React, { Component } from "react";
import MultiChoice from "./MultiChoice";

function Quiz({ quiz }) {
	return (
		<div>
			<ol id="quiz-list">
				{quiz.map((cur, idx) => {
					return <MultiChoice problem={cur} key={idx} />;
				})}
			</ol>
		</div>
	);
}

export default Quiz;
