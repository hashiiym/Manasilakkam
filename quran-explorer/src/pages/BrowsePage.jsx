import { useState, useMemo, useEffect } from 'react';
import { useSurahMeta } from '../hooks/useSurahMeta';
import SurahList from '../components/browse/SurahList';

export default function BrowsePage() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('All'); // 'All', 'Meccan', 'Medinan'
  const { filterSurahs } = useSurahMeta();
  
  const filtered = useMemo(() => filterSurahs(query, type), [query, type, filterSurahs]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    document.title = "Browse Surahs · Quran Explorer";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = "Browse and search all 114 Surahs of the Quran by name, number, or classification.";
  }, [type]);

  const FilterPill = ({ label, current, onClick }) => (
    <button
      onClick={() => onClick(label)}
      className={`px-5 py-1.5 rounded-full font-inter text-sm transition-all duration-200 ${
        current === label 
          ? 'bg-sandal-700 text-white shadow-md' 
          : 'bg-white text-sandal-600 hover:bg-sandal-50 border border-sandal-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-sandal-50/30 pt-24 px-4 md:px-8 pb-16">
      <div className="max-w-3xl mx-auto mb-10 text-center animate-fade-in-up">
        <h1 className="font-cormorant text-[36px] text-sandal-700 font-semibold mb-2">
          All 114 Surahs
        </h1>
        <p className="font-lora text-[16px] text-sandal-500 mb-8">
          Browse by name, number, or type
        </p>
        
        <div className="flex flex-col gap-5 max-w-md mx-auto">
          <div className="relative shadow-sm rounded-full bg-white border border-sandal-200 flex items-center px-5 py-3 focus-within:ring-2 focus-within:ring-sandal-300 transition-all duration-200">
            <svg className="w-5 h-5 text-sandal-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              className="flex-1 bg-transparent border-none outline-none font-inter text-[15px] text-sandal-900 placeholder-sandal-400"
              placeholder="Search Surahs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-sandal-400 hover:text-sandal-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          
          <div className="flex items-center justify-center gap-3">
            <FilterPill label="All" current={type} onClick={setType} />
            <FilterPill label="Meccan" current={type} onClick={setType} />
            <FilterPill label="Medinan" current={type} onClick={setType} />
          </div>
        </div>
      </div>
      
      <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <SurahList surahs={filtered} />
      </div>
    </div>
  );
}
