import OpenAI from "openai";

export async function getChatCompletion(text) {
	const client = new OpenAI({
		apiKey: "OPENAI_API_KEY",
		dangerouslyAllowBrowser: true,
	});

	const stream = await client.chat.completions.create({
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "system",
				content:
					"You are a helpful assistant who summarizes a lecture transcript. If any of the concepts seem wrong or missing, correct them.",
			},
			{
				role: "user",
				content: `Summarize this long lecture transcript: ${text}`,
			},
		],
		stream: true,
	});
	return stream;
}

export async function getFlashcards(text) {
	const client = new OpenAI({
		apiKey: "OPENAI_API_KEY",
		dangerouslyAllowBrowser: true,
	});

	const response = await client.chat.completions.create({
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "system",
				content:
					"You are a helpful assistant who generates flashcards to help students learn the lecture material from a lecture transcript given to you. Only generate flashcards with concept based questions and not actual problems and solution. return the flashcards in json format - in an array of objects where each object has a front and back field.",
			},
			{
				role: "user",
				content: `generate 10 flashcards based on this lecture transcript: ${text}`,
			},
		],
		response_format: { type: "json_object" },
	});
	return response;
}
