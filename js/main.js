/*----- constants -----*/
const MAX_WRONG = 6
const WORDS = [
  "TEST WORD one",
  "TEST WORD two"
];
const IMGS = [
  "imgs/spaceman-0.png",
  "imgs/spaceman-1.png",
  "imgs/spaceman-2.png",
  "imgs/spaceman-3.png",
  "imgs/spaceman-4.png",
  "imgs/spaceman-5.png",

]


  /*----- state variables -----*/
let secretWord;
let wrongGuesses;
let wordStatus;
let gameStatus;

/*----- cached elements  -----*/
const guessedEL = document.getElementById('guessed-word');
const messageEl = document.getElementById('message');
const wrongGuessesEl = document.getElementById('spotLight');
const playAgainEl = document.getElementById('playButton');
const spaceBG = document.querySelector('img');
const letterBtns = [...document.querySelectorAll('.button-container > button')];


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
  spaceBG.src = `imgs/spaceman-${wrongGuesses.length}.png`;
  playAgainEl.style.visibility = getGameStatus() ? "visible" : "hidden";
  renderMessage();
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

function renderButtons() {
    used wrong
    used correct
    not used
}