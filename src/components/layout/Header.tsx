import React from 'react';
import { motion } from 'motion/react';

export const Header: React.FC = () => {
  return (
    <header className="mb-12">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-headline text-5xl md:text-6xl font-extrabold text-on-surface tracking-tight mb-4"
      >
        Åsas påskäggsjakt
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-on-surface-variant max-w-2xl text-lg leading-relaxed"
      >
        Lista ut var gömställerna är och ge er ut för att hitta påskäggen. Vid varje påskägg finns en bokstav och när du har alla bokstäver kan du försöka lista ut det slutgiltiga ordet!
      </motion.p>
    </header>
  );
};
