import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TetrisGame } from '../tetris-game'
import { BrowserRouter } from 'react-router-dom'

describe('TetrisGame', () => {
  const renderWithRouter = (ui: React.ReactNode) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>)
  }

  it('renders the game layout with all essential elements', () => {
    renderWithRouter(<TetrisGame />)
    
    // Check for game title
    expect(screen.getByTestId('game-title')).toHaveTextContent('DETRIS')
    
    // Check for game grid
    const grid = screen.getByTestId('game-grid')
    expect(grid).toBeInTheDocument()
    
    // Check for score display
    expect(screen.getByText('SCORE')).toBeInTheDocument()
    expect(screen.getByTestId('score-value')).toHaveTextContent('000000')
    
    // Check for next piece preview
    expect(screen.getByText('Next Piece')).toBeInTheDocument()
    expect(screen.getByTestId('next-piece-preview')).toBeInTheDocument()
  })

  it('renders the correct number of grid cells', () => {
    renderWithRouter(<TetrisGame />)
    const cells = screen.getAllByTestId('grid-cell')
    expect(cells).toHaveLength(200) // 10x20 grid
  })

  it('applies custom className when provided', () => {
    renderWithRouter(<TetrisGame className="custom-class" />)
    const container = screen.getByTestId('tetris-game')
    expect(container).toHaveClass('custom-class')
  })
}) 