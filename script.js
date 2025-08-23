const photo = document.querySelector("#photo");
const details = document.querySelector("#details");
const nameEl = document.querySelector("#name");
const followersEl = document.querySelector("#followers");
const followingEl = document.querySelector("#following");
const locationEl = document.querySelector("#location");
const userInput = document.querySelector("#user-input");

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
