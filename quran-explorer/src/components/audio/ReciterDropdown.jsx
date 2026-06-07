import React from 'react';
import { RECITERS } from '../../constants/reciters';

const ReciterDropdown = ({ selectedReciter, onSelectReciter }) => {
  return (
    <div className="relative inline-block w-full sm:w-auto">
      <select
        value={selectedReciter.id}
        onChange={(e) => {
          const reciter = RECITERS.find(r => r.id === e.target.value);
          if (reciter) onSelectReciter(reciter);
        }}
        className="w-full sm:w-64 appearance-none bg-sandal-50 border border-sandal-200 text-sandal-700 font-lora text-[14px] py-1.5 pl-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-sandal-500"
        aria-label="Select reciter"
      >
        {RECITERS.map((reciter) => (
          <option key={reciter.id} value={reciter.id}>
            {reciter.name} ({reciter.style})
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-sandal-500">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
};

export default ReciterDropdown;
