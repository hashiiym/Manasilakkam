import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SURAHS } from '../../constants/surahs';

const SearchHero = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isShaking, setIsShaking] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const lowerVal = value.toLowerCase();
    const filtered = SURAHS.filter((s) => 
      s.nameEnglish.toLowerCase().includes(lowerVal) ||
      s.nameTransliterated.toLowerCase().includes(lowerVal) ||
      s.nameArabic.includes(value) ||
      s.number.toString() === value
    ).slice(0, 5);
    
    setSuggestions(filtered);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setSuggestions([]);
    }
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setSuggestions([]);
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 300);
      return;
    }
    navigate(`/surah/${encodeURIComponent(trimmedQuery)}`);
  };

  const handleSuggestionClick = (suggestion) => {
    const text = suggestion.nameTransliterated;
    setQuery(text);
    setSuggestions([]);
    navigate(`/surah/${encodeURIComponent(text)}`);
  };

  const handleChipClick = (suggestion) => {
    setQuery(suggestion);
    // Auto-submit requires navigating directly or a separate effect, since setQuery is async.
    // Easiest is to navigate directly.
    navigate(`/surah/${encodeURIComponent(suggestion)}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center animate-fadeIn px-4">
      <h1 className="font-cormorant text-[48px] text-sandal-700 mb-4 leading-tight relative z-10">
        Manasilakkam
      </h1>
      <p className="font-lora text-[18px] text-sandal-500 mb-8 max-w-[600px] relative z-10">
        Understand the Quran deeply — search by Surah name, verse reference, or topic
      </p>

      <div className={`relative z-10 w-full max-w-[560px] transition-transform ${isShaking ? 'animate-shake' : ''}`}>
        <form 
          onSubmit={handleSearch} 
          className="w-full flex items-center bg-sandal-50 border border-sandal-200 rounded-xl p-2"
        >
          <div className="pl-3 pr-2 text-sandal-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="e.g. Al-Fatiha · 2:255 · verse about patience"
            className="flex-1 bg-transparent border-none outline-none font-lora text-[17px] text-sandal-900 placeholder-sandal-500 min-w-0"
          />
          <button
            type="submit"
            className="ml-2 px-6 py-2 bg-sandal-700 text-white font-cormorant text-[16px] rounded-lg hover:bg-sandal-900 transition-all duration-300 ease-in-out"
          >
            Search
          </button>
        </form>

        {suggestions.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-white border border-sandal-200 rounded-xl shadow-lg mt-2 overflow-hidden z-50 text-left">
            {suggestions.map((s) => (
              <button
                key={s.number}
                type="button"
                onClick={() => handleSuggestionClick(s)}
                className="w-full px-4 py-3 text-left border-b border-sandal-100 last:border-b-0 hover:bg-sandal-50 transition-colors duration-150 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-sandal-100 text-sandal-700 rounded-full font-inter text-xs font-bold">
                    {s.number}
                  </span>
                  <div>
                    <div className="font-inter font-semibold text-sandal-900 text-[15px]">{s.nameTransliterated}</div>
                    <div className="font-lora text-sandal-500 text-[13px]">{s.nameEnglish}</div>
                  </div>
                </div>
                <div className="font-amiri text-sandal-700 text-lg" dir="rtl">{s.nameArabic}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-6 relative z-10">
        {['Ayatul Kursi', 'Al-Fatiha', 'Surah Yasin'].map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => handleChipClick(suggestion)}
            className="px-4 py-1.5 bg-sandal-100 text-sandal-700 border border-sandal-200 rounded-full text-sm font-inter hover:bg-sandal-200 transition-all duration-300 ease-in-out"
          >
            {suggestion}
          </button>
        ))}
      </div>

      <div className="w-full max-w-[400px] h-px bg-sandal-200 my-8 relative z-10"></div>

      <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 font-inter text-[13px] text-sandal-500 relative z-10">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
          Arabic text
        </div>
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>
          Transliteration
        </div>
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
          English & Malayalam
        </div>
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
          Audio
        </div>
      </div>
    </div>
  );
};

export default SearchHero;
