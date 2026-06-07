import { useState, useRef, useCallback } from 'react';

export const useGemini = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const search = useCallback(async (query) => {
    // Normalize query
    const normalizedQuery = query.toLowerCase().replace(/\s+/g, ' ').trim();
    const cacheKey = `manasilakkam_cache_${normalizedQuery}`;

    // Abort previous in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setLoading(true);
    setError(null);
    setResult(null);

    // 1. Check local cache first for an exact match
    try {
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        const parsed = JSON.parse(cachedData);
        setResult(parsed);
        setLoading(false);
        return; // Early return, avoid network request
      }
    } catch (e) {
      console.warn('Error reading from localStorage:', e);
    }

    // Set loading favicon
    const favicon = document.querySelector("link[rel~='icon']");
    const originalFavicon = favicon ? favicon.href : '/favicon.png';
    if (favicon) {
      favicon.href = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" fill="none" stroke="%238a775a" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform></circle></svg>';
    }

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

      // 2. Save successful fetch to cache
      try {
        localStorage.setItem(cacheKey, JSON.stringify(data));
      } catch (e) {
        console.warn('Error writing to localStorage:', e);
      }

      setResult(data);
    } catch (err) {
      if (err.name === 'AbortError') {
        // Request was aborted by a new request, ignore
        return;
      }
      
      // 3. Rate Limit (429) Smart Fallback
      if (err.type === 'rate_limit') {
        try {
          // Look for any partial or similar match in localStorage
          let fallbackData = null;
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('manasilakkam_cache_')) {
              const cachedQuery = key.replace('manasilakkam_cache_', '');
              // If the cached query is a substring of the requested query, or vice-versa
              if (cachedQuery.includes(normalizedQuery) || normalizedQuery.includes(cachedQuery)) {
                fallbackData = JSON.parse(localStorage.getItem(key));
                break;
              }
            }
          }

          if (fallbackData) {
            // Append a non-breaking property to indicate it's a fallback cache
            setResult({ ...fallbackData, isCachedFallback: true });
            return; // Skip setting the error state
          }
        } catch (fallbackErr) {
          console.warn('Error fetching fallback from localStorage:', fallbackErr);
        }
      }

      const errorState = {
        type: err.type || 'unknown',
        message: err.message || 'An unexpected error occurred.'
      };
      setError(errorState);
    } finally {
      if (abortControllerRef.current === abortController) {
        setLoading(false);
        if (favicon) favicon.href = originalFavicon;
      }
    }
  }, []);

  return { result, loading, error, search };
};
