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

      console.log(info);

      console.log(info.picture.medium);

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
    console.log("neste bruker, ikke intressert");
    handleSwipe();
    FetchRandomUser();
    document.querySelector(".card").remove();
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    console.log("neste bruker, intressert");
    handleSwipe();
    FetchRandomUser();
    document.querySelector(".card").remove();
  }
});
