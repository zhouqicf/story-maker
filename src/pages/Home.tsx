import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { AppButton } from '../components/ui/AppButton';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-candy-blue/20 via-candy-purple/20 to-candy-pink/20 p-8 relative overflow-hidden">
      {/* Decorative floating elements */}
      <div className="absolute top-[10%] left-[10%] w-32 h-32 bg-candy-yellow rounded-full blur-3xl opacity-60 animate-float" />
      <div className="absolute bottom-[20%] right-[5%] w-40 h-40 bg-candy-purple rounded-full blur-3xl opacity-60 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-[40%] right-[20%] w-20 h-20 bg-candy-pink rounded-full blur-2xl opacity-50 animate-float" style={{ animationDelay: '2s' }} />

      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="z-10 text-center mb-16"
      >
        <span className="inline-block text-6xl mb-4 filter drop-shadow-lg">🦁</span>
        <h1 className="text-7xl font-bubble text-candy-text drop-shadow-sm mb-4 leading-tight">
          <span className="text-candy-pink">Story</span>
          <br/>
          <span className="text-candy-blue">Maker</span>
        </h1>
        <p className="text-xl text-gray-500 font-bubble tracking-wide">
          Dream it. Say it. Read it.
        </p>
      </motion.div>

      <div className="z-10 flex flex-col gap-5 w-full max-w-[280px]">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
        >
             <AppButton 
                variant="primary" 
                size="xl" 
                className="w-full shadow-candy-blue/40"
                onClick={() => navigate('/create/character')}
                icon={<Sparkles size={28} className="text-yellow-200" />}
             >
                Make Magic
             </AppButton>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5 }}
        >
            <AppButton 
                variant="secondary" 
                size="lg" 
                className="w-full"
                onClick={() => navigate('/shelf')}
                icon={<BookOpen size={24} className="text-candy-purple" />}
            >
                My Bookshelf
            </AppButton>
        </motion.div>
      </div>
    </div>
  );
};
