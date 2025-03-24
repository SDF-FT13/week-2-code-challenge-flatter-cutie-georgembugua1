document.addEventListener("DOMContentLoaded", () => {
  const baseUrl = "//localhost:3000/characters";
  const characterBar = document.getElementById("character-bar");
  const detailedInfo = document.getElementById("detailed-info");
  const votesForm = document.getElementById("votes-form");
  const votesInput = document.getElementById("votes");
  const resetButton = document.getElementById("reset-btn");

  let currentCharacter = null;

  // Fetch and display all characters in the character bar
  
    .then((response) => response.json())
    .then((characters) => {
      characters.forEach((character) => {
        const span = document.createElement("span");
        span.textContent = character.name;
        span.addEventListener("click", () => displayCharacterDetails(character));
        characterBar.appendChild(span);
      });
    });

  // Display character details in the detailed info section
  function displayCharacterDetails(character) {
    currentCharacter = character;
    detailedInfo.innerHTML = `
      <h2>${character.name}</h2>
      <img src="${character.image}" alt="${character.name}" style="width: 200px; height: auto;">
      <p>Votes: <span id="vote-count">${character.votes}</span></p>
      <form id="votes-form">
        <input type="number" id="votes" placeholder="Enter votes" />
        <button type="submit">Add Votes</button>
      </form>
      <button id="reset-btn">Reset Votes</button>
    `;

    // Add event listener for the votes form
    const dynamicVotesForm = detailedInfo.querySelector("#votes-form");
    const dynamicVotesInput = detailedInfo.querySelector("#votes");
    dynamicVotesForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (currentCharacter) {
        const additionalVotes = parseInt(dynamicVotesInput.value) || 0;
        currentCharacter.votes += additionalVotes;
        document.getElementById("vote-count").textContent = currentCharacter.votes;
        dynamicVotesInput.value = ""; // Clear the input field
      }
    });

    // Add event listener for the reset button
    const dynamicResetButton = detailedInfo.querySelector("#reset-btn");
    dynamicResetButton.addEventListener("click", () => {
      if (currentCharacter) {
        currentCharacter.votes = 0;
        document.getElementById("vote-count").textContent = currentCharacter.votes;
      }
    });
  }
});

