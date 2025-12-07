import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Story, StoryPage, Character } from '../types';
import { matchIllustration } from './imageMatching';
import { generateStoryImages } from './imageGeneration';

// Initialize Gemini AI
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Generate a children's story using Google Gemini
 */
export async function generateStoryWithAI(
  character: Character,
  topic: string
): Promise<Story> {
  try {
    // Get the Gemini model (using gemini-pro - the most stable and widely supported model)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Create the prompt
    const prompt = `你是一个专业的儿童故事作家。请根据以下信息创建一个适合5岁儿童的故事：

角色：${character.name}（${character.description}）
主题：${topic}

要求：
1. 故事长度：约3分钟阅读时间（约300-400字）
2. 分成5-6个场景/页面
3. 语言简单易懂，适合5岁儿童
4. 情节积极向上，有教育意义
5. 每个场景包含：
   - 生动的描述文字（50-80字）
   - 英文图片描述（用于 AI 生成插图，儿童绘本风格）

请以 JSON 格式返回，不要包含任何其他文字，只返回 JSON：
{
  "title": "故事标题",
  "pages": [
    {
      "text": "这一页的故事文字（50-80字）",
      "imagePrompt": "English prompt for AI image generation: A cute cartoon illustration of..."
    }
  ]
}

示例：
{
  "title": "小狮子的月球冒险",
  "pages": [
    {
      "text": "从前，有一只勇敢的小狮子叫雷欧。他总是梦想着去月球上看看。有一天，他决定要实现这个梦想！",
      "imagePrompt": "A cute cartoon lion cub looking up at the moon in the night sky, children's book illustration style, colorful and friendly"
    },
    {
      "text": "雷欧找到了一艘闪闪发光的火箭。他穿上宇航服，坐进驾驶舱，按下了发射按钮。轰隆隆！火箭飞向天空！",
      "imagePrompt": "A cute cartoon lion in a space suit sitting in a colorful rocket ship, launching into space, children's book illustration, bright colors"
    }
  ]
}`;

    // Generate content
    console.log('🤖 Calling Gemini AI to generate story...');
    const result = await model.generateContent(prompt);
    const text = await result.response.text();
    
    console.log('📝 Gemini response:', text);

    // Parse JSON response
    let storyData;
    try {
      // Try to extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        storyData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      // Fallback to a simple story
      storyData = {
        title: `${character.name}的冒险`,
        pages: [
          {
            text: `从前，有一个${character.description}的${character.name}。有一天，关于${topic}的事情发生了...`,
            sceneDescription: '故事开始'
          },
          {
            text: `${character.name}勇敢地面对挑战，学到了很多东西。`,
            sceneDescription: '冒险过程'
          },
          {
            text: '最后，一切都变得美好了。这真是快乐的一天！',
            sceneDescription: '快乐结局'
          }
        ]
      };
    }

    // Generate AI images for the story
    const id = Date.now().toString();
    console.log('🎨 Generating AI images for story pages...');
    
    const imageUrls = await generateStoryImages(storyData.pages, id);
    
    const pages: StoryPage[] = storyData.pages.map((page: any, index: number) => ({
      text: page.text,
      imageUrl: imageUrls[index]
    }));

    const story: Story = {
      id,
      title: storyData.title,
      coverImage: imageUrls[0], // Use the first generated image as cover
      pages,
      characterId: character.id,
      topic,
      createdAt: Date.now(),
    };

    console.log('✅ Story generated successfully:', story.title);
    return story;

  } catch (error) {
    console.error('❌ Error generating story with AI:', error);
    
    // Fallback to a simple story if AI fails
    const id = Date.now().toString();
    const fallbackPages = [
      { text: `从前，有一个${character.description}的${character.name}。` },
      { text: `有一天，${character.name}遇到了关于${topic}的有趣事情。` },
      { text: `${character.name}学到了很多，度过了快乐的一天！` }
    ];
    
    return {
      id,
      title: `${character.name}的故事`,
      coverImage: matchIllustration(fallbackPages[0].text, 0),
      pages: fallbackPages.map((page, index) => ({
        text: page.text,
        imageUrl: matchIllustration(page.text, index)
      })),
      characterId: character.id,
      topic,
      createdAt: Date.now(),
    };
  }
}

/**
 * Check if Gemini API is configured
 */
export function isGeminiConfigured(): boolean {
  return !!API_KEY && API_KEY !== 'undefined';
}
