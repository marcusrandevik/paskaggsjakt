import React from 'react';
import { motion } from 'motion/react';
import { Clue } from '../../types';

interface ClueCardProps {
  clue: Clue;
  index: number;
  letter: string;
  validationStatus: 'success' | 'error' | null;
  onLetterChange: (id: number, value: string) => void;
  onValidate: (clue: Clue) => void;
  onImageClick: (clue: Clue) => void;
}

export const ClueCard: React.FC<ClueCardProps> = ({
  clue,
  index,
  letter,
  validationStatus,
  onLetterChange,
  onValidate,
  onImageClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="group flex flex-col bg-surface-container-low rounded-xl overflow-hidden shadow-[0_4px_24px_rgba(54,46,28,0.04)] transition-transform hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={clue.image}
          alt={clue.alt}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover cursor-zoom-in group-hover:scale-105 transition-transform duration-500"
          onClick={() => onImageClick(clue)}
        />
        <div className="absolute top-4 right-4 bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-bold font-label">
          CLUE #{clue.id}
        </div>
      </div>
      <div className="p-8 flex flex-col gap-6">
        <div>
          <h3 className="font-headline text-2xl font-bold text-on-surface">{clue.title}</h3>
        </div>
        <div className="flex items-center gap-4">
          <label className="font-label text-sm font-bold text-tertiary uppercase tracking-wider">
            Bokstav
          </label>
          <div className="flex bg-surface-container-highest rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary/40 transition-shadow">
            <input
              type="text"
              maxLength={1}
              placeholder="?"
              value={letter}
              onChange={(e) => onLetterChange(clue.id, e.target.value)}
              className={`w-14 h-14 text-center text-2xl font-bold bg-transparent border-none focus:ring-0 placeholder-on-surface-variant/30 transition-colors ${
                validationStatus === 'success' ? 'text-green-500' :
                validationStatus === 'error' ? 'text-red-500' :
                'text-primary'
              }`}
            />
            <button
              onClick={() => onValidate(clue)}
              disabled={!letter}
              className="px-4 bg-primary/10 hover:bg-primary/20 text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium font-label uppercase tracking-wider text-sm flex items-center justify-center border-l border-surface/20"
            >
              Kontrollera
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
