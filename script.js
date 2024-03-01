// Hent DOM-elementer
const noBtn = document.querySelector(".no");
const heartBtn = document.querySelector(".heart");
const contentContainer = document.querySelector(".content");
const womanFilter = document.querySelector("#woman-btn");
const manFilter = document.querySelector("#man-btn");

// Initialiser variabler
let swipeCount = 10;

// Oppdaterer antall sveip tilgjengelig
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
    alert("Du har brukt opp alle sveipene dine!");
  }
}

// Legg til/ta bort filter for kvinnelige brukere ved klikk
womanFilter.addEventListener("click", (e) => {
  console.log(e.target);
  e.target.classList.toggle("active");
});

// Legg til/ta bort filter for mannlige brukere ved klikk
manFilter.addEventListener("click", (e) => {
  console.log(e.target);
  e.target.classList.toggle("active");
});

// Legg til hendelseslyttere for knappene
noBtn.addEventListener("click", handleButtonClick);
heartBtn.addEventListener("click", handleButtonClick);

// Oppdaterer antall sveip tilgjengelig ved oppstart
updateSwipeCount();

// Hent en tilfeldig bruker fra API basert på valgt filter
async function fetchRandomUser() {
  try {
    if (
      womanFilter.classList.contains("active") ||
      manFilter.classList.contains("active")
    ) {
      const gender = womanFilter.classList.contains("active")
        ? "female"
        : "male";

      let res = await fetch(`https://randomuser.me/api/?gender=${gender}`);
      const data = await res.json();

      if (!data) throw new Error("Fant ikke tilfeldig bruker!");

      const [info] = data.results;
      appendCard(info);
    }
  } catch (err) {
    alert(err);
  }
}

// Legg til kortet for den hentede brukeren i HTML
function appendCard(info) {
  const markup = `
    <div class="card">
      <div class="user"> 
        <img class="user" src="${info.picture.large}" alt="" />  
        <div class="profile">
          <div class="name">${info.name.first} <span> ${info.dob.age} </span></div>
          <div class="local">
            <i class="fas fa-map-marker-alt"></i>
            <span>${info.location.city}, ${info.location.country}</span>
          </div>  
        </div>  
      </div>  
    </div>`;
  contentContainer.insertAdjacentHTML("afterbegin", markup);
}

// Håndterer knappetrykk (noBtn og heartBtn)
function handleButtonClick() {
  console.log("Knapp har blitt trykket");
  handleSwipe();
  fetchRandomUser();
  document.querySelector(".card").remove();
}

// Legg til museklikk-hendelseslyttere for noBtn og heartBtn
noBtn.addEventListener("click", handleButtonClick);
heartBtn.addEventListener("click", handleButtonClick);

// Legg til tastaturklikk-hendelseslytter for venstre- og høyrepil
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    console.log("Neste bruker");
    handleSwipe();
    fetchRandomUser();
    document.querySelector(".card").remove();
  }
});
