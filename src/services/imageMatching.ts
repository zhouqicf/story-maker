/**
 * Smart Image Matcher for Children's Stories
 * Matches story scenes to appropriate illustrations
 */

// 儿童故事常见场景类型
type SceneType = 
  | 'space' | 'forest' | 'ocean' | 'castle' | 'city' 
  | 'home' | 'school' | 'park' | 'mountain' | 'desert'
  | 'sky' | 'night' | 'magic' | 'adventure' | 'friendship';

// 场景关键词映射
const sceneKeywords: Record<SceneType, string[]> = {
  space: ['太空', '星球', '月球', '火箭', '宇航', '星星', '外星', '飞船', '宇宙'],
  forest: ['森林', '树木', '丛林', '树林', '大树', '小径', '野外'],
  ocean: ['海洋', '大海', '海边', '沙滩', '海浪', '海底', '鱼', '珊瑚'],
  castle: ['城堡', '宫殿', '王国', '塔楼', '皇宫'],
  city: ['城市', '街道', '建筑', '商店', '马路', '高楼'],
  home: ['家', '房间', '卧室', '客厅', '厨房', '房子'],
  school: ['学校', '教室', '操场', '课堂'],
  park: ['公园', '花园', '草地', '游乐场'],
  mountain: ['山', '山峰', '高山', '山顶', '登山'],
  desert: ['沙漠', '沙丘', '骆驼'],
  sky: ['天空', '云', '彩虹', '飞翔', '飞行'],
  night: ['夜晚', '月亮', '星空', '夜空', '睡觉', '梦'],
  magic: ['魔法', '魔术', '神奇', '魔力', '变化', '奇迹'],
  adventure: ['冒险', '探险', '寻找', '旅行', '发现', '探索'],
  friendship: ['朋友', '友谊', '伙伴', '一起', '帮助', '分享'],
};

// 儿童友好的插图 URL（使用 Unsplash 的儿童友好图片）
const sceneImages: Record<SceneType, string[]> = {
  space: [
    'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop',
  ],
  forest: [
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1511497584788-876760111969?w=800&h=600&fit=crop',
  ],
  ocean: [
    'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1439405326854-014607f694d7?w=800&h=600&fit=crop',
  ],
  castle: [
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop',
  ],
  city: [
    'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
  ],
  home: [
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800&h=600&fit=crop',
  ],
  school: [
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop',
  ],
  park: [
    'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
  ],
  mountain: [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop',
  ],
  desert: [
    'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop',
  ],
  sky: [
    'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?w=800&h=600&fit=crop',
  ],
  night: [
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?w=800&h=600&fit=crop',
  ],
  magic: [
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop',
  ],
  adventure: [
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1445964047600-cdbdb873673d?w=800&h=600&fit=crop',
  ],
  friendship: [
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop',
  ],
};

/**
 * 根据文本内容智能匹配场景类型
 */
function detectSceneType(text: string): SceneType {
  const scores: Partial<Record<SceneType, number>> = {};

  // 计算每个场景类型的匹配分数
  for (const [sceneType, keywords] of Object.entries(sceneKeywords)) {
    let score = 0;
    for (const keyword of keywords) {
      if (text.includes(keyword)) {
        score += 1;
      }
    }
    if (score > 0) {
      scores[sceneType as SceneType] = score;
    }
  }

  // 找到得分最高的场景类型
  const sortedScenes = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  
  if (sortedScenes.length > 0) {
    return sortedScenes[0][0] as SceneType;
  }

  // 默认返回冒险场景
  return 'adventure';
}

/**
 * 为故事文本匹配合适的插图
 */
export function matchIllustration(text: string, index: number = 0): string {
  const sceneType = detectSceneType(text);
  const images = sceneImages[sceneType];
  
  // 使用索引选择不同的图片，避免重复
  const imageIndex = index % images.length;
  
  return images[imageIndex];
}

/**
 * 为整个故事的所有页面匹配插图
 */
export function matchStoryIllustrations(pages: Array<{ text: string }>): string[] {
  return pages.map((page, index) => matchIllustration(page.text, index));
}
