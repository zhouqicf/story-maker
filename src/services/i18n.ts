// Internationalization (i18n) support
export type Language = 'zh' | 'en';

interface Translations {
  // Common
  home: string;
  back: string;
  next: string;
  save: string;
  discard: string;
  delete: string;
  cancel: string;
  confirm: string;
  
  // Home page
  appTitle: string;
  appSubtitle: string;
  makeStory: string;
  myShelf: string;
  
  // Character selection
  chooseHero: string;
  selectCharacter: string;
  
  // Story input
  tellStory: string;
  storyTopic: string;
  storyTopicPlaceholder: string;
  startRecording: string;
  stopRecording: string;
  createStory: string;
  
  // Story generation
  makingMagic: string;
  writingStory: string;
  
  // Story reader
  storyNotFound: string;
  goHome: string;
  
  // Story shelf
  myStories: string;
  shelfEmpty: string;
  timeToCreate: string;
  
  // Delete dialog
  deleteStoryTitle: string;
  deleteStoryMessage: string;
  deleteButton: string;
  
  // Characters
  characters: {
    lion: { name: string; description: string };
    astronaut: { name: string; description: string };
    princess: { name: string; description: string };
    robot: { name: string; description: string };
    ultraman: { name: string; description: string };
    wukong: { name: string; description: string };
    archie: { name: string; description: string };
  };
}

const translations: Record<Language, Translations> = {
  zh: {
    // Common
    home: '首页',
    back: '返回',
    next: '下一步',
    save: '保存',
    discard: '丢弃',
    delete: '删除',
    cancel: '取消',
    confirm: '确定',
    
    // Home page
    appTitle: '故事魔法师',
    appSubtitle: '创造属于你的奇妙故事',
    makeStory: '创作故事',
    myShelf: '我的书架',
    
    // Character selection
    chooseHero: '选择你的主角',
    selectCharacter: '点击选择一个角色',
    
    // Story input
    tellStory: '讲述你的故事',
    storyTopic: '故事主题',
    storyTopicPlaceholder: '告诉我故事的内容... 或使用下方的麦克风！',
    startRecording: '开始录音',
    stopRecording: '停止录音',
    createStory: '创作故事',
    
    // Story generation
    makingMagic: '施展魔法中...',
    writingStory: '正在为你创作故事',
    
    // Story reader
    storyNotFound: '故事未找到！',
    goHome: '返回首页',
    
    // Story shelf
    myStories: '我的故事',
    shelfEmpty: '书架空空的！',
    timeToCreate: '是时候创作一些魔法故事了',
    
    // Delete dialog
    deleteStoryTitle: '删除故事',
    deleteStoryMessage: '确定要删除这个故事吗？删除后无法恢复。',
    deleteButton: '删除',
    
    // Characters
    characters: {
      lion: { name: '小狮子雷欧', description: '勇敢又响亮' },
      astronaut: { name: '太空小子', description: '热爱星空' },
      princess: { name: '豌豆公主', description: '善良又神奇' },
      robot: { name: '机器人朋友', description: '聪明又乐于助人' },
      ultraman: { name: '奥特曼', description: '地球的守护者' },
      wukong: { name: '孙悟空', description: '齐天大圣' },
      archie: { name: '阿奇', description: '忠诚的朋友' },
    },
  },
  en: {
    // Common
    home: 'Home',
    back: 'Back',
    next: 'Next',
    save: 'Save',
    discard: 'Discard',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm',
    
    // Home page
    appTitle: 'Story Maker',
    appSubtitle: 'Create Your Magical Stories',
    makeStory: 'Make Magic',
    myShelf: 'My Shelf',
    
    // Character selection
    chooseHero: 'Choose Your Hero',
    selectCharacter: 'Tap to select a character',
    
    // Story input
    tellStory: 'Tell Your Story',
    storyTopic: 'Story Topic',
    storyTopicPlaceholder: 'Tell me what happens... or use the microphone below!',
    startRecording: 'Start Recording',
    stopRecording: 'Stop Recording',
    createStory: 'Create Story',
    
    // Story generation
    makingMagic: 'Making Magic...',
    writingStory: 'Writing a story for you',
    
    // Story reader
    storyNotFound: 'Story not found!',
    goHome: 'Go Home',
    
    // Story shelf
    myStories: 'My Stories',
    shelfEmpty: 'Your shelf is empty!',
    timeToCreate: 'Time to make some magic stories',
    
    // Delete dialog
    deleteStoryTitle: 'Delete Story',
    deleteStoryMessage: 'Are you sure you want to delete this story? This cannot be undone.',
    deleteButton: 'Delete',
    
    // Characters
    characters: {
      lion: { name: 'Leo the Lion', description: 'Brave and loud' },
      astronaut: { name: 'Astro Kid', description: 'Loves stars' },
      princess: { name: 'Princess Pea', description: 'Kind and magical' },
      robot: { name: 'Robo-friend', description: 'Smart and helpful' },
      ultraman: { name: 'Ultraman', description: 'Protector of Earth' },
      wukong: { name: 'Sun Wukong', description: 'Monkey King' },
      archie: { name: 'Archie', description: 'Loyal friend' },
    },
  },
};

// Get current language from localStorage or default to Chinese
export function getCurrentLanguage(): Language {
  const saved = localStorage.getItem('app-language');
  return (saved === 'en' || saved === 'zh') ? saved : 'zh';
}

// Set language
export function setLanguage(lang: Language): void {
  localStorage.setItem('app-language', lang);
  window.location.reload(); // Reload to apply language change
}

// Get translation
export function t(key: string): string {
  const lang = getCurrentLanguage();
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}

// Export translations for direct access
export { translations };
