document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.querySelector(".wrong-btn");
  const gameRules = document.querySelector(".game-rules");
  const rules = document.querySelector(".rules");
  const newGameBtn = document.querySelector(".play-again-reset");
  const resetgame = document.querySelector(".reset-again");
  const mainContainer = document.querySelector(".main");
  const successFeel = document.querySelector(".success-feel");
  const successMessage = document.querySelector(".success-message");
  let computerScoreBoard = document.querySelector(".c-score");
  let playerScoreBoard = document.querySelector(".p-score");
  const stars = document.querySelector(".stars");
  const star = document.querySelectorAll(".star");

  closeBtn.addEventListener("click", () => {
    gameRules.classList.toggle("gamerules-close");
  });
  rules.addEventListener("click", () => {
    gameRules.classList.toggle("gamerules-close");
  });

  const smallChoice = document.getElementById("small-choice");
  const bigChoice = document.getElementById("big-choice");

  const gameContainer = document.querySelector(".game-container2");
  const startContainer = document.querySelector(".container");
  const gameSuccess = document.getElementById("game-success");

  const playAgainBtn = document.querySelector(".play-again");

  computerScoreBoard.textContent = localStorage.getItem("pcScore") || 0;
  playerScoreBoard.textContent = localStorage.getItem("yourScore") || 0;

  function game() {
    let yourScore = 0;
    let pcScore = 0;

    const rock = document.getElementById("rock");
    const paper = document.getElementById("paper");
    const scissor = document.getElementById("scissor");
    const playerOption = [rock, paper, scissor];
    const pcOption = ["rock", "paper", "scissor"];
    const textAgainst = document.getElementById("text-against");

    playerOption.forEach((eachOption) => {
      eachOption.addEventListener("click", () => {
        const ourChoice = eachOption.id;
        const pcChoiceNumber = Math.floor(Math.random() * 3);
        const pcChoice = pcOption[pcChoiceNumber];

        gameContainer.classList.add("game-containerOpen");
        startContainer.classList.add("container-close");

        ourChoice === pcChoice
          ? (playAgainBtn.textContent = "REPLAY")
          : (playAgainBtn.textContent = "PLAY AGAIN");

        ourChoice === pcChoice
          ? (textAgainst.textContent = "")
          : (textAgainst.textContent = "AGAINST PC");
        applyRippleEffect(ourChoice, pcChoice);

        const winner = whoIsWinner(ourChoice, pcChoice);
        setTimeout(() => {
          if (winner === "you") {
            localStorage.setItem("yourScore", yourScore);

            gameover(yourScore, pcScore);
          } else if (winner === "pc") {
            localStorage.setItem("pcScore", pcScore);
            gameover(yourScore, pcScore);
          }
        }, 1500);
      });
    });
    resetgame.addEventListener("click", () => {
      resetGame();
    });
    newGameBtn.addEventListener("click", () => {
      startAgain();
    });

    playAgainBtn.addEventListener("click", () => {
      gameContainer.classList.remove("game-containerOpen");
      startContainer.classList.remove("container-close");
    });

    function applyRippleEffect(playerChoice, computerChoice) {
      let biggerChoice = null;

      if (playerChoice === computerChoice) {
        equal = true;
      } else if (
        (playerChoice === "rock" && computerChoice === "scissor") ||
        (playerChoice === "scissor" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
      ) {
        biggerChoice = playerChoice;
      } else {
        biggerChoice = computerChoice;
      }
      if (biggerChoice === playerChoice) {
        const bigChoice = document.getElementById("big-choice");

        const wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");

        bigChoice.innerHTML = "";
        bigChoice.appendChild(wrapper);

        const rippleElement1 = document.createElement("div");
        const rippleElement2 = document.createElement("div");
        const rippleElement3 = document.createElement("div");

        const bigger = document.createElement("div");

        rippleElement1.classList.add("ripple1");
        rippleElement2.classList.add("ripple2");
        rippleElement3.classList.add("ripple3");
        bigger.classList.add("bigger");

        wrapper.appendChild(rippleElement1);
        rippleElement1.appendChild(rippleElement2);
        rippleElement2.appendChild(rippleElement3);
        rippleElement3.appendChild(bigger);
        const ourImage = document.createElement("img");
        ourImage.setAttribute("id", "our-image");
        bigger.appendChild(ourImage);
        ourImage.setAttribute("src", `./assets/${playerChoice}.png`);

        const smallChoice = document.getElementById("small-choice");

        const smaller = document.createElement("div");
        smaller.classList.add("smaller");
        smallChoice.innerHTML = "";
        smallChoice.appendChild(smaller);

        const pcImage = document.createElement("img");
        pcImage.setAttribute("id", "pc-image");
        smaller.appendChild(pcImage);

        pcImage.setAttribute("src", `./assets/${computerChoice}.png`);
      }
      if (biggerChoice === computerChoice) {
        const smallChoice = document.getElementById("small-choice");

        const wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");

        smallChoice.innerHTML = "";
        smallChoice.appendChild(wrapper);

        const rippleElement1 = document.createElement("div");
        const rippleElement2 = document.createElement("div");
        const rippleElement3 = document.createElement("div");

        const bigger = document.createElement("div");

        rippleElement1.classList.add("ripple1");
        rippleElement2.classList.add("ripple2");
        rippleElement3.classList.add("ripple3");
        bigger.classList.add("bigger");

        wrapper.appendChild(rippleElement1);
        rippleElement1.appendChild(rippleElement2);
        rippleElement2.appendChild(rippleElement3);
        rippleElement3.appendChild(bigger);
        const pcImage = document.createElement("img");
        pcImage.setAttribute("id", "pc-image");
        bigger.appendChild(pcImage);

        pcImage.setAttribute("src", `./assets/${computerChoice}.png`);

        const bigChoice = document.getElementById("big-choice");

        const smaller = document.createElement("div");
        smaller.classList.add("smaller");
        bigChoice.innerHTML = "";
        bigChoice.appendChild(smaller);

        const ourImage = document.createElement("img");
        ourImage.setAttribute("id", "our-image");
        smaller.appendChild(ourImage);
        ourImage.setAttribute("src", `./assets/${playerChoice}.png`);
      }
    }

    function whoIsWinner(player, computer) {
      const result = document.querySelector(".result");
      let currentWinner;

      if (player === computer) {
        result.textContent = "It's a Tie";

        const tieBreak1 = document.createElement("div");
        tieBreak1.classList.add("tie");
        const tieBreak2 = document.createElement("div");
        tieBreak2.classList.add("tie");

        bigChoice.innerHTML = "";
        smallChoice.innerHTML = "";
        bigChoice.appendChild(tieBreak1);
        smallChoice.appendChild(tieBreak2);
        const ourImage = document.createElement("img");
        ourImage.setAttribute("id", "our-image");
        tieBreak1.appendChild(ourImage);
        ourImage.setAttribute("src", `./assets/${player}.png`);

        const pcImage = document.createElement("img");
        pcImage.setAttribute("id", "pc-image");
        tieBreak2.appendChild(pcImage);
        pcImage.setAttribute("src", `./assets/${computer}.png`);
        return null;
      } else if (player == "rock") {
        if (computer == "paper") {
          result.textContent = "YOU LOST";
          pcScore++;

          computerScoreBoard.textContent = pcScore;
          return "pc";
        } else {
          result.textContent = "YOU WON";
          yourScore++;

          playerScoreBoard.textContent = yourScore;
          return "you";
        }
      } else if (player == "scissor") {
        if (computer == "rock") {
          result.textContent = "YOU LOST";
          pcScore++;

          computerScoreBoard.textContent = pcScore;
          return "pc";
        } else {
          result.textContent = "YOU WON";
          yourScore++;

          playerScoreBoard.textContent = yourScore;
          return "you";
        }
      } else if (player == "paper") {
        if (computer == "scissor") {
          result.textContent = "YOU LOST";
          pcScore++;

          computerScoreBoard.textContent = pcScore;
          return "pc";
        } else {
          result.textContent = "YOU WON";
          yourScore++;
          yourScore;
          playerScoreBoard.textContent = yourScore;
          return "you";
        }
      }
    }
    function gameover(yourScore, pcScore) {
      gameContainer.classList.remove("game-containerOpen");
      startContainer.classList.add("container-close");
      mainContainer.classList.add("main-close");
      gameSuccess.classList.add("game-successOpen");
      if (yourScore < pcScore) {
        stars.innerHTML = "";
        star.innerHTML = "";
        successFeel.textContent = "OOPS";
        successMessage.textContent = "YOU LOST THE GAME";
        successMessage.style.color = "red";
      } else {
        successFeel.textContent = "HURRAY";
        successMessage.textContent = "YOU WON THE GAME";
        successMessage.style.color = "white";
      }
    }
    function startAgain() {
      gameContainer.classList.remove("game-containerOpen");
      startContainer.classList.remove("container-close");
      mainContainer.classList.remove("main-close");
      gameSuccess.classList.remove("game-successOpen");
    }
    function resetGame() {
      yourScore = 0;
      pcScore = 0;

      const playerScoreBoard = document.querySelector(".p-score");
      const computerScoreBoard = document.querySelector(".c-score");
      const result = document.querySelector(".result");
      const bigChoice = document.getElementById("big-choice");
      const smallChoice = document.getElementById("small-choice");

      playerScoreBoard.textContent = yourScore;
      computerScoreBoard.textContent = pcScore;
      result.textContent = "";
      bigChoice.innerHTML = "";
      smallChoice.innerHTML = "";
      localStorage.setItem("pcScore", 0);
      localStorage.setItem("yourScore", 0);

      gameContainer.classList.remove("game-containerOpen");
      startContainer.classList.remove("container-close");
      mainContainer.classList.remove("main-close");
      gameSuccess.classList.remove("game-successOpen");
    }
  }
  game();
});
