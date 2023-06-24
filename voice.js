export function initVoice(callback) {
	const startBtn = document.getElementById("talk");
	const submitBtn = document.getElementById("submit");
	const cancelBtn = document.getElementById("cancel");
	const resultText = document.getElementById("command");

	let result = "";
	resultText.addEventListener("input", (e) => {
		result = e.target.value;
		console.log("RESULT", result)
	});

	const SpeechRecognition = window.SpeechRecognition ||
		window.webkitSpeechRecognition;
	if (!SpeechRecognition) {
		document.getElementById("result").innerHTML =
			"Speech recognition is not supported in this browser.";
	} else {

		const recognition = new SpeechRecognition();

		// Enable continuous recognition
		recognition.continuous = true;

		// Handle recognition start event
		recognition.onstart = () => {
			resultText.value = "Listening...";
			resultText.disabled = true;
		};

		// Handle recognition result event
		recognition.onresult = (event) => {
			result += event.results[event.results.length - 1][0].transcript;
			resultText.value = result;
			resultText.disabled = false;
		};

		// Handle recognition error event
		recognition.onerror = (event) => {
			resultText.value = "Error: " + event.error;
			resultText.disabled = true;
		};

		// Handle start button click event
		startBtn.addEventListener("click", () => {
			recognition.start();
			startBtn.classList.add("hidden");
			cancelBtn.classList.remove("hidden");
		});

		cancelBtn.addEventListener("click", () => {
			recognition.stop();
			startBtn.classList.remove("hidden");
			cancelBtn.classList.add("hidden");
			resultText.value = "";
			result = "";
		});

		submitBtn.addEventListener("click", () => {
			recognition.stop();
			startBtn.classList.remove("hidden");
			submitBtn.classList.add("hidden");
			cancelBtn.classList.add("hidden");
			callback(result);
		});
	}
}
