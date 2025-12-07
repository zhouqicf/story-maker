import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Star } from 'lucide-react';
import { useStore } from '../store/useStore';
import { mockAIService } from '../services/mockAI';
import type { Character } from '../types';
import { AppCard } from '../components/ui/AppCard';
import { AppButton } from '../components/ui/AppButton';

export const CharacterSelect: React.FC = () => {
  const navigate = useNavigate();
  const setCharacter = useStore(state => state.setSelectedCharacter);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChars = async () => {
      const data = await mockAIService.getCharacters();
      setCharacters(data);
      setLoading(false);
    };
    loadChars();
  }, []);

  const handleSelect = (char: Character) => {
    setCharacter(char);
    navigate('/create/topic');
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-candy-green/20 via-white to-candy-blue/20 p-6 flex flex-col">
      <header className="flex items-center gap-4 mb-8">
        <AppButton variant="ghost" size="sm" onClick={() => navigate(-1)} icon={<ArrowLeft size={24} />} className="!p-2 rounded-full bg-white/80" />
        <h1 className="text-2xl font-bubble text-candy-text">Who is the hero?</h1>
      </header>

      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-candy-green border-t-transparent shadow-lg"></div>
          <p className="font-bubble text-gray-400 animate-pulse">Summoning heroes...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 pb-8">
          {characters.map((char, index) => (
            <motion.div
              key={char.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
                <AppCard
                  variant="glass"
                  hoverEffect={true}
                  onClick={() => handleSelect(char)}
                  className="p-4 flex flex-col items-center gap-4 aspect-square justify-center relative group border-2 border-white"
                >
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Star className="text-candy-yellow fill-candy-yellow" size={16} />
                    </div>
                    <img src={char.avatarUrl} alt={char.name} className="w-20 h-20 filter drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-center">
                        <div className="font-bubble text-lg leading-tight text-candy-text">{char.name}</div>
                        <div className="text-xs text-gray-500 mt-1 font-body">{char.description}</div>
                    </div>
                </AppCard>
            </motion.div>
          ))}
          
          {/* Custom Character Placeholder */}
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.5 }}
          >
              <button className="w-full h-full bg-white/30 border-2 border-dashed border-gray-300 p-4 rounded-3xl flex flex-col items-center justify-center gap-2 text-gray-400 aspect-square hover:bg-white/50 hover:border-candy-blue transition-all group">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-candy-blue/10 group-hover:text-candy-blue transition-colors">
                    <User size={32} />
                </div>
                <span className="font-bubble text-sm group-hover:text-candy-blue">Add New</span>
              </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};
