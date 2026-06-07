import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useGemini } from '../hooks/useGemini';
import ResultCard from '../components/result/ResultCard';

const ResultPage = () => {
  const { id, surah, ayah } = useParams();
  const navigate = useNavigate();
  const { result, loading, error, search } = useGemini();
  const [searchQuery, setSearchQuery] = useState('');

  const query = surah && ayah ? `${surah}:${ayah}` : id;

  useEffect(() => {
    if (query) {
      search(query);
      setSearchQuery(query);
    }
  }, [id, surah, ayah, search]);

  useEffect(() => {
    if (result && !loading && !error) {
      const title = `${result.surah_name_english}${result.verse_reference ? ` ${result.verse_reference}` : ''} · Quran Explorer`;
      document.title = title;
      
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = `Read and explore ${result.surah_name_english} from the Quran with Arabic, transliteration, and explanation.`;
    }
  }, [result, loading, error]);

  const handleTryAgain = () => {
    navigate('/');
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery && trimmedQuery !== query) {
      navigate(`/surah/${encodeURIComponent(trimmedQuery)}`);
    }
  };

  return (
    <>
      {result && !loading && !error && (
        <div className="sticky top-0 z-50 bg-white border-b border-sandal-200 px-6 py-3 shadow-sm animate-fadeIn">
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto flex items-center bg-sandal-50 border border-sandal-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-sandal-300 transition-all">
            <div className="pl-3 pr-2 text-sandal-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Surahs or verses..."
              className="w-full bg-transparent border-none outline-none font-inter text-[15px] text-sandal-900 py-2 min-w-0"
            />
          </form>
        </div>
      )}

      <div className="py-6 px-4 md:px-0 animate-fadeIn max-w-4xl mx-auto">
        {loading && (
          <div className="w-full h-[600px] bg-sandal-100/50 animate-pulse rounded-xl border border-sandal-200"></div>
        )}

        {error && !loading && (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
            {error.type === 'not_quran' && (
              <>
                <p className="font-lora text-[18px] text-sandal-700 mb-6 max-w-md">
                  This app is for Quranic study. Try searching for a Surah name or verse reference.
                </p>
                <button
                  onClick={handleTryAgain}
                  className="px-6 py-2 bg-sandal-700 text-white font-cormorant text-[16px] rounded-lg hover:bg-sandal-900 transition-colors"
                >
                  Try again
                </button>
              </>
            )}
            
            {error.type === 'rate_limit' && (
              <p className="font-lora text-[18px] text-sandal-700">
                Please wait a moment and search again.
              </p>
            )}

            {error.type === 'network' && (
              <p className="font-lora text-[18px] text-sandal-700">
                Could not reach the server. Check your connection.
              </p>
            )}

            {error.type === 'unknown' && (
              <p className="font-lora text-[18px] text-sandal-700">
                An unexpected error occurred. Please try again.
              </p>
            )}
          </div>
        )}

        {result && !loading && !error && (
          <div className="space-y-6">
            <ResultCard result={result} />
            
            <div className="flex items-center justify-between px-2 pt-2 pb-8">
              {result.surah_number > 1 ? (
                <Link 
                  to={`/surah/${result.surah_number - 1}`}
                  className="font-cormorant text-[16px] text-sandal-700 hover:underline transition-colors"
                >
                  ← Previous Surah
                </Link>
              ) : <div></div>}
              
              {result.surah_number < 114 ? (
                <Link 
                  to={`/surah/${result.surah_number + 1}`}
                  className="font-cormorant text-[16px] text-sandal-700 hover:underline transition-colors"
                >
                  Next Surah →
                </Link>
              ) : <div></div>}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ResultPage;
