'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { forgotSchema, type ForgotFormData } from '@/lib/validations/authSchema';
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

const PENDING_EMAIL_KEY = 'sakina_reset_email';

export function ForgotPasswordForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ForgotFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    sessionStorage.setItem(PENDING_EMAIL_KEY, data.email);
    toast('A reset code has been sent to your email.', 'success');
    router.push('/reset-password');
  };

  return (
    <div className="space-y-3">
      <Link
        href="/login"
        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to sign in
      </Link>

      <div className="space-y-0.5">
        <h2 className="font-serif text-xl font-semibold text-foreground">Reset password</h2>
        <p className="text-sm text-muted-foreground">
          Enter your Sakina account email and we will send a reset code.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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

          <Button type="submit" className="w-full" isLoading={form.formState.isSubmitting}>
            Send reset code
          </Button>
        </form>
      </Form>
    </div>
  );
}

export { PENDING_EMAIL_KEY };
