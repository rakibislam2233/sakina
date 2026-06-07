import { NextResponse } from 'next/server';
import { deleteEntry, getEntryById, updateEntry } from '@/lib/store/entriesStore';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const entry = getEntryById(id);

  if (!entry) {
    return NextResponse.json({ error: 'The chapter you seek could not be found.' }, { status: 404 });
  }

  return NextResponse.json(entry);
}

export async function PUT(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const body = await request.json();
  const { title, content, mood, reflectionPrompt, reflectionReply } = body;

  const existing = getEntryById(id);
  if (!existing) {
    return NextResponse.json({ error: 'The chapter you seek could not be found.' }, { status: 404 });
  }

  const updated = updateEntry(id, {
    title: title !== undefined ? title : existing.title,
    content: content !== undefined ? content : existing.content,
    mood: mood !== undefined ? mood : existing.mood,
    reflectionPrompt: reflectionPrompt !== undefined ? reflectionPrompt : existing.reflectionPrompt,
    reflectionReply: reflectionReply !== undefined ? reflectionReply : existing.reflectionReply,
  });

  return NextResponse.json(updated);
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const removed = deleteEntry(id);

  if (!removed) {
    return NextResponse.json({ error: 'The entry is already dissolved into the night.' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: 'Entry successfully deleted.' });
}
