import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextPiece } from '../next-piece';
import { createTetrimino } from '@/lib/tetris/factory';
import { GAME_COLORS } from '@/lib/constants/colors';

describe('NextPiece', () => {
  test('renders the next piece preview', () => {
    const piece = createTetrimino('T');
    render(<NextPiece piece={piece} />);
    
    // Check if the preview container exists
    const preview = screen.getByTestId('next-piece-preview');
    expect(preview).toBeInTheDocument();
    
    // Check if the piece blocks are rendered
    const blocks = screen.getAllByTestId('piece-block');
    expect(blocks).toHaveLength(4); // T piece has 4 blocks
  });

  test('renders the "Next Piece" label', () => {
    const piece = createTetrimino('T');
    render(<NextPiece piece={piece} />);
    
    const label = screen.getByText('Next Piece');
    expect(label).toBeInTheDocument();
  });

  test('applies correct color to piece blocks', () => {
    const piece = createTetrimino('T');
    render(<NextPiece piece={piece} />);
    
    const blocks = screen.getAllByTestId('piece-block');
    blocks.forEach(block => {
      expect(block).toHaveStyle({ backgroundColor: GAME_COLORS.purple });
    });
  });

  test('renders with correct dimensions', () => {
    const piece = createTetrimino('T');
    render(<NextPiece piece={piece} />);
    
    const preview = screen.getByTestId('next-piece-preview');
    expect(preview).toHaveClass('w-[120px]', 'h-[120px]');
  });
}); 