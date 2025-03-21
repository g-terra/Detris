import { GAME_COLORS } from "@/lib/constants/colors"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
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
        <div className="flex items-center gap-4">
          <h1 
            className="text-4xl font-bold"
            style={{ color: GAME_COLORS.text }}
            data-testid="game-title"
          >
            DETRIS
          </h1>
          <Link 
            to="/debug"
            className="px-3 py-1 rounded text-sm"
            style={{ 
              backgroundColor: GAME_COLORS.text,
              color: GAME_COLORS.background
            }}
          >
            Debug Mode
          </Link>
        </div>
        
        <div className="flex gap-8">
          <GameGrid />
          
          <div className="space-y-8">
            <ScoreDisplay score={currentScore} />
            <NextPiece piece={null} />
          </div>
        </div>
      </div>
    </div>
  )
} 