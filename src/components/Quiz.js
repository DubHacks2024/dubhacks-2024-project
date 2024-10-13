import React, { Component } from "react";
import MultiChoice from "./MultiChoice";

// export class Quiz extends Component {
// 	constructor(props) {
// 		super(props);
// 		// for (let i = 0; i < quiz.length; i++) {
// 		// 	quizList.push(JSON.parse(quiz[i]));
// 		// }
// 		this.state = { quizList: props.quiz };
// 	}

// 	render = () => {
// 		return (
// 			<div>
// 				<ol>
// 					{this.state.quizList.map((cur) => {
// 						return MultiChoice(cur);
// 					})}
// 					;
// 				</ol>
// 			</div>
// 		);
// 	};
// }

function Quiz({ quiz }) {
	return (
		<div>
			<ol>
				{quiz.map((cur) => {
					return <MultiChoice problem={cur} />;
				})}
			</ol>
		</div>
	);
}

export default Quiz;
