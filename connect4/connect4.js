// Step 1 - Setting the board up

import {checkWinnerHorizontal, checkWinnerVertical, checkWinnerDiagDown, checkWinnerDiagUp} from './checkWinner.js';

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

const boardVisibility = document.getElementById("grid");
const winnerDisplayRed = document.getElementById("winner-display-red");
const winnerDisplayYellow = document.getElementById("winner-display-yellow");
const winnerDisplayNobody = document.getElementById("winner-display-nobody");

const newGameButton = document.getElementById("new-game")
newGameButton.addEventListener("click", newGame)

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", resetGame);

const startGameButton = document.getElementById("start-game");
startGameButton.addEventListener("click", startGame);

// 3c Reseting the winning variables and creating the clearWinner function
let winnerRed = null
let winnerYellow = null
let winnerNobody = null
let winner = null
let takeTurnValue = 0
let gameOver = null
let gameStarted = false
let redsTurn = true

// 1d Creating the resetGame function, will either be called by clicking button or when game ends
function resetGame() {
    console.log("resetGame has started")
    clearBoard()
    clearWinner()
    resetVariables()
    boardAndNames()
    resetScoreBoard()
    resetName1()
    resetName2()
    console.log("resetGame finished")
}

function resetVariables() {
    board = newBoard()
    redsTurn = true
    winner = null
    winnerRed = null
    winnerYellow = null
    winnerNobody = null
    gameOver = null
    takeTurnValue = 0
    gameStarted = false
    horizontalWinnerIs = null
    veticalWinnerIs = null
    diagDownWinnerIs = null
    diagUpWinnerIs = null
}

function newGame() {
    console.log("newGame has started")
    clearBoard()
    clearWinner()
    resetVariables()
    boardAndNames()
    startGame()
}

function boardAndNames() {
    console.log("boardAndNames has started")
    if (gameStarted === false) {
        startGameButton.style.display = "flex"
        newGameButton.style.display = "none"
        player1NameInput.style.display = "flex";
        // document.getElementById("p1NameReset").style.display = "flex";
        player2NameInput.style.display = "flex";
        // document.getElementById("p2NameReset").style.display = "flex";
        winnerDisplayRed.style.dipsly = "none"
        winnerDisplayYellow.style.display = "none"
        winnerDisplayNobody.style.display = "none"
        // resetScoreBoardButton.style.display = "flex"
    } else 
        return startGame()
    
    console.log("boardAndNames has finished")
}

//4c Creating the startGame function
function startGame() {
    console.log("startGame has started")
    // const boardVisibility = document.getElementById("grid");
    boardVisibility.style.display = "flex";
    startGameButton.style.display = "none";
    newGameButton.style.display = "flex";
    // resetButton.style.display = "none";
    player1NameInput.style.display = "none";
    // document.getElementById("p1NameReset").style.display = "none";
    player2NameInput.style.display = "none";
    // document.getElementById("p2NameReset").style.display = "none";
    // resetScoreBoardButton.style.display = "none"
    redScoreName.textContent = player1NameInput.value + "'s Score"
    yellowScoreName.textContent = player2NameInput.value + "'s Score"
    showScoreboard()
    console.log("startGame has finished"
    )
}
const redScoreName = document.getElementById("red-score")
const yellowScoreName = document.getElementById("yellow-score")

const player1NameInput = document.getElementById("player1Name");
document.querySelector("form.player1").addEventListener("submit", function (e) {
    e.preventDefault();
    console.log(player1NameInput.value)
})

function resetName1() {
    document.getElementById("player1Name").value = "Enter Name"
    redScoreName.textContent = "Red Score"
}

const player2NameInput = document.getElementById("player2Name");
document.querySelector("form.player2").addEventListener("submit", function (e) {
    e.preventDefault();
    console.log(player2NameInput.value)
})

function resetName2() {
    document.getElementById("player2Name").value = "Enter Name"
    yellowScoreName.textContent = "Yellow Score"
}

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
    console.log(winner)
    console.log("positionClick has finished")
}

