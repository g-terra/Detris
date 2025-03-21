import { describe, test, expect } from 'vitest';
import { checkCollision, calculateHardDrop, getGhostPiecePosition, getTetriminoPositions } from '../collision';
import { createTetrimino } from '../factory';
import { Tetrimino } from '../types';

describe('Tetrimino Collision', () => {
  const emptyBoard = Array(20).fill(0).map(() => Array(10).fill(0));

  describe('checkCollision', () => {
    test('detects wall collision', () => {
      const piece = createTetrimino('I', { x: -1, y: 0 });
      expect(checkCollision(emptyBoard, piece)).toBe(true);
    });

    test('detects floor collision', () => {
      const piece = createTetrimino('O', { x: 4, y: 19 });
      expect(checkCollision(emptyBoard, piece)).toBe(true);
    });

    test('detects no collision in valid position', () => {
      const piece = createTetrimino('T', { x: 3, y: 0 });
      expect(checkCollision(emptyBoard, piece)).toBe(false);
    });

    test('detects collision with other pieces', () => {
      const board = Array(20).fill(0).map(() => Array(10).fill(0));
      board[5][5] = 1; // Place a block
      const piece = createTetrimino('T', { x: 4, y: 4 });
      expect(checkCollision(board, piece)).toBe(true);
    });
  });

  describe('calculateHardDrop', () => {
    test('calculates correct drop position on empty board', () => {
      const piece = createTetrimino('I', { x: 3, y: 0 });
      const dropPosition = calculateHardDrop(emptyBoard, piece);
      expect(dropPosition.y).toBe(18); // I piece should drop to y=18 on empty board
    });

    test('calculates drop position with obstacles', () => {
      const board = Array(20).fill(0).map(() => Array(10).fill(0));
      board[10].fill(1); // Create a line of blocks at y=10
      const piece = createTetrimino('O', { x: 4, y: 0 });
      const dropPosition = calculateHardDrop(board, piece);
      expect(dropPosition.y).toBe(8); // O piece should stop at y=8 above the line
    });

    test('maintains x position during hard drop', () => {
      const piece = createTetrimino('T', { x: 5, y: 0 });
      const dropPosition = calculateHardDrop(emptyBoard, piece);
      expect(dropPosition.x).toBe(5);
    });
  });

  describe('getGhostPiecePosition', () => {
    test('returns same position as hard drop', () => {
      const piece = createTetrimino('T', { x: 3, y: 0 });
      const ghostPosition = getGhostPiecePosition(emptyBoard, piece);
      const hardDropPosition = calculateHardDrop(emptyBoard, piece);
      expect(ghostPosition).toEqual(hardDropPosition);
    });
  });

  describe('getTetriminoPositions', () => {
    test('returns correct positions for T piece', () => {
      const piece = createTetrimino('T');
      const positions = getTetriminoPositions(piece);
      expect(positions).toHaveLength(4); // T piece has 4 blocks
      
      // Verify specific positions for T piece
      const expectedPositions = [
        { x: 4, y: 1 }, // Center
        { x: 3, y: 2 }, // Left
        { x: 4, y: 2 }, // Middle
        { x: 5, y: 2 }, // Right
      ];
      expect(positions).toEqual(expect.arrayContaining(expectedPositions));
    });

    test('returns positions adjusted by piece position', () => {
      const piece = createTetrimino('O', { x: 5, y: 5 });
      const positions = getTetriminoPositions(piece);
      expect(positions).toHaveLength(4); // O piece has 4 blocks
      
      // All positions should be offset by the piece position
      positions.forEach(pos => {
        expect(pos.x).toBeGreaterThanOrEqual(5);
        expect(pos.y).toBeGreaterThanOrEqual(5);
      });
    });
  });
}); 