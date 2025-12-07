import React from 'react';
import { Globe } from 'lucide-react';
import { getCurrentLanguage, setLanguage, type Language } from '../services/i18n';

export const LanguageSwitcher: React.FC = () => {
  const currentLang = getCurrentLanguage();

  const toggleLanguage = () => {
    const newLang: Language = currentLang === 'zh' ? 'en' : 'zh';
    setLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-candy-blue/20"
    >
      <Globe size={20} className="text-candy-blue" />
      <span className="font-bubble text-sm text-candy-text">
        {currentLang === 'zh' ? '中文' : 'English'}
      </span>
    </button>
  );
};
