import { useEffect, useState } from "react";
import { Flashcard } from "./Flashcard";

function Flashcards({ flashcards }) {
	//flashcards is a json object from the llm
	const [cardId, setCardId] = useState(0);

	const changeCard = (prev) => {
		// true for prev, false for next
		let inBound = (prev) ? (cardId > 0) : (cardId < flashcards.length - 1);
		let increment = prev ? -1 : 1;
		if (inBound) {
			setCardId(cardId + increment);
			let card = document.querySelector('.flashcard');
			card.classList.add('switching');
			setTimeout(() => {
				card.classList.remove('switching');
			}, 200);
		}
	};

	return (
		<>
			{flashcards.length > 0 && (
				<>
					<Flashcard frontText={flashcards[cardId].front} backText={flashcards[cardId].back} />
					<div>
						<button onClick={() => changeCard(true)}>Prev</button>
						<button onClick={() => changeCard(false)}>Next</button>
					</div>
				</>
			)}
		</>
	);
}

export default Flashcards;
