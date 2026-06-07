import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchHero from '../components/search/SearchHero';
import Footer from '../components/layout/Footer';

const HomePage = () => {
  useEffect(() => {
    document.title = "Quran Explorer";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = "Search and explore the Quran using natural language, powered by AI.";
  }, []);

  return (
    <div className="font-lora text-sandal-900 flex flex-col min-h-full">
      <main className="flex-1">
        <SearchHero />
      </main>
    </div>
  );
};

export default HomePage;
