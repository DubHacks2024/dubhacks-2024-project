import OpenAI from "openai";

export async function getChatCompletion(text) {
	const client = new OpenAI(process.env.OPENAI_API_KEY);

	const stream = await client.chat.completions.create({
		model: "gpt-3.5-turbo",
		messages: [
			{ role: "system", content: "You are a helpful assistant who summarizes a lecture transcript" },
			{
				role: "user",
				content: `Summarize this long lecture transcript: ${text}`,
			},
		],
	});
	return stream;
}
