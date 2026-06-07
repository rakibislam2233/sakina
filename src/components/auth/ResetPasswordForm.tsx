'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetSchema, type ResetFormData } from '@/lib/validations/authSchema';
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
import { PENDING_EMAIL_KEY } from '@/components/auth/ForgotPasswordForm';

export function ResetPasswordForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [pendingEmail, setPendingEmail] = useState('');

  const form = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
    defaultValues: { tempToken: '', newPassword: '' },
  });

  useEffect(() => {
    setPendingEmail(sessionStorage.getItem(PENDING_EMAIL_KEY) || '');
  }, []);

  const onSubmit = async (_data: ResetFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    sessionStorage.removeItem(PENDING_EMAIL_KEY);
    toast('Password updated. Please sign in to Sakina.', 'success');
    router.push('/login');
  };

  return (
    <div className="space-y-3">
      <div className="space-y-0.5">
        <h2 className="font-serif text-xl font-semibold text-foreground">Set new password</h2>
        <p className="text-sm text-muted-foreground">
          {pendingEmail ? (
            <>
              Reset code sent to{' '}
              <span className="font-mono text-primary">{pendingEmail}</span>
            </>
          ) : (
            'Enter the code from your email and choose a new password.'
          )}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="tempToken"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification code</FormLabel>
                <FormControl>
                  <Input type="text" maxLength={4} placeholder="1234" className="font-mono tracking-widest" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" isLoading={form.formState.isSubmitting}>
            Update password
          </Button>
        </form>
      </Form>

      <p className="text-sm text-center text-muted-foreground">
        <Link href="/login" className="text-primary font-semibold hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
