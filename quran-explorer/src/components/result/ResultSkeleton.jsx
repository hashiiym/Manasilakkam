import React from 'react';

const ResultSkeleton = () => {
  return (
    <div className="bg-white border border-sandal-200 rounded-xl overflow-hidden shadow-sm animate-pulse w-full max-w-4xl mx-auto">
      
      {/* Top Header Bar Placeholder */}
      <div className="bg-sandal-50/95 border-b border-sandal-200 px-4 py-3 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 w-1/3">
          <div className="h-4 w-12 bg-sandal-200 rounded"></div>
          <span className="text-sandal-200">/</span>
          <div className="h-4 w-24 bg-sandal-200 rounded"></div>
        </div>
        <div className="h-6 w-6 bg-sandal-200 rounded"></div>
      </div>

      {/* Content Area Placeholder */}
      <div className="p-4 sm:p-8 space-y-12">
        
        {/* Surah Header Placeholder */}
        <div className="flex flex-col items-center border-b border-sandal-100 pb-8 relative">
          <div className="h-10 w-48 bg-sandal-200 rounded-lg mb-3"></div>
          <div className="h-5 w-32 bg-sandal-100 rounded-lg mb-6"></div>
          
          <div className="flex gap-4">
            <div className="h-8 w-24 bg-sandal-100 rounded-full"></div>
            <div className="h-8 w-24 bg-sandal-100 rounded-full"></div>
          </div>
        </div>

        {/* Arabic Panel Placeholder */}
        <div className="bg-sandal-50 rounded-xl p-8 border border-sandal-100">
          <div className="flex flex-col items-end gap-6 w-full">
            <div className="h-8 w-full max-w-lg bg-sandal-200 rounded"></div>
            <div className="h-8 w-full max-w-md bg-sandal-200 rounded"></div>
            <div className="h-8 w-3/4 bg-sandal-200 rounded"></div>
          </div>
        </div>

        {/* Translation Panel Placeholder */}
        <div className="space-y-6">
          <div className="h-6 w-1/4 bg-sandal-200 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 w-full bg-sandal-100 rounded"></div>
            <div className="h-4 w-full bg-sandal-100 rounded"></div>
            <div className="h-4 w-5/6 bg-sandal-100 rounded"></div>
            <div className="h-4 w-4/6 bg-sandal-100 rounded"></div>
          </div>
        </div>
        
        {/* Audio Player Placeholder */}
        <div className="bg-white border border-sandal-200 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
          <div className="h-10 w-10 bg-sandal-200 rounded-full flex-shrink-0"></div>
          <div className="w-full flex items-center gap-3">
            <div className="h-2 w-full bg-sandal-100 rounded-full"></div>
            <div className="h-4 w-12 bg-sandal-200 rounded flex-shrink-0"></div>
          </div>
          <div className="h-8 w-32 bg-sandal-200 rounded-lg sm:ml-auto"></div>
        </div>

      </div>
    </div>
  );
};

export default ResultSkeleton;
