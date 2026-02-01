import Player from '../src/player.js';
import Gameboard from '../src/gameboard.js';

describe('Player', () => {
  it('creates a real player with a gameboard by default', () => {
    const player = new Player();

    expect(player.type).toBe('real');
    expect(player.gameboard).toBeInstanceOf(Gameboard);
  });

  it('creates a computer player with its own gameboard', () => {
    const player = new Player('computer');

    expect(player.type).toBe('computer');
    expect(player.gameboard).toBeInstanceOf(Gameboard);
    expect(player.isComputer()).toBe(true);
  });
});
