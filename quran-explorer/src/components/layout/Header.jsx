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
      
      {/* Menu Button */}
      <button 
        className="p-2 text-sandal-700 focus:outline-none flex items-center gap-2 hover:bg-sandal-50 rounded-lg transition-colors"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className="hidden md:block font-inter font-medium text-[15px]">Menu</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Nav Dropdown */}
      {isOpen && (
        <div className="absolute top-[100%] left-0 right-0 md:left-auto md:w-56 md:right-0 bg-white border-b md:border border-sandal-200 shadow-sm md:shadow-md md:rounded-xl md:mt-2 animate-fadeIn z-50">
          <nav className="flex flex-col py-2 px-4 md:px-2 font-inter">
            <Link 
              to="/browse" 
              className={getMobileLinkClass('/browse', 'py-3 border-b border-sandal-100 md:border-none md:rounded-lg md:px-3 md:py-2.5 md:hover:bg-sandal-50')}
              onClick={closeMenu}
            >
              Browse Surahs
            </Link>
            <Link 
              to="/tasbih" 
              className={getMobileLinkClass('/tasbih', 'py-3 border-b border-sandal-100 md:border-none md:rounded-lg md:px-3 md:py-2.5 md:hover:bg-sandal-50')}
              onClick={closeMenu}
            >
              Tasbih Counter
            </Link>
            <Link 
              to="/about" 
              className={getMobileLinkClass('/about', 'py-3 md:rounded-lg md:px-3 md:py-2.5 md:hover:bg-sandal-50')}
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
