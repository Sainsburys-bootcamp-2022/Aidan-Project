const stopGame = require("/connect4");

test("the game should alert us when gameover exceeds a value of 1", () => {
    // Arrange
    const gameOver = 1
    const expectedResult = 2
    // Act
    const result = stopGame.stopGame(gameOver)
    
    // Assert
    expect(result).toEqual(expectedResult)
})

