import Gameboard from './gameboard.js';

class Player {
  constructor(type, boardSize) {
    this.type = type || 'real';
    this.gameboard = new Gameboard(boardSize);
  }

  isComputer() {
    return this.type === 'computer';
  }
}

export default Player;
