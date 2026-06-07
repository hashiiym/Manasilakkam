import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGemini } from '../hooks/useGemini';
import ResultCard from '../components/result/ResultCard';

const ResultPage = () => {
  const { id, surah, ayah } = useParams();
  const navigate = useNavigate();
  const { result, loading, error, search } = useGemini();

  useEffect(() => {
    const query = surah && ayah ? `${surah}:${ayah}` : id;
    if (query) {
      search(query);
    }
  }, [id, surah, ayah, search]);

  const handleTryAgain = () => {
    navigate('/');
  };

  return (
    <div className="py-6 animate-fadeIn">
      {loading && (
        <div className="w-full h-[600px] bg-sandal-100 animate-pulse rounded-xl border border-sandal-200"></div>
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
        <ResultCard result={result} />
      )}
    </div>
  );
};

export default ResultPage;
