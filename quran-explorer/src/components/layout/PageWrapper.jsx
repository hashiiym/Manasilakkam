import React from 'react';

const PageWrapper = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-sandal-50 overflow-x-hidden relative">
      <img src="/mandala-bg.png" alt="" aria-hidden="true" className="fixed -top-10 -right-20 w-[350px] md:-top-20 md:-right-40 md:w-[600px] lg:-top-32 lg:-right-48 lg:w-[800px] opacity-[0.12] pointer-events-none z-0" />
      <div className="max-w-[800px] w-full mx-auto px-6 flex-grow flex flex-col relative z-10">
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;
