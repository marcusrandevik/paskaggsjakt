import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 bg-surface-container-highest py-12 px-6 mt-20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
        <div className="flex flex-col gap-2">
          <span className="text-lg font-bold text-on-surface font-headline">Påskäggsjakt</span>
          <p className="font-body text-sm text-tertiary">
            © 2026 Marcus Randevik
          </p>
        </div>
      </div>
    </footer>
  );
};
