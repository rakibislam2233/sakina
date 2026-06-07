'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle } from 'lucide-react';
import { loginSchema, type LoginFormData } from '@/lib/validations/authSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/Toast';
import { useAuth } from '@/components/providers/AuthProvider';
import { SocialLoginButtons } from '@/components/auth/SocialLoginButtons';

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { signIn } = useAuth();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (data.email.toLowerCase().includes('error')) {
      toast('Invalid email or password.', 'error');
      form.setError('root', { message: 'Sakina could not find this account.' });
      return;
    }

    toast(`Welcome back to Sakina, ${data.email.split('@')[0]}!`, 'success');
    signIn(
      {
        name: data.email.split('@')[0].toUpperCase(),
        email: data.email,
        avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${data.email}`,
      },
      { password: data.password },
    );
    router.push('/compose');
  };

  return (
    <div className="space-y-3">
      <div className="space-y-0.5">
        <h2 className="font-serif text-xl font-semibold text-foreground">Sign in to Sakina</h2>
        <p className="text-sm text-muted-foreground">Enter your account to open your journal.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          {form.formState.errors.root && (
            <div className="p-3 bg-destructive/10 text-destructive border border-destructive/20 rounded-md text-sm flex gap-2 items-center">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{form.formState.errors.root.message}</span>
            </div>
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@sakina.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" isLoading={form.formState.isSubmitting}>
            Sign in
          </Button>
        </form>
      </Form>

      <SocialLoginButtons />

      <p className="text-sm text-center text-muted-foreground">
        New to Sakina?{' '}
        <Link href="/register" className="text-primary font-semibold hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
