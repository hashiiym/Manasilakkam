import React, { useEffect, useState, useRef } from 'react';
import { useAudio } from '../../hooks/useAudio';
import ReciterDropdown from './ReciterDropdown';

const formatTime = (time) => {
  if (isNaN(time) || time === Infinity) return "00:00";
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const AudioPlayer = ({ surahNumber, ayahNumber }) => {
  const {
    playing, loading, error, currentVerse, duration,
    currentTime, speed, looping, reciter,
    play, pause, seek, setSpeed, toggleLoop, setReciter,
    audioQueue, playVerseIndex, currentIndex
  } = useAudio({ surahNumber, ayahNumber });

  const [isDragging, setIsDragging] = useState(false);
  const [dragTime, setDragTime] = useState(0);

  const handleSeekChange = (e) => {
    setIsDragging(true);
    setDragTime(Number(e.target.value));
  };

  const handleSeekEnd = (e) => {
    setIsDragging(false);
    seek(Number(e.target.value));
  };

  const cycleSpeed = () => {
    if (speed === 0.75) setSpeed(1);
    else if (speed === 1) setSpeed(1.25);
    else setSpeed(0.75);
  };

  if (error) {
    return (
      <div className="bg-sandal-50 border border-sandal-200 rounded-xl p-8 text-center">
        <p className="font-lora italic text-sandal-500">
          Audio temporarily unavailable. Please try again shortly.
        </p>
      </div>
    );
  }

  const currentDownloadUrl = audioQueue[currentIndex]?.url || '#';
  const displayTime = isDragging ? dragTime : currentTime;
  const progressPercent = duration > 0 ? (displayTime / duration) * 100 : 0;
  const totalVerses = audioQueue.length || (ayahNumber ? 1 : 0);

  return (
    <div className="bg-sandal-50 border border-sandal-200 rounded-xl px-6 py-5 flex flex-col gap-5 sm:gap-4">
      
      {/* Row 1 — Reciter selector */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <span className="font-inter text-[11px] text-sandal-500 uppercase tracking-wider">
          Reciter
        </span>
        <ReciterDropdown selectedReciter={reciter} onSelectReciter={setReciter} />
      </div>

      {/* Row 2 — Waveform / progress bar area */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="font-inter text-[12px] text-sandal-500">
            {totalVerses > 0 ? `Verse ${currentVerse}` : 'Loading verses...'}
          </span>
          <span className="font-inter text-[12px] text-sandal-500">
            {formatTime(displayTime)} / {formatTime(duration)}
          </span>
        </div>
        
        {/* Seek Bar */}
        <div className="relative h-2 w-full rounded-full bg-sandal-200 overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-sandal-500 transition-all duration-75 ease-linear"
            style={{ width: `${progressPercent}%` }}
          />
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={displayTime}
            onChange={handleSeekChange}
            onMouseUp={handleSeekEnd}
            onTouchEnd={handleSeekEnd}
            disabled={loading || audioQueue.length === 0}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-default"
            aria-label="Seek time"
          />
        </div>
      </div>

      {/* Row 3 — Controls */}
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">
        <button
          onClick={cycleSpeed}
          className="font-inter text-[12px] font-medium px-3 py-1 rounded-full bg-sandal-100 text-sandal-700 hover:bg-sandal-200 transition-colors"
          aria-label={`Playback speed ${speed}x`}
        >
          {speed}×
        </button>

        <div className="flex items-center gap-4 sm:gap-6 mx-auto sm:mx-0">
          <button
            onClick={() => playVerseIndex(currentIndex - 1)}
            disabled={currentIndex === 0 || loading || audioQueue.length === 0}
            className="text-sandal-500 hover:text-sandal-700 disabled:opacity-50 transition-colors"
            aria-label="Previous verse"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button
            onClick={playing ? pause : play}
            className="flex items-center justify-center w-[56px] h-[56px] sm:w-[48px] sm:h-[48px] rounded-full bg-sandal-700 text-white hover:bg-sandal-900 transition-colors flex-shrink-0"
            aria-label={playing ? "Pause" : "Play"}
          >
            {loading ? (
              <svg className="animate-spin h-6 w-6 text-sandal-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : playing ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            )}
          </button>

          <button
            onClick={() => playVerseIndex(currentIndex + 1)}
            disabled={currentIndex === audioQueue.length - 1 || loading || audioQueue.length === 0}
            className="text-sandal-500 hover:text-sandal-700 disabled:opacity-50 transition-colors"
            aria-label="Next verse"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={toggleLoop}
            className={`transition-colors ${looping ? 'text-sandal-700' : 'text-sandal-500 hover:text-sandal-700'}`}
            aria-label="Toggle loop"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 3 21 3 21 8"></polyline>
              <line x1="4" y1="20" x2="21" y2="3"></line>
              <polyline points="21 16 21 21 16 21"></polyline>
              <line x1="15" y1="15" x2="21" y2="21"></line>
              <line x1="4" y1="4" x2="9" y2="9"></line>
            </svg>
          </button>
          
          <a
            href={currentDownloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-inter text-[12px] text-sandal-500 hover:underline ${audioQueue.length === 0 ? 'pointer-events-none opacity-50' : ''}`}
            aria-label="Download audio"
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
