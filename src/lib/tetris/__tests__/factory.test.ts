import { describe, test, expect } from 'vitest';
import { createTetrimino, getRandomTetriminoType, moveTetrimino } from '../factory';
import { TETRIMINO_SHAPES } from '../constants';
import { Position } from '../types';

describe('Tetrimino Factory', () => {
  describe('createTetrimino', () => {
    test('creates a tetrimino with default position', () => {
      const tetrimino = createTetrimino('T');
      expect(tetrimino).toEqual({
        type: 'T',
        position: { x: 3, y: 0 },
        rotation: 0,
        shape: TETRIMINO_SHAPES.T
      });
    });

    test('creates a tetrimino with custom position', () => {
      const position = { x: 5, y: 2 };
      const tetrimino = createTetrimino('I', position);
      expect(tetrimino).toEqual({
        type: 'I',
        position,
        rotation: 0,
        shape: TETRIMINO_SHAPES.I
      });
    });
  });

  describe('getRandomTetriminoType', () => {
    test('returns a valid tetrimino type', () => {
      const validTypes = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
      const type = getRandomTetriminoType();
      expect(validTypes).toContain(type);
    });
  });

  describe('moveTetrimino', () => {
    test('moves tetrimino by given offset', () => {
      const piece = createTetrimino('T');
      const movement: Position = { x: 2, y: 3 };
      const moved = moveTetrimino(piece, movement);
      expect(moved.position).toEqual({
        x: piece.position.x + movement.x,
        y: piece.position.y + movement.y
      });
    });

    test('preserves other tetrimino properties when moving', () => {
      const piece = createTetrimino('T');
      const movement: Position = { x: 2, y: 3 };
      const moved = moveTetrimino(piece, movement);
      expect(moved.type).toBe(piece.type);
      expect(moved.rotation).toBe(piece.rotation);
      expect(moved.shape).toEqual(piece.shape);
    });
  });
}); 