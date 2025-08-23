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
    search(username);
})
document.addEventListener("keydown", (e) => {
    if(e.key === `Enter`){
    console.log("button clicked");
    let username = userInput.value;
    search(username);
    }
})
photo.style.backgroundColor = `white` ;
nameEl.innerText = `name: `;
followersEl.innerText = `followers: `;
followingEl.innerText = `following: `;
locationEl.innerText = `location: `;
function safeString(value) {
  if (value === null || value === undefined || value === "") {
    return "data not available";
  }
  return value;
}

function search(username) {
    const person = fetch(`https://api.github.com/users/${username}`);
person.then( (response) => {
    return response.json();
}).then( (data) => {
    console.log(data);
    photo.style.backgroundColor = `none`;
    photo.style.backgroundImage = `url(${data.avatar_url})`;
    nameEl.innerText = `name: ${safeString(data.name)}`;
    followersEl.innerText = `followers: ${data.followers ?? `data not available`}`;
    followingEl.innerText = `following: ${data.following ?? `data not available`}`;
    locationEl.innerText = `location: ${safeString(data.location)}`;

}).catch((err) => {
    console.log(err);
})
}
