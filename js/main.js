/*----- constants -----*/
const MAX_WRONG = 6
const WORDS = [
  "TEST WORD 1",
  "TEST WORD 2"
];
const IMGS = [
  "imgs/spacement-0.png",
  "imgs/spacement-1.png",
  "imgs/spacement-2.png",
  "imgs/spacement-3.png",
  "imgs/spacement-4.png",
  "imgs/spacement-5.png",
  "imgs/spacement-6.png",
  
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
const spaceDude = document.querySelector('img');
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
  spaceDude.src = `spacement-${wrongGuesses.length}.png`;
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