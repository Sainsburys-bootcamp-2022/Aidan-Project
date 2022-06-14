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

let board = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
]


if (typeof exports === 'object') {
    console.log("Running in Node")
    // Node. Does not work with strict CommonJS, but only CommonJS-like
    // environments that support module.exports, like Node.
    module.exports = {
        checkWinnerHorizontal,
    }
} else {
    console.log("Running in Browser")
}
