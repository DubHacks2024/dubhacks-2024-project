import { getFlashcards, getSummary } from "../../scripts/openai";

export async function POST(request) {
	const body = await request.json();
	const query = body.query ?? "no query";
	const type = body.type ?? "no type";
	const conversationHistory = body.conversationHistory ?? "No conversation history";

	//make call to api we created in lib
	//different call based on mode requested
	let stream;
	console.log(analyserMode);
	if (type === "flashcards") {
		//ai feedback on similar documents
		stream = await getFlashcards(query);
	} else if (type === "summarize") {
		//just similar documents
		stream = await getSummary(query);
	} else if (type === "quiz") {
	}
	// const stream = await similaritySearch(new Pinecone({ apiKey: process.env.PINECONE_API_KEY! }), question, namespace);

	return new Response(stream, {
		headers: {
			"Content-Type": "application/octet-stream",
		},
		status: 200,
	});
}
