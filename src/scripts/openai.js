import OpenAI from "openai";

export async function getSummary(text) {
	const client = new OpenAI({
		apiKey: "sk-proj-P0cRnDNOdV5Cu9TePGaRT3BlbkFJBwPJ1FMCEoxLB2cYB9vK",
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
		apiKey: "sk-proj-P0cRnDNOdV5Cu9TePGaRT3BlbkFJBwPJ1FMCEoxLB2cYB9vK",
		dangerouslyAllowBrowser: true,
	});

	const response = await client.chat.completions.create({
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "system",
				content:
					"You are a helpful assistant who generates flashcards to help students learn the lecture material from a lecture transcript given to you. Only generate flashcards with concept-based questions and not actual problems with a specific solution. Return the flashcards in JSON format - in an array of objects where each object has a 'front' and a 'back' field.",
			},
			{
				role: "user",
				content: `Generate 10 flashcards based on this lecture transcript: ${text}`,
			},
		],
		response_format: { type: "json_object" },
	});
	return response;
}

export async function getQuiz(text) {
	const client = new OpenAI({
		apiKey: "sk-proj-P0cRnDNOdV5Cu9TePGaRT3BlbkFJBwPJ1FMCEoxLB2cYB9vK",
		dangerouslyAllowBrowser: true,
	});

	const response = await client.chat.completions.create({
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "system",
				content:
					"You are a helpful assistant who generates a quiz to help students learn the lecture material from a lecture transcript given to you. The quiz should be multiple choice with 4 choices for each question. Return the quiz in JSON format - in an array of objects where each object has a prompt field (which is the question) and an options array with 4 options, an answer field which is the index of the correct answer in the array, and finally an explanation field which explains why that answer is correct.",
			},
			{
				role: "user",
				content: `Generate a quiz with 5 questions based on this lecture transcript: ${text}`,
			},
		],
		response_format: { type: "json_object" },
	});
	return response;
}
