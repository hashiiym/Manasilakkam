import SurahListItem from './SurahListItem';

export default function SurahList({ surahs }) {
  // Group surahs by juzNumber for display
  const renderList = () => {
    let currentJuz = null;
    return surahs.map((surah) => {
      const isNewJuz = surah.juzNumber !== currentJuz;
      if (isNewJuz) currentJuz = surah.juzNumber;
      
      return (
        <div key={surah.number}>
          {isNewJuz && (
            <div className="flex items-center gap-4 my-6">
              <div className="h-px bg-sandal-200 flex-1"></div>
              <span className="font-inter text-[11px] uppercase text-sandal-500 font-bold tracking-widest">
                Juz {currentJuz}
              </span>
              <div className="h-px bg-sandal-200 flex-1"></div>
            </div>
          )}
          <SurahListItem surah={surah} />
        </div>
      );
    });
  };

  return (
    <div className="max-w-3xl mx-auto pb-12">
      {surahs.length > 0 ? (
        renderList()
      ) : (
        <div className="text-center py-12 font-inter text-sandal-500">
          No Surahs found matching your criteria.
        </div>
      )}
    </div>
  );
}
