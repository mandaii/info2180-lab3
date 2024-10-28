document.addEventListener("DOMContentLoaded", () => {
  console.log("JavaScript is loaded and running!");
  const board = document.getElementById ("board");
  const squares = document.querySelectorAll("div"); 
  const status = document.getElementById("status"); 
  const newGameButton = document.querySelector(".btn");
  let currentPlayer = "X";
  let gameActive = true;


  squares.forEach(square => {
    square.classList.add("square");
  });

  squares.forEach(square => {
	square.addEventListener("click", () => {
            if (!gameActive || square.textContent !== "") return;

            square.textContent = currentPlayer;
            square.classList.add(currentPlayer);

	    if (checkWinner()) {
                status.classList.add("you-won");
                status.textContent = `Congratulations! ${currentPlayer} is the Winner!`;
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        });
    });

    squares.forEach(square => {
        square.addEventListener("mouseover", () => {
            square.classList.add("hover");
        });
        square.addEventListener("mouseleave", () => {
            square.classList.remove("hover");
        });
    });
   
    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        return winningCombinations.some(combination => {
            return combination.every(index => 
                squares[index].textContent === currentPlayer
            );
	});
    }
    
    
     function newGame() {
        squares.forEach(square => {
            square.textContent = "";
            square.classList.remove("X", "O");
        });
        status.textContent = "Move your mouse over a square and click to play an X or an O.";
        status.classList.remove("you-won");
        currentPlayer = "X";
        gameActive = true;
    }

    // Event listener for the new game button
    newGameButton.addEventListener("click", newGame);
});