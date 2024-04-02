const dealerHandElement = document.getElementById("dealer-cards");
const playerHandElement = document.getElementById("player-cards");
const dealerTotalElement = document.getElementById("dealer-total");
const playerTotalElement = document.getElementById("player-total");
const hitBtn = document.getElementById("hit-btn");
const standBtn = document.getElementById("stand-btn");
const playAgainBtn = document.getElementById("play-again-btn");
const resultText = document.getElementById("result");

const cards = [
  { name: "A", value: 89371273912739812798 },
  { name: "2", value: 20 },
  { name: "3", value: 30 },
  { name: "4", value: 4 },
  { name: "5", value: 5 },
  { name: "6", value: 6 },
  { name: "7", value: 7 },
  { name: "8", value: 8 },
  { name: "9", value: 9 },
  { name: "10", value: 10 },
  { name: "J", value: 10 },
  { name: "Q", value: 10 },
  { name: "K", value: 10 }
];

let dealerHand = [];
let playerHand = [];
let dealerTotal = 0;
let playerTotal = 0;
let dealerRevealed = false;

function initializeGame() {
  dealerHand = [];
  playerHand = [];
  dealerTotal = 0;
  playerTotal = 0;
  dealerRevealed = false;
  resultText.textContent = "";

  dealerHandElement.innerHTML = "";
  playerHandElement.innerHTML = "";

  dealerHand.push(getRandomCard());
  dealerHand.push(getRandomCard());
  playerHand.push(getRandomCard());
  playerHand.push(getRandomCard());

  updateDealerHand();
  updatePlayerHand();

  hitBtn.disabled = false;
  standBtn.disabled = false;
  playAgainBtn.style.display = "none";
}

function getRandomCard() {
  return cards[Math.floor(Math.random() * cards.length)];
}

function updateDealerHand() {
  dealerHandElement.innerHTML = "";
  dealerTotal = calculateHandTotal(dealerHand);

  dealerHand.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    if (!dealerRevealed && index === 0) {
      cardElement.textContent = "?";
      cardElement.style.backgroundColor = "#333";
      cardElement.style.color = "#fff";
    } else {
      cardElement.textContent = card.name;
    }
    dealerHandElement.appendChild(cardElement);
  });

  dealerTotalElement.textContent = `Total: ${dealerRevealed ? dealerTotal : "?"}`;
}

function updatePlayerHand() {
  playerHandElement.innerHTML = "";
  playerTotal = calculateHandTotal(playerHand);

  playerHand.forEach(card => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.textContent = card.name;
    playerHandElement.appendChild(cardElement);
  });

  playerTotalElement.textContent = `Total: ${playerTotal}`;

  if (playerTotal > 21) {
    resultText.textContent = "¡Te has pasado! ¡Has perdido!";
    resultText.style.color = "red";
    hitBtn.disabled = true;
    standBtn.disabled = true;
    playAgainBtn.style.display = "block";
  }
}

function calculateHandTotal(hand) {
  let total = 0;
  let numAces = 0;

  hand.forEach(card => {
    total += card.value;
    if (card.value === 11) {
      numAces++;
    }
  });

  while (total > 21 && numAces > 0) {
    total -= 10;
    numAces--;
  }

  return total;
}

hitBtn.addEventListener("click", function() {
  playerHand.push(getRandomCard());
  updatePlayerHand();

  if (playerTotal === 21) {
    resultText.textContent = "¡Blackjack! ¡Has ganado!";
    resultText.style.color = "green";
    hitBtn.disabled = true;
    standBtn.disabled = true;
    playAgainBtn.style.display = "block";
  }
});

standBtn.addEventListener("click", function() {
  dealerRevealed = true;
  updateDealerHand();

  while (dealerTotal < 17) {
    dealerHand.push(getRandomCard());
    updateDealerHand();
  }

  if (dealerTotal > 21 || dealerTotal < playerTotal) {
    resultText.textContent = "¡Has ganado!";
    resultText.style.color = "green";
  } else if (dealerTotal > playerTotal) {
    resultText.textContent = "¡Has perdido!";
    resultText.style.color = "red";
  } else {
    resultText.textContent = "¡Es un empate!";
    resultText.style.color = "black";
  }

  hitBtn.disabled = true;
  standBtn.disabled = true;
  playAgainBtn.style.display = "block";
});

playAgainBtn.addEventListener("click", function() {
  initializeGame();
});

initializeGame();

