'use strict';

/* 🎯 Selecting DOM elements for player names */
let playerOneName = document.getElementById('name--0');
let playerTwoName = document.getElementById('name--1');

/* 🎲 Selecting the dice image */
let diceImage = document.querySelector('.dice');

/* 🏆 Selecting elements for total scores */
let playerOneTotalScore = document.getElementById('score--0');
let playerTwoTotalScore = document.getElementById('score--1');

/* 🔢 Selecting elements for current scores */
let playerOneCurrentScore = document.getElementById('current--0');
let playerTwoCurrentScore = document.getElementById('current--1');

/* 🕹️ Selecting control buttons */
let newGame = document.querySelector('.btn--new');
let rollDice = document.querySelector('.btn--roll');
let hold = document.querySelector('.btn--hold');

/* 🚦 Keeping track of the active player */
let currentFlag = 'playerOne'; // 'playerOne' or 'playerTwo'

document.addEventListener('DOMContentLoaded', function () {
    let playerOneInput = prompt('Name of the First Player');
    let playerTwoInput = prompt('Name of the Second Player');

    playerOneName.textContent = playerOneInput ? playerOneInput : 'Player 1';
    playerTwoName.textContent = playerTwoInput ? playerTwoInput : 'Player 2';
});

/* 🆕 Reset game when "New Game" button is clicked */
newGame.addEventListener('click', function () {
    playerOneName.textContent = playerOneInput ? playerOneInput : 'Player 1';
    playerTwoName.textContent = playerTwoInput ? playerTwoInput : 'Player 2';
    diceImage.src = `assets/images/dice-1.png`; // Reset dice to 1
    playerOneTotalScore.textContent = 0;
    playerTwoTotalScore.textContent = 0;
    playerOneCurrentScore.textContent = 0;
    playerTwoCurrentScore.textContent = 0;
    currentScore = 0;
    currentFlag = 'playerOne';

    // Reset background to Player 1
    document.querySelector('.player--0').classList.add("player--active");
    document.querySelector('.player--1').classList.remove("player--active");
});

/* 🎲 Handle dice roll logic */
let currentScore = 0;
rollDice.addEventListener('click', function () {
    let randomNumber = Math.floor((Math.random() * 6) + 1); // Generate number between 1-6
    diceImage.src = `assets/images/dice-${randomNumber}.png`; // Update dice image

    if (randomNumber !== 1) {
        currentScore += randomNumber; // Add dice value to current score
        displayCurrentScore(currentScore, currentFlag);
    } else {
        // Rolling a 1 means losing the current score & switching turns
        currentScore = 0;
        displayCurrentScore(currentScore, currentFlag);

        // Switch players
        currentFlag = currentFlag === 'playerOne' ? 'playerTwo' : 'playerOne';
        changeBackground(currentFlag);
    }
});

/* 📥 Handle "Hold" button click */
hold.addEventListener('click', function () {
    if (Number(playerOneTotalScore.textContent) >= 100 || Number(playerTwoTotalScore.textContent) >= 100) {
        console.log("Game Over! Click New Game to restart.");
        return; // Prevent further actions if game is already won
    }

    if (currentFlag === 'playerOne') {
        playerOneTotalScore.textContent = Number(playerOneTotalScore.textContent) + currentScore;
        playerOneCurrentScore.textContent = 0;

        // Check if Player 1 won
        if (Number(playerOneTotalScore.textContent) >= 100) {
            document.querySelector('.player--0').classList.add("player--winner");
            console.log("🏆 Player 1 Wins!");
            playerOneName.textContent = "🏆 Player 1 Wins!";
        } else {
            currentFlag = 'playerTwo';
        }
    } else {
        playerTwoTotalScore.textContent = Number(playerTwoTotalScore.textContent) + currentScore;
        playerTwoCurrentScore.textContent = 0;

        // Check if Player 2 won
        if (Number(playerTwoTotalScore.textContent) >= 100) {
            document.querySelector('.player--1').classList.add("player--winner");
            console.log("🏆 Player 2 Wins!");
            playerTwoName.textContent = "🏆 Player 2 Wins!";
        } else {
            currentFlag = 'playerOne';
        }
    }

    currentScore = 0; // Reset current score
    changeBackground(currentFlag);
});

/* 🖥️ Update UI with current score */
function displayCurrentScore(currentScore, currentFlag) {
    if (currentFlag === 'playerOne') {
        playerOneCurrentScore.textContent = currentScore;
    } else {
        playerTwoCurrentScore.textContent = currentScore;
    }
}

/* 🎨 Switch active player background */
function changeBackground(currentFlag) {
    document.querySelector('.player--0').classList.toggle("player--active", currentFlag === 'playerOne');
    document.querySelector('.player--1').classList.toggle("player--active", currentFlag === 'playerTwo');
}


