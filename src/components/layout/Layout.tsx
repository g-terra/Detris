// src/components/Layout.tsx
import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gameboy-green flex flex-col items-center p-4 relative">
      {children}
    </div>
  );
};

export default Layout;
