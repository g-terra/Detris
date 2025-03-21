import { GAME_COLORS } from "@/lib/constants/colors"
import { cn } from "@/lib/utils"
import { Tetrimino, Position } from "@/lib/tetris/types"
import { TETRIMINO_COLORS } from "@/lib/tetris/constants"
import { rotateTetrimino } from "@/lib/tetris/rotation"
import { getGhostPiecePosition, getTetriminoPositions } from "@/lib/tetris/collision"

interface GameGridProps {
  className?: string
  currentPiece?: Tetrimino | null
  board?: (0 | 1)[][]
  showGhost?: boolean
}

/**
 * Renders the main Tetris game grid with a 10x20 layout
 */
export function GameGrid({ 
  className, 
  currentPiece, 
  board = Array(20).fill(0).map(() => Array(10).fill(0)),
  showGhost = true 
}: GameGridProps) {
  // Create empty grid cells
  const gridCells = Array.from({ length: 20 }).map((_, y) => 
    Array.from({ length: 10 }).map((_, x) => (
      <div
        key={`${x}-${y}`}
        className="w-[30px] h-[30px] border border-gray-700"
      />
    ))
  )

  // Calculate ghost piece position if we have a current piece
  const ghostPiece = currentPiece ? {
    ...currentPiece,
    position: getGhostPiecePosition(board, currentPiece)
  } : null

  return (
    <div 
      className={cn(
        "relative grid grid-cols-10 gap-0 border-4 rounded-lg",
        "w-[308px] h-[608px]", // 300px + 8px for borders
        className
      )}
      style={{ 
        backgroundColor: GAME_COLORS.background,
        borderColor: GAME_COLORS.text
      }}
    >
      {/* Grid cells */}
      {gridCells}

      {/* Ghost piece */}
      {showGhost && ghostPiece && rotateTetrimino(ghostPiece.shape, ghostPiece.rotation).flatMap((row, y) =>
        row.map((cell, x) => 
          cell ? (
            <div
              key={`ghost-${x}-${y}`}
              className="absolute w-[30px] h-[30px] border border-gray-700"
              style={{
                backgroundColor: GAME_COLORS.secondary,
                left: `${(x + ghostPiece.position.x) * 30}px`,
                top: `${(y + ghostPiece.position.y) * 30}px`
              }}
            />
          ) : null
        )
      ).filter(Boolean)}

      {/* Current piece */}
      {currentPiece && rotateTetrimino(currentPiece.shape, currentPiece.rotation).flatMap((row, y) =>
        row.map((cell, x) => 
          cell ? (
            <div
              key={`piece-${x}-${y}`}
              className="absolute w-[30px] h-[30px] border border-gray-700"
              style={{
                backgroundColor: TETRIMINO_COLORS[currentPiece.type],
                left: `${(x + currentPiece.position.x) * 30}px`,
                top: `${(y + currentPiece.position.y) * 30}px`
              }}
            />
          ) : null
        )
      ).filter(Boolean)}

      {/* Placed blocks */}
      {board.flatMap((row, y) =>
        row.map((cell, x) => 
          cell === 1 ? (
            <div
              key={`placed-${x}-${y}`}
              className="absolute w-[30px] h-[30px] border border-gray-700"
              style={{
                backgroundColor: GAME_COLORS.cyan,
                left: `${x * 30}px`,
                top: `${y * 30}px`
              }}
            />
          ) : null
        )
      ).filter(Boolean)}
    </div>
  )
} 