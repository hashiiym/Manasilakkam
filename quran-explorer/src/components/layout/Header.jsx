import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const getDesktopLinkClass = (path) => {
    return location.pathname === path
      ? "text-sm font-semibold text-sandal-800"
      : "text-sm font-medium text-sandal-600 hover:text-sandal-900 transition-colors";
  };

  const getMobileLinkClass = (path, baseClasses) => {
    return location.pathname === path
      ? `${baseClasses} text-sm font-semibold text-sandal-800`
      : `${baseClasses} text-sm font-medium text-sandal-600 hover:text-sandal-900 transition-colors`;
  };

  return (
    <header className="py-4 md:py-6 flex items-center justify-between border-b border-sandal-100 mb-8 relative z-50">
      <Link to="/" className="text-3xl font-cormorant font-bold text-sandal-700 transition-all duration-300 ease-in-out" onClick={closeMenu}>
        Manasilakkam
      </Link>
      
      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-6 font-inter items-center">
        <Link to="/browse" className={getDesktopLinkClass('/browse')}>
          Browse Surahs
        </Link>
        <Link to="/tasbih" className={getDesktopLinkClass('/tasbih')}>
          Tasbih Counter
        </Link>
        <Link to="/about" className={getDesktopLinkClass('/about')}>
          About Project
        </Link>
      </nav>

      {/* Mobile Hamburger Button */}
      <button 
        className="md:hidden p-2 text-sandal-700 focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-sandal-200 shadow-sm md:hidden animate-fadeIn">
          <nav className="flex flex-col py-2 px-4 font-inter">
            <Link 
              to="/browse" 
              className={getMobileLinkClass('/browse', 'py-3 border-b border-sandal-100')}
              onClick={closeMenu}
            >
              Browse Surahs
            </Link>
            <Link 
              to="/tasbih" 
              className={getMobileLinkClass('/tasbih', 'py-3 border-b border-sandal-100')}
              onClick={closeMenu}
            >
              Tasbih Counter
            </Link>
            <Link 
              to="/about" 
              className={getMobileLinkClass('/about', 'py-3')}
              onClick={closeMenu}
            >
              About Project
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
