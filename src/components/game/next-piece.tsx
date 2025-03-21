import { GAME_COLORS } from "@/lib/constants/colors"
import { Tetrimino } from "@/lib/tetris/types"
import { TETRIMINO_COLORS } from "@/lib/tetris/constants"

interface NextPieceProps {
  piece: Tetrimino | null;
}

/**
 * Displays the next Tetrimino piece that will appear in the game
 */
export function NextPiece({ piece }: NextPieceProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <h2 
        className="text-xl font-bold"
        style={{ color: GAME_COLORS.text }}
      >
        Next Piece
      </h2>
      <div 
        className="relative w-[120px] h-[120px] border-4 rounded-lg"
        style={{ 
          backgroundColor: GAME_COLORS.background,
          borderColor: GAME_COLORS.text
        }}
        data-testid="next-piece-preview"
      >
        {piece?.shape.map((row, y) =>
          row.map((cell, x) =>
            cell ? (
              <div
                key={`${x}-${y}`}
                className="absolute w-[30px] h-[30px] border border-gray-700"
                style={{
                  backgroundColor: TETRIMINO_COLORS[piece.type],
                  left: `${x * 30}px`,
                  top: `${y * 30}px`
                }}
                data-testid="piece-block"
              />
            ) : null
          )
        )}
      </div>
    </div>
  );
} 