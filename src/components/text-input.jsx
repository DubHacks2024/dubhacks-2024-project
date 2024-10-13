import { useState } from "react";

export function TextInput({ onSubmit }) {
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
				<button onClick={() => onSubmit(text, "summary")}>Generate Summary</button>
				<button onClick={() => onSubmit(text, "flashcards")}>Generate Flashcards</button>
				<button onClick={() => onSubmit(text, "quiz")}>Generate Quiz</button>
			</label>
		</div>
	);
}
