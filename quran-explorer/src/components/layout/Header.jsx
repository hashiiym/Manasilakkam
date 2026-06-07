import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="py-6 flex items-center justify-between border-b border-sandal-100 mb-8">
      <Link to="/" className="text-3xl font-cormorant font-bold text-sandal-700">
        Quran Explorer
      </Link>
      <nav className="flex gap-6 text-sandal-900 font-inter font-medium">
        <Link to="/browse" className="hover:text-sandal-700 transition-colors">
          Browse
        </Link>
        <Link to="/about" className="hover:text-sandal-700 transition-colors">
          About
        </Link>
      </nav>
    </header>
  );
};

export default Header;
