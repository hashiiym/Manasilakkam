import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchHero = () => {
  const [query, setQuery] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 300);
      return;
    }
    navigate(`/surah/${encodeURIComponent(trimmedQuery)}`);
  };

  const handleChipClick = (suggestion) => {
    setQuery(suggestion);
    // Auto-submit requires navigating directly or a separate effect, since setQuery is async.
    // Easiest is to navigate directly.
    navigate(`/surah/${encodeURIComponent(suggestion)}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center animate-fadeIn px-4">
      <h1 className="font-cormorant text-[48px] text-sandal-700 mb-4 leading-tight">
        Quran Explorer
      </h1>
      <p className="font-lora text-[18px] text-sandal-500 mb-8 max-w-[600px]">
        Understand the Quran deeply — search by Surah name, verse reference, or topic
      </p>

      <form 
        onSubmit={handleSearch} 
        className={`relative w-full max-w-[560px] flex items-center bg-sandal-50 border border-sandal-200 rounded-xl p-2 transition-transform ${isShaking ? 'animate-shake' : ''}`}
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
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Al-Fatiha · 2:255 · verse about patience"
          className="flex-1 bg-transparent border-none outline-none font-lora text-[17px] text-sandal-900 placeholder-sandal-500 min-w-0"
        />
        <button
          type="submit"
          className="ml-2 px-6 py-2 bg-sandal-700 text-white font-cormorant text-[16px] rounded-lg hover:bg-sandal-900 transition-colors"
        >
          Search
        </button>
      </form>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
        {['Ayatul Kursi', 'Al-Fatiha', 'Surah Yasin'].map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => handleChipClick(suggestion)}
            className="px-4 py-1.5 bg-sandal-100 text-sandal-700 border border-sandal-200 rounded-full text-sm font-inter hover:bg-sandal-200 transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>

      <div className="w-full max-w-[400px] h-px bg-sandal-200 my-8"></div>

      <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 font-inter text-[13px] text-sandal-500">
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
