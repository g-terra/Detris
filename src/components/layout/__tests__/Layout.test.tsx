import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Layout from '../Layout';
import { PageTitleProvider } from '@contexts/PageTitleContext';

// Mock child component for testing
const MockChild = () => <div>Child Content</div>;

// Wrapper component to provide necessary context and routing
const TestWrapper = ({ children, initialRoute = '/' }: { children: React.ReactNode; initialRoute?: string }) => (
  <MemoryRouter initialEntries={[initialRoute]}>
    <PageTitleProvider>
      <Routes>
        <Route path="*" element={children} />
      </Routes>
    </PageTitleProvider>
  </MemoryRouter>
);

describe('Layout', () => {
  it('renders children content', () => {
    render(
      <TestWrapper>
        <Layout>
          <MockChild />
        </Layout>
      </TestWrapper>
    );
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('displays the page title', () => {
    render(
      <TestWrapper>
        <Layout>
          <MockChild />
        </Layout>
      </TestWrapper>
    );
    expect(screen.getByText('Detris')).toBeInTheDocument();
  });

  it('hides back button on main page', () => {
    render(
      <TestWrapper initialRoute="/">
        <Layout>
          <MockChild />
        </Layout>
      </TestWrapper>
    );
    expect(screen.queryByText('Back')).not.toBeInTheDocument();
  });

  it('shows back button on game page', () => {
    render(
      <TestWrapper initialRoute="/game">
        <Layout>
          <MockChild />
        </Layout>
      </TestWrapper>
    );
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  it('shows back button on debug page', () => {
    render(
      <TestWrapper initialRoute="/debug">
        <Layout>
          <MockChild />
        </Layout>
      </TestWrapper>
    );
    expect(screen.getByText('Back')).toBeInTheDocument();
  });
}); 