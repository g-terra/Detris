import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MainMenuPage from '../MainMenuPage';
import { PageTitleProvider } from '@contexts/PageTitleContext';

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

// Mock the usePageTitle hook
const mockSetTitle = vi.fn();
vi.mock('@contexts/PageTitleContext', () => ({
  usePageTitle: () => ({
    setTitle: mockSetTitle,
    title: '',
  }),
  PageTitleProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('MainMenuPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockSetTitle.mockClear();
  });

  it('renders the welcome message', () => {
    render(
      <PageTitleProvider>
        <MainMenuPage />
      </PageTitleProvider>
    );
    
    expect(screen.getByText('Welcome to Detris')).toBeInTheDocument();
  });

  it('renders the Start Game button', () => {
    render(
      <PageTitleProvider>
        <MainMenuPage />
      </PageTitleProvider>
    );
    
    expect(screen.getByText('Start Game')).toBeInTheDocument();
  });

  it('renders the Debug Mode button', () => {
    render(
      <PageTitleProvider>
        <MainMenuPage />
      </PageTitleProvider>
    );
    
    expect(screen.getByText('Debug Mode')).toBeInTheDocument();
  });

  it('navigates to game page when Start Game is clicked', () => {
    render(
      <PageTitleProvider>
        <MainMenuPage />
      </PageTitleProvider>
    );
    
    fireEvent.click(screen.getByText('Start Game'));
    expect(mockNavigate).toHaveBeenCalledWith('/game');
  });

  it('navigates to debug page when Debug Mode is clicked', () => {
    render(
      <PageTitleProvider>
        <MainMenuPage />
      </PageTitleProvider>
    );
    
    fireEvent.click(screen.getByText('Debug Mode'));
    expect(mockNavigate).toHaveBeenCalledWith('/debug');
  });

  it('sets the correct page title', () => {
    render(
      <PageTitleProvider>
        <MainMenuPage />
      </PageTitleProvider>
    );
    
    expect(mockSetTitle).toHaveBeenCalledWith('Detris');
  });

  it('has the correct button styles', () => {
    render(
      <PageTitleProvider>
        <MainMenuPage />
      </PageTitleProvider>
    );
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveClass(
        'px-6',
        'py-3',
        'bg-gray-800',
        'text-white',
        'rounded-lg',
        'hover:bg-gray-700',
        'transition'
      );
    });
  });

  it('has the correct layout structure', () => {
    render(
      <PageTitleProvider>
        <MainMenuPage />
      </PageTitleProvider>
    );
    
    const container = screen.getByText('Welcome to Detris').parentElement;
    expect(container).toHaveClass('flex', 'flex-col', 'items-center', 'gap-4');
  });
}); 