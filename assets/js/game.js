/* 
2C = two of clubs
2D = two of diamants
2H = two of hearts
2S = two of spades
*/

let deck = [];
const types = ["C", "D", "H", "S"];
const specialCards = ["A", "J", "Q", "K"];

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
  console.log(deck);
  return deck;
};

createDeck();

// Function to hit card
const hitCard = () => {
  const card =
    deck.length !== 0 ? deck.pop() : alert("There is no more card in deck");
  //const card = deck.pop();

  console.log(deck);
  console.log(card);
  return card;
};

hitCard();
