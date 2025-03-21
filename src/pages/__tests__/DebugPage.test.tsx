import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DebugPage from '../DebugPage';
import { PageTitleProvider } from '@contexts/PageTitleContext';

// Mock the usePageTitle hook
vi.mock('@contexts/PageTitleContext', () => ({
  usePageTitle: () => ({
    setTitle: vi.fn(),
  }),
  PageTitleProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('DebugPage', () => {
  it('renders the debug page title', () => {
    render(
      <PageTitleProvider>
        <DebugPage />
      </PageTitleProvider>
    );
    
    expect(screen.getByText('Debug Page')).toBeInTheDocument();
  });

  it('renders the debug controls placeholder', () => {
    render(
      <PageTitleProvider>
        <DebugPage />
      </PageTitleProvider>
    );
    
    expect(screen.getByText('Debug Controls Placeholder')).toBeInTheDocument();
  });

  it('has the correct heading style', () => {
    render(
      <PageTitleProvider>
        <DebugPage />
      </PageTitleProvider>
    );
    
    const heading = screen.getByText('Debug Page');
    expect(heading.tagName).toBe('H2');
    expect(heading).toHaveClass('text-3xl', 'mb-4');
  });

  it('has the correct debug controls container style', () => {
    render(
      <PageTitleProvider>
        <DebugPage />
      </PageTitleProvider>
    );
    
    const container = screen.getByText('Debug Controls Placeholder').parentElement;
    expect(container).toHaveClass('w-full', 'max-w-md', 'bg-white', 'p-4', 'rounded', 'shadow', 'mb-4');
  });
}); 