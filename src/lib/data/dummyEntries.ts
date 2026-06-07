import { JournalEntry } from '@/types';

const sampleReflection = {
  companion_embrace:
    'You are residing in a beautiful state of inner quiet. Your written reflections are like still, crystal-clear water under a star-filled sky. Cherish this calming pause; it is the sacred soil where your resilience rejuvenates.',
  title_suggestion: 'Still Waters of the Halcyon Hour',
  spiritual_tranquility: {
    quran_verses: [
      {
        surah_name: 'Surah Ar-Ra\'d',
        verse_number: '13:28',
        arabic: 'أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ',
        translation: 'Verily, in the remembrance of Allah do hearts find rest.',
        resonance:
          'This foundational verse confirms that true, lasting inner peace is anchored in divine connection and spiritual mindfulness.',
      },
    ],
    hadith_narrations: [
      {
        source: 'Sahih Muslim',
        narration:
          'Prophet Muhammad (PBUH) said: Whenever a group gathers to study and recite the Book, tranquility (Sakina) descends upon them.',
        resonance: 'Your deliberate self-reflection represents a modern, sacred path toward this gentle descend of Sakina.',
      },
    ],
  },
  voices_of_wisdom: {
    scholar_quotes: [
      {
        scholar_name: 'Imam Al-Ghazali',
        quote: 'True satisfaction and spiritual patience are the ultimate double keys to an untroubled, peaceful heart.',
      },
      {
        scholar_name: 'Rumi',
        quote: 'The quietude in your soul holds an ultimate treasure. Answer the silence with silent grace.',
      },
    ],
    extensive_book_shelf: [
      {
        title: 'The Power of Now',
        author: 'Eckhart Tolle',
        language_type: 'English',
        why_it_helps: 'A timeless guide on mindfulness to live intensely in the present, perfectly reflecting your current calm state.',
      },
      {
        title: 'Proshanti',
        author: 'Mizanur Rahman Azhari',
        language_type: 'Bangla',
        why_it_helps: 'A wonderful spiritual piece on finding tranquility and quietude from an Islamic philosophical perspective.',
      },
    ],
  },
};

export const DUMMY_ENTRIES: JournalEntry[] = [
  {
    id: 'demo-001',
    title: 'Moonlit Gratitude',
    content:
      'Tonight the city felt unusually quiet. I sat by the window and watched the slow drift of clouds across a pale moon. There was no urgency in my chest — only a gentle thankfulness for small things: warm tea, a soft blanket, the breath moving in and out without effort.',
    mood: 'Peaceful',
    createdAt: '2026-06-05T21:30:00.000Z',
    wordCount: 52,
    reflectionPrompt: 'Mood: Peaceful - Written Work: "Tonight the city felt unusually quiet..."',
    reflectionReply: JSON.stringify(sampleReflection),
  },
  {
    id: 'demo-002',
    title: 'Questions Before Dawn',
    content:
      'I keep returning to the same question: am I moving toward the life I want, or simply away from discomfort? The answer is not clear tonight, but naming the question feels like progress. Perhaps clarity arrives only after honest wandering.',
    mood: 'Thoughtful',
    createdAt: '2026-06-04T23:15:00.000Z',
    wordCount: 44,
  },
  {
    id: 'demo-003',
    title: 'Rain on Old Photographs',
    content:
      'Found an old photograph today and felt a sudden ache — not sharp, but soft, like rain on glass. Missing people who are still alive but far away. I let myself feel it without trying to fix it. Some sorrows deserve to be witnessed, not solved.',
    mood: 'Sad',
    createdAt: '2026-06-03T22:00:00.000Z',
    wordCount: 48,
  },
];
