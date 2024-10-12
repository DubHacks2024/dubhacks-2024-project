import { useState } from "react";
import { getChatCompletion } from "../scripts/openai";

export function TextInput(handleSubmit) {
	const [text, setText] = useState("");
	const [outputStream, setOutputStream] = useState("");

	return (
		<div>
			<form onSubmit={() => handleSubmit(text)}>
				<label htmlFor="location">
					Lecture Transcript:
					<input
						className=""
						type="text"
						id="location"
						value={text}
						placeholder="transcript"
						onChange={(e) => setText(e.target.value)}
					/>
				</label>
			</form>
		</div>
	);
}
