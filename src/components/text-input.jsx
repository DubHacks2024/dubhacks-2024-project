import { useState } from "react";
import "../styles/text-input.css";

export function TextInput({ onSubmit }) {
	const [text, setText] = useState("");

	return (
		<div>
			<label htmlFor="transcriptInput">
				Lecture Transcript:
				<textarea
					className="textarea"
					type="text"
					id="transcriptInput"
					value={text}
					placeholder="transcript"
					onChange={(e) => setText(e.target.value)}
				/>
				<div>
					<button onClick={() => onSubmit(text, "summary")}>Generate Summary</button>
					<button onClick={() => onSubmit(text, "flashcards")}>Generate Flashcards</button>
					<button onClick={() => onSubmit(text, "quiz")}>Generate Quiz</button>
				</div>
			</label>
		</div>
	);
}
