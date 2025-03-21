import { describe, test, expect } from 'vitest';
import { rotateTetrimino, getNextRotation } from '../rotation';
import { createTetrimino } from '../factory';

describe('Tetrimino Rotation', () => {
  describe('rotateTetrimino', () => {
    test('rotates T piece 90 degrees', () => {
      const shape = [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
      ];
      const expected = [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0]
      ];
      expect(rotateTetrimino(shape, 90)).toEqual(expected);
    });

    test('rotates I piece 180 degrees', () => {
      const shape = [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
      const expected = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0]
      ];
      expect(rotateTetrimino(shape, 180)).toEqual(expected);
    });

    test('rotates O piece (should remain unchanged)', () => {
      const shape = [
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
      expect(rotateTetrimino(shape, 90)).toEqual(shape);
    });

    test('rotates piece 270 degrees', () => {
      const shape = [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
      ];
      const expected = [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0]
      ];
      expect(rotateTetrimino(shape, 270)).toEqual(expected);
    });
  });

  describe('getNextRotation', () => {
    test('rotates piece by 90 degrees', () => {
      const piece = createTetrimino('T');
      const rotated = getNextRotation(piece);
      expect(rotated.rotation).toBe(90);
    });

    test('wraps rotation from 270 to 0', () => {
      const piece = createTetrimino('T');
      let rotated = piece;
      for (let i = 0; i < 4; i++) {
        rotated = getNextRotation(rotated);
      }
      expect(rotated.rotation).toBe(0);
    });

    test('preserves piece type and position when rotating', () => {
      const piece = createTetrimino('T', { x: 5, y: 5 });
      const rotated = getNextRotation(piece);
      expect(rotated.type).toBe(piece.type);
      expect(rotated.position).toEqual(piece.position);
    });
  });
}); 