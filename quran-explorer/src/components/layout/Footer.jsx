import React from 'react';

const Footer = () => {
  return (
    <footer className="w-screen relative left-1/2 -translate-x-1/2 bg-sandal-100 py-8 mt-16">
      <div className="max-w-[800px] mx-auto px-6 text-center font-inter text-[12px] text-sandal-500">
        <p className="mb-2">
          Quran Explorer · For study and reflection
        </p>
        <p>
          AI-generated explanations are study aids only. For fatwa or religious rulings, consult a qualified scholar.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
