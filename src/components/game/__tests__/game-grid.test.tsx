import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GameGrid } from '../game-grid';
import { createTetrimino } from '@/lib/tetris/factory';
import { GAME_COLORS } from '@/lib/constants/colors';
import { TETRIMINO_COLORS } from '@/lib/tetris/constants';

describe('GameGrid', () => {
  const defaultProps = {
    currentPiece: {
      ...createTetrimino('T'),
      position: { x: 3, y: 0 },
      rotation: 0
    },
    board: Array(20).fill(0).map(() => Array(10).fill(0))
  };

  test('renders the game grid with correct dimensions', () => {
    render(<GameGrid {...defaultProps} />);
    
    // Check if the grid container exists
    const grid = screen.getByTestId('game-grid');
    expect(grid).toBeInTheDocument();
    
    // Check if the grid has the correct number of cells (20x10)
    const cells = screen.getAllByTestId('grid-cell');
    expect(cells).toHaveLength(200); // 20 rows * 10 columns
  });

  test('renders the current piece', () => {
    render(<GameGrid {...defaultProps} />);
    
    // T piece should have 4 blocks
    const pieceBlocks = screen.getAllByTestId('piece-block');
    expect(pieceBlocks).toHaveLength(4);
  });

  test('renders placed blocks on the board', () => {
    const boardWithBlocks = Array(20).fill(0).map(() => Array(10).fill(0));
    // Place a block at position (0,0)
    boardWithBlocks[0][0] = 1;
    
    render(<GameGrid {...defaultProps} board={boardWithBlocks} />);
    
    // Should have 5 blocks total (4 from current piece + 1 placed block)
    const allBlocks = screen.getAllByTestId('piece-block');
    expect(allBlocks).toHaveLength(5);
  });

  test('renders ghost piece', () => {
    render(<GameGrid {...defaultProps} />);
    
    // Ghost piece should have 4 blocks
    const ghostBlocks = screen.getAllByTestId('ghost-block');
    expect(ghostBlocks).toHaveLength(4);
  });

  test('applies correct colors to blocks', () => {
    render(<GameGrid {...defaultProps} />);
    
    // Check if current piece blocks have the correct color
    const pieceBlocks = screen.getAllByTestId('piece-block');
    pieceBlocks.forEach(block => {
      expect(block).toHaveStyle({ backgroundColor: TETRIMINO_COLORS['T'] });
    });

    // Check if ghost blocks have the correct color
    const ghostBlocks = screen.getAllByTestId('ghost-block');
    ghostBlocks.forEach(block => {
      expect(block).toHaveStyle({ backgroundColor: GAME_COLORS.secondary });
    });
  });
}); 