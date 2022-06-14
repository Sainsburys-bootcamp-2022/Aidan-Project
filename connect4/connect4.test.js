const {stopGame} = require("./connect4");

//import {stopGame} from "./connect4.js"

test("the game should alert us when gameover exceeds a value of 1", () => {
    // Arrange
    const gameOver = 1
    const expectedResult = 2
    // Act
    const result = stopGame(gameOver)
    
    // Assert
    expect(result).toEqual(expectedResult)
})

