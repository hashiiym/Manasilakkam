import React, { useState } from 'react';

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-auto text-[11px] font-inter uppercase tracking-wider px-2 py-1 rounded text-sandal-500 hover:bg-sandal-50 hover:text-sandal-700 transition-colors"
      aria-label="Copy translation"
    >
      {copied ? 'Copied ✓' : 'Copy'}
    </button>
  );
};

const TranslationPanel = ({ result }) => {
  return (
    <div className="space-y-8">
      
      {/* Transliteration */}
      <div className="pl-4 border-l-2 border-sandal-500">
        <div className="text-[11px] font-inter uppercase tracking-widest text-sandal-500 mb-2">
          Transliteration
        </div>
        <p className="font-lora italic text-[17px] leading-[1.9] text-sandal-700">
          {result.transliteration}
        </p>
      </div>

      {/* English Translation */}
      <div className="pl-4 border-l-2 border-sandal-500 group relative">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[11px] font-inter uppercase tracking-widest text-sandal-500">
            English Translation
          </div>
          <div className="opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
             <CopyButton text={result.english_translation} />
          </div>
        </div>
        <p className="font-lora text-[17px] leading-[1.9] text-sandal-900">
          {result.english_translation}
        </p>
      </div>

      {/* Malayalam Translation */}
      <div className="pl-4 border-l-2 border-sandal-500 group relative">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[11px] font-inter uppercase tracking-widest text-sandal-500">
            മലയാളം പരിഭാഷ
          </div>
          <div className="opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
            <CopyButton text={result.malayalam_translation} />
          </div>
        </div>
        <p className="font-noto text-[17px] leading-[2.0] text-sandal-900">
          {result.malayalam_translation}
        </p>
      </div>

    </div>
  );
};

export default TranslationPanel;
