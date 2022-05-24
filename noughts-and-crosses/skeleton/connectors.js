// This file contains helper code beyond the first week "Intro to JavaScript" course content.
// You should not have to make any changes in this file to get your game working.

// Validate academite functions are available
const functions = ["takeTurn", "getBoard", "checkWinner", "resetGame"]; // this line is showing an array of functions that are used throughout the program and is checking to make sure theyre all still present in academy
for (f of functions) { 
    const functionObject = window[f];
    if (typeof functionObject !== "function") {
        throw `Looks like expected function '${f}' is missing. Double check the function signatures from academy.js are still present and unaltered.`;
    }
}

// Clear down the elements drawn on the board.
function clearBoard() { // this line defines what function is being called
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) { // the start of this for loop suggests that the loop will run until it hits row 3, so will iterate through row 0, 1, 2. This will loop 3 times in total.
        for (let columnIndex = 0; columnIndex < 3; columnIndex++) { // this line is the same as above but instead for columns rather than rows, this will iterate 3 times per loop of the one above.
            document.getElementById(`row-${rowIndex}-column-${columnIndex}`).innerHTML = "" // this line refers to the html file which references each square individually, clears them as it iterates.
        }
    }
}

// Populate the grid with images based on the board state.
function drawBoard(board) { // this line defines the function and everything below is what will happen when its called on.
    clearBoard(); // this will call on the clearBoard function, once this has run it the function will move to the next line, the for loop.
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) { // this line is the outer most for loop and will run when everything else below has ran until rowIndex tries to turn to 3.
        for (let columnIndex = 0; columnIndex < 3; columnIndex++) { // this for line defines that the below if statement will run until columnIndex tries to hit 3.
            if (!board[rowIndex][columnIndex]) { // checking if the index stated is actually on the board
                continue; // will skip an iteration if the condition above is true.
            }
            const cellText = board[rowIndex][columnIndex] === "nought" ? "⭕" : "❌"; // defining the variable cellText, taking the row and column index and deciding whether it is equal to nought, if so draw O if false draw X.
            document.getElementById(`row-${rowIndex}-column-${columnIndex}`).innerText = cellText; // taking the above decision and showing it on the board by communicating with the html.
        }
    }
}

function isValidRowOrColumn(array) { // presumably the function for deciding if this row/column can have a piece placed in it.
    return Array.isArray(array) && array.length === 3; // not a clue, must be a check for the above?
}
// both of the are valiadations so dont need to worry about them
function isValidColumn(columnArray) { // similar to above?
    return isValidRowOrColumn(columnArray) && columnArray.every(function (item) { return ["nought", "cross", null].includes(item); });
}

// A grid position was clicked call the game's turn function, redraw and then check for a winner.
function positionClick(rowIndex, columnIndex, event) { // defining the function that will happen when a position is clicked, draws reference of where from row/column index, event is presumably onClick.
    // console.log("positionClick was called");
    takeTurn(rowIndex, columnIndex); // takeTurn function, need to build this in academy.
    //console.log("positionClick was called");
    const board = getBoard(); // board is a constant, getBoard pulls in the most up to date board that will update after each takeTurn, needs to be a let variable
    if (!isValidRowOrColumn(board) || !board.every(isValidColumn)) { // checking to see whether this position can be clicked or not
        throw "Expecting 'getBoard' to return a 2d array where all values match are null or one of the strings 'nought' or 'cross'. Actually received: " + JSON.stringify(board); // display this error message in console if above is true.
    }
    drawBoard(board); // calling the drawBoard function defined above.
    const winner = checkWinner(); // checking if there is a winner based on the parameters set in academy.
    if (winner) { // if the winning parameters are met run the following.
        if (typeof winner !== "string" || !["noughts", "crosses", "nobody"].includes(winner)) { // if parameters return that winner is not a string, or noughts crosses or nobody, return the below line, if not skip over it.
            throw "Expecting 'checkWinner' to return null or one of the strings 'noughts', 'crosses' or 'nobody'. Actually received: " + winner; // this will enter into the console?
        }
        const winnerName = document.getElementById("winner-name"); // this will edit the const winnerName
        winnerName.innerText = winner; // this will replace winnerName with winner?
        const winnerDisplay = document.getElementById("winner-display"); // not sure
        winnerDisplay.style.display = "block"; // this will change the winnerDisplay from being invisible to visible.
    }
}

// The reset button was clicked, call the game's reset function then reset the DOM.
function resetClick(event) { // the function to reset the board.
    resetGame(); // will reset the board, probably needs to be written in academy
    const winnerName = document.getElementById("winner-name"); // resets all the variables above that are changed when winner is declared
    winnerName.innerText = "";
    const winnerDisplay = document.getElementById("winner-display");
    winnerDisplay.style.display = "None";
    clearBoard(); // will call on the above clearBoard function
}

// Bind the click events for the grid.
for (let rowIndex = 0; rowIndex < 3; rowIndex++) { // will iterate through the loop until i = 3
    for (let columnIndex = 0; columnIndex < 3; columnIndex++) { // will iterate through the loop until i = 3
        const gridPosition = document.getElementById(`row-${rowIndex}-column-${columnIndex}`); // finds the grid position by communicating with the html file
        gridPosition.addEventListener("click", positionClick.bind(null, rowIndex, columnIndex)); // looking for a click on a position
    }
}

// Bind the click event for the reset button.
const resetButton = document.getElementById("reset-button"); // reset button
resetButton.addEventListener("click", resetClick); // waiting for button to be clicked

if (typeof exports === 'object') {
    console.log("Running in Node")
    // Node. Does not work with strict CommonJS, but only CommonJS-like 
    // environments that support module.exports, like Node.
    module.exports = {
        clearBoard,
        drawBoard,
        isValidRowOrColumn,
        isValidColumn,
        positionClick,
        resetClick,
    }
} else {
    console.log("Running in Browser")
}
