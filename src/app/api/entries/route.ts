import { NextResponse } from 'next/server';
import { addEntry, generateId, getEntries } from '@/lib/store/entriesStore';
import { JournalEntry, Mood } from '@/types';

export async function GET() {
  return NextResponse.json(getEntries());
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, content, mood, createdAt, wordCount } = body;

  if (!content) {
    return NextResponse.json(
      { error: 'Content of your nocturnal thoughts is required.' },
      { status: 400 },
    );
  }

  const newEntry: JournalEntry = {
    id: generateId(),
    title: title || '',
    content,
    mood: (mood as Mood) || 'Thoughtful',
    createdAt: createdAt || new Date().toISOString(),
    wordCount: wordCount || content.trim().split(/\s+/).filter(Boolean).length,
  };

  addEntry(newEntry);
  return NextResponse.json(newEntry, { status: 201 });
}
