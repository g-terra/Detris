import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TetrisGame } from '../tetris-game'

describe('TetrisGame', () => {
  it('renders the game layout with all essential elements', () => {
    render(<TetrisGame />)
    
    // Check for game title
    expect(screen.getByTestId('game-title')).toHaveTextContent('DETRIS')
    
    // Check for game grid
    const grid = screen.getByTestId('game-grid')
    expect(grid).toBeInTheDocument()
    
    // Check for score display
    expect(screen.getByText('SCORE')).toBeInTheDocument()
    expect(screen.getByTestId('score-value')).toHaveTextContent('000000')
    
    // Check for next piece preview
    expect(screen.getByText('NEXT')).toBeInTheDocument()
    expect(screen.getByTestId('next-piece-preview')).toBeInTheDocument()
  })

  it('renders the correct number of grid cells', () => {
    render(<TetrisGame />)
    
    // Check for 10x20 grid cells
    const gridCells = screen.getAllByRole('gridcell')
    expect(gridCells).toHaveLength(200)
  })

  it('applies custom className when provided', () => {
    const customClass = 'custom-class'
    render(<TetrisGame className={customClass} />)
    
    expect(screen.getByTestId('tetris-game')).toHaveClass(customClass)
  })
}) 