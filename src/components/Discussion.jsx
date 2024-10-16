import OpenAI from "openai";
import React, { useState } from "react";
import "../styles/Discussion.css";

const openai = new OpenAI({
	apiKey: "OPENAI_API_KEY",
	dangerouslyAllowBrowser: true,
});

const CoordinatedClassmatesComponent = ({ transcript }) => {
	const [messages, setMessages] = useState([]); // Shared conversation history (includes user and both AI classmates)
	const [userInput, setUserInput] = useState("");
	const [loadingClassmate1, setLoadingClassmate1] = useState(false);
	const [loadingClassmate2, setLoadingClassmate2] = useState(false);

	// System messages defining the roles for each AI classmate
	const systemMessageClassmate1 = {
		role: "system",
		content: `
        You are AI Classmate 1, designed to enhance the learning experience for students studying through video lectures. Your role is to:

        Engage the user in thought-provoking discussions about lecture content.
        Ask probing questions when the user's understanding seems unclear.
        Promote critical thinking and deeper analysis of concepts.

        Key responsibilities:

        Monitor for group discussion topics in lecture transcripts. If detected, invite the user to explore these topics with both AI classmates.
        In the absence of specific group discussions, encourage the user to discuss any aspect of the lecture to deepen their understanding.
        Gently guide the conversation back to lecture content if it strays off-topic, maintaining a friendly and non-judgmental tone.
        Be aware of and reference conversations between the user and AI Classmate 2 when relevant.

        Maintain a supportive, friendly, and collaborative demeanor throughout, embodying the role of a peer who is invested in the user's academic success.
        Lecture content: ${transcript}
        `,
	};

	const systemMessageClassmate2 = {
		role: "system",
		content: `
        You are AI Classmate 2, designed to enhance the learning experience for students studying through video lectures. Your role is to:

        Provide clear and concise explanations of lecture concepts.
        Offer practical study advice and learning strategies.
        Support overall comprehension of the material.

        Key responsibilities:

        Monitor for group discussion topics in lecture transcripts. If detected, invite the user to explore these topics with both AI classmates.
        In the absence of specific group discussions, encourage the user to discuss any aspect of the lecture to deepen their understanding.
        Gently guide the conversation back to lecture content if it strays off-topic, maintaining a friendly and non-judgmental tone.
        Be aware of and reference conversations between the user and AI Classmate 1 when relevant.

        Maintain a supportive, friendly, and collaborative demeanor throughout, embodying the role of a peer who is invested in the user's academic success.
        Lecture content: ${transcript}
        `,
	};

	// Function to handle user input
	const handleInputChange = (e) => {
		setUserInput(e.target.value);
	};

	// Function to send user input to both AI classmates (coordinated)
	const sendMessageToClassmates = async () => {
		if (!userInput.trim()) return; // Prevent sending empty messages

		const userMessage = { role: "user", content: userInput };
		const newMessages = [...messages, userMessage]; // Add the user's message to the shared conversation history

		setMessages(newMessages);
		setUserInput(""); // Clear input field

		setLoadingClassmate1(true);
		setLoadingClassmate2(true);

		try {
			// Classmate 1 API call
			const response1 = await openai.chat.completions.create({
				model: "gpt-3.5-turbo",
				messages: [
					systemMessageClassmate1, // Provide system message for Classmate 1
					// { role: "user", content: `Here is the lecture transcript: ${transcript}` }, // Provide the lecture transcript context
					...newMessages, // Provide the full conversation history (including Classmate 2's previous responses)
				],
			});
			const replyFromClassmate1 = response1.choices[0].message.content;
			const updatedMessagesAfterClassmate1 = [
				...newMessages,
				{ role: "assistant", content: replyFromClassmate1 },
			]; // Add Classmate 1's response to the conversation history

			// Classmate 2 API call
			const response2 = await openai.chat.completions.create({
				model: "gpt-3.5-turbo",
				messages: [
					systemMessageClassmate2, // Provide system message for Classmate 2
					// { role: "user", content: `Here is the lecture transcript: ${transcript}` }, // Provide the lecture transcript context
					...updatedMessagesAfterClassmate1, // Provide the full conversation history (including Classmate 1's new response)
				],
			});
			const replyFromClassmate2 = response2.choices[0].message.content;

			setMessages([...updatedMessagesAfterClassmate1, { role: "assistant", content: replyFromClassmate2 }]); // Add Classmate 2's response to the conversation history
		} catch (error) {
			console.error("Error with OpenAI API request:", error);
		}

		setLoadingClassmate1(false);
		setLoadingClassmate2(false);
	};

	return (
		<div>
			{/* Conversation Display (both AI classmates and user) */}
			<div className="chat-box">
				{messages.map((msg, index) => (
					<div key={index} className={msg.role === "user" ? "user-msg" : "ai-msg"}>
						<strong className="tag">
							{msg.role === "user" ? "You: " : msg.role === "assistant" ? "Classmate: " : ""}
						</strong>
						{msg.content}
					</div>
				))}
			</div>

			{/* User Input */}
			<textarea
				value={userInput}
				onChange={handleInputChange}
				placeholder="Ask a question or discuss the lecture material..."
			/>
			<button onClick={sendMessageToClassmates} disabled={loadingClassmate1 || loadingClassmate2 || !userInput}>
				{loadingClassmate1 || loadingClassmate2 ? "Loading..." : "Send"}
			</button>
		</div>
	);
};

export default CoordinatedClassmatesComponent;
