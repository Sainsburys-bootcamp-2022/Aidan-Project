// Step 1 - Setting the board up


// 1a Creating a board that will be updated after each turn
let board = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
]

// 1b Creating a newBoard that will be pulled when the resetGame function runs, this will
// need nesting inside resetGame as board= not newBoard=
const newBoard = () => [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
]



// 1c Creating the getBoard function, this will be used after every takeTurn to display the new board
function getBoard() {
    console.log("getBoard has started")
    return board
}


// 1d Creating clearBoard function, this will clear the visual html values from the board
function clearBoard() {
    console.log("clearBoard has started")
    for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
        for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
            document.getElementById(`row-${rowIndex}-column-${columnIndex}`).className = "column"
        }
    }
    console.log("clearBoard has finised")
}






const boardVisibility = document.getElementById("grid")
// boardVisibility.style.display = "none"
const winnerDisplayRed = document.getElementById("winner-display-red");

const winnerDisplayYellow = document.getElementById("winner-display-yellow");

const winnerDisplayNobody = document.getElementById("winner-display-nobody");



// 1f Creating the resetButton
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", resetGame);


// 1d Creating the resetGame function, will either be called by clicking button or when game ends
function resetGame() {
    console.log("resetGame has started")
    clearBoard()
    clearWinner()
    winnerDisplayOnReset()
    board = newBoard()
    redsTurn = true
    winner = null
    winnerRed = null
    winnerYellow = null
    winnerNobody = null
    gameOver = null
    takeTurnValue = 0
    startGameButton.style.display = "flex"
    console.log("resetGame finished")
}

// function hideBoardOnReset() {
//     console.log("hideBoardOnReset has finished")
//     // const boardVisibility = document.getElementById("grid");
//     boardVisibility.style.display = "none";
//     console.log("hideBoardOnReset has finished")
// }

function winnerDisplayOnReset() {
    winnerDisplayRed.style.dipsly = "none"
    winnerDisplayYellow.style.display = "none"
    winnerDisplayNobody.style.display = "none"
}

// 4b Creating the start game button
const startGameButton = document.getElementById("start-game");
startGameButton.addEventListener("click", startGame);


//4c Creating the startGame function
function startGame() {
    console.log("startGame has started")
    // const boardVisibility = document.getElementById("grid");
    boardVisibility.style.display = "flex";
    startGameButton.style.display = "none";
    // player1NameBox.style.display = "none";
    // player2NameBox.style.display = "none";
    console.log("startGame has finished"
    )
}



// const player1NameBox = document.getElementsByClassName("player1");

// const player2NameBox = document.getElementsByClassName("player2");




































// 1e Defining whos turn it is, game will always start on redsTurn so this will be included in the
// reset game function. This variable will update everytime someone takes a turn and will also be
// valuable in determining the winner of the game.
let redsTurn = true


// 2 Registering turns and updating the board

// 2a Creating the takeTurn function
function takeTurn(rowIndex, columnIndex) {
    console.log("takeTurn has started")
    for (let i = 5; i >= 0; i--) {
        if (board[i][columnIndex] === null && redsTurn === true) {
            board[i][columnIndex] = "red"
            redsTurn = false
            console.log(`YELLOWS TURN`)
            break
        }
        else if (board[i][columnIndex] === null) {
            board[i][columnIndex] = "yellow"
            redsTurn = true
            console.log(`REDS TURN`)
            break
        }
    }
    takeTurnValue = takeTurnValue + 1
    console.log("takeTurn has finsihed")
}



// 2b Creating the drawBoard function, this will place a counter on the screen at the bottom most part
// of the column, after takeTurn has executed
// New drawBoard function, old one was conflicting with takeTurn.
// This one is called after takeTurn and iterates through the board checking each cell and adjusting the
// cellText from null to what is defined from takeTurn.
function drawBoard() {
    console.log("drawBoard has started")
    for (let row = 0; row < 6; row++) {
        for (let column = 0; column < 7; column++) {
            if (board[row][column] === "red") {
                const cellText = board[row][column] === "red" ? "red-counter" : "yellow-counter";
                document.getElementById(`row-${row}-column-${column}`).classList.add(cellText)
            }
            else if (board[row][column] === "yellow") {
                const cellText = board[row][column] === "yellow" ? "yellow-counter" : "red-counter";
                document.getElementById(`row-${row}-column-${column}`).classList.add(cellText)
                
            }
        }
    }
    console.log("drawBoard has finished")
}


