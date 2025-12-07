export interface Character {
  id: string;
  name: string;
  avatarUrl: string;
  soundEffect?: string;
  description: string;
}

export interface StoryPage {
  text: string;
  imageUrl: string;
  audioUrl?: string; // Mock audio URL
}

export interface Story {
  id: string;
  title: string;
  coverImage: string;
  pages: StoryPage[];
  characterId: string;
  topic: string; // The user's input prompt
  createdAt: number;
}

export type AppState = 'idle' | 'recording' | 'generating' | 'reading';
