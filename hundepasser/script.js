document.addEventListener("DOMContentLoaded", function () {
  const profilesContainer = document.querySelector(".profiles");
  const loadNewCardsButton = document.createElement("button");
  loadNewCardsButton.textContent = "10 new profiles";
  loadNewCardsButton.classList.add("load-new-btn");
  document.body.appendChild(loadNewCardsButton);

  //ulike hunderaser
  const filterSelect = document.createElement("select");
  filterSelect.classList.add("filter-select");
  selectedBreed = undefined;
  const dogBreeds = [
    "Choose breed",
    "Labrador",
    "German Shepherd",
    "Retriever",
    "Poodle",
    "Bulldog",
  ];

  // hunderaser som valg i filteret
  dogBreeds.forEach((breed) => {
    const option = document.createElement("option");
    option.value = breed.toLowerCase();
    option.textContent = breed;
    filterSelect.appendChild(option);
  });

  document.body.appendChild(filterSelect);

  async function fetchRandomUser() {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    return data.results[0];
  }

  async function fetchRandomDogImage(breed) {
    let url = "https://dog.ceo/api/breeds/image/random";
    //hvis breed blir sendt inn
    if (breed != undefined)
      url = `https://dog.ceo/api/breed/${breed}/images/random`;

    const response = await fetch(url);
    const data = await response.json();
    return data.message;
  }

  function createProfileCard(breed = undefined) {
    const profileCard = document.createElement("div");
    profileCard.classList.add("profile-card");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", function () {
      profileCard.remove();
    });

    profileCard.appendChild(deleteButton);
    //Chattte-knapp: DEL 5

    const chatButton = document.createElement("button");
    chatButton.textContent = "Chat";
    chatButton.classList.add("chat-btn");
    chatButton.addEventListener("click", function () {
      openChatBox();
    });
    profileCard.appendChild(chatButton);

    fetchRandomUser().then((user) => {
      const userImg = document.createElement("img");
      userImg.classList.add("profile-img");
      userImg.src = user.picture.large;
      userImg.alt = "User Image";
      profileCard.appendChild(userImg);
      fetchRandomDogImage(breed).then((dogImage) => {
        const dogImg = document.createElement("img");
        dogImg.classList.add("profile-img");
        dogImg.src = dogImage;
        dogImg.alt = "Dog Image";
        profileCard.appendChild(dogImg);

        const name = document.createElement("div");
        name.classList.add("profile-name");
        name.textContent = `${user.name.first} ${user.name.last}`;
        profileCard.appendChild(name);

        const location = document.createElement("div");
        location.classList.add("profile-location");
        location.textContent = `${user.location.city}, ${user.location.country}`;
        profileCard.appendChild(location);

        profilesContainer.appendChild(profileCard);
      });
    });
  }

  // Create initial 10 profile cards
  for (let i = 0; i < 10; i++) {
    createProfileCard();
  }
  // Event delegation for send button
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("send-btn")) {
      sendMessage();
      closeChatBox(); // Hide chat box after sending message
    }
  });

  // Chat box
  function openChatBox() {
    const existingMessageBoxes = document.querySelectorAll(".message-box");
    existingMessageBoxes.forEach((messageBox) => messageBox.remove());

    const chatBox = document.querySelector(".chat-box");
    chatBox.style.display = "block";

    // Close chat box
    const closeButton = document.createElement("button");
    closeButton.textContent = "X";
    closeButton.classList.add("close-btn");
    closeButton.addEventListener("click", closeChatBox);
    chatBox.appendChild(closeButton);

    // Send button
    const sendButton = document.createElement("button");
    sendButton.textContent = "Send";
    sendButton.classList.add("send-btn");
    chatBox.appendChild(sendButton);

    // Text area for typing message
    const messageInput = document.createElement("textarea");
    messageInput.classList.add("chat-input");
    messageInput.placeholder = "Type your message here...";
    chatBox.appendChild(messageInput);

    // Event listener for send button
    sendButton.addEventListener("click", sendMessage);
  }

  function closeChatBox() {
    const chatBox = document.querySelector(".chat-box");
    chatBox.style.display = "none";
  }

  // Function to send message
  function sendMessage() {
    const messageInput = document.querySelector(".chat-input");
    const message = messageInput.value.trim();

    if (message !== "") {
      const messageBox = document.createElement("div");
      messageBox.classList.add("message-box");

      // Create title
      const title = document.createElement("h2");
      title.innerHTML =
        "Your message has been sent. If you want to delete, please press <span class='delete-message-text'> DELETE</span>";
      messageBox.appendChild(title);

      // Event listener for clicking the word "delete"
      const deleteText = messageBox.querySelector(".delete-message-text");
      deleteText.addEventListener("click", function () {
        messageBox.remove(); // Remove the message box when delete text is clicked
      });

      // Create message content
      const messageContent = document.createElement("div");
      messageContent.textContent = message;
      messageBox.appendChild(messageContent);

      document.body.appendChild(messageBox);

      // Clear the message input field
      messageInput.value = "";
    }
  }

  async function loadProfileCards(filterBreed) {
    profilesContainer.innerHTML = ""; // Tøm eksisterende kort

    // Last inn 10 nye kort basert på filteret
    for (let i = 0; i < 10; i++) {
      const user = await fetchRandomUser();
      const dogImage = await fetchRandomDogImage();

      // Opprett kortet hvis det ikke er et filter eller hunderase matcher
      if (!filterBreed || dogImage.includes(filterBreed)) {
        createProfileCard(user, dogImage);
      }
    }
  }

  // Legg til hendelseslytter for å laste inn 10 nye kort
  loadNewCardsButton.addEventListener("click", function () {
    for (let i = 0; i < 10; i++) {
      createProfileCard();
    }
  });

  // Legg til hendelseslytter for filtrering
  filterSelect.addEventListener("change", function () {
    if (filterSelect.value != "Choose breed") {
      selectedBreed = filterSelect.value.toLowerCase().replace(" ", "");
    }
    profilesContainer.innerHTML = ""; // Tøm eksisterende kort
    for (let i = 0; i < 10; i++) {
      createProfileCard(selectedBreed);
    }
  });
});
