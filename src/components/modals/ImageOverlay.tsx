import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Clue } from '../../types';

interface ImageOverlayProps {
  clue: Clue | null;
  onClose: () => void;
}

export const ImageOverlay: React.FC<ImageOverlayProps> = ({ clue, onClose }) => {
  return (
    <AnimatePresence>
      {clue && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-on-surface/90 backdrop-blur-xl flex flex-col items-center justify-center p-4"
        >
          <button
            onClick={onClose}
            className="absolute top-8 right-8 text-on-primary bg-primary/20 p-4 rounded-full hover:bg-primary/40 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <motion.img
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            src={clue.image}
            alt={clue.alt}
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[80vh] rounded-lg shadow-2xl object-contain"
          />
          <div className="mt-8 text-surface text-center">
            <h2 className="font-headline text-3xl font-bold mb-2">Map Detail: {clue.title}</h2>
            <p className="font-label opacity-70 text-lg">{clue.hint}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
