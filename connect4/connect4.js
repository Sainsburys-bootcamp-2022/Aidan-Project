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



// 1d Creating the resetGame function, will either be called by clicking button or when game ends
function resetGame() {
    console.log("resetGame was called and started")
    const resetButton = document.getElementById("reset-button");
    resetButton.addEventListener("click", resetGame);
    board = newBoard()
    redsTurn = true
    console.log("resetGame finished")
}


// 1e Defining whos turn it is, game will always start on redsTurn so this will be included in the
// reset game function. This variable will update everytime someone takes a turn and will also be
// valuable in determining the winner of the game.
let redsTurn = true




// 2 Registering turns and updating the board

// 2a Creating the takeTurn function
function takeTurn(row, column) {
    console.log("takeTurn was called and started at row " + row +", column: " + column);
    console.log(`takeTurn was called and started at row: ${row}, column: ${column}`);
    if (board[row][column] === null && redsTurn === true) {
        board[row][column] = "red"
        redsTurn = false
        console.log(`🟡 turn`)
    }
    else if (board[row][column] === null) {
        board[row][column] = "yellow"
        redsTurn = true
        console.log(`🔴 turn`)
    }
    // else {
    //     alert("This space is taken")
    // }
    console.log("takeTurn was finished at row " + row +", column: " + column);
    console.log(`takeTurn was finished at row: ${row}, column: ${column}`);
}



// 2b Creating the drawBoard function, this will place a counter on the screen at the bottom most part
// of the column, after takeTurn has executed
function drawBoard(board){
    console.log("drawBoard was called and started")
    const cellText = board[row][column] === "red" ? "🔴" : "🟡";
    document.getElementById(`row-${rowIndex}-column-${columnIndex}`).innerText = cellText;
    console.log("drawboard finished")
}


// 2c Creating the positionClick function, this function will do multiple things, first it will detect
// where on the board has been clicked, it will then run the takeTurn function that will edit the cellText
// of the cell, it will then call the drawBoard function which will update the HTML with the correct counter.
// From there it will run the check winner function and either return a winner or allow the game to carry on.
function positionClick(rowIndex, columnIndex, event) {   
    console.log("positionClick was called and started");
    takeTurn(rowIndex, columnIndex);
    //console.log("positionClick info has been passed to takeTurn");
    //drawBoard(rowIndex, columnIndex);
    //console.log("positionClick info has been passed to drawBoard");
    // const winner = checkWinner();
    //     if (winner) {
    //         if (typeof winner !== "strings" || !["red", "yellow", "nobody"].includes(winner)) {
    //             throw "Expecting 'checkWinner' to return null or one one the strings 'red', 'yellow' or 'nobody', actually received: " + winner;
    //         }
    //         const winnerName = document.getElementById("winner-name");
    //         winnerName.innerText = winner;
    //         const winnerDisplay = document.getElementById("winner-display");
    //         winnerDisplay.style.display = "block"
    //     }
}


// 2d Creating the bind click event for the grid
for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < board[0].length ; columnIndex++) {
        const gridPosition = document.getElementById(`row-${rowIndex}-column-${columnIndex}`);
        console.log("GRID POSITION",gridPosition)
        document.addEventListener("click", positionClick.bind(rowIndex, columnIndex));
    }
}



// 3 Creating the checkWinner function. Multiple routes for this

// 3a
// function checkWinner() {
    
// }

// for (i = 5; i >= 0; i--);
