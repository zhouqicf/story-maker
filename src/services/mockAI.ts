import type { Story, StoryPage } from '../types';

// Mock Data
const MOCK_CHARACTERS = [
  { id: 'lion', name: 'Leo the Lion', avatarUrl: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Leo', soundEffect: 'roar.mp3', description: 'Brave and loud' },
  { id: 'astronaut', name: 'Astro Kid', avatarUrl: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Astro', soundEffect: 'beep.mp3', description: 'Loves stars' },
  { id: 'princess', name: 'Princess Pea', avatarUrl: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Princess', soundEffect: 'magic.mp3', description: 'Kind and magical' },
  { id: 'robot', name: 'Robo-friend', avatarUrl: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Robot', soundEffect: 'boop.mp3', description: 'Smart and helpful' },
  { id: 'ultraman', name: 'Ultraman', avatarUrl: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Ultraman', soundEffect: 'hero.mp3', description: 'Protector of Earth' },
  { id: 'wukong', name: 'Sun Wukong', avatarUrl: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Monkey', soundEffect: 'monkey.mp3', description: 'Monkey King' },
  { id: 'archie', name: 'Archie', avatarUrl: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Archie', soundEffect: 'woof.mp3', description: 'Loyal friend' },
];

// Helper to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockAIService = {
  getCharacters: async () => {
    await delay(500);
    return MOCK_CHARACTERS;
  },

  speechToText: async (audioBlob: Blob): Promise<string> => {
    console.log('Simulating STT for blob', audioBlob);
    await delay(1500);
    return "I want to hear a story about a lion who goes to the moon to eat ice cream.";
  },

  generateStory: async (characterId: string, topic: string): Promise<Story> => {
    await delay(3000); // Simulate "Thinking..."
    
    const id = Date.now().toString();
    const character = MOCK_CHARACTERS.find(c => c.id === characterId) || MOCK_CHARACTERS[0];
    
    // Simple template-based generation for consistency in mock
    const title = topic.includes('moon') ? `${character.name}'s Moon Adventure` : `${character.name}'s Big Day`;
    
    const pages: StoryPage[] = [
      {
        text: `Once upon a time, ${character.name} decided to go on a big adventure. "${topic}" they said excitedly!`,
        imageUrl: `https://picsum.photos/seed/${id}-1/800/600`,
      },
      {
        text: "The journey was long and full of surprises. They saw sparkle stars and dancing clouds.",
        imageUrl: `https://picsum.photos/seed/${id}-2/800/600`,
      },
      {
        text: "Finally, they found exactly what they were looking for! It was the best day ever.",
        imageUrl: `https://picsum.photos/seed/${id}-3/800/600`,
      }
    ];

    return {
      id,
      title,
      coverImage: `https://picsum.photos/seed/${id}-cover/800/600`,
      pages,
      characterId,
      topic,
      createdAt: Date.now(),
    };
  }
};
