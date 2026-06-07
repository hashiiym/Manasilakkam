import React from 'react';

const SurahHeader = ({ result }) => {
  const isMeccan = result.classification?.toLowerCase() === 'meccan';

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-cormorant text-[28px] text-sandal-700 leading-tight">
            {result.surah_name_english}
          </h2>
          <div className="flex items-center gap-3 mt-1 text-sm font-inter text-sandal-500">
            <span>Surah {result.surah_number}</span>
            <span>·</span>
            <span 
              className={`px-2.5 py-0.5 rounded-full text-white text-xs ${isMeccan ? 'bg-[#2E7D5E]' : 'bg-[#2B5B8A]'}`}
            >
              {result.classification}
            </span>
            <span>·</span>
            <span>{result.verse_count} verses</span>
          </div>
        </div>
        <div className="text-right w-full sm:w-auto">
          <span className="font-amiri text-[36px] text-sandal-700 block rtl">
            {result.surah_name_arabic}
          </span>
        </div>
      </div>
      <p className="font-lora italic text-[16px] text-sandal-500 mt-2 border-l-2 border-sandal-200 pl-4">
        {result.summary}
      </p>
    </div>
  );
};

export default SurahHeader;
