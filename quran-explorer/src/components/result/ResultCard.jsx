import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SurahHeader from './SurahHeader';
import ArabicPanel from './ArabicPanel';
import TranslationPanel from './TranslationPanel';
import ExplanationPanel from './ExplanationPanel';
import DisclaimerFooter from './DisclaimerFooter';
import AudioPlayer from '../audio/AudioPlayer';

const ResultCard = ({ result }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      navigate(`/surah/${encodeURIComponent(trimmedQuery)}`);
    }
  };

  return (
    <div className="bg-white border border-sandal-200 rounded-xl overflow-hidden shadow-sm animate-fadeIn" style={{ animationDuration: '400ms' }}>
      
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-10 bg-sandal-50/95 backdrop-blur-sm border-b border-sandal-200 px-4 py-3 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="font-inter text-sm text-sandal-500">
          <Link to="/" className="hover:text-sandal-700 transition-colors">Home</Link>
          <span className="mx-2">→</span>
          <span className="text-sandal-700 font-medium">{result.surah_name_english}</span>
          {result.verse_reference && (
            <>
              <span className="mx-2">→</span>
              <span className="text-sandal-700">{result.verse_reference}</span>
            </>
          )}
        </div>

        <form onSubmit={handleSearch} className="w-full sm:w-auto relative flex items-center bg-white border border-sandal-200 rounded-lg overflow-hidden">
          <div className="pl-2 pr-1 text-sandal-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search again..."
            className="w-full sm:w-48 bg-transparent border-none outline-none font-inter text-sm text-sandal-900 py-1.5 px-1 min-w-0"
          />
        </form>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-8 space-y-8">
        <SurahHeader result={result} />
        <ArabicPanel text={result.arabic_text} />
        <AudioPlayer />
        <TranslationPanel result={result} />
        <ExplanationPanel result={result} />
      </div>

      <DisclaimerFooter />
    </div>
  );
};

export default ResultCard;
