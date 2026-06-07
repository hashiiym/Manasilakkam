import { useState, useRef, useCallback } from 'react';

export const useGemini = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const search = useCallback(async (query) => {
    // Abort previous in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/quran', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
        signal: abortController.signal,
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific server returned errors
        if (response.status === 429 || data.type === 'rate_limit') {
          throw { type: 'rate_limit', message: 'Please wait a moment and try again.' };
        }
        throw { type: data.type || 'network', message: data.message || 'An error occurred connecting to the server.' };
      }

      // Handle Gemini "not_quran" graceful error format
      if (data.error === 'not_quran') {
        throw { type: 'not_quran', message: data.message };
      }

      setResult(data);
    } catch (err) {
      if (err.name === 'AbortError') {
        // Request was aborted by a new request, ignore
        return;
      }
      
      const errorState = {
        type: err.type || 'unknown',
        message: err.message || 'An unexpected error occurred.'
      };
      setError(errorState);
    } finally {
      if (abortControllerRef.current === abortController) {
        setLoading(false);
      }
    }
  }, []);

  return { result, loading, error, search };
};
