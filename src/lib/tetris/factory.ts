import { Position, Tetrimino, TetriminoType } from "../types";
import { TETRIMINO_SHAPES } from "./constants";

export function createTetrimino(type: TetriminoType, position: Position = { x: 3, y: 0 }): Tetrimino {
  return {
    type,
    position,
    rotation: 0,
    shape: [...TETRIMINO_SHAPES[type].map(row => [...row])]
  };
}

export function getRandomTetriminoType(): TetriminoType {
  const types = Object.keys(TETRIMINO_SHAPES) as TetriminoType[];
  return types[Math.floor(Math.random() * types.length)];
}

export function moveTetrimino(
  tetrimino: Tetrimino,
  movement: Position
): Tetrimino {
  return {
    ...tetrimino,
    position: {
      x: tetrimino.position.x + movement.x,
      y: tetrimino.position.y + movement.y,
    },
  };
} 