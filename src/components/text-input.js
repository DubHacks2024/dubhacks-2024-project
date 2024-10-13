import { useState } from "react";
import { getChatCompletion } from "../scripts/openai";

export function TextInput({ onSubmit, onGenerateFlashcards }) {
	const [text, setText] = useState("");

	return (
		<div>
			<label htmlFor="transcriptInput">
				Lecture Transcript:
				<textarea
					className=""
					type="text"
					id="transcriptInput"
					value={text}
					placeholder="transcript"
					onChange={(e) => setText(e.target.value)}
				/>
				<button onClick={() => onSubmit(text)}>Generate Summary</button>
				<button onClick={() => onGenerateFlashcards(text)}>Generate Flashcards</button>
			</label>
		</div>
	);
}
