import { create } from 'zustand';
import type { Story, Character } from '../types';
import { persist } from 'zustand/middleware';

interface StoreState {
  // Session State
  selectedCharacter: Character | null;
  recordedTopic: string;
  isGenerating: boolean;
  currentStory: Story | null;

  // Library State (Persisted)
  savedStories: Story[];
  
  // Actions
  setSelectedCharacter: (char: Character | null) => void;
  setRecordedTopic: (topic: string) => void;
  startGeneration: () => void;
  finishGeneration: (story: Story) => void;
  saveStory: (story: Story) => void;
  deleteStory: (storyId: string) => void;
  resetSession: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      selectedCharacter: null,
      recordedTopic: '',
      isGenerating: false,
      currentStory: null,
      savedStories: [],

      setSelectedCharacter: (char) => set({ selectedCharacter: char }),
      setRecordedTopic: (topic) => set({ recordedTopic: topic }),
      startGeneration: () => set({ isGenerating: true }),
      finishGeneration: (story) => set({ isGenerating: false, currentStory: story }),
      saveStory: (story) => set((state) => ({ savedStories: [story, ...state.savedStories] })),
      deleteStory: (id) => set((state) => ({ savedStories: state.savedStories.filter(s => s.id !== id) })),
      resetSession: () => set({ selectedCharacter: null, recordedTopic: '', isGenerating: false, currentStory: null }),
    }),
    {
      name: 'story-maker-storage',
      partialize: (state) => ({ savedStories: state.savedStories }), // Only persist library
    }
  )
);
