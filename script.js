const photo = document.querySelector("#photo");
const details = document.querySelector("#details");
const nameEl = document.querySelector("#name");
const followersEl = document.querySelector("#followers");
const followingEl = document.querySelector("#following");
const bioEl = document.querySelector("#bio");
const locationEl = document.querySelector("#location");


const person = fetch('https://api.github.com/users/hiteshchoudhary');
person.then( (response) => {
    return response.json();
}).then( (data) => {
    console.log(data);
    photo.style.backgroundImage = `url(${data.avatar_url})`;
    nameEl.innerText = `name: ${data.name}`;
    followersEl.innerText = `followers: ${data.followers}`;
    followingEl.innerText = `following: ${data.following}`;
    locationEl.innerText = `location: ${data.location}`;

}).catch((err) => {
    console.log(err);
})