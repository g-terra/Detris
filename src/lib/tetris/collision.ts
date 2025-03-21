import { Position, Tetrimino } from "../types";
import { rotateTetrimino } from "./rotation";

export function checkCollision(
  board: (0 | 1)[][],
  piece: Tetrimino,
  position: Position = piece.position
): boolean {
  const rotatedShape = rotateTetrimino(piece.shape, piece.rotation);

  for (let y = 0; y < rotatedShape.length; y++) {
    for (let x = 0; x < rotatedShape[y].length; x++) {
      if (rotatedShape[y][x]) {
        const newX = x + position.x;
        const newY = y + position.y;

        if (
          newX < 0 || 
          newX >= board[0].length ||
          newY >= board.length ||
          (newY >= 0 && board[newY][newX])
        ) {
          return true;
        }
      }
    }
  }

  return false;
}

export function calculateHardDrop(
  board: (0 | 1)[][],
  piece: Tetrimino
): Position {
  let dropPosition = { ...piece.position };
  
  // Keep moving down until collision
  while (!checkCollision(board, { ...piece, position: { ...dropPosition, y: dropPosition.y + 1 } })) {
    dropPosition.y += 1;
  }
  
  return dropPosition;
}

export function getGhostPiecePosition(
  board: (0 | 1)[][],
  piece: Tetrimino
): Position {
  return calculateHardDrop(board, piece);
}

export function getTetriminoPositions(tetrimino: Tetrimino): Position[] {
  const positions: Position[] = [];
  const shape = tetrimino.shape;

  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        positions.push({
          x: tetrimino.position.x + x,
          y: tetrimino.position.y + y,
        });
      }
    }
  }

  return positions;
} 