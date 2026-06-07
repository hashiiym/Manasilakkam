import React, { useState } from 'react';

const ArabicPanel = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Graceful fallback
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
    <div className="relative bg-sandal-100 rounded-xl p-8 group">
      <button
        onClick={handleCopy}
        className="absolute top-4 right-4 text-xs font-inter font-medium px-3 py-1.5 rounded-md bg-white/50 hover:bg-white text-sandal-700 border border-sandal-200 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Copy Arabic text"
      >
        {copied ? 'Copied ✓' : 'Copy'}
      </button>
      
      <p 
        dir="rtl" 
        className="font-amiri text-[30px] leading-[2.2] text-sandal-900 text-right"
      >
        {text}
      </p>
    </div>
  );
};

export default ArabicPanel;
