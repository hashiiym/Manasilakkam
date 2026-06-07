import { useState, useRef, useEffect, useCallback } from 'react';
import { DEFAULT_RECITER } from '../constants/reciters';
import { fetchSurahAudio, fetchVerseAudio } from '../utils/quranApi';

export const useAudio = ({ surahNumber, ayahNumber }) => {
  const audioRef = useRef(new Audio());
  
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const [audioQueue, setAudioQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [looping, setLooping] = useState(false);
  const [reciter, setReciterState] = useState(DEFAULT_RECITER);

  const currentVerse = audioQueue[currentIndex]?.verse || ayahNumber;

  // Cleanup on unmount
  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Update speed
  useEffect(() => {
    audioRef.current.playbackRate = speed;
  }, [speed]);

  const loadAndPlayVerse = useCallback((index, queue) => {
    if (!queue || queue.length === 0 || index >= queue.length) {
      setPlaying(false);
      setCurrentTime(0);
      return;
    }
    
    const audio = audioRef.current;
    audio.src = queue[index].url;
    audio.playbackRate = speed;
    audio.play().catch(err => {
      console.error('Audio playback failed', err);
      setError(true);
      setPlaying(false);
    });
    setPlaying(true);
  }, [speed]);

  // Handle Event Listeners
  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    
    const handleEnded = () => {
      if (looping) {
        audio.currentTime = 0;
        audio.play().catch(e => console.error(e));
      } else {
        if (currentIndex < audioQueue.length - 1) {
          const nextIndex = currentIndex + 1;
          setCurrentIndex(nextIndex);
          loadAndPlayVerse(nextIndex, audioQueue);
        } else {
          setPlaying(false);
          setCurrentTime(0);
        }
      }
    };

    const handleError = () => {
      setError(true);
      setPlaying(false);
      setLoading(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [currentIndex, audioQueue, looping, loadAndPlayVerse]);

  const fetchAudio = async (selectedReciter) => {
    setLoading(true);
    setError(false);
    try {
      let queue;
      if (ayahNumber) {
        queue = await fetchVerseAudio(surahNumber, ayahNumber, selectedReciter.id);
      } else {
        queue = await fetchSurahAudio(surahNumber, selectedReciter.id);
      }
      setAudioQueue(queue);
      setCurrentIndex(0);
      setLoading(false);
      return queue;
    } catch (err) {
      console.error(err);
      setError(true);
      setLoading(false);
      return null;
    }
  };

  const play = async () => {
    if (error) setError(false);

    if (audioQueue.length === 0) {
      const queue = await fetchAudio(reciter);
      if (queue) {
        loadAndPlayVerse(0, queue);
      }
    } else {
      audioRef.current.play().catch(e => console.error(e));
      setPlaying(true);
    }
  };

  const pause = () => {
    audioRef.current.pause();
    setPlaying(false);
  };

  const seek = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const toggleLoop = () => setLooping(prev => !prev);

  const setReciter = async (newReciter) => {
    setReciterState(newReciter);
    
    // If we were playing, pause, clear, refetch and play
    if (playing) {
      pause();
      setAudioQueue([]);
      setCurrentTime(0);
      const queue = await fetchAudio(newReciter);
      if (queue) {
        loadAndPlayVerse(0, queue);
      }
    } else if (audioQueue.length > 0) {
      // Just clear queue if not playing but already loaded
      setAudioQueue([]);
      setCurrentTime(0);
    }
  };

  // Allow going to next/prev verse manually
  const playVerseIndex = (index) => {
    if (index >= 0 && index < audioQueue.length) {
      setCurrentIndex(index);
      loadAndPlayVerse(index, audioQueue);
    }
  };

  return {
    playing,
    loading,
    error,
    currentVerse,
    duration,
    currentTime,
    speed,
    looping,
    reciter,
    play,
    pause,
    seek,
    setSpeed,
    toggleLoop,
    setReciter,
    audioQueue,
    playVerseIndex,
    currentIndex
  };
};
