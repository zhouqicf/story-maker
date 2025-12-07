import type { Story } from '../types';

export const generateStory = async (character: string, theme: string): Promise<Story> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Date.now().toString(),
        title: `The ${character} and ${theme.substring(0, 10)}...`,
        coverImage: `https://placehold.co/600x400/orange/white?text=${character}`,
        characterId: character,
        topic: theme,
        createdAt: Date.now(),
        pages: [
            { text: `Once upon a time, there was a ${character} who loved to explore.`, imageUrl: 'https://placehold.co/600x400/skyblue/white?text=Page+1' },
            { text: `One day, ${character} found a mysterious ${theme}.`, imageUrl: 'https://placehold.co/600x400/lightgreen/white?text=Page+2' },
            { text: 'And they lived happily ever after!', imageUrl: 'https://placehold.co/600x400/pink/white?text=The+End' }
        ]
      });
    }, 2000); // Simulate API delay
  });
};
