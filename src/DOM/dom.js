import Player from '../models/player.js';

const DOM = (() => {
  // Create the main game container div
  const gameContainer = () => {
    const container = document.createElement('div');
    container.id = 'game-container';
    return container;
  };

  // Create a board element for a player
  const boardElement = (playerId) => {
    const board = document.createElement('div');
    board.className = 'board';
    board.id = `board-${playerId}`;
    board.innerHTML = `<h2>${playerId.charAt(0).toUpperCase() + playerId.slice(1)} Player Board</h2>`;
    return board;
  };

  // Create a display for the player type
  const playerDisplay = (playerType) => {
    const display = document.createElement('div');
    display.className = 'player-display';
    display.textContent = `${playerType} Player`;
    return display;
  };

  // Render a gameboard grid with ships and attacks
  const renderBoard = (gameboard) => {
    const grid = document.createElement('div');
    grid.className = 'board-grid';

    for (let y = 0; y < gameboard.size; y += 1) {
      for (let x = 0; x < gameboard.size; x += 1) {
        const cell = document.createElement('div');
        cell.className = 'board-cell';
        cell.dataset.x = x;
        cell.dataset.y = y;

        const key = x + ',' + y;
        const isAttacked = gameboard.attacked.indexOf(key) !== -1;
        const hasMissed = gameboard.missedAttacks.some(coord => coord[0] === x && coord[1] === y);

        // Check if cell has a ship
        let hasShip = false;
        for (let i = 0; i < gameboard.ships.length; i += 1) {
          const coords = gameboard.ships[i].coordinates;
          for (let j = 0; j < coords.length; j += 1) {
            if (coords[j][0] === x && coords[j][1] === y) {
              hasShip = true;
              break;
            }
          }
          if (hasShip) break;
        }

        if (hasMissed) {
          cell.classList.add('miss');
          cell.textContent = '✗';
        } else if (isAttacked && hasShip) {
          cell.classList.add('hit');
          cell.textContent = '●';
        } else if (hasShip) {
          cell.classList.add('ship');
          cell.textContent = '■';
        }

        grid.appendChild(cell);
      }
    }

    return grid;
  };

  // Initialize the DOM with game elements
  const init = () => {
    const body = document.body;
    body.innerHTML = '';

    const container = gameContainer();

    // Create real player
    const realPlayer = new Player('real');
    placeShips(realPlayer, [
      { length: 5, coordinates: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]] },
      { length: 4, coordinates: [[0, 2], [0, 3], [0, 4], [0, 5]] },
      { length: 3, coordinates: [[2, 5], [2, 6], [2, 7]] },
      { length: 2, coordinates: [[5, 0], [5, 1]] },
    ]);

    const realBoard = boardElement('real');
    realBoard.appendChild(playerDisplay('Real'));
    realBoard.appendChild(renderBoard(realPlayer.gameboard));
    container.appendChild(realBoard);

    // Create computer player
    const computerPlayer = new Player('computer');
    placeShips(computerPlayer, [
      { length: 5, coordinates: [[9, 9], [8, 9], [7, 9], [6, 9], [5, 9]] },
      { length: 4, coordinates: [[9, 6], [9, 5], [9, 4], [9, 3]] },
      { length: 3, coordinates: [[6, 2], [6, 3], [6, 4]] },
      { length: 2, coordinates: [[2, 2], [3, 2]] },
    ]);

    const computerBoard = boardElement('computer');
    computerBoard.appendChild(playerDisplay('Computer'));
    computerBoard.appendChild(renderBoard(computerPlayer.gameboard));
    container.appendChild(computerBoard);

    body.appendChild(container);

    return { realPlayer, computerPlayer };
  };

  const placeShips = (player, shipPlacements) => {
    for (let i = 0; i < shipPlacements.length; i += 1) {
      const placement = shipPlacements[i];
      player.gameboard.placeShip(placement.length, placement.coordinates);
    }
  };

  return {
    init,
  };
})();

export default DOM;
