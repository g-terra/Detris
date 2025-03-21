/**
 * Game color theme based on the Game Boy color palette
 */
export const GAME_COLORS = {
  /** Main background color - Game Boy's light green */
  background: '#8B956D',
  /** Grid lines and secondary elements - slightly lighter green */
  secondary: '#9BA37E',
  /** Text and borders - almost black */
  text: '#1F1F1F',
  
  // Tetrimino colors (darker Game Boy-like palette)
  cyan: "#2D5459",    // I piece - darker teal
  yellow: "#6B6B4C",  // O piece - muted gold
  purple: "#4C3866",  // T piece - deep purple
  green: "#3F592D",   // S piece - forest green
  red: "#663F3F",     // Z piece - dark red
  blue: "#2D3F59",    // J piece - navy blue
  orange: "#664C2D"   // L piece - dark orange
} as const 