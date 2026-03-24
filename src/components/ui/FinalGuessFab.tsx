import React from 'react';
import { motion } from 'motion/react';
import { Lightbulb } from 'lucide-react';

interface FinalGuessFabProps {
  onClick: () => void;
}

export const FinalGuessFab: React.FC<FinalGuessFabProps> = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-primary text-on-primary px-8 py-6 rounded-xl shadow-2xl hover:shadow-primary/20 transition-all group"
    >
      <Lightbulb className="w-8 h-8 fill-current" />
      <span className="font-headline font-bold text-lg tracking-wide uppercase">Final Guess</span>
    </motion.button>
  );
};
