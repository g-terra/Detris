import { describe, test, expect } from 'vitest';
import { TETRIMINO_SHAPES, TETRIMINO_COLORS } from '../constants';
import { GAME_COLORS } from '@/lib/constants/colors';

describe('Tetrimino Constants', () => {
  describe('TETRIMINO_SHAPES', () => {
    test('has all required tetrimino types', () => {
      const expectedTypes = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
      expect(Object.keys(TETRIMINO_SHAPES)).toEqual(expect.arrayContaining(expectedTypes));
    });

    test('all shapes are 4x4 matrices', () => {
      Object.values(TETRIMINO_SHAPES).forEach(shape => {
        expect(shape.length).toBe(4);
        shape.forEach(row => {
          expect(row.length).toBe(4);
        });
      });
    });

    test('each shape contains exactly 4 blocks', () => {
      Object.values(TETRIMINO_SHAPES).forEach(shape => {
        const blockCount = shape.flat().filter(cell => cell === 1).length;
        expect(blockCount).toBe(4);
      });
    });
  });

  describe('TETRIMINO_COLORS', () => {
    test('has matching colors for all shapes', () => {
      expect(Object.keys(TETRIMINO_COLORS)).toEqual(Object.keys(TETRIMINO_SHAPES));
    });

    test('uses correct colors from GAME_COLORS', () => {
      expect(TETRIMINO_COLORS.I).toBe(GAME_COLORS.cyan);
      expect(TETRIMINO_COLORS.O).toBe(GAME_COLORS.yellow);
      expect(TETRIMINO_COLORS.T).toBe(GAME_COLORS.purple);
      expect(TETRIMINO_COLORS.S).toBe(GAME_COLORS.green);
      expect(TETRIMINO_COLORS.Z).toBe(GAME_COLORS.red);
      expect(TETRIMINO_COLORS.J).toBe(GAME_COLORS.blue);
      expect(TETRIMINO_COLORS.L).toBe(GAME_COLORS.orange);
    });
  });
}); 