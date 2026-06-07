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
          
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
