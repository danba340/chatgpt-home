import { CHATGPT_TOKEN } from "./secrets";
export const prePrompt =
	"You are a code copilot. You write brower javascript code. Your responses contain only code, no additional explanatory text. Add informational console logs in the code. Colors should always be in hex. You can assume the fetch function exists. Use the API token from a variable called LIFX_TOKEN and do not declare it.";

const URL = "https://api.openai.com/v1/chat/completions";

// Function to ChatGptIt!
export async function chatGptIt(message) {
	const response = await fetch(URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${CHATGPT_TOKEN}`,
		},
		body: JSON.stringify({
			"model": "gpt-3.5-turbo",
			"messages": [
				{ "role": "system", "content": "You are a user" },
				{ "role": "user", "content": prePrompt + message }
			],
		}),
	});

	const data = await response.json();
	return data.choices[0].message.content;
}

export function onlyCode(reply) {
	let text = reply;
	if (!text.endsWith("```")) {
		text = text.slice(text.lastIndexOf("```"))
	}
	if (!text.startsWith("```")) {
		text = text.substring(text.indexOf("```") + 1)
	}
	while (text.includes("```js")) {
		text = text.replace("```js", "");
	}
	while (text.includes("```javascript")) {
		text = text.replace("```javascript", "");
	}
	while (text.includes("```")) {
		text = text.replace("```", "");
	}
	return text;
}


