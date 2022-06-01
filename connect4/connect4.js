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
    console.log("getBoard was called")
    return board
}


// 1d Creating clearBoard function, this will clear the visual html values from the board
function clearBoard() {
    for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
        for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
            document.getElementById(`row-${rowIndex}-column-${columnIndex}`).innerHTML = ""
        }
    }
}



// 1d Creating the resetGame function, will either be called by clicking button or when game ends
function resetGame() {
    console.log("resetGame was called and started")
    board = newBoard()
    clearBoard()
    redsTurn = true
    winnerRed = null
    winnerYellow = null
    winnerNobody = null
    console.log("resetGame finished")
}


// 1e Defining whos turn it is, game will always start on redsTurn so this will be included in the
// reset game function. This variable will update everytime someone takes a turn and will also be
// valuable in determining the winner of the game.
let redsTurn = true
// function whoJustWent() {
//     if (redsTurn = true ? "yellow" || "reds"),
// }


// 1f Creating the resetButton
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", resetGame);




// 2 Registering turns and updating the board

// 2a Creating the takeTurn function
function takeTurn(rowIndex, columnIndex) {
    // console.log("takeTurn has started");
    for (let i = 5; i >= 0; i--) {
        if (board[i][columnIndex] === null && redsTurn === true) {
            board[i][columnIndex] = "red"
            redsTurn = false
            // console.log("takeTurn has finished");
            console.log(`YELLOWS TURN`)
            break
        }
        else if (board[i][columnIndex] === null) {
            board[i][columnIndex] = "yellow"
            redsTurn = true
            // console.log("takeTurn has finished");
            console.log(`REDS TURN`)
            break
        }
    }
}



// 2b Creating the drawBoard function, this will place a counter on the screen at the bottom most part
// of the column, after takeTurn has executed

// function drawBoard(board, row, column) {
//     console.log(`drawBoard was called and started at row: ${row}, column: ${column}`)
//     const cellText = board[row][column] === "red" ? "red" : "yellow";
//     document.getElementById(`row-${row}-column-${column}`).innerText = cellText;
//     console.log("drawboard finished")
// }

// New drawBoard function, old one was conflicting with takeTurn.
// This one is called after takeTurn and iterates through the board checking each cell and adjusting the
// cellText from null to what is defined from takeTurn.
function drawBoard() {
    // console.log("drawBoard has started")
    for (let row = 0; row < 6; row++) {
        for (let column = 0; column < 7; column++) {
            if (board[row][column] === "red") {
                const cellText = board[row][column] === "red" ? "red" : "yellow";
                document.getElementById(`row-${row}-column-${column}`).innerText = cellText
                // console.log("red drawn")
            }
            else if (board[row][column] === "yellow") {
                const cellText = board[row][column] === "yellow" ? "yellow" : "red";
                document.getElementById(`row-${row}-column-${column}`).innerText = cellText
                // console.log("yellow drawn")
            }
        }
    }
    // console.log("drawBoard has finished")
}


// 2c Creating the positionClick function, this function will do multiple things, first it will detect
// where on the board has been clicked, it will then run the takeTurn function that will edit the cellText
// of the cell, it will then call the drawBoard function which will update the HTML with the correct counter.
// From there it will run the check winner function and either return a winner or allow the game to carry on.
function positionClick(rowIndex, columnIndex, event) {   
    // console.log(`positionClick was called and started on column: ${columnIndex}`);
    // console.log("positionClick info has been passed to takeTurn");
    takeTurn(rowIndex, columnIndex);
    drawBoard()
    const winner = checkWinner();
    console.log(winner)
        if (winner) {
            if (typeof winner !== "strings" || !["red", "yellow", "nobody"].includes(winner)) {
                throw "Expecting 'checkWinner' to return null or one one the strings 'red', 'yellow' or 'nobody', actually received: " + winner;
            }
            const winnerName = document.getElementById("winner-name");
            winnerName.innerText = winner;
            const winnerDisplay = document.getElementById("winner-display");
            winnerDisplay.style.display = "block"
        }
}


// 2d Creating the bind click event for the grid
for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < board[0].length; columnIndex++) {
        const gridPosition = document.getElementById(`row-${rowIndex}-column-${columnIndex}`);
        // console.log("GRID POSITION",gridPosition)
        gridPosition.addEventListener("click", positionClick.bind(null, rowIndex, columnIndex));
    }
}

let winnerRed = null
let winnerYellow = null
let winnerNobody = null

// 3 Creating the checkWinner function. Multiple routes for this

// 3a
function checkWinner() {
    for (let i = 0; i < 1; i++) {
        checkWinnerHorizontal();
        if (winnerRed === true) {
            console.log("Red Wins Horizontally!")
            return "red"
        } else if (winnerYellow === true) {
            console.log("Yellow Wins Horizontally!")
            return "yellow"
        }
        checkWinnerVertical();
        if (winnerRed === true) {
            console.log("Red Wins Vertically!")
            break
        } else if (winnerYellow === true) {
            console.log("Yellow Wins Vertically!")
            break
        }
        checkWinnerDiagDown();
        if (winnerRed === true) {
            console.log("Red Wins Diagonolly Down!")
            break
        } else if (winnerYellow === true) {
            console.log("Yellow Wins Diagonolly Down!")
            break
        }
        checkWinnerDiagUp();
        if (winnerRed === true) {
            console.log("Red Wins Diagonally Up!")
            break
        } else if (winnerYellow === true) {
            console.log("Yellow Wins Diagonally Up!")
            break
        }
    }
}

function checkWinnerHorizontal() {
    // console.log("checkWinnerHorizontal has started")
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
    // console.log("checkWinnerHorizontal has finished")
}

function checkWinnerVertical() {
    // console.log("checkWinnerVertical has started")
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
    // console.log("checkWinnerVertical has finished")
}

function checkWinnerDiagDown() {
    // console.log("checkWinnerDiagDown has started")
    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 7; column++) {
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
    // console.log("checkWinnerDiagDown has finished")
}

function checkWinnerDiagUp() {
    // console.log("checkWinnerDiagUp has started")
    for (let row = 0; row < 6; row++) {
        for (let column = 0; column < 7; column++) {
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
    // console.log("checkWinnerDiagUp has finished")
}


// 3b Creating winner function
