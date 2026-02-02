import Gameboard from './gameboard.js';

class Player {
  constructor(type, boardSize) {
    this.type = type || 'real';
    this.gameboard = new Gameboard(boardSize);
  }

  isComputer() {
    return this.type === 'computer';
  }

  attackOpponent(opponent, coordinates) {
    return opponent.gameboard.receiveAttack(coordinates);
  }

  getRandomAttackCoordinates() {
    let coord;
    do {
      coord = [
        Math.floor(Math.random() * this.gameboard.size),
        Math.floor(Math.random() * this.gameboard.size),
      ];
    } while (this.gameboard._wasAttacked(coord));

    return coord;
  }
}

export default Player;
