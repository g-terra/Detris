import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TetrisGame } from '../tetris-game'

describe('TetrisGame', () => {
  it('renders the game layout with all essential elements', () => {
    const { container } = render(<TetrisGame />)
    
    // Check for game info elements
    expect(screen.getByText(/score/i)).toBeInTheDocument()
    expect(screen.getByText(/next/i)).toBeInTheDocument()
    
    // Check for game grid
    const gridCells = container.querySelectorAll('.grid-cols-10 > div')
    expect(gridCells).toHaveLength(200) // 10x20 grid
    
    // Check for score display
    expect(container.querySelector('.font-mono')).toHaveTextContent('000000')
    
    // Check for next piece preview area
    expect(container.querySelector('.w-24.h-24')).toBeInTheDocument()
  })
}) 