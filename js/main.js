/*----- constants -----*/
const MAX_WRONG = 6
const WORDS = [
  "TEST WORD 1",
  "TEST WORD 2"
];
const IMGS = [
  "imgs/spacement-0.jpg",
  "imgs/spacement-1.jpg",
  "imgs/spacement-2.jpg",
  "imgs/spacement-3.jpg",
  "imgs/spacement-4.jpg",
  "imgs/spacement-5.jpg",

]


  /*----- state variables -----*/
  ;
let answer = "";
let wrongGuesses = [];
let wordStatus = null;
let gameStatus;

/*----- cached elements  -----*/
const guessedEL = document.getElementById('guessed-word');
const messageEl = document.getElementById('message');
const wrongGuessesEl = document.getElementById('spotLight');
const playAgainEl = document.getElementById('playButton');
const spaceBG = document.querySelector('img');
const letterButton = [...document.querySelectorAll('main > button')];


/*----- event listeners -----*/
document.querySelector("section").addEventListener("click", handleClick);
playAgainEl.addEventListener("click", init);

/*----- functions -----*/
init();

function init() {
  secretWord = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase('').split("");
  wrongGuesses = [];
  wordStatus = secretWord.map(ltr => ltr === " " ? " " : "_");
  gameStatus = null;
  render();
};

function handleClick(evt) {
  const ltr = evt.target.textContent
  if (evt.target.tagName !== 'BUTTON' || wrongGuesses.includes(ltr)
    || gameStatus) return;
  if (secretWord.includes(ltr)) {
    secretWord.forEach(function (char, idx) {
      if (char === ltr) wordStatus[idx] = ltr
    })
  } else {
    wrongGuesses.push(ltr)
  }
  gameStatus = getGameStatus();
  render();
}

function getGameStatus() {
  if (!wordStatus.includes("_")) return "W";
  if (wrongGuesses.length >= MAX_WRONG) return "L";
  return null;
}

function render() {
  wrongGuessesEl.textContent = wordStatus.join(' ');
  spaceBG.src = `spacement-${wrongGuesses.length}.jpg`;
  renderMessage()
}

function renderMessage() {
  if (gameStatus === "W") {
    messageEl.textContent = "You win"
  } else if (gameStatus === "L") {
    messageEl.textContent = `Sorry, the answer was ${secretWord.join(" ")}`
  } else {
    messageEl.textContent = `${MAX_WRONG - wrongGuesses.length} remain`
  }
}

render()