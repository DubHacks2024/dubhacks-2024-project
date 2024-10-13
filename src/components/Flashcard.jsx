import React, { useState } from "react";

export const Flashcard = ({ frontText, backText }) => {
	const [isFlipped, setIsFlipped] = useState(false);

	const handleFlip = (evt) => {
		console.log(evt);
		setIsFlipped(!isFlipped);
		evt.target.classList.add('flipping');
		setTimeout(() => {
			evt.target.classList.remove('flipping');
		}, 200);
	};

	return (
		<div className="flashcard" onClick={handleFlip}>
			{isFlipped ? <div>{backText}</div> : <div>{frontText}</div>}
		</div>
	);
};