// 2c Creating the positionClick function, this function will do multiple things, first it will detect
// where on the board has been clicked, it will then run the takeTurn function that will edit the cellText
// of the cell, it will then call the drawBoard function which will update the HTML with the correct counter.
// From there it will run the check winner function and either return a winner or allow the game to carry on.
function positionClick(rowIndex, columnIndex, event) {
    console.log("positionClick has started")
    takeTurn(rowIndex, columnIndex);
    drawBoard()
    checkWinner()
    displayWinner()
    // stopGame()
    console.log(winner)
    console.log("positionClick has finished")
}


// 2d Creating the bind click event for the grid
for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < board[0].length; columnIndex++) {
        const gridPosition = document.getElementById(`row-${rowIndex}-column-${columnIndex}`);
        // console.log("GRID POSITION",gridPosition)
        gridPosition.addEventListener("click", positionClick.bind(null, rowIndex, columnIndex));
    }
}



// 3 Creating the checkWinner function

// 3a
function checkWinner() {
    console.log("checkWinner has started")
    for (let i = 0; i < 1; i++) {
        checkWinnerHorizontal();
        if (winnerRed === true) {
            gameOver = gameOver + 1
            console.log("Red Wins Horizontally!")
            return winner = "red"
        } else if (winnerYellow === true) {
            gameOver = gameOver + 1
            console.log("Yellow Wins Horizontally!")
            return winner = "yellow"
        }
        checkWinnerVertical();
        if (winnerRed === true) {
            gameOver = gameOver + 1
            console.log("Red Wins Vertically!")
            return winner = "red"
        } else if (winnerYellow === true) {
            console.log("Yellow Wins Vertically!")
            return winner = "yellow"
        }
        checkWinnerDiagDown();
        if (winnerRed === true) {
            gameOver = gameOver + 1
            console.log("Red Wins Diagonolly Down!")
            return winner = "red"
        } else if (winnerYellow === true) {
            gameOver = gameOver + 1
            console.log("Yellow Wins Diagonolly Down!")
            return winner = "yellow"
        }
        checkWinnerDiagUp();
        if (winnerRed === true) {
            gameOver = gameOver + 1
            console.log("Red Wins Diagonally Up!")
            return winner = "red"
        } else if (winnerYellow === true) {
            gameOver = gameOver + 1
            console.log("Yellow Wins Diagonally Up!")
            return winner = "yellow"
        }
        if (takeTurnValue >= 42) {
            gameOver = gameOver + 1
            console.log("Nobody Wins")
            return winner = "nobody"
        }
    }
    console.log("checkWinner has finished")
}

function checkWinnerHorizontal() {
    for (let row = 0; row < 6; row++) {
        for (let column = 0; column < 4; column++) {
            if (board[row][column] === "red" && board[row][column + 1] === "red") {
                if (board[row][column] === "red" && board[row][column + 2] === "red") {
                    if (board[row][column] === "red" && board[row][column + 3] === "red") {
                        winnerRed = true
                    }
                }
            }
            if (board[row][column] === "yellow" && board[row][column + 1] === "yellow") {
                if (board[row][column] === "yellow" && board[row][column + 2] === "yellow") {
                    if (board[row][column] === "yellow" && board[row][column + 3] === "yellow") {
                        winnerYellow = true
                    }
                }
            }
        }
    }
}

function checkWinnerVertical() {
    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 7; column++) {
            if (board[row][column] === "red" && board[row + 1][column] === "red") {
                if (board[row][column] === "red" && board[row + 2][column] === "red") {
                    if (board[row][column] === "red" && board[row + 3][column] === "red") {
                        winnerRed = true
                    }
                }
            }
            else if (board[row][column] === "yellow" && board[row + 1][column] === "yellow") {
                if (board[row][column] === "yellow" && board[row + 2][column] === "yellow") {
                    if (board[row][column] === "yellow" && board[row + 3][column] === "yellow") {
                        winnerYellow = true
                    }
                }
            }
        }
    }
}

function checkWinnerDiagDown() {
    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 3; column++) {
            if (board[row][column] === "red" && board[row + 1][column + 1] === "red") {
                if (board[row][column] === "red" && board[row + 2][column + 2] === "red") {
                    if (board[row][column] === "red" && board[row + 3][column + 3] === "red") {
                        winnerRed = true
                    }
                }
            }
            else if (board[row][column] === "yellow" && board[row + 1][column + 1] === "yellow") {
                if (board[row][column] === "yellow" && board[row + 2][column + 2] === "yellow") {
                    if (board[row][column] === "yellow" && board[row + 3][column + 3] === "yellow") {
                        winnerYellow = true
                    }
                }
            }
        }
    }
}

