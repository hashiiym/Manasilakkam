import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SurahHeader from './SurahHeader';
import ArabicPanel from './ArabicPanel';
import TranslationPanel from './TranslationPanel';
import ExplanationPanel from './ExplanationPanel';
import DisclaimerFooter from './DisclaimerFooter';
import AudioPlayer from '../audio/AudioPlayer';

const ResultCard = ({ result }) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const isVerseSearch = result.verse_reference && result.verse_reference.includes(':');

  const handleShare = async () => {
    const shareData = {
      title: `${result.surah_name_english} - Quran Explorer`,
      text: `Read ${result.surah_name_english} ${result.verse_reference ? result.verse_reference : ''} on Quran Explorer`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white border border-sandal-200 rounded-xl overflow-hidden shadow-sm animate-fadeIn" style={{ animationDuration: '400ms' }}>
      
      {/* Top Header Bar */}
      <div className="bg-sandal-50/95 border-b border-sandal-200 px-4 py-3 sm:px-6 flex items-center justify-between">
        <div className="font-inter text-[13px] text-sandal-500 flex items-center flex-wrap gap-1">
          <Link to="/" className="hover:text-sandal-700 hover:underline transition-colors">Home</Link>
          <span className="mx-1">/</span>
          {result.verse_reference ? (
            <>
              <Link to={`/surah/${result.surah_number}`} className="hover:text-sandal-700 hover:underline transition-colors">
                {result.surah_name_english}
              </Link>
              <span className="mx-1">/</span>
              <span className="text-sandal-700">{result.verse_reference}</span>
            </>
          ) : (
            <span className="text-sandal-700">{result.surah_name_english}</span>
          )}
        </div>

        <button 
          onClick={handleShare}
          className="flex items-center gap-2 text-sandal-500 hover:text-sandal-700 transition-colors p-1 rounded-md"
          title="Share"
        >
          {copied ? (
            <span className="font-inter text-xs text-sandal-700 font-medium animate-fadeIn">Link copied!</span>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-8 space-y-8">
        <SurahHeader result={result} />
        
        {isVerseSearch && (
          <div className="flex justify-center">
            <Link 
              to={`/surah/${result.surah_number}`}
              className="inline-flex items-center px-5 py-2 bg-sandal-700 text-white font-cormorant text-[15px] rounded-full hover:bg-sandal-900 transition-colors shadow-sm"
            >
              View Full Surah
            </Link>
          </div>
        )}

        <ArabicPanel text={result.arabic_text} />
        <AudioPlayer surahNumber={result.surah_number} ayahNumber={result.verse_number || null} />
        <TranslationPanel result={result} />
        <ExplanationPanel result={result} />
      </div>

      <DisclaimerFooter />
    </div>
  );
};

export default ResultCard;
