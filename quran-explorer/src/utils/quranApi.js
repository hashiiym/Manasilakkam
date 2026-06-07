const RECITER_MAP = {
  'ar.alafasy': 7,
  'ar.abdulbasitmurattal': 1,
  'ar.husary': 6,
  'ar.saoodashureem': 10,
  'ar.shaatree': 4,
  'ar.hanirifai': 5,
};

// Fetch all verse audio URLs for a full Surah
export async function fetchSurahAudio(surahNumber, editionId) {
  const reciterId = RECITER_MAP[editionId] || 7;
  const res = await fetch(
    `https://api.quran.com/api/v4/recitations/${reciterId}/by_chapter/${surahNumber}?per_page=300`
  );
  if (!res.ok) throw new Error('Audio unavailable');
  const { audio_files } = await res.json();
  return audio_files.map(a => ({
    verse: parseInt(a.verse_key.split(':')[1], 10),
    url: `https://verses.quran.com/${a.url}`
  }));
}

// Fetch audio URL for a single verse
export async function fetchVerseAudio(surahNumber, ayahNumber, editionId) {
  const reciterId = RECITER_MAP[editionId] || 7;
  const res = await fetch(
    `https://api.quran.com/api/v4/recitations/${reciterId}/by_ayah/${surahNumber}:${ayahNumber}`
  );
  if (!res.ok) throw new Error('Audio unavailable');
  const { audio_files } = await res.json();
  return audio_files.map(a => ({
    verse: parseInt(a.verse_key.split(':')[1], 10),
    url: `https://verses.quran.com/${a.url}`
  }));
}
