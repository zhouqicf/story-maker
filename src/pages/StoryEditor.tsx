import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStoryStore } from '../store/storyStore';
import { ArrowLeft, Save, ChevronLeft, ChevronRight, RefreshCcw } from 'lucide-react';
import type { StoryPage } from '../types';
import { AppButton } from '../components/ui/AppButton';
import { AppCard } from '../components/ui/AppCard';

export function StoryEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { stories, updateStory } = useStoryStore();
  const story = stories.find((s) => s.id === id);

  const [currentPage, setCurrentPage] = useState(0);
  const [editedPages, setEditedPages] = useState<StoryPage[]>([]);

  useEffect(() => {
    if (!story) {
      navigate('/');
    } else {
        setEditedPages(JSON.parse(JSON.stringify(story.pages)));
    }
  }, [story, navigate]);

  if (!story || editedPages.length === 0) return null;

  const currentContent = editedPages[currentPage];

  const handleTextChange = (text: string) => {
    const newPages = [...editedPages];
    newPages[currentPage].text = text;
    setEditedPages(newPages);
  };

  const handleSave = () => {
    if (id) {
        updateStory(id, editedPages);
        navigate(`/story/${id}`);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < editedPages.length - 1) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <header className="px-6 py-4 flex items-center gap-4 bg-white/80 backdrop-blur-md shadow-sm z-10">
         <AppButton variant="ghost" size="sm" onClick={() => navigate(`/story/${id}`)} icon={<ArrowLeft size={24} />} className="!p-2 rounded-full" />
        <div className="flex-1 text-center font-bubble text-lg text-candy-text uppercase tracking-wide">
          Edit Story
        </div>
        <AppButton onClick={handleSave} variant="primary" size="md" icon={<Save size={18} />}>
            Save
        </AppButton>
      </header>

      <div className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto">
         <AppCard variant="glass" className="aspect-video bg-white rounded-3xl overflow-hidden relative group border-4 border-white shadow-md">
             <img 
               src={currentContent.imageUrl} 
               alt="Page illustration"
               className="w-full h-full object-cover opacity-90"
             />
             <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition backdrop-blur-[2px]">
                <AppButton variant="secondary" icon={<RefreshCcw size={20} />}>Change Image</AppButton>
             </div>
         </AppCard>

         <div className="flex-1 flex flex-col">
            <label className="text-xs font-bold text-candy-blue mb-3 uppercase tracking-widest pl-2">Page {currentPage + 1}</label>
            <textarea 
              value={currentContent.text}
              onChange={(e) => handleTextChange(e.target.value)}
              className="flex-1 w-full p-5 border-4 border-transparent bg-white shadow-inner rounded-3xl text-xl font-bubble leading-relaxed text-candy-text placeholder-gray-300 focus:border-candy-blue/20 focus:outline-none transition-all resize-none"
              placeholder="Start typing your story..."
            />
         </div>

         <div className="flex justify-between items-center py-2">
              <AppButton 
                variant="secondary"
                size="lg"
                className="rounded-full aspect-square !p-0"
                onClick={handlePrev} 
                disabled={currentPage === 0}
                icon={<ChevronLeft size={24} />}
              />
              
              <AppButton 
                variant="secondary"
                size="lg"
                className="rounded-full aspect-square !p-0"
                onClick={handleNext} 
                disabled={currentPage === editedPages.length - 1}
                icon={<ChevronRight size={24} />}
              />
           </div>
      </div>
    </div>
  );
}
