import React, { Component } from "react";
import MultiChoice from "./MultiChoice";

function Quiz({ quiz }) {
	return (
		<div
			style={{
				maxHeight: "100vh",
				overflowY: "auto",
				border: "1px solid #ccc",
			}}
		>
			<ol>
				{quiz.map((cur, idx) => {
					return <MultiChoice problem={cur} key={idx} />;
				})}
			</ol>
		</div>
	);
}

export default Quiz;
