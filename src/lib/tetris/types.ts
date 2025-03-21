export type Position = {
  x: number;
  y: number;
};

export type Rotation = 0 | 90 | 180 | 270;

export type TetriminoType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';

export type TetriminoShape = readonly (readonly number[])[];

export interface Tetrimino {
  type: TetriminoType;
  position: Position;
  rotation: Rotation;
  shape: TetriminoShape;
}

export type GameCell = {
  filled: boolean;
  color: string | null;
};

export type GameBoard = GameCell[][];

export interface GameState {
  board: GameBoard;
  currentPiece: Tetrimino | null;
  nextPiece: Tetrimino | null;
  score: number;
  isGameOver: boolean;
}

export interface TetriminoState {
  position: Position;
  rotation: number; // 0, 1, 2, or 3 (0° to 270°)
  shape: number[][];
  type: TetriminoType;
}

export enum TetriminoType {
  I = 'I',
  J = 'J',
  L = 'L',
  O = 'O',
  S = 'S',
  T = 'T',
  Z = 'Z',
}

// Color mapping for each Tetrimino type
export const TETRIMINO_COLORS: Record<TetriminoType, string> = {
  [TetriminoType.I]: '#00f0f0', // Cyan
  [TetriminoType.J]: '#0000f0', // Blue
  [TetriminoType.L]: '#f0a000', // Orange
  [TetriminoType.O]: '#f0f000', // Yellow
  [TetriminoType.S]: '#00f000', // Green
  [TetriminoType.T]: '#a000f0', // Purple
  [TetriminoType.Z]: '#f00000', // Red
}; 