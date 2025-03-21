import { Rotation, Tetrimino, TetriminoShape } from "../types";

export function rotateTetrimino(shape: TetriminoShape, rotation: Rotation): number[][] {
  // Special case for O piece - it doesn't rotate
  if (isOPiece(shape)) {
    return [...shape.map(row => [...row])];
  }

  const size = shape.length;
  const rotated = Array(size).fill(0).map(() => Array(size).fill(0));

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      switch (rotation) {
        case 90:
          rotated[x][size - 1 - y] = shape[y][x];
          break;
        case 180:
          rotated[size - 1 - y][size - 1 - x] = shape[y][x];
          break;
        case 270:
          rotated[size - 1 - x][y] = shape[y][x];
          break;
        default:
          rotated[y][x] = shape[y][x];
      }
    }
  }

  return rotated;
}

function isOPiece(shape: TetriminoShape): boolean {
  // O piece has a 2x2 block in the top-left corner of its 4x4 grid
  return (
    shape[0][1] === 1 && shape[0][2] === 1 &&
    shape[1][1] === 1 && shape[1][2] === 1
  );
}

export function getNextRotation(tetrimino: Tetrimino): Tetrimino {
  const nextRotation = ((tetrimino.rotation + 90) % 360) as Rotation;
  return {
    ...tetrimino,
    rotation: nextRotation,
    shape: rotateTetrimino(tetrimino.shape, tetrimino.rotation),
  };
} 