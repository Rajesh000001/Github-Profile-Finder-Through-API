const photo = document.querySelector("#photo");
const details = document.querySelector("#details");
const nameEl = document.querySelector("#name");
const followersEl = document.querySelector("#followers");
const followingEl = document.querySelector("#following");
const locationEl = document.querySelector("#location");
const userInput = document.querySelector("#user-input");
const mic = document.querySelector("#mic");
const micAudio = new Audio("micAudio.mp3");

speechSynthesis.cancel();
let text1;
let text2;
let text3;
let text4;
let micUsed = false;
const voiceRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if(!voiceRecognition){
  nameEl.innerText = `voiceRecognition doesn't support the browser`;
}

const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.lang = `en-US`;
recognition.interimResults = false;

mic.addEventListener( "click", () => {
    speechSynthesis.cancel();
    recognition.start();
    micAudio.play();
    micAudio.volume = 1.0;
    photo.style.backgroundColor = `transparent`;
    photo.style.backgroundImage = ``;
    nameEl.innerText = ``;
    followersEl.innerText = ``;
    followingEl.innerText = ``;
    locationEl.innerText = ``;
    nameEl.innerText = `voice is recording...`;
})

recognition.onresult = (e) => {
  const transcript = e.results[0][0].transcript;
  console.log(`you said: ${transcript}`);
  userInput.value = transcript; 
}

recognition.onend = (e) =>{
  micAudio.pause();
  nameEl.innerText = ``;
  let username = userInput.value;
  micUsed = true;
  search(username);
}

recognition.onerror = (e) => {
  nameEl.innerText = `mic permission not granted`;
}
const searchButton = document.querySelector("#search-icon-button");
searchButton.addEventListener("click", ()=> {
    console.log("button clicked");
    let username = userInput.value;
    nameEl.innerText = `Loading...`;
    search(username);
})
document.addEventListener("keydown", (e) => {
    if(e.key === `Enter`){
    let username = userInput.value;
    nameEl.innerText = `Loading...`;
    search(username);
    }
})
photo.style.backgroundColor = 'transparent';
function safeString(value) {
  if (value === null || value === undefined || value === "") {
    return "data not available";
  }
  return value;
}

async function search(username) {
    try {
    if (!username.trim()) {
        alert("Please enter a username");
        nameEl.innerText = ``;
        return;
    }
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) throw new Error("User not found");
    const data = await response.json();
    photo.style.backgroundColor = `transparent`;
    photo.style.backgroundImage = `url(${data.avatar_url})`;
    nameEl.innerText = `name: ${safeString(data.name)}`;
    followersEl.innerText = `followers: ${data.followers ?? `data not available`}`;
    followingEl.innerText = `following: ${data.following ?? `data not available`}`;
    locationEl.innerText = `location: ${safeString(data.location)}`;
    text1 = nameEl.innerText
    text2 = followersEl.innerText
    text3 = followingEl.innerText
    text4 = locationEl.innerText
    if (micUsed) {
  const summary = `${text1}. ${text2}. ${text3}. ${text4}.`;
  speakText(summary);
  micUsed = false;
}

    } catch(err){
      if (err.name === "TypeError") {
      // usually network error
      nameEl.innerText = "Network error (check internet connection)";
    } else {
      // API or other error
      nameEl.innerText = err.message;
    }
    photo.style.backgroundColor = `none`;
    photo.style.backgroundImage = `none`
    followersEl.innerText = ``
    followingEl.innerText = ``;
    locationEl.innerText = ``;
    }
    
}

function speakText(text) {
  if(text !== ""){
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = `en-US`;
  utterance.volume = 1;
  utterance.pitch = 1;
  utterance.rate = 1.0;
  speechSynthesis.speak(utterance)
  const subtitle = document.querySelector("#subtitle");

  utterance.onboundary = (e) => {
    if(e.name === `word`) {
      let word = text.substring(e.charIndex, e.charIndex + e.charLength);
      subtitle.innerText += ` ${word}`;
    }
  }

  utterance.onend = ()=> {
      subtitle.innerText = ``;
  }
  } else {
    alert("please say something");
  }
}
