import { GAME_COLORS } from "@/lib/constants/colors"
import { cn } from "@/lib/utils"

interface GameGridProps {
  className?: string
}

/**
 * Renders the main Tetris game grid with a 10x20 layout
 */
export function GameGrid({ className }: GameGridProps) {
  return (
    <div 
      className={cn("bg-[#1F1F1F] p-4 rounded-lg", className)}
      data-testid="game-grid"
    >
      <div 
        className="grid grid-cols-10 grid-rows-20 gap-px w-[300px] h-[600px]"
        style={{ backgroundColor: GAME_COLORS.secondary }}
        role="grid"
        aria-label="Tetris game grid"
      >
        {Array.from({ length: 200 }).map((_, i) => (
          <div 
            key={i}
            style={{ backgroundColor: GAME_COLORS.background }}
            data-testid={`grid-cell-${i}`}
            role="gridcell"
          />
        ))}
      </div>
    </div>
  )
} 