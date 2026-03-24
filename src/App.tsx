import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, X, Compass, BookOpen, Search } from 'lucide-react';

interface Clue {
  id: number;
  title: string;
  image: string;
  alt: string;
  correctLetter: string;
  hint: string;
}

const CLUES: Clue[] = [
  {
    id: 1,
    title: "Sjörövarnas hamn",
    image: "maps/map1.jpeg",
    alt: "Vintage hand-drawn map of Whispering Pines",
    correctLetter: "A",
    hint: "En hamn med utsikt över vita sand"
  },
  {
    id: 2,
    title: "Det stora fältet",
    image: "maps/map2.jpg",
    alt: "Weathered nautical map of The Sunken Grotto",
    correctLetter: "B",
    hint: "Här finns många stigar för den som är ute och går"
  },
  {
    id: 3,
    title: "Berget vid havet",
    image: "maps/map3.jpeg",
    alt: "Ancient map scroll of Hollow Hill",
    correctLetter: "C",
    hint: "Utsikten från detta berg är svårslagen"
  },
  {
    id: 4,
    title: "Ängen och bergt",
    image: "maps/map4.jpeg",
    alt: "Aerial forest map of Amber Archway",
    correctLetter: "D",
    hint: "På ängen i närheten är det på sommaren fullt av barn som rest hit."
  },
  {
    id: 5,
    title: "The Rusty Gate",
    image: "maps/map5.jpg",
    alt: "Coffee-stained map of The Rusty Gate",
    correctLetter: "E",
    hint: "Studera kartan noggrant..."
  }
];

export default function App() {
  const [letters, setLetters] = useState<{ [key: number]: string }>({});
  const [validationStatuses, setValidationStatuses] = useState<{ [key: number]: 'success' | 'error' | null }>({});
  const [selectedClue, setSelectedClue] = useState<Clue | null>(null);
  const [isFinalGuessOpen, setIsFinalGuessOpen] = useState(false);
  const [finalGuess, setFinalGuess] = useState('');
  const [finalValidationStatus, setFinalValidationStatus] = useState<'success' | 'error' | null>(null);

  const handleFinalGuessChange = (value: string) => {
    setFinalGuess(value.toUpperCase());
    setFinalValidationStatus(null);
  };

  const handleFinalValidate = () => {
    if (!finalGuess) return;
    const CORRECT_FINAL_WORD = "ABCDE"; // Update this with the actual final word
    setFinalValidationStatus(finalGuess === CORRECT_FINAL_WORD ? 'success' : 'error');
  };

  const handleLetterChange = (id: number, value: string) => {
    setLetters(prev => ({ ...prev, [id]: value.toUpperCase() }));
    // Clear validation status when user types
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

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-surface/80 backdrop-blur-md border-b border-surface-container-highest">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-primary italic font-headline">Påskäggsjakt</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 pt-28 pb-32 px-6 max-w-7xl mx-auto">
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

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CLUES.map((clue, index) => (
            <motion.div
              key={clue.id}
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
                  onClick={() => setSelectedClue(clue)}
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
                      value={letters[clue.id] || ''}
                      onChange={(e) => handleLetterChange(clue.id, e.target.value)}
                      className={`w-14 h-14 text-center text-2xl font-bold bg-transparent border-none focus:ring-0 placeholder-on-surface-variant/30 transition-colors ${validationStatuses[clue.id] === 'success' ? 'text-green-500' :
                        validationStatuses[clue.id] === 'error' ? 'text-red-500' :
                          'text-primary'
                        }`}
                    />
                    <button
                      onClick={() => handleValidate(clue)}
                      disabled={!letters[clue.id]}
                      className="px-4 bg-primary/10 hover:bg-primary/20 text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium font-label uppercase tracking-wider text-sm flex items-center justify-center border-l border-surface/20"
                    >
                      Kontrollera
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsFinalGuessOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-primary text-on-primary px-8 py-6 rounded-xl shadow-2xl hover:shadow-primary/20 transition-all group"
      >
        <Lightbulb className="w-8 h-8 fill-current" />
        <span className="font-headline font-bold text-lg tracking-wide uppercase">Final Guess</span>
      </motion.button>

      {/* Footer */}
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

      {/* Image Overlay Modal */}
      <AnimatePresence>
        {selectedClue && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-on-surface/90 backdrop-blur-xl flex flex-col items-center justify-center p-4"
          >
            <button
              onClick={() => setSelectedClue(null)}
              className="absolute top-8 right-8 text-on-primary bg-primary/20 p-4 rounded-full hover:bg-primary/40 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              src={selectedClue.image}
              alt={selectedClue.alt}
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[80vh] rounded-lg shadow-2xl object-contain"
            />
            <div className="mt-8 text-surface text-center">
              <h2 className="font-headline text-3xl font-bold mb-2">Map Detail: {selectedClue.title}</h2>
              <p className="font-label opacity-70 text-lg">{selectedClue.hint}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final Guess Modal */}
      <AnimatePresence>
        {isFinalGuessOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-surface/95 backdrop-blur-xl flex flex-col items-center justify-center p-4"
          >
            <button
              onClick={() => setIsFinalGuessOpen(false)}
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
              <h2 className="font-headline text-4xl font-extrabold text-on-surface">The Final Enigma</h2>

              <div className="flex justify-center gap-4 flex-wrap">
                {CLUES.map(clue => {
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
                  placeholder="Enter the final word..."
                  value={finalGuess}
                  onChange={(e) => handleFinalGuessChange(e.target.value)}
                  className={`w-full px-6 py-4 text-center text-2xl font-bold bg-surface rounded-xl border focus:outline-none focus:ring-2 transition-colors uppercase ${finalValidationStatus === 'success' ? 'border-green-500 text-green-500 focus:ring-green-500/50' :
                    finalValidationStatus === 'error' ? 'border-red-500 text-red-500 focus:ring-red-500/50' :
                      'border-surface-container-highest text-on-surface focus:ring-primary/50 placeholder-on-surface-variant/30'
                    }`}
                />
                <button
                  onClick={handleFinalValidate}
                  disabled={!finalGuess || finalValidationStatus === 'success'}
                  className="w-full py-4 bg-primary text-on-primary rounded-xl font-headline font-bold text-lg uppercase tracking-wide hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Verify Answer
                </button>

                {finalValidationStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 p-4 bg-green-500/10 text-green-500 rounded-xl font-bold font-headline"
                  >
                    🎉 Correct! You've found the Golden Egg! 🎉
                  </motion.div>
                )}
                {finalValidationStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 p-4 bg-red-500/10 text-red-500 rounded-xl font-bold font-headline"
                  >
                    Not quite right. Keep trying!
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-end px-4 pb-4 bg-surface/80 backdrop-blur-md rounded-t-[3rem] border-t border-surface-container-highest shadow-[0_-4px_24px_rgba(54,46,28,0.06)]">
        <a className="flex flex-col items-center justify-center bg-primary text-white rounded-full p-3 mb-2 transform -translate-y-2 shadow-lg" href="#">
          <Compass className="w-6 h-6" />
          <span className="font-body text-[10px] font-medium">Map</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary" href="#">
          <BookOpen className="w-6 h-6" />
          <span className="font-body text-[10px] font-medium">Journal</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary" href="#">
          <Lightbulb className="w-6 h-6" />
          <span className="font-body text-[10px] font-medium">Clues</span>
        </a>
      </nav>
    </div>
  );
}
