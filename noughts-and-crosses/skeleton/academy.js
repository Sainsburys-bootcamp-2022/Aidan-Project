// Make your changes to store and update game state in this file

// board that will be used throughout, updated after each turn
let board = [[null, null, null], [null, null, null], [null, null, null]]

// starts game off with it being crosses turn
let noughtsTurn = false

// starts game off with draw counter set to 0
let drawCounter = 0

// winning conditions, first 3 are rows, second 3 are columns, last 2 are diaganol
const winningConditions = [
    [0, 1, 2] // 1
    [3, 4, 5] // 2
    [6, 7, 8] // 3
    [0, 3, 6] // 4
    [1, 4, 7] // 5
    [2, 5, 8] // 6
    [0, 4, 8] // 7
    [2, 4, 6] // 8
]

// Draw function
function itsADraw() {
    console.log("its a draw was called")
    if (drawCounter >= 9){
        resetClick()
        return alert("its a draw, try again")
    }
}



// Take the row and column number between 0 and 2 (inclusive) and update the game state. This needs to feed into position click, 
// WORKING
    function takeTurn(row, column) {
    // console.log("takeTurn was called with row: " + row + ", column:" + column);
    console.log(`takeTurn was called with row: ${row}, column: ${column}`);
    if (board[row][column] === null && noughtsTurn === true) {
        board[row][column] = "nought"
        noughtsTurn = false
        console.log(`❌ turn`)
        
    }
    else if (board[row][column] === null) {
            board[row][column] = "cross"
            noughtsTurn = true
            console.log(`⭕ turn`)
    }
    else {
        alert("This space is taken, try again")
        console.log(board)
    }
    drawCounter = (drawCounter + 1)
    console.log("draw counter was updated")
    return itsADraw()
    }

// for draw function include a value that adds 1 each taketurn loop. when hits 9 call on draw function

// Return either "noughts", "crosses" or "nobody" if the game is over.
// Otherwise return null to continue playing.
// need to get the right winner to display, always displaying noughts is winner
// need to get a return nobody
// need to stop the game from registering inputs once winner has been called
function checkWinner() {
    console.log("checkWinner was called")
    if (board[0][0] === board[0][1] && board [0][0] === board [0][2] && board[0][0] != null){
        if (noughtsTurn){
            console.log("winner found")
            return winner = 'crosses';}
        else {
            console.log("winner found")
            return winner = 'noughts' // 1
        }
    }
    if (board[1][0] === board[1][1] && board [1][0] === board [1][2] && board[1][0] != null){
        if (noughtsTurn){
            return winner = 'crosses'}
        else {
            return winner = 'noughts' // 2
        }
    }
    if (board[2][0] === board[2][1] && board [2][0] === board [2][2] && board[2][0] != null){
        if (noughtsTurn){
            return winner = 'crosses'}
        else {
            return winner = 'noughts' // 3
        }
    }
    if (board[0][0] === board[1][0] && board [0][0] === board [2][0] && board[0][0] != null){
        if (noughtsTurn){
            return winner = 'crosses'}
        else {
            return winner = 'noughts' // 4
        }
    }
    if (board[0][1] === board[1][1] && board [0][1] === board [2][1] && board[0][1] != null){
        if (noughtsTurn){
            return winner = 'crosses'}
        else {
            return winner = 'noughts' // 5
        }
    }
    if (board[0][2] === board[1][2] && board [0][2] === board [2][2] && board[0][2] != null){
        if (noughtsTurn){
            return winner = 'crosses'}
        else {
            return winner = 'noughts' // 6
        }
    }
    if (board[0][0] === board[1][1] && board [0][0] === board [2][2] && board[0][0] != null){
        if (noughtsTurn){
            return winner = 'crosses'}
        else {
            return winner = 'noughts' // 7
        }
    }
    if (board[0][2] === board[1][1] && board [0][2] === board [2][0] && board[0][2] != null){
        if (noughtsTurn){
            return winner = 'crosses'}
        else {
            return winner = 'noughts' // 8
        }
    } else {
        return null
    };
    }




// Set the game state back to its original state to play another game.
// WORKING
function resetGame() {
    console.log("resetGame was called");
    board = [[null, null, null], [null, null, null], [null, null, null]]
    noughtsTurn = false
    drawCounter = 0
}

// Return the current board state with either a "nought" or a "cross" in
// each position. Put a null in a position that hasn't been played yet.
// WORKING
function getBoard() {
    console.log("getBoard was called");
    return board
}


// board that will be called upon when game is reset
// dont need this i dont think
//  function getNewBoard() {
    // console.log("getNewBoard was called");
    // return [[null, null, null], [null, null, null], [null, null, null]];
// }



// dont worry about this
if (typeof exports === 'object') {
    console.log("Running in Node")
    // Node. Does not work with strict CommonJS, but only CommonJS-like
    // environments that support module.exports, like Node.
    module.exports = {
        takeTurn,
        checkWinner,
        resetGame,
        getBoard,
    }
} else {
    console.log("Running in Browser")
}
