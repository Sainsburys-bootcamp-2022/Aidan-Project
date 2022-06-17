// let board = require("./connect4")
import {board} from './connect4.js'

function checkWinnerHorizontal() {
    for (let row = 0; row < 6; row++) {
        for (let column = 0; column < 4; column++) {
            if (board[row][column] === "red" && board[row][column + 1] === "red") {
                if (board[row][column] === "red" && board[row][column + 2] === "red") {
                    if (board[row][column] === "red" && board[row][column + 3] === "red") {
                        return "red"
                    }
                }
            }
            if (board[row][column] === "yellow" && board[row][column + 1] === "yellow") {
                if (board[row][column] === "yellow" && board[row][column + 2] === "yellow") {
                    if (board[row][column] === "yellow" && board[row][column + 3] === "yellow") {
                        return "yellow"
                    }
                }
            }
        }
    } 
    return false
}

function checkWinnerVertical() {
    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 7; column++) {
            if (board[row][column] === "red" && board[row + 1][column] === "red") {
                if (board[row][column] === "red" && board[row + 2][column] === "red") {
                    if (board[row][column] === "red" && board[row + 3][column] === "red") {
                        return "red"
                    }
                }
            }
            else if (board[row][column] === "yellow" && board[row + 1][column] === "yellow") {
                if (board[row][column] === "yellow" && board[row + 2][column] === "yellow") {
                    if (board[row][column] === "yellow" && board[row + 3][column] === "yellow") {
                        return "yellow"
                    }
                }
            }
        }
    }
    return false
}

function checkWinnerDiagDown() {
    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 3; column++) {
            if (board[row][column] === "red" && board[row + 1][column + 1] === "red") {
                if (board[row][column] === "red" && board[row + 2][column + 2] === "red") {
                    if (board[row][column] === "red" && board[row + 3][column + 3] === "red") {
                        return "red"
                    }
                }
            }
            else if (board[row][column] === "yellow" && board[row + 1][column + 1] === "yellow") {
                if (board[row][column] === "yellow" && board[row + 2][column + 2] === "yellow") {
                    if (board[row][column] === "yellow" && board[row + 3][column + 3] === "yellow") {
                        return "red"
                    }
                }
            }
        }
    }
    return false
}

function checkWinnerDiagUp() {
    for (let row = 3; row < 6; row++) {
        for (let column = 0; column < 4; column++) {
            if (board[row][column] === "red" && board[row - 1][column + 1] === "red") {
                if (board[row][column] === "red" && board[row - 2][column + 2] === "red") {
                    if (board[row][column] === "red" && board[row - 3][column + 3] === "red") {
                        return "red"
                    }
                }
            }
            else if (board[row][column] === "yellow" && board[row - 1][column + 1] === "yellow") {
                if (board[row][column] === "yellow" && board[row - 2][column + 2] === "yellow") {
                    if (board[row][column] === "yellow" && board[row - 3][column + 3] === "yellow") {
                        return "yellow"
                    }
                }
            }
        }
    }
    return false
}

// let board = [
//     [null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null],
// ]


// if (typeof exports === 'object') {
//     console.log("Running in Node")
//     module.exports = {
//         checkWinnerHorizontal,
//         checkWinnerVertical,
//         checkWinnerDiagDown,
//         checkWinnerDiagUp,
//     }
// } else {
//     console.log("Running in Browser")
// }

export {
            checkWinnerHorizontal,
            checkWinnerVertical,
            checkWinnerDiagDown,
            checkWinnerDiagUp,
        }
