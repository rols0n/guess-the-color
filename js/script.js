"use strict";

// Buttons selectors
const colorHeading = document.querySelector(".primary-heading");
const colorContainer = document.querySelector(".grid-colors");
const resetBtn = document.querySelector(".game-reset");

// RANDOM INT GENERATOR
const data = Math.round(Math.random() * 255);

let winner;

// Helper functions
const randomInt = function () {
  const int1 = Math.round(Math.random() * 255);
  const int2 = Math.round(Math.random() * 255);
  const int3 = Math.round(Math.random() * 255);
  return [int1, int2, int3].splice(",");
};

// shuffles array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// checking if two arrays are the same
const validArray = function (arr1, arr2) {
  if (arr1[0] === arr2[0] && arr1[1] === arr2[1] && arr1[2] === arr2[2]) {
    return true;
  }
  return false;
};

// displays after game screen
const gameOver = function (textContentText, h2, curScore, state) {
  colorHeading.textContent = textContentText;
  colorContainer.innerHTML = "";
  colorContainer.insertAdjacentHTML(
    "beforeend",
    `<div class="resutls-table">
        <div class="secondary-heading">
          <h2 class="${state}">${h2}</h2>
        </div>

        <p class="game-reset game-end-reset ">reset</p>

        <div class="stats">
          <p>Score: ${curScore}</p>
          <!-- <p>Time: In development</p> -->
        </div>
      </div>`
  );

  document.querySelector(".game-end-reset").addEventListener("click", () => {
    colorContainer.innerHTML = "";
    gameEasy();
  });
};

// GAME ON EASY MODE
const gameEasy = function () {
  let score = 6;
  const options = [];
  winner = randomInt();
  colorHeading.textContent = `RGB(${winner})`;
  options.push(winner);

  for (let i = 0; i <= 4; i++) {
    let data = randomInt();
    options.push(data);
  }
  shuffleArray(options);

  // generates color-boxes
  options.forEach((option, index) => {
    colorContainer.insertAdjacentHTML(
      "afterbegin",
      `<div class="${
        validArray(option, winner) ? "color-box-winner" : "color-box"
      }" style="background-color: rgb(${option.splice(",")})"></div>`
    );
  });

  // Button selectors
  const winnerButton = document.querySelector(".color-box-winner");
  const colorBoxes = document.querySelectorAll(".color-box");

  // Listeners
  colorBoxes.forEach((button) =>
    button.addEventListener("click", () => {
      score -= 1;
      if (score === 0) {
        gameOver(
          "GAME OVER!",
          "Unlucky, you've lost. Try it  again!",
          score,
          "lose"
        );
      }
      console.log(`current score is ${score}`);
    })
  );

  winnerButton.addEventListener("click", () => {
    if (score > 0) {
      gameOver(
        `GAME OVER`,
        "Nice one! Congratulations, try it again!",
        score,
        "win"
      );
    }
    console.log(`current score is ${score}`);
  });
};

gameEasy();

// Reseting the game
resetBtn.addEventListener("click", () => {
  colorContainer.innerHTML = "";
  gameEasy();
});
