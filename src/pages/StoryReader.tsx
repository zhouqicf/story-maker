
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home, Save, Play, Pause, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { AppButton } from '../components/ui/AppButton';
import { AppCard } from '../components/ui/AppCard';
import { TextToSpeech } from '../services/textToSpeech';
import { ConfirmDialog } from '../components/ConfirmDialog';

export const StoryReader: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentStory, saveStory, savedStories, deleteStory } = useStore();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const story = currentStory?.id === id ? currentStory : savedStories.find(s => s.id === id);
  
  // Check if story is already saved (来自书架)
  const isStorySaved = savedStories.some(s => s.id === id);

  const [pageIndex, setPageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const ttsRef = useRef<TextToSpeech | null>(null);

  // Initialize TTS
  useEffect(() => {
    if (TextToSpeech.isSupported()) {
      ttsRef.current = new TextToSpeech();
    }
    
    // Cleanup on unmount
    return () => {
      if (ttsRef.current) {
        ttsRef.current.stop();
      }
    };
  }, []);

  // Auto-play current page when it changes
  useEffect(() => {
    if (story && isPlaying && ttsRef.current) {
      const currentText = story.pages[pageIndex]?.text;
      if (currentText) {
        ttsRef.current.speak(currentText, {
          onEnd: () => {
            // Auto advance to next page when finished
            if (pageIndex < story.pages.length - 1) {
              setPageIndex(pageIndex + 1);
            } else {
              setIsPlaying(false);
            }
          }
        });
      }
    }
  }, [pageIndex, isPlaying, story]);

  if (!story) {
    return (
        <div className="h-full flex items-center justify-center flex-col gap-4 bg-candy-blue/10">
            <p className="font-bubble text-3xl text-candy-text">Story not found!</p>
            <AppButton onClick={() => navigate('/')}>Go Home</AppButton>
        </div>
    );
  }

  const nextPage = () => {
    if (pageIndex < story.pages.length - 1) {
      setPageIndex(pageIndex + 1);
    }
  };

  const prevPage = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  const togglePlayPause = () => {
    if (!ttsRef.current) return;

    if (isPlaying) {
      ttsRef.current.stop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const handleSave = () => {
    if (ttsRef.current) {
      ttsRef.current.stop();
    }
    saveStory(story);
    navigate('/shelf'); 
  };
  
  const handleDiscard = () => {
    if (ttsRef.current) {
      ttsRef.current.stop();
    }
    navigate('/');
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 relative overflow-hidden">
        {/* Header */}
        <header className="px-6 py-4 flex items-center justify-between relative z-10">
            <AppButton variant="ghost" size="sm" onClick={() => navigate('/')} icon={<Home size={24} />} className="bg-white/50 backdrop-blur-md rounded-full shadow-sm" />
            <h1 className="font-bubble text-xl text-candy-text truncate max-w-[200px] bg-white/50 px-4 py-1 rounded-full backdrop-blur-md">{story.title}</h1>
            <AppButton 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowDeleteConfirm(true)}
                icon={<Trash2 size={20} />}
                className="bg-white/50 backdrop-blur-md rounded-full shadow-sm text-red-500 hover:bg-red-50"
            />
        </header>
        
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 pb-24">
            <div className="max-w-sm mx-auto py-4">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={pageIndex}
                        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 1.1, rotate: 2 }}
                        transition={{ type: "spring", bounce: 0.4 }}
                        className="flex flex-col gap-6"
                    >
                        <AppCard variant="glass" className="relative aspect-square p-2 bg-white rotate-1 hover:rotate-0 transition-transform duration-500">
                            <div className="w-full h-full rounded-2xl overflow-hidden shadow-inner">
                                 <img src={story.pages[pageIndex].imageUrl} alt="Story visual" className="w-full h-full object-cover" />
                            </div>
                        </AppCard>
                        
                        <AppCard variant="solid" className="p-6 bg-white/90 backdrop-blur-xl shadow-lg shadow-candy-purple/10 border-none">
                            <p className="font-bubble text-xl md:text-2xl text-candy-text leading-relaxed text-center">
                                {story.pages[pageIndex].text}
                            </p>
                        </AppCard>
                        
                        {/* Page Indicator */}
                        <div className="flex justify-center gap-2 py-4">
                            {story.pages.map((_, idx) => (
                                <div 
                                   key={idx} 
                                   className={`h-2 rounded-full transition-all duration-300 ${idx === pageIndex ? 'w-8 bg-candy-blue' : 'w-2 bg-gray-300'}`} 
                                />
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
        
        {/* Fixed Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pt-8 pb-6 px-6">
            {/* Audio / Navigation Controls */}
            <div className={`flex items-center gap-4 ${isStorySaved ? 'justify-center' : 'justify-between'}`}>
                {/* Left: Previous Button (only when has save buttons) */}
                {!isStorySaved && (
                    <AppButton 
                       variant="secondary" 
                       size="lg" 
                       className="rounded-full aspect-square !p-0"
                       onClick={prevPage} 
                       disabled={pageIndex === 0}
                       icon={<ChevronLeft size={24} />}
                    />
                )}
                
                {/* Center: Play Controls */}
                <div className="flex gap-3 items-center">
                    {isStorySaved && (
                        <AppButton 
                           variant="secondary" 
                           size="xl" 
                           className="rounded-full aspect-square !p-0"
                           onClick={prevPage} 
                           disabled={pageIndex === 0}
                           icon={<ChevronLeft size={28} />}
                        />
                    )}
                    
                    <AppButton 
                        variant="primary" 
                        size={isStorySaved ? "xl" : "lg"}
                        onClick={togglePlayPause}
                        className={`${isPlaying ? "bg-candy-green border-candy-green text-teal-900" : ""} rounded-full aspect-square !p-0 ${isStorySaved ? 'w-16 h-16' : ''}`}
                        icon={isPlaying ? <Pause size={isStorySaved ? 32 : 24} /> : <Play size={isStorySaved ? 32 : 24} />}
                    />
                    
                    {isStorySaved && (
                        <AppButton 
                           variant="secondary" 
                           size="xl" 
                           className="rounded-full aspect-square !p-0"
                           onClick={nextPage} 
                           disabled={pageIndex === story.pages.length - 1}
                           icon={<ChevronRight size={28} />}
                        />
                    )}
                </div>
                
                {/* Right: Next Button (only when has save buttons) */}
                {!isStorySaved && (
                    <AppButton 
                       variant="secondary" 
                       size="lg" 
                       className="rounded-full aspect-square !p-0"
                       onClick={nextPage} 
                       disabled={pageIndex === story.pages.length - 1}
                       icon={<ChevronRight size={24} />}
                    />
                )}
            </div>
            
            {/* Save/Discard Buttons - Only show for unsaved stories */}
            {!isStorySaved && (
                <div className="flex gap-3 justify-center mt-4">
                    <AppButton variant="secondary" onClick={handleDiscard}>Discard</AppButton>
                    <AppButton variant="primary" onClick={handleSave} icon={<Save size={18} />}>Save</AppButton>
                </div>
            )}
        </div>
      
      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="删除故事"
        message="确定要删除这个故事吗？删除后无法恢复。"
        onConfirm={() => {
          if (ttsRef.current) {
            ttsRef.current.stop();
          }
          deleteStory(story.id);
          setShowDeleteConfirm(false);
          navigate('/shelf');
        }}
        onCancel={() => setShowDeleteConfirm(false)}
        confirmText="删除"
        cancelText="取消"
      />
    </div>
  );
};
