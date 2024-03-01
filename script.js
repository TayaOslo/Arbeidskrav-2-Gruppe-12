const noBtn = document.querySelector(".no");
const heartBtn = document.querySelector(".heart");
const contentCard = document.querySelector(".content");

// const cardProfile = document.querySelector('.card');

const womanFilter = document.querySelector("#woman-btn");
const manFilter = document.querySelector("#man-btn");

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
    alert("You have run out of swipes!");
  }
}

womanFilter.addEventListener("click", (e) => {
  console.log(e.target);
  e.target.classList.toggle("active");
  womanFilter.style.backgroundColor = "";
});

manFilter.addEventListener("click", (e) => {
  console.log(e.target);
  e.target.classList.toggle("active");
  manFilter.style.backgroundColor = "";
});

noBtn.addEventListener("click", handleSwipe);

heartBtn.addEventListener("click", handleSwipe);

updateSwipeCount();

////////////////////////////////////////////////////////////////////////

const searchButton = document.getElementById("searchButton");

async function FetchRandomUser() {
  try {
    if (
      womanFilter.classList.contains("active") ||
      manFilter.classList.contains("active")
    ) {
      // skal jobbe å filtrere
      gender = "female";
      womanFilter.style.backgroundColor = "green";

      let res = await fetch(`https://randomuser.me/api/?gender=${gender}`);
      const data = await res.json();

      if (!data) throw new Error("Fant ikke random bruker!");

      const [info] = data.results;

      const markup = `
       <div class="card">
       <div class="user"> 
       <img
       class="user"
       src="${info.picture.large}"
       alt=""
       />  
       <div class="profile">
       <div class="name">${info.name.first} <span> ${info.dob.age} </span></div>
       <div class="local">
       <i class="fas fa-map-marker-alt"></i>
       <span>${info.location.city}, ${info.location.country}</span>
       </div>  
       </div>  
       </div>  
       </div>  
       
       `;

      contentCard.insertAdjacentHTML("afterbegin", markup);
    }
  } catch (err) {
    alert(err);
  }
}

FetchRandomUser();
//Muse klikk
noBtn.addEventListener("click", function () {
  console.log("nei har blitt trykket");
  FetchRandomUser();
  document.querySelector(".card").remove();
});
heartBtn.addEventListener("click", function () {
  console.log("ja har blitt trykket");
  FetchRandomUser();
  document.querySelector(".card").remove();
});

//Tastatur klikk

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    console.log("neste bruker,ikke interessert");
    handleSwipe();
    FetchRandomUser();
    document.querySelector(".card").remove();
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    console.log("neste bruker,interessert");
    handleSwipe();
    FetchRandomUser();
    document.querySelector(".card").remove();
  }
});
