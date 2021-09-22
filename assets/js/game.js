/* 
2C = two of clubs
2D = two of diamants
2H = two of hearts
2S = two of spades
*/

let deck = [];
const types = ["C", "D", "H", "S"];
const specialCards = ["A", "J", "Q", "K"];

let pointsPlayer = 0;
let pointsComputer = 0;

const btnHit = document.querySelector("#btHit");
const btnStand = document.querySelector("#btnStand");
const pointsAll = document.querySelectorAll("small");
const divCardsPlayer = document.querySelector("#player-cards");
const divCardsComputer = document.querySelector("#computer-cards");

const createDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let type of types) {
      deck.push(i + type);
    }
  }
  for (let type of types) {
    for (let specialCard of specialCards) {
      deck.push(specialCard + type);
    }
  }

  //console.log(deck);

  deck = _.shuffle(deck);
  //console.log(deck);
  return deck;
};

createDeck();

// Function to hit card
const hitCard = () => {
  const card =
    deck.length !== 0 ? deck.pop() : alert("There is no more card in deck");
  //const card = deck.pop();
  return card;
};

//hitCard();

//IMPORT todos los strings en JS pueden ser trabajados como un arreglo, por eso card[0] extrae la primera posición de la card (pero no me sirve para la card 10, por eso uso substring).
// substring: método que permite retornar los valores de las posiciones que puedo establecer. En este caso, obvio el último elemento (así extraigo del 2-10 todos)
// const valueCard = (card) => {
//   const value = card.substring(0, card.length - 1);
//   if (isNaN(value)) {
//     //isNaN (no es un número): true (no es); false (es un número)
//     //la única que vale 11 es el As, las otras J Q K valen 10.
//     points = value === "A" ? 11 : 10;
//     console.log(points);
//   } else {
//     points = parseInt(value);
//   }

//   console.log(points);
// };

const valueCard = (card) => {
  const value = card.substring(0, card.length - 1);
  return isNaN(value) ? (value === "A" ? 11 : 10) : parseInt(value);
};

//Computer's turn: como es automático tengo que usar while o do while
const turnComputer = (pointsMinimum) => {
  do {
    const card = hitCard();

    pointsComputer = pointsComputer + valueCard(card);
    pointsAll[1].innerHTML = "Score: " + pointsComputer;

    const imgCard = document.createElement("img");
    imgCard.src = `assets/cartas/${card}.png`;
    imgCard.classList.add("cards");
    divCardsComputer.append(imgCard);

    if (pointsMinimum > 21) {
      break;
    }
  } while (pointsComputer < pointsMinimum && pointsMinimum <= 21);
};

//Events
btnHit.addEventListener("click", () => {
  const card = hitCard();

  pointsPlayer = pointsPlayer + valueCard(card);
  pointsAll[0].innerHTML = "Score: " + pointsPlayer;

  const imgCard = document.createElement("img");
  imgCard.src = `assets/cartas/${card}.png`;
  imgCard.classList.add("cards");
  divCardsPlayer.append(imgCard);

  if (pointsPlayer > 21) {
    console.log("Sorry, you're lost");
    btnHit.disabled = true;
    btnStand.disabled = true;
    turnComputer(pointsPlayer);
  } else if (pointsPlayer === 21) {
    console.log("Wow, 21 points!");
    btnHit.disabled = true;
    btnStand.disabled = true;
    turnComputer(pointsPlayer);
  }
});

btnStand.addEventListener("click", () => {
  btnHit.disabled = true;
  btnStand.disabled = true;

  turnComputer(pointsPlayer);
});
