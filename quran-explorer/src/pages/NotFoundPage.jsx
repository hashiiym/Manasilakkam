import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  useEffect(() => {
    document.title = "Page Not Found · Quran Explorer";
  }, []);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 animate-fadeIn">
      <h1 className="font-cormorant text-[48px] text-sandal-700 font-bold mb-4">404</h1>
      <p className="font-lora text-[18px] text-sandal-900 mb-8">
        This page doesn't exist.
      </p>
      <Link 
        to="/"
        className="px-6 py-2 bg-sandal-700 text-white font-cormorant text-[16px] rounded-full hover:bg-sandal-900 transition-colors shadow-sm"
      >
        Go home
      </Link>
    </div>
  );
};

export default NotFoundPage;
