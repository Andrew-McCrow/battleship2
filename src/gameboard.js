import Ship from './ship.js';

class Gameboard {
    constructor(size) {
        // Default board size is 10x10
		this.size = typeof size === 'number' ? size : 10;
        // Array to hold ships with their coordinates
		this.ships = [];
        // Array to hold missed attack coordinates
		this.missedAttacks = [];
        // Array to hold all attacked coordinates
		this.attacked = [];
	}

    // Helper method to convert coordinates to a string key
	_toKey(coord) {
		return coord[0] + ',' + coord[1];
	}
    // Helper method to check if coordinates are within bounds
	_isInBounds(coord) {
		return (
			coord[0] >= 0 &&
			coord[1] >= 0 &&
			coord[0] < this.size &&
			coord[1] < this.size
		);
	}
    // Helper method to check if coordinates have already been attacked
	_wasAttacked(coord) {
		const key = this._toKey(coord);
		for (let i = 0; i < this.attacked.length; i += 1) {
			if (this.attacked[i] === key) {
				return true;
			}
		}
		return false;
	}
    // Helper method to check if coordinates are occupied by a ship
	_isOccupied(coord) {
		const key = this._toKey(coord);
		for (let i = 0; i < this.ships.length; i += 1) {
			const coords = this.ships[i].coordinates;
			for (let j = 0; j < coords.length; j += 1) {
				if (this._toKey(coords[j]) === key) {
					return true;
				}
			}
		}
		return false;
	}
    // Method to place a ship on the board
	placeShip(length, coordinates) {
		if (!Array.isArray(coordinates) || coordinates.length !== length) {
			throw new Error('Coordinates must match ship length.');
		}

		for (let i = 0; i < coordinates.length; i += 1) {
			if (!this._isInBounds(coordinates[i])) {
				throw new Error('Ship placement is out of bounds.');
			}
		}

		for (let j = 0; j < coordinates.length; j += 1) {
			if (this._isOccupied(coordinates[j])) {
				throw new Error('Ship placement overlaps an existing ship.');
			}
		}

		const ship = new Ship(length);
		this.ships.push({ ship: ship, coordinates: coordinates });
		return ship;
	}

    // Method to receive an attack at given coordinates
	receiveAttack(coordinates) {
		if (this._wasAttacked(coordinates)) {
			return { result: 'repeat' };
		}

		this.attacked.push(this._toKey(coordinates));

		for (let i = 0; i < this.ships.length; i += 1) {
			const coords = this.ships[i].coordinates;
			for (let j = 0; j < coords.length; j += 1) {
				if (this._toKey(coords[j]) === this._toKey(coordinates)) {
					this.ships[i].ship.hit();
					return { result: 'hit', ship: this.ships[i].ship };
				}
			}
		}

		this.missedAttacks.push(coordinates);
		return { result: 'miss' };
	}

    // Method to check if all ships are sunk on the board
	allShipsSunk() {
		for (let i = 0; i < this.ships.length; i += 1) {
			if (!this.ships[i].ship.isSunk()) {
				return false;
			}
		}
		return true;
	}
}

export default Gameboard;
