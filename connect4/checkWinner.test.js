const checkWinner = require("./checkWinner"); 

// import checkWinnerHorizontal from "./checkWinner.js"

test("checkWinnerHorizontal should return red if there are 4 reds in a row", () => {
    // Arrange
    const board = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, "red", "red", "red", "red"],
    ]
    const winnerRed = null
    const expectedReult = "red"
    // Act
    const result = checkWinner.checkWinnerHorizontal(board)
    console.log(result)

    // Assert
    expect(result).toEqual(expectedReult)


})


test("checkWinnerHorizontal should return yellow if there are 4 yellows in a row", () => {
    // Arrange
    const board = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, "yellow", "yellow", "yellow", "yellow"],
    ]
    const winnerRed = null
    const expectedReult = "yellow"
    // Act
    const result = checkWinner.checkWinnerHorizontal(board)
    console.log(result)

    // Assert
    expect(result).toEqual(expectedReult)


})
