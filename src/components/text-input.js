import { useState } from "react";

export function TextInput() {
	const [location, setLocation] = useState("");
	return (
		<div>
			<form>
				<label htmlFor="location">
					Lecture Transcript:
					<input
						className=""
						type="text"
						id="location"
						value={location}
						placeholder="transcript"
						onChange={(e) => setLocation(e.target.value)}
					/>
				</label>
			</form>
		</div>
	);
}
