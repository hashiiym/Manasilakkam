import React from 'react';

const PaginationControls = ({ currentChunk, totalChunks, startVerse, endVerse, totalVerses, onNext, onPrev }) => {
  if (totalChunks <= 1) return null;

  return (
    <div className="bg-sandal-50 border-t border-sandal-200 px-4 py-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
      <div className="font-lora text-sandal-700 text-center sm:text-left">
        <div className="font-semibold text-[15px]">Part {currentChunk} of {totalChunks}</div>
        <div className="text-[13px] text-sandal-500">Verses {startVerse}–{endVerse} of {totalVerses}</div>
      </div>
      
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button
          onClick={onPrev}
          disabled={currentChunk === 1}
          className="flex-1 sm:flex-none px-4 py-2 border border-sandal-300 text-sandal-700 font-inter text-sm font-medium rounded-lg hover:bg-sandal-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous Part
        </button>
        
        <button
          onClick={onNext}
          disabled={currentChunk === totalChunks}
          className="flex-1 sm:flex-none px-4 py-2 bg-sandal-700 text-white font-inter text-sm font-medium rounded-lg hover:bg-sandal-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          Next Part
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;
