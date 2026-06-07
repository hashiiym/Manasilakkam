import { Link } from 'react-router-dom';

export default function SurahListItem({ surah }) {
  return (
    <Link 
      to={`/surah/${surah.number}`}
      className="flex items-center justify-between p-4 mb-2 rounded-xl transition-all duration-300 ease-in-out hover:bg-sandal-50 group border border-transparent hover:border-sandal-200"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-sandal-100 text-sandal-700 font-inter text-[13px] font-bold">
          {surah.number}
        </div>
        <div className="flex flex-col">
          <span className="font-lora italic text-[14px] text-sandal-500">
            {surah.nameTransliterated}
          </span>
          <span className="font-cormorant text-[18px] text-sandal-900 font-medium">
            {surah.nameEnglish}
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-4 text-right">
        <div className="flex flex-col items-end gap-1">
          <span className="font-amiri text-[20px] text-sandal-700" dir="rtl">
            {surah.nameArabic}
          </span>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-inter uppercase font-semibold tracking-wider ${
              surah.classification === 'Meccan' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-blue-100 text-blue-700'
            }`}>
              {surah.classification}
            </span>
            <span className="font-inter text-[12px] text-sandal-500">
              {surah.verseCount} verses
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
