import Ship from '../src/models/ship.js';

describe('Ship', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3); // Create a ship with length 3
  });

  describe('hit()', () => {
    it('should increase the hit count when hit() is called', () => {
      ship.hit();
      expect(ship.hits).toBe(1);
    });

    it('should increase hit count multiple times', () => {
      ship.hit();
      ship.hit();
      ship.hit();
      expect(ship.hits).toBe(3);
    });
  });

  describe('isSunk()', () => {
    it('should return false when ship has not been hit', () => {
      expect(ship.isSunk()).toBe(false);
    });

    it('should return false when ship has been hit fewer times than its length', () => {
      ship.hit();
      ship.hit();
      expect(ship.isSunk()).toBe(false);
    });

    it('should return true when ship has been hit as many times as its length', () => {
      ship.hit();
      ship.hit();
      ship.hit();
      expect(ship.isSunk()).toBe(true);
    });

    it('should return true when ship has been hit more times than its length', () => {
      ship.hit();
      ship.hit();
      ship.hit();
      ship.hit();
      expect(ship.isSunk()).toBe(true);
    });
  });

  describe('Ship with different lengths', () => {
    it('should work correctly for a ship of length 1', () => {
      const singleShip = new Ship(1);
      expect(singleShip.isSunk()).toBe(false);
      singleShip.hit();
      expect(singleShip.isSunk()).toBe(true);
    });

    it('should work correctly for a ship of length 5', () => {
      const largeShip = new Ship(5);
      for (let i = 0; i < 4; i++) {
        largeShip.hit();
        expect(largeShip.isSunk()).toBe(false);
      }
      largeShip.hit();
      expect(largeShip.isSunk()).toBe(true);
    });
  });
});
