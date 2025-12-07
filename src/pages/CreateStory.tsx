import { useState } from 'react';
import { Layout } from '../layouts/Layout';
import { ArrowLeft, Mic, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CHARACTERS = [
  { id: 'lion', name: 'Leo', emoji: '🦁', color: 'bg-orange-100 border-orange-300' },
  { id: 'robot', name: 'Beep', emoji: '🤖', color: 'bg-slate-100 border-slate-300' },
  { id: 'fairy', name: 'Faye', emoji: '🧚‍♀️', color: 'bg-pink-100 border-pink-300' },
  { id: 'dino', name: 'Dino', emoji: '🦖', color: 'bg-green-100 border-green-300' },
];

import { generateStory } from '../services/aiService';
import { useStoryStore } from '../store/storyStore';

export function CreateStory() {
  const navigate = useNavigate();
  const { addStory } = useStoryStore();
  const [step, setStep] = useState(1);
  const [character, setCharacter] = useState<string | null>(null);
  const [theme, setTheme] = useState('');
  const [isListening, setIsListening] = useState(false);

  // Mock Voice Input
  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      setTimeout(() => {
        setTheme((prev) => prev ? prev + ' and magic' : 'A story about a hidden treasure');
        setIsListening(false);
      }, 2000);
    }
  };

  const handleCreate = async () => {
    if (!character) return;
    setStep(3);
    
    try {
        const newStory = await generateStory(character, theme);
        addStory(newStory);
        // Navigate to reader (placeholder to home with new story for now)
        navigate('/'); 
    } catch (error) {
        console.error("Failed to create story", error);
        setStep(2); // Go back on error
    }
  };

  return (
    <Layout>
      <header className="px-6 py-6 flex items-center bg-white/50 backdrop-blur border-b border-white/50 sticky top-0 z-20">
        <button 
          onClick={() => step === 1 ? navigate('/') : setStep(step - 1)}
          className="p-3 bg-white hover:bg-slate-50 text-slate-700 rounded-xl shadow-md border-2 border-slate-100 transition active:scale-95"
        >
          <ArrowLeft size={20} strokeWidth={3} />
        </button>
        <div className="flex-1 text-center font-black text-slate-700 text-xl tracking-tight">
          {step === 1 ? '🦸 Pick a Hero' : step === 2 ? '✨ What happens?' : '🪄 Making Magic...'}
        </div>
        <div className="w-12" />
      </header>

      <main className="flex-1 p-6 flex flex-col items-center">
        {step === 1 && (
          <div className="grid grid-cols-2 gap-4 w-full">
            {CHARACTERS.map((char) => (
              <button
                key={char.id}
                onClick={() => {
                  setCharacter(char.id);
                  setStep(2);
                }}
                className={`p-6 rounded-3xl border-b-8 flex flex-col items-center gap-3 transition-all transform hover:-translate-y-1 hover:shadow-xl active:scale-95 active:border-b-0 active:translate-y-2 ${
                  char.color
                } ${character === char.id ? 'ring-4 ring-offset-2 ring-sky-400 scale-95' : 'border-slate-200 shadow-lg'}`}
              >
                <div className="text-7xl drop-shadow-md filter">{char.emoji}</div>
                <span className="font-extrabold text-slate-700 text-xl tracking-wide">{char.name}</span>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col h-full space-y-6 items-center justify-center w-full">
             <div className="w-full relative group">
                <textarea 
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  placeholder="Tell me a story about..."
                  className="w-full h-48 p-6 text-2xl font-bold rounded-[2rem] border-4 border-indigo-100 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100/50 focus:outline-none resize-none bg-white/80 shadow-inner text-slate-700 placeholder-indigo-200 transition-all"
                />
                <div className="absolute bottom-4 right-4 text-xs font-bold text-indigo-200 uppercase tracking-widest pointer-events-none">
                    Your Magic Words
                </div>
             </div>
             
             <button 
               onClick={toggleListening}
               className={`p-8 rounded-full shadow-2xl transition-all transform hover:scale-110 active:scale-90 border-4 border-white ${
                 isListening 
                  ? 'bg-rose-500 animate-pulse ring-4 ring-rose-200' 
                  : 'bg-gradient-to-br from-sky-400 to-blue-500 hover:rotate-6'
               } text-white`}
             >
               <Mic size={48} strokeWidth={2.5} />
             </button>
             <p className="font-bold text-slate-400 text-sm uppercase tracking-wider">{isListening ? 'Listening...' : 'Tap to Speak'}</p>
             
             {theme.length > 0 && (
               <button 
                 onClick={handleCreate}
                 className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-black py-5 rounded-2xl text-2xl shadow-lg shadow-orange-200 transform transition hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3"
               >
                 <Sparkles className="animate-spin-slow" /> Create Story!
               </button>
             )}
          </div>
        )}

        {step === 3 && (
            <div className="flex-1 flex flex-col items-center justify-center space-y-8 text-center p-8">
                <div className="relative">
                    <div className="absolute inset-0 bg-sky-400 blur-3xl opacity-20 animate-pulse rounded-full" />
                    <Sparkles size={80} className="text-sky-500 animate-spin-slow relative z-10" />
                </div>
                <div>
                    <h2 className="text-3xl font-black text-slate-700 mb-2">Writing your story...</h2>
                    <p className="text-slate-400 font-bold animate-bounce">Generating magic!</p>
                </div>
            </div>
        )}
      </main>
    </Layout>
  );
}
