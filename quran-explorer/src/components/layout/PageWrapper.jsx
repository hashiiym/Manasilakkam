import React from 'react';

const PageWrapper = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-sandal-50 relative">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img 
          src="/mandala-bg.jpg" 
          alt="" 
          className="absolute -top-20 -right-20 w-[400px] md:-top-40 md:-right-40 md:w-[700px] lg:-top-64 lg:-right-48 lg:w-[1000px] opacity-[0.15] mix-blend-multiply transition-all duration-700"
          aria-hidden="true"
        />
      </div>
      <div className="max-w-[800px] w-full mx-auto px-6 flex-1 flex flex-col relative z-10">
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;
