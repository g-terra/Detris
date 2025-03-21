import { TetriminoState, Position } from './types';

export function getTetriminoPositions(tetrimino: TetriminoState): Position[] {
  const positions: Position[] = [];
  
  for (let y = 0; y < tetrimino.shape.length; y++) {
    for (let x = 0; x < tetrimino.shape[y].length; x++) {
      if (tetrimino.shape[y][x] !== 0) {
        positions.push({
          x: tetrimino.position.x + x,
          y: tetrimino.position.y + y,
        });
      }
    }
  }
  
  return positions;
} 