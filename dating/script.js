function createRandomUserCard(randomUser) {
  const userDiv = document.createElement("div");
  userDiv.classList.add("user");

  const img = document.createElement("img");
  img.classList.add("user");
  img.src = randomUser.picture.large;
  img.alt = `${randomUser.name.first} ${randomUser.name.last}`;

  const profileDiv = document.createElement("div");
  profileDiv.classList.add("profile");

  const nameDiv = document.createElement("div");
  nameDiv.classList.add("name");
  nameDiv.textContent = `${randomUser.name.first} ${randomUser.name.last} `;
  const ageSpan = document.createElement("span");
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
fetchRandomUser();

const noBtn = document.querySelector(".no");
const heartBtn = document.querySelector(".heart");

let swipeCount = 10;

function updateSwipeCount() {
  const swipeCountElement = document.getElementById("swipe-count");
  if (swipeCountElement) {
    swipeCountElement.textContent = swipeCount;
  }
}

// Håndterer sveip
function handleSwipe() {
  if (swipeCount > 0) {
    swipeCount--;
    updateSwipeCount();
  } else {
    let answer;
    do {
      alert("Du har brukt opp alle sveipene dine!");
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

noBtn.addEventListener("click", handleSwipe);

heartBtn.addEventListener("click", handleSwipe);

updateSwipeCount();

const femaleBtn = document.getElementById("female-btn");
const maleBtn = document.getElementById("male-btn");
const bothBtn = document.getElementById("both-btn");

femaleBtn.addEventListener("click", function () {
  fetchAndDisplayProfiles("female");
});

maleBtn.addEventListener("click", function () {
  fetchAndDisplayProfiles("male");
});

bothBtn.addEventListener("click", function () {
  fetchAndDisplayProfiles("");
});

function fetchAndDisplayProfiles(gender) {
  const apiUrl = `https://randomuser.me/api/?gender=${gender}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const profile = data.results[0];
      const randomUserCardDiv = document.getElementById("random-user-card");

      randomUserCardDiv.innerHTML = "";

      const randomUserCard = createRandomUserCard(profile);
      randomUserCardDiv.appendChild(randomUserCard);
    })
    .catch((error) => {
      console.error("Error fetching profile:", error);
    });
}

// Håndterer knappetrykk (noBtn og heartBtn)
Del1: function handleButtonClick() {
  console.log("Knapp har blitt trykket");
  handleSwipe();

  // Sjekk om det er et kort før du fjerner det
  const cardToRemove = document.querySelector(".card");
  if (cardToRemove) {
    cardToRemove.remove();

    // Hent og vis profiler etter at kortet er fjernet
    fetchAndDisplayProfiles("both");
  }
}

// Legg til museklikk-hendelseslyttere for noBtn og heartBtn
noBtn.addEventListener("click", handleButtonClick);
heartBtn.addEventListener("click", handleButtonClick);

// Legg til tastaturklikk-hendelseslytter for venstre- og høyrepil
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    console.log("Neste bruker,IKKE INTERESSERT!");

    // Hent og vis profiler etter at kortet er fjernet
    fetchAndDisplayProfiles("both");
  }
  //handleSwipe();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    console.log("INTERESSERT:)");
  }
  handleSwipe();
});
