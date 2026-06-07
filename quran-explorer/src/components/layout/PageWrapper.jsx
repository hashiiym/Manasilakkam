import React from 'react';

const PageWrapper = ({ children }) => {
  return (
    <div className="max-w-[800px] mx-auto px-6 bg-white min-h-screen">
      {children}
    </div>
  );
};

export default PageWrapper;
