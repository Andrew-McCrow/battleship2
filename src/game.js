const Game = (() => {
  let realPlayer;
  let computerPlayer;
  let currentPlayer;
  let gameOver = false;

  const init = (real, computer) => {
    realPlayer = real;
    computerPlayer = computer;
    currentPlayer = realPlayer;
    gameOver = false;
  };

  const isGameOver = () => {
    return realPlayer.gameboard.allShipsSunk() || computerPlayer.gameboard.allShipsSunk();
  };

  const getCurrentPlayer = () => {
    return currentPlayer;
  };

  const getOpponent = (player) => {
    return player === realPlayer ? computerPlayer : realPlayer;
  };

  const endTurn = () => {
    currentPlayer = currentPlayer === realPlayer ? computerPlayer : realPlayer;
  };

  const handleAttack = (coordinates) => {
    if (gameOver) {
      return null;
    }

    const opponent = getOpponent(currentPlayer);
    const result = currentPlayer.attackOpponent(opponent, coordinates);

    if (result.result === 'repeat') {
      return { error: 'Already attacked this location' };
    }

    if (isGameOver()) {
      gameOver = true;
      return { ...result, gameOver: true, winner: currentPlayer };
    }

    endTurn();

    // Computer makes automatic attack
    if (currentPlayer.isComputer()) {
      const computerCoord = currentPlayer.getRandomAttackCoordinates();
      return handleAttack(computerCoord);
    }

    return result;
  };

  return {
    init,
    isGameOver,
    getCurrentPlayer,
    getOpponent,
    handleAttack,
  };
})();

export default Game;
