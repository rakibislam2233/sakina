import { createPageMetadata } from '@/lib/seo/metadata';
import { WellnessReportView } from '@/components/wellness/WellnessReportView';

export const metadata = createPageMetadata({
  title: 'Wellness Report',
  description: 'View your Sakina wellness report — mood trends, writing streaks, and journal analytics.',
  path: '/wellness',
});

export default function WellnessPage() {
  return <WellnessReportView />;
}
