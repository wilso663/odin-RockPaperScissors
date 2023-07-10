const computerChoiceElement = document.querySelector('.computer-choice');
const redButton = document.querySelector('.red-border');
const greenButton = document.querySelector('.green-border');
const yellowButton = document.querySelector('.yellow-border');
const roundOutcome = document.querySelector('.round-outcome');
const playerScore = document.querySelector('.player-score');
const computerScore = document.querySelector('.computer-score');
const gameOutcome = document.querySelector('.game-outcome');
const resetElement = document.querySelector('.reset-game');
const resetBtn = document.querySelector('.reset-btn');
const choices = ['Rock', 'Paper', 'Scissors'];
const outcomeMessages = [
  "Tie Game!",
  "You Win!",
  "You lose!"
];

const NUM_ROUNDS = 5;
let computerWins = 0;
let playerWins = 0;

const getComputerChoice = () => {
  return choices[Math.floor(Math.random() * 3)];
}

// To prevent player from spamming buttons past 5 rounds
const playGame = (choice) => {
  if(computerWins === NUM_ROUNDS || playerWins === NUM_ROUNDS){
    return;
  }
  playRound(choice);
}

// Deal with setting each text element concerned with a game round,
// when the player clicks rock, paper, or scissors
const setRoundText = (outcome, choice, computerChoice) => {
  computerChoiceElement.textContent = `Computer chose ${computerChoice}`;
  if(outcome === 'tie'){    
    roundOutcome.textContent = outcomeMessages[0] + " You both chose " + choice + ".";
  } else if (outcome === 'win') {
    roundOutcome.textContent = `${outcomeMessages[1]} ${choice} beats ${computerChoice}`;
  } else if (outcome === 'lose'){
    roundOutcome.textContent = `${outcomeMessages[2]} ${computerChoice} beats ${choice}`;
  }
}
// Helper function to simplify tie game in playRound
const tieGame = (choice) => {
  setRoundText('tie', choice, choice);
}

const resetGame = () => {
  playerWins = 0;
  computerWins = 0;
  playerScore.textContent = `${playerWins}`;
  computerScore.textContent = `${computerWins}`;
  computerChoiceElement.textContent = "";
  roundOutcome.textContent = "";
  resetElement.setAttribute("hidden", true);
}


// Get the computer choice
// and check for the winner by string comparison of both choices.
// Notify the user of the computer choice and winner
// If there's a winner on the last round, unhide the reset button
const playRound = (choice) => {
  const computerChoice = getComputerChoice();
  if(choice === computerChoice){
    tieGame(choice);
    return;
  } 
  const winner = getWinner(choice, computerChoice);
  incrementWinner(winner);
  const outcome = winner === "player" ? "win" : "lose";
  setRoundText(outcome, choice, computerChoice);
  if(playerWins === NUM_ROUNDS || computerWins === NUM_ROUNDS){
    resetElement.removeAttribute('hidden');
    if(playerWins === NUM_ROUNDS){
      gameOutcome.textContent = "win!";
      return;
    }
    gameOutcome.textContent = "lose!";
    
  }
}

//Get winner by string comparison of choices
const getWinner = (choice, computerChoice) => {
  if(choice === 'Rock'){
    if(computerChoice === "Scissors"){
      return "player";
    }
    return "computer";
  }
  else if(choice === 'Paper'){
    if(computerChoice === "Rock"){
      return "player";
    }
    return "computer";
  }
  else if(choice ==='Scissors'){
    if(computerChoice === "Paper"){
      return "player";
    }
    return "computer";
  }
}

const incrementWinner = (winner) => {
  winner === 'player' ? playerWins++ : computerWins++;
  playerScore.textContent = playerWins;
  computerScore.textContent = computerWins;
}

//Click listeners for pulse animations
redButton.addEventListener('click', function() {
  redButton.classList.add('red-pulse');
  setTimeout(() => {
    redButton.classList.remove('red-pulse');
  },1000);  
})
yellowButton.addEventListener('click', function() {
  yellowButton.classList.add('yellow-pulse');
  setTimeout(() => {
    yellowButton.classList.remove('yellow-pulse');
  },1000);  
})
greenButton.addEventListener('click', function() {
  greenButton.classList.add('green-pulse');
  setTimeout(() => {
    greenButton.classList.remove('green-pulse');
  },1000);  
})