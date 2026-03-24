import { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { ClueGrid } from './components/clues/ClueGrid';
import { ImageOverlay } from './components/modals/ImageOverlay';
import { FinalGuessModal } from './components/modals/FinalGuessModal';
import { FinalGuessFab } from './components/ui/FinalGuessFab';
import { CLUES, CORRECT_FINAL_WORD } from './data/clues';
import { Clue } from './types';

export default function App() {
  const [letters, setLetters] = useState<{ [key: number]: string }>(() => {
    const saved = localStorage.getItem('paskaggsjakt_letters');
    return saved ? JSON.parse(saved) : {};
  });
  
  const [validationStatuses, setValidationStatuses] = useState<{ [key: number]: 'success' | 'error' | null }>(() => {
    const saved = localStorage.getItem('paskaggsjakt_validation');
    return saved ? JSON.parse(saved) : {};
  });

  const [selectedClue, setSelectedClue] = useState<Clue | null>(null);
  const [isFinalGuessOpen, setIsFinalGuessOpen] = useState(false);
  
  const [finalGuess, setFinalGuess] = useState(() => {
    return localStorage.getItem('paskaggsjakt_final_guess') || '';
  });

  const [finalValidationStatus, setFinalValidationStatus] = useState<'success' | 'error' | null>(() => {
    const saved = localStorage.getItem('paskaggsjakt_final_validation');
    return saved ? JSON.parse(saved) as 'success' | 'error' | null : null;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('paskaggsjakt_letters', JSON.stringify(letters));
  }, [letters]);

  useEffect(() => {
    localStorage.setItem('paskaggsjakt_validation', JSON.stringify(validationStatuses));
  }, [validationStatuses]);

  useEffect(() => {
    localStorage.setItem('paskaggsjakt_final_guess', finalGuess);
  }, [finalGuess]);

  useEffect(() => {
    localStorage.setItem('paskaggsjakt_final_validation', JSON.stringify(finalValidationStatus));
  }, [finalValidationStatus]);

  const handleFinalGuessChange = (value: string) => {
    setFinalGuess(value.toUpperCase());
    setFinalValidationStatus(null);
  };

  const handleFinalValidate = () => {
    if (!finalGuess) return;
    setFinalValidationStatus(finalGuess === CORRECT_FINAL_WORD ? 'success' : 'error');
  };

  const handleLetterChange = (id: number, value: string) => {
    setLetters(prev => ({ ...prev, [id]: value.toUpperCase() }));
    setValidationStatuses(prev => ({ ...prev, [id]: null }));
  };

  const handleValidate = (clue: Clue) => {
    const currentLetter = letters[clue.id] || '';
    if (!currentLetter) return;

    const isCorrect = currentLetter === clue.correctLetter;
    setValidationStatuses(prev => ({ ...prev, [clue.id]: isCorrect ? 'success' : 'error' }));
  };

  return (
    <div className="relative min-h-screen">
      {/* Parchment Texture Overlay */}
      <div className="fixed inset-0 parchment-texture z-0 pointer-events-none" />

      <Navbar />

      <main className="relative z-10 pt-28 pb-32 px-6 max-w-7xl mx-auto">
        <Header />

        <ClueGrid
          clues={CLUES}
          letters={letters}
          validationStatuses={validationStatuses}
          onLetterChange={handleLetterChange}
          onValidate={handleValidate}
          onImageClick={setSelectedClue}
        />
      </main>

      <FinalGuessFab onClick={() => setIsFinalGuessOpen(true)} />

      <Footer />

      <ImageOverlay
        clue={selectedClue}
        onClose={() => setSelectedClue(null)}
      />

      <FinalGuessModal
        isOpen={isFinalGuessOpen}
        onClose={() => setIsFinalGuessOpen(false)}
        clues={CLUES}
        validationStatuses={validationStatuses}
        finalGuess={finalGuess}
        finalValidationStatus={finalValidationStatus}
        onFinalGuessChange={handleFinalGuessChange}
        onFinalValidate={handleFinalValidate}
      />
    </div>
  );
}
