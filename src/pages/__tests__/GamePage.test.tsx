import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import GamePage from '../GamePage';
import { PageTitleProvider } from '@contexts/PageTitleContext';

// Mock the usePageTitle hook
const mockSetTitle = vi.fn();
vi.mock('@contexts/PageTitleContext', () => ({
  usePageTitle: () => ({
    setTitle: mockSetTitle,
    title: '',
  }),
  PageTitleProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('GamePage', () => {
  beforeEach(() => {
    mockSetTitle.mockClear();
  });

  it('renders the game grid placeholder', () => {
    render(
      <PageTitleProvider>
        <GamePage />
      </PageTitleProvider>
    );
    
    expect(screen.getByText('Game Grid Placeholder')).toBeInTheDocument();
  });

  it('has the correct container style', () => {
    render(
      <PageTitleProvider>
        <GamePage />
      </PageTitleProvider>
    );
    
    const container = screen.getByText('Game Grid Placeholder').parentElement;
    expect(container).toHaveClass('w-full', 'max-w-md', 'bg-white', 'p-4', 'rounded', 'shadow');
  });

  it('sets the correct page title', () => {
    render(
      <PageTitleProvider>
        <GamePage />
      </PageTitleProvider>
    );
    
    expect(mockSetTitle).toHaveBeenCalledWith('Game');
  });
}); 