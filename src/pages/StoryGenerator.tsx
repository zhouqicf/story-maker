import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wand2, Star, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';
import { generateStoryWithAI, isGeminiConfigured } from '../services/geminiAI';
import { mockAIService } from '../services/mockAI';

export const StoryGenerator: React.FC = () => {
  const navigate = useNavigate();
  const { selectedCharacter, recordedTopic, finishGeneration, startGeneration } = useStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedCharacter || !recordedTopic) {
      navigate('/create/input');
      return;
    }

    const generate = async () => {
      startGeneration();
      try {
        let story;
        
        // Use Gemini AI if configured, otherwise fallback to mock
        if (isGeminiConfigured()) {
          console.log('🤖 Using Gemini AI to generate story');
          story = await generateStoryWithAI(selectedCharacter, recordedTopic);
        } else {
          console.log('⚠️ Gemini not configured, using mock AI');
          story = await mockAIService.generateStory(selectedCharacter.id, recordedTopic);
        }
        
        finishGeneration(story);
        navigate(`/story/${story.id}`);
      } catch (error) {
        console.error("Generation failed", error);
        setError('故事生成失败，请重试');
      }
    };

    generate();
  }, [selectedCharacter, recordedTopic, navigate, startGeneration, finishGeneration]);

  return (
    <div className="h-full bg-gradient-to-b from-candy-purple/30 to-candy-blue/10 flex flex-col items-center justify-center relative overflow-hidden p-6 z-0">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="text-candy-purple mb-8 relative z-10 p-8 rounded-full bg-white/50 backdrop-blur-md shadow-2xl"
      >
        <Wand2 size={80} />
      </motion.div>

      <h2 className="text-4xl font-bubble text-candy-text text-center mb-6 drop-shadow-sm">Making Magic...</h2>
      <div className="bg-white/60 p-6 rounded-3xl backdrop-blur-sm max-w-xs text-center border border-white/40 shadow-lg">
          {error ? (
            <p className="text-red-600 font-bubble text-lg">{error}</p>
          ) : (
            <>
              <p className="text-gray-600 font-bubble text-lg mb-2">
                Writing a story about <strong className="text-candy-blue">{selectedCharacter?.name}</strong>...
              </p>
              <div className="flex gap-1 justify-center mt-4">
                  <span className="w-2 h-2 rounded-full bg-candy-pink animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-candy-yellow animate-bounce delay-100"></span>
                  <span className="w-2 h-2 rounded-full bg-candy-blue animate-bounce delay-200"></span>
              </div>
            </>
          )}
      </div>

      {/* Floating Elements */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0], 
            scale: [0, 1.5, 0], 
            x: Math.random() * 400 - 200, 
            y: Math.random() * 400 - 200,
            rotate: Math.random() * 360
          }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
          className={`absolute ${i % 2 === 0 ? 'text-candy-yellow' : 'text-candy-pink'}`}
          style={{ top: '50%', left: '50%' }}
        >
          {i % 3 === 0 ? <Star size={24} fill="currentColor" /> : <Sparkles size={20} />}
        </motion.div>
      ))}
    </div>
  );
};
