import React from 'react';
import { Clue } from '../../types';
import { ClueCard } from './ClueCard';

interface ClueGridProps {
  clues: Clue[];
  letters: { [key: number]: string };
  validationStatuses: { [key: number]: 'success' | 'error' | null };
  onLetterChange: (id: number, value: string) => void;
  onValidate: (clue: Clue) => void;
  onImageClick: (clue: Clue) => void;
}

export const ClueGrid: React.FC<ClueGridProps> = ({
  clues,
  letters,
  validationStatuses,
  onLetterChange,
  onValidate,
  onImageClick,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {clues.map((clue, index) => (
        <ClueCard
          key={clue.id}
          clue={clue}
          index={index}
          letter={letters[clue.id] || ''}
          validationStatus={validationStatuses[clue.id] || null}
          onLetterChange={onLetterChange}
          onValidate={onValidate}
          onImageClick={onImageClick}
        />
      ))}
    </div>
  );
};
