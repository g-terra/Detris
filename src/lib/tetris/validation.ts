import { TetriminoState, Position } from './types';
import { getTetriminoPositions } from './tetriminos';

export const PLAYFIELD_WIDTH = 10;
export const PLAYFIELD_HEIGHT = 20;

export function isWithinBounds(position: Position): boolean {
  return (
    position.x >= 0 &&
    position.x < PLAYFIELD_WIDTH &&
    position.y >= 0 &&
    position.y < PLAYFIELD_HEIGHT
  );
}

export function hasCollision(
  tetrimino: TetriminoState,
  playfield: number[][]
): boolean {
  const positions = getTetriminoPositions(tetrimino);

  return positions.some(
    (pos) =>
      !isWithinBounds(pos) || // Out of bounds
      (pos.y >= 0 && playfield[pos.y][pos.x] !== 0) // Collides with existing blocks
  );
}

export function canMoveDown(
  tetrimino: TetriminoState,
  playfield: number[][]
): boolean {
  const movedTetrimino = {
    ...tetrimino,
    position: {
      ...tetrimino.position,
      y: tetrimino.position.y + 1,
    },
  };

  return !hasCollision(movedTetrimino, playfield);
}

export function canMove(
  tetrimino: TetriminoState,
  movement: Position,
  playfield: number[][]
): boolean {
  const movedTetrimino = {
    ...tetrimino,
    position: {
      x: tetrimino.position.x + movement.x,
      y: tetrimino.position.y + movement.y,
    },
  };

  return !hasCollision(movedTetrimino, playfield);
}

export function canRotate(
  tetrimino: TetriminoState,
  rotatedShape: number[][],
  playfield: number[][]
): boolean {
  const rotatedTetrimino = {
    ...tetrimino,
    shape: rotatedShape,
  };

  return !hasCollision(rotatedTetrimino, playfield);
} 