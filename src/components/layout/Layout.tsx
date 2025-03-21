// src/components/Layout.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePageTitle } from '@contexts/PageTitleContext';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title } = usePageTitle();
  const showBackButton = location.pathname !== '/';

  return (
    <div className="min-h-screen bg-gameboy-green flex flex-col items-center p-4 relative">
      {showBackButton && (
        <button
          className="absolute top-4 left-4 px-4 py-2 border-2 border-gray-800 rounded hover:bg-gray-800 hover:text-white transition"
          onClick={() => navigate('/')}
        >
          Back
        </button>
      )}
      <h1 className="text-4xl font-bold mb-8">{title}</h1>
      {children}
    </div>
  );
};

export default Layout;
