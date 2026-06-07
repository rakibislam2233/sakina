import { NextResponse } from 'next/server';
import { getDummyReflection } from '@/lib/data/dummyReflection';
import { Mood } from '@/types';

export async function POST(request: Request) {
  const { content, mood, lang } = await request.json();

  if (!content) {
    return NextResponse.json(
      { error: 'Please write down some sentences to reflect upon.' },
      { status: 400 },
    );
  }

  const reflection = getDummyReflection((mood as Mood) || 'Thoughtful', lang || 'en');
  return NextResponse.json(reflection);
}
