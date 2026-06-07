import { AIReflectionResponse, Mood } from '@/types';

export function getDummyReflection(mood: Mood, lang: string): AIReflectionResponse {
  const isBN = lang === 'bn' || lang === 'BN';

  if (isBN) {
    const bnDefaults: Record<string, AIReflectionResponse> = {
      Peaceful: {
        companion_embrace:
          'আপনি মনের গভীর শান্ত ও স্থির অবস্থায় রয়েছেন। আপনার চিন্তা শব্দহীন ও পবিত্র জলের মতো নিষ্কলুষ। এই প্রশান্তি ধরে রাখুন।',
        title_suggestion: 'প্রশান্ত হৃদয়ের সুবর্ণ সাকীনা',
        spiritual_tranquility: {
          quran_verses: [
            {
              surah_name: 'সূরা আর-রাদ',
              verse_number: '১৩:২৮',
              arabic: 'أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ',
              translation: 'জেনে রাখো, আল্লাহর স্মরণেই কেবল হৃদয় বিগলিত ও শান্ত হয়।',
              resonance: 'এই আয়াতটি সত্যিকারের স্থায়ী শান্তি আধ্যাত্মিক সংযোগের মাধ্যমেই অর্জিত হতে পারে তা মনে করিয়ে দেয়।',
            },
          ],
          hadith_narrations: [
            {
              source: 'সহীহ মুসলিম',
              narration: 'রাসূলুল্লাহ (সা.) বলেছেন: যখন কোনো দল আল্লাহর ঘরে একত্রিত হয়, তখন তাদের ওপর প্রশান্তি (সাকীনা) নেমে আসে।',
              resonance: 'আপনার আন্তরিক আত্মবিশ্লেষণ এই ধন্য মুহূর্তেরই একটি সুন্দর প্রতিফলন।',
            },
          ],
        },
        voices_of_wisdom: {
          scholar_quotes: [
            { scholar_name: 'ইমাম আল-গাজালী', quote: 'নিশ্চয়ই ধৈর্য এবং আল্লাহর প্রতি পূর্ণ সন্তুষ্টিই অন্তরের প্রশান্তির চাবিকাঠি।' },
          ],
          extensive_book_shelf: [
            { title: 'প্রশান্তি', author: 'মিজানুর রহমান আজহারী', language_type: 'Bangla', why_it_helps: 'আধ্যাত্মিক নিরাময় ও পরম শান্তি অর্জনের একটি অপরূপ গাইডলাইন।' },
          ],
        },
      },
      Thoughtful: {
        companion_embrace:
          'আপনার চিন্তাগুলো রাতের আকাশের নক্ষত্রমালার মতো সুবিন্যস্ত ও উজ্জ্বল। আপনার আত্মবিশ্লেষণ একটি সুন্দর আত্মিক উন্নতির ইঙ্গিত দেয়।',
        title_suggestion: 'গভীর ভাবনার সোনালী দর্পণ',
        spiritual_tranquility: { quran_verses: [], hadith_narrations: [] },
        voices_of_wisdom: { scholar_quotes: [], extensive_book_shelf: [] },
      },
    };

    const base = bnDefaults[mood] ?? bnDefaults.Thoughtful;
    if (mood === 'Sad') {
      return {
        ...base,
        companion_embrace: 'বিষাদ কোনো ব্যর্থতা নয়; এটি আমাদের কোমল হৃদয়কে আরও সহানুভূতিশীল করে তোলে। শান্ত থাকুন, আল্লাহ আপনার মনের সব খবর জানেন।',
        title_suggestion: 'অশ্রুসিক্ত রজনীর সান্ত্বনা সুর',
      };
    }
    if (mood === 'Stressed') {
      return {
        ...base,
        companion_embrace: 'যখন উদ্বেগ আপনার মনে ঘূর্ণি তৈরি করে, শুধু একটি গভীর শ্বাস নিন। প্রতিটি কষ্টের পরেই নিশ্চিত আরাম জড়িয়ে আছে।',
        title_suggestion: 'ঝড়ের মাঝে প্রশান্তির নোঙর',
      };
    }
    if (mood === 'Creative') {
      return {
        ...base,
        companion_embrace: 'আপনার মনে সৃজনশীলতার এক অপূর্ব ঝর্ণাধারা প্রবাহিত হচ্ছে! এই অনুপ্রেরণাকে কল্যাণকর কাজে প্রবাহিত করুন।',
        title_suggestion: 'নান্দনিক ভাবনার স্বপ্নীল আকাশ',
      };
    }
    return base;
  }

  const enDefaults: Record<string, AIReflectionResponse> = {
    Peaceful: {
      companion_embrace:
        'You are residing in a beautiful state of inner quiet. Your written reflections are like still, crystal-clear water under a star-filled sky. Cherish this calming pause.',
      title_suggestion: 'Still Waters of the Halcyon Hour',
      spiritual_tranquility: {
        quran_verses: [
          {
            surah_name: 'Surah Ar-Ra\'d',
            verse_number: '13:28',
            arabic: 'أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ',
            translation: 'Verily, in the remembrance of Allah do hearts find rest.',
            resonance: 'True, lasting inner peace is anchored in divine connection and spiritual mindfulness.',
          },
        ],
        hadith_narrations: [
          {
            source: 'Sahih Muslim',
            narration: 'Prophet Muhammad (PBUH) said: Whenever a group gathers to study the Book, tranquility (Sakina) descends upon them.',
            resonance: 'Your deliberate self-reflection represents a sacred path toward Sakina.',
          },
        ],
      },
      voices_of_wisdom: {
        scholar_quotes: [
          { scholar_name: 'Imam Al-Ghazali', quote: 'True satisfaction and spiritual patience are the keys to an untroubled heart.' },
          { scholar_name: 'Rumi', quote: 'The quietude in your soul holds an ultimate treasure.' },
        ],
        extensive_book_shelf: [
          { title: 'The Power of Now', author: 'Eckhart Tolle', language_type: 'English', why_it_helps: 'A timeless guide on mindfulness for your current calm state.' },
          { title: 'Proshanti', author: 'Mizanur Rahman Azhari', language_type: 'Bangla', why_it_helps: 'A spiritual piece on finding tranquility from an Islamic perspective.' },
        ],
      },
    },
    Thoughtful: {
      companion_embrace:
        'Your introspection is a beautiful lantern lighting up the vast corridors of your inner sanctuary. Pondering deeply is an act of quiet courage.',
      title_suggestion: 'Resonant Mirrors of Quiet Contemplation',
      spiritual_tranquility: { quran_verses: [], hadith_narrations: [] },
      voices_of_wisdom: { scholar_quotes: [], extensive_book_shelf: [] },
    },
  };

  const base = enDefaults[mood] ?? enDefaults.Thoughtful;
  if (mood === 'Sad') {
    return {
      ...base,
      companion_embrace: 'Sorrow is not weakness; it is the rain that softens our dry soil. Let yourself feel this weight completely — you are cared for.',
      title_suggestion: 'Gentle Solace of a Healing Night',
    };
  }
  if (mood === 'Stressed') {
    return {
      ...base,
      companion_embrace: 'When anxiety spins a tempest, focus solely on your next breath. Hardship is always accompanied by divine ease.',
      title_suggestion: 'Steady Anchor of Nocturnal Calm',
    };
  }
  if (mood === 'Creative') {
    return {
      ...base,
      companion_embrace: 'A vibrant constellation of ideas has set your imagination ablaze! Dance with these colors of possibility.',
      title_suggestion: 'Luminous Constellations of Creative Light',
    };
  }
  return base;
}
