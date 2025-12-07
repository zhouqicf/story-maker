import type { Story } from '../types';
import { BookOpen } from 'lucide-react';
import { AppCard } from './ui/AppCard';

interface StoryCardProps {
  story: Story;
  onClick: () => void;
}

export function StoryCard({ story, onClick }: StoryCardProps) {
  return (
    <AppCard 
      variant="glass"
      hoverEffect={true}
      onClick={onClick}
      className="group relative overflow-hidden bg-white/80"
    >
      <div className="h-40 relative overflow-hidden">
        <img 
          src={story.coverImage} 
          alt={story.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 justify-center">
             <span className="text-white font-bubble text-sm bg-white/20 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 border border-white/40">
                <BookOpen size={16} /> Read Now
             </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bubble text-lg text-candy-text leading-tight line-clamp-2 min-h-[3rem]">
          {story.title}
        </h3>
        <p className="text-gray-400 text-xs font-bold mt-3 tracking-widest uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-candy-green"></span>
            Story Time
        </p>
      </div>
    </AppCard>
  );
}
