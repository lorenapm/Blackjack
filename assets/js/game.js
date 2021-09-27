(() => {
  "use strict";

  let deck = [];
  const types = ["C", "D", "H", "S"],
    specialCards = ["A", "J", "Q", "K"];

  let pointsPlayers = [];

  const btnHit = document.querySelector("#btHit"),
    btnStand = document.querySelector("#btnStand"),
    btnNew = document.querySelector("#btnNew");

  let divCardsPlayers = document.querySelectorAll(".divCards"),
    pointsAll = document.querySelectorAll("small");

  let divCardsPlayer = document.querySelector("#player-cards"),
    divCardsComputer = document.querySelector("#computer-cards");

  //Function to initialize game
  const initialGame = (numPlayers = 2) => {
    deck = createDeck();

    pointsPlayers = [];
    for (let i = 0; i < numPlayers; i++) {
      pointsPlayers.push(0);
    }

    pointsAll.forEach((elem) => (elem.innerText = 0));
    divCardsPlayers.forEach((elem) => (elem.innerHTML = ""));

    btnHit.disabled = true;
    btnStand.disable = true;
  };

  const createDeck = () => {
    deck = [];
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
    return _.shuffle(deck);
  };

  // Function to hit card
  const hitCard = () => {
    if (deck.length === 0) {
      alert("There is no more card in deck");
    }

    return deck.pop();
  };
  console.log(deck.length);

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

  const addPoints = (card, turn) => {
    pointsPlayers[turn] = pointsPlayers[turn] + valueCard(card);
    pointsAll[turn].innerText = "Score: " + pointsPlayers[turn];
    return pointsPlayers[turn];
  };

  const createCard = (card, turn) => {
    const imgCard = document.createElement("img");
    imgCard.src = `assets/cartas/${card}.png`;
    imgCard.classList.add("cards");
    divCardsPlayers[turn].append(imgCard);
  };

  const whoWon = () => {
    const [pointsMinimum, pointsComputer] = pointsPlayers;

    setTimeout(() => {
      if (pointsComputer > 21) {
        alert("You've won :)");
      } else if (pointsComputer === pointsMinimum) {
        alert("Nobody wins :( ¡Try again!");
      } else if (pointsMinimum > 21) {
        alert("Computer won. Try again!");
      } else {
        alert("Computer won. Try again!");
      }
    }, 100);
  };

  //Computer's turn: como es automático tengo que usar while o do while
  const turnComputer = (pointsMinimum) => {
    let pointsComputer = 0;

    do {
      const card = hitCard();
      pointsComputer = addPoints(card, pointsPlayers.length - 1);

      const imgCard = document.createElement("img");
      imgCard.src = `assets/cartas/${card}.png`;
      imgCard.classList.add("cards");
      divCardsComputer.append(imgCard);
      //createCard(card, pointsPlayers.length - 1);
    } while (pointsComputer < pointsMinimum && pointsMinimum <= 21);

    whoWon();
  };

  //Events
  btnHit.addEventListener("click", () => {
    const card = hitCard();
    const pointsPlayer = addPoints(card, 0);

    //createCard(card, 0);
    const imgCard = document.createElement("img");
    imgCard.src = `assets/cartas/${card}.png`;
    imgCard.classList.add("cards");
    divCardsPlayer.append(imgCard);

    if (pointsPlayer > 21) {
      console.warn("Sorry, you lost. Try again!");
      btnHit.disabled = true;
      btnStand.disabled = true;
      turnComputer(pointsPlayer);
    } else if (pointsPlayer === 21) {
      console.warn("Wow, 21 points!");
      btnHit.disabled = true;
      btnStand.disabled = true;
      turnComputer(pointsPlayer);
    }
  });

  btnStand.addEventListener("click", () => {
    btnHit.disabled = true;
    btnStand.disabled = true;

    turnComputer(pointsPlayers[0]);
  });

  btnNew.addEventListener("click", () => {
    initialGame();
    deck = [];
    deck = createDeck();

    pointsPlayers[0] = 0;
    pointsPlayers[1] = 0;

    pointsAll[0].innerText = "Score: " + 0;
    pointsAll[1].innerText = "Score: " + 0;

    divCardsPlayer.innerHTML = "";
    divCardsComputer.innerHTML = "";

    btnHit.disabled = false;
    btnStand.disabled = false;
  });

  // return {
  //   newGame: initialGame,
  // };
})();

// //Patrón módulo: función anónima autoinvocada (puede ser tradicional o arrow)
// (() => {
//   "use strict";

//   let deck = [];
//   const types = ["C", "D", "H", "S"],
//     specialCards = ["A", "J", "Q", "K"];

//   let pointsPlayers = [];

//   const btnHit = document.querySelector("#btHit"),
//     btnStand = document.querySelector("#btnStand"),
//     btnNew = document.querySelector("#btnNew");

//   const divCardsPlayers = document.querySelectorAll(".divCards");
//   const pointsAll = document.querySelectorAll("small");

