/**
 * AI Image Generation Service
 * Uses Pollinations.ai free API to generate images from prompts
 */

/**
 * Generate an image from a text prompt using Pollinations.ai
 * This is a free service that generates images using Stable Diffusion
 */
export async function generateImage(prompt: string, seed?: number): Promise<string> {
  try {
    // Enhance prompt for children's book style
    const enhancedPrompt = `${prompt}, children's book illustration, cute, colorful, friendly, safe for kids, high quality`;
    
    // Encode prompt for URL
    const encodedPrompt = encodeURIComponent(enhancedPrompt);
    
    // Use seed for consistency if provided
    const seedParam = seed ? `&seed=${seed}` : '';
    
    // Pollinations.ai API endpoint (free, no API key needed)
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=600&nologo=true${seedParam}`;
    
    console.log('🎨 Generating image with prompt:', prompt);
    
    return imageUrl;
  } catch (error) {
    console.error('Failed to generate image:', error);
    // Fallback to a placeholder
    return `https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop`;
  }
}

/**
 * Generate images for all story pages
 */
export async function generateStoryImages(
  pages: Array<{ text: string; imagePrompt?: string }>,
  storyId: string
): Promise<string[]> {
  const imageUrls: string[] = [];
  
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const prompt = page.imagePrompt || `Children's storybook illustration of: ${page.text.substring(0, 100)}`;
    
    // Use story ID and page index as seed for consistency
    const seed = parseInt(storyId) + i;
    
    const imageUrl = await generateImage(prompt, seed);
    imageUrls.push(imageUrl);
    
    // Small delay to avoid rate limiting
    if (i < pages.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  return imageUrls;
}
