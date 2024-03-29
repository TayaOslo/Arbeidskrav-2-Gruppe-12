const noBtn = document.querySelector(".no");
const heartBtn = document.querySelector(".heart");
const matchesContainer = document.querySelector(".profiles");
const messageContainer = document.querySelector(".messageContainer");
const liMatches = document.querySelector("#liMatch");
const liMessages = document.querySelector(".active");

// likte brukere
let likedUsers = [];

function createRandomUserCard(randomUser) {
  const userDiv = document.createElement("div");
  userDiv.classList.add("user");

  const img = document.createElement("img");
  img.classList.add("userImg");
  img.classList.add("user");
  img.src = randomUser.picture.large;

  img.alt = `${randomUser.name.first} ${randomUser.name.last}`;

  const profileDiv = document.createElement("div");
  profileDiv.classList.add("profile");

  const nameDiv = document.createElement("div");
  nameDiv.classList.add("name");
  nameDiv.textContent = `${randomUser.name.first} ${randomUser.name.last} `;
  const ageSpan = document.createElement("span");
  ageSpan.classList.add("age"); // la til age class
  ageSpan.textContent = randomUser.dob.age;
  nameDiv.appendChild(ageSpan);

  const localDiv = document.createElement("div");
  localDiv.classList.add("local");
  const markerIcon = document.createElement("i");
  markerIcon.classList.add("fas", "fa-map-marker-alt");
  const locationSpan = document.createElement("span");
  locationSpan.textContent = `${randomUser.location.city}, ${randomUser.location.country}`;
  localDiv.appendChild(markerIcon);
  localDiv.appendChild(locationSpan);

  profileDiv.appendChild(nameDiv);
  profileDiv.appendChild(localDiv);

  if (randomUser.gender === "male") {
    userDiv.classList.add("male");
  } else {
    userDiv.classList.add("female");
  }

  userDiv.appendChild(img);
  userDiv.appendChild(profileDiv);

  return userDiv;
}

function fetchRandomUser() {
  const apiUrl = "https://randomuser.me/api/";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const randomUser = data.results[0];
      const randomUserCardDiv = document.getElementById("random-user-card");
      const randomUserCard = createRandomUserCard(randomUser);
      randomUserCardDiv.innerHTML = "";
      randomUserCardDiv.appendChild(randomUserCard);
    })
    .catch((error) => {
      console.error("Error fetching random user:", error);
    });
}

let swipeCount = 10;

function updateSwipeCount() {
  const swipeCountElement = document.getElementById("swipe-count");
  if (swipeCountElement) {
    swipeCountElement.textContent = swipeCount;
  }
}

function handleSwipe() {
  if (swipeCount > 0) {
    swipeCount--;
    updateSwipeCount();
  } else {
    let answer;
    do {
      alert("You have used all of your swipes!");
      answer = prompt("Do you want to swipe more? Yes/No");
    } while (answer.toLowerCase() !== "yes" && answer.toLowerCase() !== "no");

    if (answer.toLowerCase() === "yes") {
      swipeCount = 10;
      updateSwipeCount();
    } else {
      handleSwipe();
    }
  }
}

updateSwipeCount();

fetchRandomUser();

const femaleBtn = document.querySelector("#female-btn");
const maleBtn = document.querySelector("#male-btn");
const bothBtn = document.querySelector("#both-btn");

let currentGenderFilter = "";

function fetchAndDisplayProfiles() {
  const apiUrl = `https://randomuser.me/api/`;

  let genderFilter = "";
  if (currentGenderFilter === "female") {
    genderFilter = "female";
  } else if (currentGenderFilter === "male") {
    genderFilter = "male";
  }

  const urlWithFilter = genderFilter
    ? `${apiUrl}?gender=${genderFilter}`
    : apiUrl;

  fetch(urlWithFilter)
    .then((response) => response.json())
    .then((data) => {
      const profile = data.results[0];

      const randomUserCardDiv = document.querySelector("#random-user-card");

      randomUserCardDiv.innerHTML = "";

      const randomUserCard = createRandomUserCard(profile);
      randomUserCardDiv.appendChild(randomUserCard);
    })

    .catch((error) => {
      console.error("Error fetching profile:", error);
    });
}