//   //Function to initialize game
//   const initialGame = (numPlayers = 2) => {
//     deck = createDeck();

//     pointsPlayers = [];
//     for (let i = 0; i < numPlayers; i++) {
//       pointsPlayers.push(0);
//     }
//     pointsAll.forEach((elem) => (elem.innerText = 0));
//     divCardsPlayers.forEach((elem) => (elem.innerHTML = ""));

//     btnHit.disabled = false;
//     btnStand.disabled = false;
//   };

//   //frunction create a new deck
//   const createDeck = () => {
//     deck = [];
//     for (let i = 2; i <= 10; i++) {
//       for (let type of types) {
//         deck.push(i + type);
//       }
//     }
//     for (let type of types) {
//       for (let specialCard of specialCards) {
//         deck.push(specialCard + type);
//       }
//     }
//     return _.shuffle(deck);
//   };

//   // Function to hit card
//   // const hitCard = () => {
//   //   if (deck.length === 0) {
//   //     console.log("There is no more card in deck");
//   //   }
//   //   return deck.pop();
//   // };
//   const hitCard = () => {
//     const card =
//       deck.length !== 0 ? deck.pop() : alert("There is no more card in deck");
//     return card;
//   };

//   //hitCard();

//   //IMPORT todos los strings en JS pueden ser trabajados como un arreglo, por eso card[0] extrae la primera posición de la card (pero no me sirve para la card 10, por eso uso substring).
//   // substring: método que permite retornar los valores de las posiciones que puedo establecer. En este caso, obvio el último elemento (así extraigo del 2-10 todos)
//   // const valueCard = (card) => {
//   //   const value = card.substring(0, card.length - 1);
//   //   if (isNaN(value)) {
//   //     //isNaN (no es un número): true (no es); false (es un número)
//   //     //la única que vale 11 es el As, las otras J Q K valen 10.
//   //     points = value === "A" ? 11 : 10;
//   //     console.log(points);
//   //   } else {
//   //     points = parseInt(value);
//   //   }

//   //   console.log(points);
//   // };

//   const valueCard = (card) => {
//     const value = card.substring(0, card.length - 1);

//     return isNaN(value) ? (value === "A" ? 11 : 10) : parseInt(value);
//   };

//   //Turn: first player = 0 and last turn = computer
//   const addPoints = (card, turn) => {
//     pointsPlayers[turn] = pointsPlayers[turn] + valueCard(card);
//     pointsAll[turn].innerText = "Score: " + pointsPlayers[turn];
//     return pointsPlayers[turn];
//   };

//   const createCard = (card, turn) => {
//     const imgCard = document.createElement("img");
//     imgCard.src = `assets/cartas/${card}.png`;
//     imgCard.classList.add("cards");
//     divCardsPlayers[turn].append(imgCard);
//   };

//   //function to who won
//   const whoWon = () => {
//     const [pointsMinimum, pointsComputer] = pointsPlayers;

//     setTimeout(() => {
//       if (pointsComputer > 21) {
//         alert("You've won :)");
//       } else if (pointsComputer === pointsMinimum) {
//         alert("Nobody wins :( ¡Try again!");
//       } else if (pointsMinimum > 21) {
//         alert("Computer won. Try again!");
//       } else {
//         alert("Computer won. Try again!");
//       }
//     }, 100);
//   };

//   //Computer's turn: como es automático tengo que usar while o do while
//   const turnComputer = (pointsMinimum) => {
//     let pointsComputer = 0;

//     do {
//       const card = hitCard();
//       pointsComputer = addPoints(card, pointsPlayers.length - 1);
//       createCard(card, pointsPlayers.length - 1);
//     } while (pointsComputer < pointsMinimum && pointsMinimum <= 21);
//     whoWon();
//   };

//   //Events
//   btnHit.addEventListener("click", () => {
//     const card = hitCard();
//     const pointsPlayer = addPoints(card, 0);

//     createCard(card, 0);

//     if (pointsPlayer > 21) {
//       console.warn("Sorry, you lost :(");
//       btnHit.disabled = true;
//       btnStand.disabled = true;
//       turnComputer(pointsPlayer);
//     } else if (pointsPlayer === 21) {
//       console.warn("Wow, 21 points!");
//       btnHit.disabled = true;
//       btnStand.disabled = true;
//       turnComputer(pointsPlayer);
//     }
//   });

//   btnStand.addEventListener("click", () => {
//     btnHit.disabled = true;
//     btnStand.disabled = true;

//     turnComputer(pointsPlayers[0]);
//   });

//   return {
//     newGame: initialGame,
//   };

//   //   btnNew.addEventListener("click", () => {
//   //     console.clear();
//   //     initialGame();
//   // deck = [];
//   // deck = createDeck();

//   // pointsPlayer = 0;
//   // pointsComputer = 0;

//   // pointsAll[0].innerText = "Score: " + 0;
//   // pointsAll[1].innerText = "Score: " + 0;

//   // divCardsComputer.innerHTML = "";
//   // divCardsPlayer.innerHTML = "";
// })();
