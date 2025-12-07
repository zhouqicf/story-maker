import { create } from 'zustand';
import type { Story } from '../types';

interface StoryState {
  stories: Story[];
  addStory: (story: Story) => void;
  deleteStory: (id: string) => void;
  updateStory: (id: string, pages: Story['pages']) => void;
}

const MOCK_STORIES: Story[] = [
  {
    id: '1',
    title: 'The Brave Little Lion',
    characterId: 'lion',
    topic: 'Adventure in the jungle',
    coverImage: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    createdAt: Date.now(),
    pages: [
            { text: 'Once upon a time, a brave little lion wanted to see the world.', imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
            { text: 'He walked through the green jungle and met many friends.', imageUrl: 'https://images.unsplash.com/photo-1564767667-8541e24fb141?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
            { text: 'At night, he slept under the bright stars.', imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' }
    ],
  },
  {
    id: '2',
    title: 'Space Adventure',
    characterId: 'astronaut',
    topic: 'Rocket ship to the moon',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    createdAt: Date.now() - 100000,
    pages: [
        { text: 'Zoom! The rocket ship blasted off into space.', imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
        { text: 'They landed on a red planet with bumpy rocks.', imageUrl: 'https://images.unsplash.com/photo-1614730341194-75c60740a070?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
        { text: 'Aliens came out to say hello!', imageUrl: 'https://images.unsplash.com/photo-1589476993333-f55b84301219?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' }
    ],
  },
];

export const useStoryStore = create<StoryState>((set) => ({
  stories: MOCK_STORIES,
  addStory: (story) => set((state) => ({ stories: [story, ...state.stories] })),
  deleteStory: (id) => set((state) => ({ stories: state.stories.filter((s) => s.id !== id) })),
  updateStory: (id, pages) =>
    set((state) => ({
      stories: state.stories.map((s) => (s.id === id ? { ...s, pages } : s)),
    })),
}));
