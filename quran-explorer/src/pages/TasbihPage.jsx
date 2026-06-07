import React, { useState, useEffect } from 'react';

const DHIKR_OPTIONS = [
  'Subhanallah',
  'Alhamdulillah',
  'Allahu Akbar',
  'La ilaha illallah',
  'Astaghfirullah'
];

const TARGET_OPTIONS = [33, 99, 100, 0]; // 0 means Unlimited

const TasbihPage = () => {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [selectedDhikr, setSelectedDhikr] = useState('Subhanallah');
  const [isPulsing, setIsPulsing] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    document.title = "Digital Tasbih · Manasilakkam";
    
    const savedCount = localStorage.getItem('manasilakkam_tasbih_count');
    const savedTarget = localStorage.getItem('manasilakkam_tasbih_target');
    const savedDhikr = localStorage.getItem('manasilakkam_tasbih_dhikr');
    
    if (savedCount !== null) setCount(parseInt(savedCount, 10));
    if (savedTarget !== null) setTarget(parseInt(savedTarget, 10));
    if (savedDhikr !== null) setSelectedDhikr(savedDhikr);
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('manasilakkam_tasbih_count', count.toString());
    localStorage.setItem('manasilakkam_tasbih_target', target.toString());
    localStorage.setItem('manasilakkam_tasbih_dhikr', selectedDhikr);
  }, [count, target, selectedDhikr]);

  const handleTap = () => {
    if (target > 0 && count >= target) {
      // Loop back to 1 if we are currently at target or above
      setCount(1);
    } else {
      const newCount = count + 1;
      setCount(newCount);
      
      // Pulse animation if target is reached
      if (target > 0 && newCount === target) {
        triggerPulse();
      }
    }
  };

  const triggerPulse = () => {
    setIsPulsing(true);
    // Vibrate device if supported
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
    setTimeout(() => setIsPulsing(false), 300);
  };

  const resetCount = () => {
    setCount(0);
  };

  return (
    <div className="min-h-screen bg-sandal-50/30 pt-10 px-4 pb-20">
      <div className="max-w-md mx-auto animate-fadeIn">
        
        <div className="mb-6 flex justify-between items-center px-2">
          <h1 className="font-cormorant text-[32px] text-sandal-700 font-bold">Digital Tasbih</h1>
        </div>

        <div className={`bg-white border border-sandal-200 rounded-2xl p-8 max-w-md mx-auto text-center shadow-sm transition-colors duration-300 ${isPulsing ? 'bg-sandal-100 ring-4 ring-sandal-200' : ''}`}>
          
          {/* Dhikr Selector */}
          <div className="mb-8 relative">
            <select
              value={selectedDhikr}
              onChange={(e) => setSelectedDhikr(e.target.value)}
              className="appearance-none bg-sandal-50 border border-sandal-200 text-sandal-900 font-lora text-[18px] py-3 pl-4 pr-10 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-sandal-300 shadow-sm"
            >
              {DHIKR_OPTIONS.map((dhikr) => (
                <option key={dhikr} value={dhikr}>
                  {dhikr}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-sandal-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>

          {/* Digital Screen Readout */}
          <div className="mb-10">
            <div className="text-5xl font-mono text-sandal-900 tracking-widest font-bold">
              {count.toString().padStart(target > 0 && target >= 100 ? 3 : 2, '0')}
            </div>
            <div className="mt-2 text-sandal-500 font-inter text-[14px] uppercase tracking-widest">
              {target > 0 ? `Target: ${target}` : 'Unlimited'}
            </div>
          </div>

          {/* The Action Trigger Button */}
          <div 
            className="w-48 h-48 rounded-full bg-sandal-50 border-4 border-sandal-200 flex items-center justify-center text-sandal-700 font-semibold cursor-pointer select-none active:scale-95 transition-transform duration-75 mx-auto shadow-inner touch-manipulation"
            onClick={handleTap}
          >
            <span className="font-cormorant text-[28px] tracking-wide text-sandal-700 opacity-90 select-none">
              TAP
            </span>
          </div>

          {/* Controls */}
          <div className="mt-10 flex items-center justify-center gap-6">
            <button 
              onClick={resetCount}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-sandal-200 text-sandal-500 hover:text-sandal-700 hover:bg-sandal-50 transition-colors shadow-sm select-none"
              aria-label="Reset counter"
              title="Reset"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
              </svg>
            </button>

            <div className="flex gap-2">
              {TARGET_OPTIONS.map(opt => (
                <button
                  key={opt}
                  onClick={() => setTarget(opt)}
                  className={`px-3 py-1.5 rounded text-[13px] font-inter font-medium transition-colors select-none ${target === opt ? 'bg-sandal-700 text-white' : 'bg-sandal-100 text-sandal-700 hover:bg-sandal-200'}`}
                >
                  {opt === 0 ? '∞' : opt}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TasbihPage;
