async function FetchRandomUser() {
  try {
    if (
      womanFilter.classList.contains("active") ||
      manFilter.classList.contains("active")
    ) {
      // skal jobbe å filtere
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
