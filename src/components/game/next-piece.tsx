import { GAME_COLORS } from "@/lib/constants/colors"

/**
 * Displays the next Tetrimino piece that will appear in the game
 */
export function NextPiece() {
  return (
    <div style={{ color: GAME_COLORS.text }}>
      <div className="text-xl font-bold">NEXT</div>
      <div 
        className="w-24 h-24 mt-2 p-2 rounded-lg"
        style={{ backgroundColor: GAME_COLORS.text }}
        data-testid="next-piece-preview"
        aria-label="Next piece preview"
      >
        <div 
          className="w-full h-full"
          style={{ backgroundColor: GAME_COLORS.secondary }}
        />
      </div>
    </div>
  )
} 