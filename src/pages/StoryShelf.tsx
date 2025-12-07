import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Library } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { StoryCard } from '../components/StoryCard';
import { AppButton } from '../components/ui/AppButton';
import { ConfirmDialog } from '../components/ConfirmDialog';

export const StoryShelf: React.FC = () => {
    const navigate = useNavigate();
    const { savedStories, deleteStory } = useStore();
    const [storyToDelete, setStoryToDelete] = useState<string | null>(null);

    return (
        <div className="min-h-full p-6 bg-gradient-to-b from-candy-purple/10 to-candy-blue/10 flex flex-col">
             <header className="flex items-center gap-4 mb-8 sticky top-0 z-10 bg-white/50 backdrop-blur-md p-4 rounded-3xl border border-white/50 shadow-sm">
                <AppButton variant="ghost" size="sm" onClick={() => navigate('/')} icon={<ArrowLeft size={24} />} className="!p-2 rounded-full" />
                <h1 className="text-2xl font-bubble text-candy-text flex items-center gap-2">
                    <Library className="text-candy-purple" /> My Shelf
                </h1>
            </header>
            
            {savedStories.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-xl shadow-candy-blue/20"
                    >
                         <span className="text-6xl filter drop-shadow-md">📚</span>
                    </motion.div>
                    <div>
                        <p className="font-bubble text-gray-500 text-xl mb-2">Your shelf is empty!</p>
                        <p className="text-gray-400 font-body">Time to make some magic stories.</p>
                    </div>
                    <AppButton 
                        onClick={() => navigate('/create/character')}
                        variant="primary"
                        size="lg"
                        className="mt-4 shadow-candy-blue/40"
                    >
                        Create Story
                    </AppButton>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-5 pb-20">
                    <AnimatePresence mode="popLayout">
                    {savedStories.map((story) => (
                        <motion.div
                            key={story.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                            className="relative group"
                        >
                            <StoryCard story={story} onClick={() => navigate(`/story/${story.id}`)} />
                            
                            {/* Delete Button */}
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setStoryToDelete(story.id);
                                }}
                                className="absolute -top-2 -right-2 p-2 bg-white rounded-full text-red-400 shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 hover:scale-110 z-10 border border-red-100"
                            >
                                <Trash2 size={18} />
                            </button>
                        </motion.div>
                    ))}
                    </AnimatePresence>
                </div>
            )}
            
            {/* Confirm Delete Dialog */}
            <ConfirmDialog
                isOpen={storyToDelete !== null}
                title="删除故事"
                message="确定要删除这个故事吗？删除后无法恢复。"
                onConfirm={() => {
                    if (storyToDelete) {
                        deleteStory(storyToDelete);
                        setStoryToDelete(null);
                    }
                }}
                onCancel={() => setStoryToDelete(null)}
                confirmText="删除"
                cancelText="取消"
            />
        </div>
    );
};
