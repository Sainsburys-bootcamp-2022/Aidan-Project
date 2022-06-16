const checkWinner = require("./checkWinner"); 

// import checkWinnerHorizontal from "./checkWinner.js"

test("checkWinnerHorizontal should return winnerRed = true if there are 4 reds in a row", () => {
    // Arrange
    const board = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, "red", "red", "red", null],
    ]
    const winnerRed = null
    const expectedReult = "red"
    // Act
    const result = checkWinner.checkWinnerHorizontal(board)
    console.log(result)

    // Assert
    expect(result).toEqual(expectedReult)


})
