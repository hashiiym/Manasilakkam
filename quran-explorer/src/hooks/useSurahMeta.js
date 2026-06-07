import { SURAHS } from '../constants/surahs';

export const useSurahMeta = () => {
  const filterSurahs = (query, type = 'All') => {
    let filtered = SURAHS;
    
    if (type !== 'All') {
      filtered = filtered.filter(s => s.classification === type);
    }
    
    if (query) {
      const q = query.trim().toLowerCase().replace(/[-\s]/g, '');
      filtered = filtered.filter(s => 
        s.nameArabic.toLowerCase().includes(q) ||
        s.nameEnglish.toLowerCase().replace(/[-\s]/g, '').includes(q) ||
        s.nameTransliterated.toLowerCase().replace(/[-\s]/g, '').includes(q) ||
        s.number.toString().includes(q)
      );
    }
    
    return filtered;
  };

  return { surahs: SURAHS, filterSurahs };
};
