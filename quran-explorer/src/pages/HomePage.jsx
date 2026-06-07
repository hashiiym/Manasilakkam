import React from 'react';
import SearchHero from '../components/search/SearchHero';
import Footer from '../components/layout/Footer';

const HomePage = () => {
  return (
    <div className="font-lora text-sandal-900 flex flex-col min-h-full">
      <main className="flex-1">
        <SearchHero />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
