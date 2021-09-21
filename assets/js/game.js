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

  console.log(deck);

  deck = _.shuffle(deck);
  console.log(deck);
  return deck;
};

createDeck();