function checkWinnerDiagUp() {
    for (let row = 3; row < 6; row++) {
        for (let column = 0; column < 4; column++) {
            if (board[row][column] === "red" && board[row - 1][column + 1] === "red") {
                if (board[row][column] === "red" && board[row - 2][column + 2] === "red") {
                    if (board[row][column] === "red" && board[row - 3][column + 3] === "red") {
                        winnerRed = true
                    }
                }
            }
            else if (board[row][column] === "yellow" && board[row - 1][column + 1] === "yellow") {
                if (board[row][column] === "yellow" && board[row - 2][column + 2] === "yellow") {
                    if (board[row][column] === "yellow" && board[row - 3][column + 3] === "yellow") {
                        winnerYellow = true
                    }
                }
            }
        }
    }
}


// 3b Creating displayWinner function
function displayWinner() {
    console.log("displayWinner has started")
    if (winner === "red") {
        sleep(1500).then(() => {
            // const boardVisibility = document.getElementById("grid");
            boardVisibility.style.display = "none";
            console.log("board disappear 1")
        })
        const winnerDisplay = document.getElementById("winner-display-red");
        winnerDisplay.style.display = "block";
    }
    else if (winner === "yellow") {
        sleep(1500).then(() => {
            // const boardVisibility = document.getElementById("grid");
            boardVisibility.style.display = "none";
            console.log("board disappear 2")
        })
        const winnerDisplay = document.getElementById("winner-display-yellow");
        winnerDisplay.style.display = "block";
    }
    else if (winner === "nobody") {
        sleep(1500).then(() => {
            // const boardVisibility = document.getElementById("grid");
            boardVisibility.style.display = "none";
            console.log("board disappear 3")
        })
        const winnerDisplay = document.getElementById("winner-display-nobody");
        winnerDisplay.style.display = "block";
    }
    console.log("displayWinner has finished")
}


// 3c Reseting the winning variables and creating the clearWinner function
let winnerRed = null
let winnerYellow = null
let winnerNobody = null
let winner = null
let takeTurnValue = 0
let gameOver = null
// let player1Name = document.getElementById("player1").value;

function clearWinner() {
    console.log("clearWinner has started")
    // const winnerDisplayRed = document.getElementById("winner-display-red");
    winnerDisplayRed.style.display = "None";
    // const winnerDisplayYellow = document.getElementById("winner-display-yellow");
    winnerDisplayYellow.style.display = "None";
    // const winnerDisplayNobody = document.getElementById("winner-display-nobody");
    winnerDisplayNobody.style.display = "None";
    // const boardVisibility = document.getElementById("grid");
    boardVisibility.style.display = "none";
    console.log("board disappear 4")
    console.log("clearWinner has finished")
}



// 3e Creating the stopGame function to stop turns being taken after a winner is found
function stopGame() {
    console.log("stopGame has started")
    if (gameOver === 2) {
        alert("The game is over, please reset")
        console.log("stopGame has finished")
    }
}


// 3f Adding player names to the game and winner display
// function player1Name() {
//     let player1Name = document.getElementById("player1").value;
// }

// Creating the sleep function
function sleep(ms) {
    console.log("sleep has started")
    return new Promise(resolve => setTimeout(resolve, ms))
}


// // 4 Hiding the board at the start of the game
// // 4a Added a line to resetGame to hide board


// // 4b Creating the start game button
// const startGameButton = document.getElementById("start-game");
// startGameButton.addEventListener("click", startGame);


// //4c Creating the startGame function
// function startGame() {
    // const boardVisibility = document.getElementById("grid");
//     boardVisibility.style.display = "flex";
// }



// 3d Running the resetGame function when the page first loads
document.addEventListener('DOMContentLoaded', resetGame())
// resetGame()
// console.log("game ready")

// module.exports = connect4


if (typeof exports === 'object') {
    console.log("Running in Node")
    // Node. Does not work with strict CommonJS, but only CommonJS-like
    // environments that support module.exports, like Node.
    module.exports = {
        stopGame,
    }
} else {
    console.log("Running in Browser")
}