function swapProfile() {
  fetchAndDisplayProfiles(); // Fetch and display a new profile
}

function handleButtonClick(gender) {
  currentGenderFilter = gender;
  handleSwipe();
  fetchAndDisplayProfiles(); // Fetch and display profiles based on the selected gender
}

femaleBtn.addEventListener("click", function () {
  currentGenderFilter = "female";
  fetchAndDisplayProfiles();
});

maleBtn.addEventListener("click", function () {
  currentGenderFilter = "male";
  fetchAndDisplayProfiles();
});

bothBtn.addEventListener("click", function () {
  currentGenderFilter = "";
  fetchAndDisplayProfiles();
});

noBtn.addEventListener("click", function () {
  handleSwipe(); // Handle swipe
  fetchAndDisplayProfiles(); // Fetch and display a new random user
});

heartBtn.addEventListener("click", function () {
  handleSwipe(); // Handle swipe
  fetchAndDisplayProfiles(); // Fetch and display a new random user

  // push liked user to "likedUsers" <----- DEL 2

  // få bruker info

  const likedNameAge = document.querySelector(".name").textContent;
  const location = document.querySelector(".local").textContent;
  const likedImg = document.querySelector(".userImg").src;

  const userInfo = { likedNameAge, location, likedImg };

  likedUsers.push(userInfo);

  // sett inn profil
  renderProfile();

  // lagre users
  localStorage.setItem("likedProfiles", JSON.stringify(likedUsers));
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    handleSwipe(); // Decrease swipe count
    swapProfile();
  } else if (e.key === "ArrowRight") {
    swapProfile();
    fetchAndDisplayProfiles();

    const likedNameAge = document.querySelector(".name").textContent;
    const location = document.querySelector(".local").textContent;
    const likedImg = document.querySelector(".userImg").src;

    const userInfo = { likedNameAge, location, likedImg };

    likedUsers.push(userInfo);

    // sett inn profil
    renderProfile();

    // lagre users
    localStorage.setItem("likedProfiles", JSON.stringify(likedUsers));

    renderProfile();
  }
});

// legget til likte brukere på siden del 2.1

function renderProfile() {
  if (likedUsers.length > 10) {
    alert("Delete at least one profile from the list!");
  } else {
    const matchesProfile = likedUsers
      .map((user, index) => {
        return `
    <div class="matches">
    <div class="avatar">
      <img
        src="${user.likedImg}"
        alt=""
      />
    </div>
    <div class="message">
      <div class="user">${user.likedNameAge}</div>
      <div class="text">
        ${user.location}
      </div>
      <div>
          <button onclick="deleteProfile(${index})">Slett</button>
              <button onclick="editProfile(${index})">Rediger</button>
          </div>
    </div>
  </div>
  `;
      })
      .join("");

    matchesContainer.innerHTML = matchesProfile;
    messageContainer.style.display = "none";
    liMatches.classList.add("active");
    liMessages.classList.remove("active");
  }
}

// Legg til følgende to funksjoner for sletting og redigering

function deleteProfile(index) {
  likedUsers.splice(index, 1);
  renderProfile();
  updateLocalStorage();
  updateSwipeCount(); // Oppdaterer også antall sveip etter sletting
}
// Del3
function editProfile(index) {
  const newName = prompt("Enter the new name:");
  const newAge = prompt("Enter the new age:");
  const newLocation = prompt("Enter the new location:");

  likedUsers[index].likedNameAge = newName + " " + newAge;
  likedUsers[index].location = newLocation;

  renderProfile();
  updateLocalStorage();
}

function updateLocalStorage() {
  localStorage.setItem("likedProfiles", JSON.stringify(likedUsers));
}
