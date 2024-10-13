import { useEffect, useState } from "react";
import { Flashcard } from "./Flashcard";

function Flashcards({ flashcards }) {
	//flashcards is a json object from the llm
	const [cardId, setCardId] = useState(0);

	const changeCard = (prev) => {
		//true for prev, false for next
		if (prev) {
			if (cardId > 0) {
				setCardId(cardId - 1);
			}
		} else {
			if (cardId < flashcards.length - 1) {
				setCardId(cardId + 1);
			}
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
