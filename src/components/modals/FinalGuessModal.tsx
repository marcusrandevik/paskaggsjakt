import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Clue } from '../../types';

interface FinalGuessModalProps {
  isOpen: boolean;
  onClose: () => void;
  clues: Clue[];
  validationStatuses: { [key: number]: 'success' | 'error' | null };
  finalGuess: string;
  finalValidationStatus: 'success' | 'error' | null;
  onFinalGuessChange: (value: string) => void;
  onFinalValidate: () => void;
}

export const FinalGuessModal: React.FC<FinalGuessModalProps> = ({
  isOpen,
  onClose,
  clues,
  validationStatuses,
  finalGuess,
  finalValidationStatus,
  onFinalGuessChange,
  onFinalValidate,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-surface/95 backdrop-blur-xl flex flex-col items-center justify-center p-4"
        >
          <button
            onClick={onClose}
            className="absolute top-8 right-8 text-on-surface bg-surface-container-highest p-4 rounded-full hover:bg-surface-container-highest/80 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-lg bg-surface-container-low rounded-3xl p-8 shadow-2xl flex flex-col gap-8 text-center border border-surface-container-highest"
          >
            <h2 className="font-headline text-4xl font-extrabold text-on-surface">Gissa det magiska ordet</h2>

            <div className="flex justify-center gap-4 flex-wrap">
              {clues.map(clue => {
                const isGuessed = validationStatuses[clue.id] === 'success';
                const letter = isGuessed ? clue.correctLetter : '?';
                return (
                  <div key={clue.id} className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold font-headline transition-colors ${isGuessed ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                    {letter}
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Gissa ordet..."
                value={finalGuess}
                onChange={(e) => onFinalGuessChange(e.target.value)}
                readOnly={finalValidationStatus === 'success'}
                className={`w-full px-6 py-4 text-center text-2xl font-bold bg-surface rounded-xl border focus:outline-none focus:ring-2 transition-colors uppercase ${finalValidationStatus === 'success' ? 'border-green-500 text-green-500 focus:ring-green-500/50 cursor-default' :
                  finalValidationStatus === 'error' ? 'border-red-500 text-red-500 focus:ring-red-500/50' :
                    'border-surface-container-highest text-on-surface focus:ring-primary/50 placeholder-on-surface-variant/30'
                  }`}
              />
              <button
                onClick={onFinalValidate}
                disabled={!finalGuess || finalValidationStatus === 'success'}
                className="w-full py-4 bg-primary text-on-primary rounded-xl font-headline font-bold text-lg uppercase tracking-wide hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {finalValidationStatus === 'success' ? 'KLAR' : 'Kontrollera'}
              </button>

              {finalValidationStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 p-4 bg-green-500/10 text-green-500 rounded-xl font-bold font-headline"
                >
                  🎉 Du gissade på rätt ord! 🎉
                </motion.div>
              )}
              {finalValidationStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 p-4 bg-red-500/10 text-red-500 rounded-xl font-bold font-headline"
                >
                  Inte riktigt rätt. Försök igen!
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
