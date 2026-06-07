import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Sakina' },
  description: 'Your quiet sanctuary for mental wellness, journaling, and peaceful reflection.',
};

export default function HomePage() {
  redirect('/compose');
}
