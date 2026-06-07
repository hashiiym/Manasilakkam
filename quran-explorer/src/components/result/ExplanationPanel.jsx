import React, { useState, useRef, useEffect } from 'react';

const AccordionItem = ({ title, content, isReflect = false }) => {
  const [isOpen, setIsOpen] = useState(true);
  const contentRef = useRef(null);
  const [height, setHeight] = useState('0px');

  useEffect(() => {
    if (contentRef.current) {
      // Set a generous max-height for open state, 0 for closed
      setHeight(isOpen ? `${contentRef.current.scrollHeight + 100}px` : '0px');
    }
  }, [isOpen, content]);

  // Recalculate on window resize just in case
  useEffect(() => {
    const handleResize = () => {
      if (isOpen && contentRef.current) {
        setHeight(`${contentRef.current.scrollHeight + 100}px`);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  if (!content) return null;

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-sandal-200 rounded"
        aria-expanded={isOpen}
      >
        <h3 className="font-cormorant text-[20px] font-semibold text-sandal-700">
          {title}
        </h3>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" height="20" 
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={`text-sandal-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      <div 
        className="transition-[max-height] duration-500 ease-in-out overflow-hidden"
        style={{ maxHeight: height }}
      >
        <div ref={contentRef} className="pt-2 pb-4">
          {isReflect ? (
            <div className="bg-sandal-50 p-6 border-l-4 border-sandal-200 rounded-r-lg">
              <p className="font-lora italic text-[16px] leading-[1.85] text-sandal-900">
                "{content}"
              </p>
            </div>
          ) : (
            <div className="pl-4 border-l-2 border-sandal-200">
              <div className="font-lora text-[16px] leading-[1.85] text-sandal-900 whitespace-pre-wrap">
                {content}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ExplanationPanel = ({ result }) => {
  return (
    <div className="pt-4 border-t border-sandal-100">
      <AccordionItem 
        title="Context & Background" 
        content={result.context_background} 
      />
      <AccordionItem 
        title="Verse-by-Verse Meaning" 
        content={result.verse_by_verse} 
      />
      <AccordionItem 
        title="Spiritual Lessons" 
        content={result.spiritual_lessons} 
      />
      <AccordionItem 
        title="Scholarly Perspectives" 
        content={result.scholarly_perspectives} 
      />
      <AccordionItem 
        title="Related Verses" 
        content={result.cross_references} 
      />
      <AccordionItem 
        title="A Moment to Reflect" 
        content={result.reflection_prompt} 
        isReflect={true}
      />
    </div>
  );
};

export default ExplanationPanel;
