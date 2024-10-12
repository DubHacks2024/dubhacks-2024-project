import { useState } from "react";
import { getChatCompletion } from "../scripts/openai";

export function TextInput(props) {
	const { handleSubmit } = props;
	const [text, setText] = useState("");

	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit(text);
				}}
			>
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
