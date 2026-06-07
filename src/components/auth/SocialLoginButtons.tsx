'use client';

import { Chrome, Github } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/Toast';
import { useAuth } from '@/components/providers/AuthProvider';

export function SocialLoginButtons() {
  const router = useRouter();
  const { toast } = useToast();
  const { signIn } = useAuth();

  const handleSocialLogin = (platform: string) => {
    toast(`Connecting to ${platform}...`, 'info');
    setTimeout(() => {
      signIn({
        name: `${platform} User`,
        email: `user-${platform.toLowerCase()}@sakina.com`,
        avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${platform}`,
      });
      toast(`Welcome to Sakina via ${platform}!`, 'success');
      router.push('/compose');
    }, 800);
  };

  return (
    <div className="space-y-2.5 pt-2.5 border-t border-border">
      <div className="relative flex justify-center text-xs">
        <span className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-border" />
        </span>
        <span className="relative px-2 bg-card text-xs text-muted-foreground uppercase tracking-wider font-semibold">
          Or continue with
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <Button type="button" variant="outline" size="sm" onClick={() => handleSocialLogin('Google')}>
          <Chrome className="text-rose-400" />
          Google
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => handleSocialLogin('GitHub')}>
          <Github />
          GitHub
        </Button>
      </div>
    </div>
  );
}
