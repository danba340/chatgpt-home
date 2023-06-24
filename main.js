import './style.css'
import javascriptLogo from './javascript.svg'
import { initVoice } from './voice'
import { chatGptIt, onlyCode } from "./chatgpt"
import { LIFX_TOKEN } from './secrets'


document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://chat.openai.com" target="_blank">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Chad GPT</h1>
    <div class="card">
      <button id="talk" type="button">Talk</button>
    </div>
    <div class="card">
     <textarea rows="8" cols="40" type="text" id="command" ></textarea>
    </div>
    <div class="card">
      <button class="hidden bg-red" id="cancel" type="button">Clear prompt</button>
      <button id="submit" type="button">Submit</button>
    </div>
    <div class="card text-left">
     <code id="code"></code> 
    </div>
  </div>
`

const codeDiv = document.getElementById('code');
const submitBtn = document.getElementById('submit');

async function onPrompt(prompt) {
  codeDiv.innerHTML = "Prompting..."

  submitBtn.classList.add("hidden");
  console.log("PROMPT:", prompt);
  const response = await chatGptIt(prompt);

  const code = onlyCode(response);
  codeDiv.innerHTML = code;
  submitBtn.classList.remove("hidden");

  // Never ever do this
  eval(code)
}

initVoice(onPrompt)

