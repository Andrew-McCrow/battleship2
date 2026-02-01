import Gameboard from '../src/models/gameboard.js';

describe('Gameboard', () => {
	describe('placeShip()', () => {
		it('places a ship at specific coordinates', () => {
			const board = new Gameboard();
			const ship = board.placeShip(3, [
				[0, 0],
				[0, 1],
				[0, 2],
			]);

			expect(board.ships).toHaveLength(1);
			expect(board.ships[0].ship).toBe(ship);
		});

		it('throws if coordinates do not match ship length', () => {
			const board = new Gameboard();
			expect(() => board.placeShip(3, [[0, 0]])).toThrow();
		});

		it('throws if placement overlaps another ship', () => {
			const board = new Gameboard();
			board.placeShip(2, [
				[1, 1],
				[1, 2],
			]);

			expect(() =>
				board.placeShip(3, [
					[1, 2],
					[1, 3],
					[1, 4],
				])
			).toThrow();
		});
	});

	describe('receiveAttack()', () => {
		it('records a hit and calls hit on the correct ship', () => {
			const board = new Gameboard();
			const ship = board.placeShip(2, [
				[2, 2],
				[2, 3],
			]);

			const result = board.receiveAttack([2, 2]);

			expect(result.result).toBe('hit');
			expect(ship.hits).toBe(1);
		});

		it('records missed shots', () => {
			const board = new Gameboard();
			board.placeShip(2, [
				[2, 2],
				[2, 3],
			]);

			const result = board.receiveAttack([5, 5]);

			expect(result.result).toBe('miss');
			expect(board.missedAttacks).toEqual([[5, 5]]);
		});

		it('returns repeat if the same coordinate is attacked twice', () => {
			const board = new Gameboard();
			board.placeShip(2, [
				[0, 0],
				[0, 1],
			]);

			board.receiveAttack([0, 0]);
			const result = board.receiveAttack([0, 0]);

			expect(result.result).toBe('repeat');
		});
	});

	describe('allShipsSunk()', () => {
		it('returns false when at least one ship is still afloat', () => {
			const board = new Gameboard();
			board.placeShip(2, [
				[3, 3],
				[3, 4],
			]);

			board.receiveAttack([3, 3]);

			expect(board.allShipsSunk()).toBe(false);
		});

		it('returns true when all ships are sunk', () => {
			const board = new Gameboard();
			board.placeShip(1, [[7, 7]]);
			board.placeShip(2, [
				[1, 0],
				[1, 1],
			]);

			board.receiveAttack([7, 7]);
			board.receiveAttack([1, 0]);
			board.receiveAttack([1, 1]);

			expect(board.allShipsSunk()).toBe(true);
		});
	});
});
