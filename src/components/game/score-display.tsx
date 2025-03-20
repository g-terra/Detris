import { GAME_COLORS } from "@/lib/constants/colors"

interface ScoreDisplayProps {
  score: number
}

/**
 * Displays the current game score in a retro style format
 */
export function ScoreDisplay({ score }: ScoreDisplayProps) {
  const formattedScore = score.toString().padStart(6, '0')

  return (
    <div style={{ color: GAME_COLORS.text }}>
      <div className="text-xl font-bold">SCORE</div>
      <div 
        className="font-mono text-2xl"
        data-testid="score-value"
        aria-label={`Current score: ${formattedScore}`}
      >
        {formattedScore}
      </div>
    </div>
  )
} 