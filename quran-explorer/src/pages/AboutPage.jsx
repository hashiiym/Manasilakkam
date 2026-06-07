import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RECITERS } from '../constants/reciters';

const AboutPage = () => {
  useEffect(() => {
    document.title = "About · Quran Explorer";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = "Learn about Quran Explorer, an AI-powered Quranic study aid using Gemini and Quran.com.";
  }, []);

  return (
    <div className="min-h-screen bg-sandal-50/30 pt-16 px-4 md:px-8 pb-20">
      <div className="max-w-2xl mx-auto animate-fadeIn">
        <div className="mb-12">
          <Link to="/" className="font-inter text-[14px] text-sandal-500 hover:text-sandal-700 transition-colors">
            ← Back to Home
          </Link>
        </div>
        
        <h1 className="font-cormorant text-[36px] text-sandal-700 font-semibold mb-10 border-b border-sandal-200 pb-4">
          About Quran Explorer
        </h1>

        <div className="space-y-10 font-lora text-[16px] text-sandal-900 leading-[1.85]">
          
          <section>
            <h2 className="font-cormorant text-[24px] text-sandal-700 font-semibold mb-3">What this is</h2>
            <p>
              Quran Explorer is an intelligent study aid designed to help you quickly find, read, and understand the Quran. It combines the power of Google's Gemini AI for natural language searching and summarization, alongside the robust Quran.com API to deliver beautiful, authentic Arabic text, translations, and audio recitations.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-[24px] text-sandal-700 font-semibold mb-3">How it works</h2>
            <p className="mb-3">
              Rather than scrolling through menus or knowing exact verse numbers, you can search for concepts, stories, or specific chapters directly. 
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>You enter a search query (e.g., "The story of Moses", "Ayatul Kursi", or "Surah Yasin").</li>
              <li>Gemini AI processes your query and intelligently matches it to the correct Surah and Ayah.</li>
              <li>Gemini provides a concise, thematic explanation of the verses.</li>
              <li>The interface fetches the exact Arabic script, English translations, and audio recitation from the Quran.com API to present a unified reading experience.</li>
            </ol>
          </section>

          <section>
            <h2 className="font-cormorant text-[24px] text-sandal-700 font-semibold mb-4">Reciters</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {RECITERS.map((reciter) => (
                <li key={reciter.id} className="flex flex-col p-3 border border-sandal-200 rounded-lg bg-white">
                  <span className="font-inter font-medium text-sandal-900 text-[15px]">{reciter.name}</span>
                  <span className="font-inter text-sandal-500 text-[13px] uppercase tracking-wider mt-1">{reciter.style}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12 bg-sandal-50 border border-sandal-200 rounded-xl p-6">
            <h3 className="font-inter font-bold text-[14px] uppercase tracking-wider text-sandal-700 mb-2">AI Disclaimer</h3>
            <p className="font-inter text-[14px] text-sandal-600 leading-relaxed m-0">
              The AI explanation and search functionality are powered by Google Gemini. While it strives for accuracy in retrieving verses and summarizing themes, AI can occasionally make mistakes or misinterpret context. The Arabic text, audio, and primary English translations are fetched strictly from verified Quranic APIs. Please consult traditional tafsir or scholars for religious guidance.
            </p>
          </section>

          <hr className="border-sandal-200" />

          <section>
            <h2 className="font-cormorant text-[28px] text-sandal-700 font-bold mb-3">Meet the Developer</h2>
            <div className="bg-sandal-50 border border-sandal-200 rounded-xl p-6 md:p-8 mt-6 flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1">
                <p className="font-lora text-[16px] text-sandal-900 leading-relaxed mb-4">
                  Muhammed Hashim is an electronics and data science engineering scholar driven by a deep fascination for embedded systems, IoT architecture, and modern full-stack application development. Dedicated to tech community leadership and open-source contributions, he built Manasilakkam to bridge the gap between complex classical scripts and clear, human-friendly native language comprehension through accessible UI/UX design.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <a href="https://github.com/hashiiym" target="_blank" rel="noopener noreferrer" className="font-inter text-[14px] font-medium transition-all duration-300 ease-in-out hover:scale-105 shadow-sm bg-sandal-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-black">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/muhammedhashimch/" target="_blank" rel="noopener noreferrer" className="font-inter text-[14px] font-medium transition-all duration-300 ease-in-out hover:scale-105 shadow-sm bg-accent-blue text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    LinkedIn
                  </a>
                  <a href="https://www.instagram.com/hashiiym" target="_blank" rel="noopener noreferrer" className="font-inter text-[14px] font-medium transition-all duration-300 ease-in-out hover:scale-105 shadow-sm bg-white border border-sandal-200 text-sandal-900 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-sandal-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </section>
          
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