// 2d Creating the bind click event for the grid
for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < board[0].length; columnIndex++) {
        const gridPosition = document.getElementById(`row-${rowIndex}-column-${columnIndex}`);
        gridPosition.addEventListener("click", positionClick.bind(null, rowIndex, columnIndex));
    }
}

// 3 Creating the checkWinner function
let horizontalWinnerIs = null
let veticalWinnerIs = null
let diagDownWinnerIs = null
let diagUpWinnerIs = null

function gotWinner() {
    horizontalWinnerIs = checkWinnerHorizontal();
    veticalWinnerIs = checkWinnerVertical();
    diagDownWinnerIs = checkWinnerDiagDown();
    diagUpWinnerIs = checkWinnerDiagUp()
}    

// 3a
function checkWinner() {
    console.log("checkWinner has started")
    gotWinner()
    // console.log("winner is", gotWinner)
    for (let i = 0; i < 1; i++) {
        checkWinnerHorizontal();
        if (horizontalWinnerIs === "red") {
            gameOver = gameOver + 1
            console.log("Red Wins Horizontally!")
            return winner = "red"
        } else if (horizontalWinnerIs === "yellow") {
            gameOver = gameOver + 1
            console.log("Yellow Wins Horizontally!")
            return winner = "yellow"
        }
        checkWinnerVertical();
        if (veticalWinnerIs === "red") {
            gameOver = gameOver + 1
            console.log("Red Wins Vertically!")
            return winner = "red"
        } else if (veticalWinnerIs === "yellow") {
            console.log("Yellow Wins Vertically!")
            return winner = "yellow"
        }
        checkWinnerDiagDown();
        if (diagDownWinnerIs === "red") {
            gameOver = gameOver + 1
            console.log("Red Wins Diagonolly Down!")
            return winner = "red"
        } else if (diagDownWinnerIs === "yellow") {
            gameOver = gameOver + 1
            console.log("Yellow Wins Diagonolly Down!")
            return winner = "yellow"
        }
        checkWinnerDiagUp();
        if (diagUpWinnerIs === "red") {
            gameOver = gameOver + 1
            console.log("Red Wins Diagonally Up!")
            return winner = "red"
        } else if (diagUpWinnerIs === "yellow") {
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

// function checkWinnerHorizontal() {
//     for (let row = 0; row < 6; row++) {
//         for (let column = 0; column < 4; column++) {
//             if (board[row][column] === "red" && board[row][column + 1] === "red") {
//                 if (board[row][column] === "red" && board[row][column + 2] === "red") {
//                     if (board[row][column] === "red" && board[row][column + 3] === "red") {
//                         console.log("returning red")
//                         return "red"
//                     }
//                 }
//             }
//             if (board[row][column] === "yellow" && board[row][column + 1] === "yellow") {
//                 if (board[row][column] === "yellow" && board[row][column + 2] === "yellow") {
//                     if (board[row][column] === "yellow" && board[row][column + 3] === "yellow") {
//                         return "yellow"
//                     }
//                 }
//             }
//         }
//     }
// }

// function checkWinnerVertical() {
//     for (let row = 0; row < 3; row++) {
//         for (let column = 0; column < 7; column++) {
//             if (board[row][column] === "red" && board[row + 1][column] === "red") {
//                 if (board[row][column] === "red" && board[row + 2][column] === "red") {
//                     if (board[row][column] === "red" && board[row + 3][column] === "red") {
//                         return "red"
//                     }
//                 }
//             }
//             else if (board[row][column] === "yellow" && board[row + 1][column] === "yellow") {
//                 if (board[row][column] === "yellow" && board[row + 2][column] === "yellow") {
//                     if (board[row][column] === "yellow" && board[row + 3][column] === "yellow") {
//                         return "yellow"
//                     }
//                 }
//             }
//         }
//     }
// }

// function checkWinnerDiagDown() {
//     for (let row = 0; row < 3; row++) {
//         for (let column = 0; column < 3; column++) {
//             if (board[row][column] === "red" && board[row + 1][column + 1] === "red") {
//                 if (board[row][column] === "red" && board[row + 2][column + 2] === "red") {
//                     if (board[row][column] === "red" && board[row + 3][column + 3] === "red") {
//                         return "red"
//                     }
//                 }
//             }
//             else if (board[row][column] === "yellow" && board[row + 1][column + 1] === "yellow") {
//                 if (board[row][column] === "yellow" && board[row + 2][column + 2] === "yellow") {
//                     if (board[row][column] === "yellow" && board[row + 3][column + 3] === "yellow") {
//                         return "red"
//                     }
//                 }
//             }
//         }
//     }
// }

// function checkWinnerDiagUp() {
//     for (let row = 3; row < 6; row++) {
//         for (let column = 0; column < 4; column++) {
//             if (board[row][column] === "red" && board[row - 1][column + 1] === "red") {
//                 if (board[row][column] === "red" && board[row - 2][column + 2] === "red") {
//                     if (board[row][column] === "red" && board[row - 3][column + 3] === "red") {
//                         return "red"
//                     }
//                 }
//             }
//             else if (board[row][column] === "yellow" && board[row - 1][column + 1] === "yellow") {
//                 if (board[row][column] === "yellow" && board[row - 2][column + 2] === "yellow") {
//                     if (board[row][column] === "yellow" && board[row - 3][column + 3] === "yellow") {
//                         return "yellow"
//                     }
//                 }
//             }
//         }
//     }
// }



// 3b Creating displayWinner function


function displayWinner() {
    console.log("displayWinner has started")
    if (winner === "red") {
        winnerDisplayRed.textContent = player1NameInput.value + " Wins!!"
        addRedScore()
        sleep(1500).then(() => {
            boardVisibility.style.display = "none";
            console.log("board disappear 1")
        })
        const winnerDisplay = document.getElementById("winner-display-red");
        winnerDisplay.style.display = "block";
    }
    else if (winner === "yellow") {
        winnerDisplayYellow.textContent = player2NameInput.value + " Wins!!"
        addYellowScore()
        sleep(1500).then(() => {
            boardVisibility.style.display = "none";
            console.log("board disappear 2")
        })
        const winnerDisplay = document.getElementById("winner-display-yellow");
        winnerDisplay.style.display = "block";
    }
    else if (winner === "nobody") {
        sleep(1500).then(() => {
            boardVisibility.style.display = "none";
            console.log("board disappear 3")
        })
        const winnerDisplay = document.getElementById("winner-display-nobody");
        winnerDisplay.style.display = "block";
    }
    console.log("displayWinner has finished")
}

function clearWinner() {
    console.log("clearWinner has started")
    winnerDisplayRed.style.display = "None";
    winnerDisplayYellow.style.display = "None";
    winnerDisplayNobody.style.display = "None";
    boardVisibility.style.display = "none";
    console.log("clearWinner has finished")
}

// Creating the scoreboard
const redScore = document.getElementById("score-red")
const yellowScore = document.getElementById("score-yellow")
let scoreRed = redScore.innerHTML
let scoreYellow = yellowScore.innerHTML

function addRedScore() {
    scoreRed++
    redScore.innerHTML = scoreRed
}
function addYellowScore() {
    scoreYellow++
    yellowScore.innerHTML = scoreYellow
}

function resetScoreBoard() {
    console.log("reset score")
    redScore.innerHTML = 0
    yellowScore.innerHTML = 0
    scoreRed = 0
    scoreYellow = 0
    hideScoreboard()
}

function hideScoreboard() {
    redScore.style.display = "none"
    yellowScore.style.display = "none"
    redScoreName.style.display = "none"
    yellowScoreName.style.display = "none"
}

function showScoreboard() {
    redScore.style.display = "block"
    yellowScore.style.display = "block"
    redScoreName.style.display = "block"
    yellowScoreName.style.display = "block"
}

// Creating the sleep function to use in displayWinner
function sleep(ms) {
    console.log("sleep has started")
    return new Promise(resolve => setTimeout(resolve, ms))
}

// 3d Running the resetGame function when the page first loads
document.addEventListener('DOMContentLoaded', resetGame())


export {
    board
}




