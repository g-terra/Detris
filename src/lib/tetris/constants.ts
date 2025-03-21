import { GAME_COLORS } from "@/lib/constants/colors";
import { TetriminoType, TetriminoShape } from "./types";

export const TETRIMINO_SHAPES: Record<TetriminoType, TetriminoShape> = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  O: [
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  T: [
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0]
  ],
  S: [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0]
  ],
  Z: [
    [0, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
  ],
  J: [
    [0, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0]
  ],
  L: [
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0]
  ]
} as const;

export const TETRIMINO_COLORS: Record<TetriminoType, string> = {
  I: GAME_COLORS.cyan,
  O: GAME_COLORS.yellow,
  T: GAME_COLORS.purple,
  S: GAME_COLORS.green,
  Z: GAME_COLORS.red,
  J: GAME_COLORS.blue,
  L: GAME_COLORS.orange
}; 