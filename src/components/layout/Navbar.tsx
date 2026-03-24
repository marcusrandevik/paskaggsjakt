import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-surface/80 backdrop-blur-md border-b border-surface-container-highest">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <span className="text-3xl font-bold text-primary italic font-headline">Påskäggsjakt</span>
        </div>
      </div>
    </nav>
  );
};
