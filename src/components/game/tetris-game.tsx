import { GAME_COLORS } from "@/lib/constants/colors"
import { cn } from "@/lib/utils"
import { GameGrid } from "./game-grid"
import { NextPiece } from "./next-piece"
import { ScoreDisplay } from "./score-display"

interface TetrisGameProps {
  /** Optional className for styling the container */
  className?: string
}

/**
 * Main Tetris game component that combines the game grid, score display,
 * and next piece preview in a retro Game Boy style layout
 */
export function TetrisGame({ className }: TetrisGameProps) {
  // In the future, these will come from game state
  const currentScore = 0

  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center min-h-screen",
        className
      )}
      style={{ backgroundColor: GAME_COLORS.background }}
      data-testid="tetris-game"
    >
      <div className="flex flex-col items-center gap-4">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: GAME_COLORS.text }}
          data-testid="game-title"
        >
          DETRIS
        </h1>
        
        <div className="flex gap-8">
          <GameGrid />
          
          <div className="space-y-8">
            <ScoreDisplay score={currentScore} />
            <NextPiece />
          </div>
        </div>
      </div>
    </div>
  )
} 