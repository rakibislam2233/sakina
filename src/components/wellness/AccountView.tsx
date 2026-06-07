'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { UserProfile } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/Toast';
import { useAuth } from '@/components/providers/AuthProvider';
import { useTheme } from '@/components/providers/ThemeProvider';
import type { SakinaThemeId } from '@/lib/themes';
import { changePasswordSchema, type ChangePasswordFormData } from '@/lib/validations/authSchema';
import { cn } from '@/lib/utils';
import {
  User,
  Sparkles,
  Sliders,
  Bell,
  Palette,
  Languages,
  Lock,
  Trash2,
  Check,
  AlertTriangle,
} from 'lucide-react';

const AVATAR_TEMPLATES = [
  { name: 'Sakina Calm', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=sakina-calm' },
  { name: 'Sakina Peace', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=sakina-peace' },
  { name: 'Sakina Star', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=sakina-star' },
  { name: 'Sakina Night', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=sakina-night' },
];

const MINDFULNESS_GOALS = [
  'Reflect daily for evening pressure decompression',
  'Examine stress events and high-gear restless indicators',
  'Cultivate grateful thoughts and luminous creative outlines',
  'Explore therapeutic narrative writing spaces',
];

const WORD_GOAL_OPTIONS = [
  { value: '50', label: '50 Words (Brief Sanctuary Spark)' },
  { value: '100', label: '100 Words (Gentle Breath Check-in)' },
  { value: '200', label: '200 Words (Deep Cognitive Decompress)' },
  { value: '500', label: '500 Words (Prolific Editorial Stream)' },
];

export function AccountView() {
  const router = useRouter();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const { user, updateUser, changePassword, deleteAccount, hasStoredPassword } = useAuth();
  const { theme, themes, setTheme } = useTheme();
  const isBn = i18n.language === 'bn';

  const [profile, setProfile] = useState<UserProfile>(() => ({
    name: user?.name || 'SAKINA USER',
    email: user?.email || 'guest@sakina.com',
    avatarUrl: user?.avatarUrl || 'https://api.dicebear.com/7.x/bottts/svg?seed=calm',
    joinedDate: new Date().toISOString(),
    dailyGoalWords: 100,
    mindfulnessQuote: 'Be patient with yourself. Self-growth is tender; it\'s holy ground.',
    notificationsEnabled: true,
    selectedAuraGoal: MINDFULNESS_GOALS[0],
  }));

  const [userName, setUserName] = useState('');
  const [dailyGoal, setDailyGoal] = useState(100);
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [activeGoal, setActiveGoal] = useState(MINDFULNESS_GOALS[0]);
  const [reminders, setReminders] = useState(true);
  const [customQuote, setCustomQuote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const passwordForm = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem('sakina_profile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile) as UserProfile;
        setProfile(parsed);
        setUserName(parsed.name);
        setDailyGoal(parsed.dailyGoalWords);
        setSelectedAvatar(parsed.avatarUrl);
        setActiveGoal(parsed.selectedAuraGoal);
        setReminders(parsed.notificationsEnabled);
        setCustomQuote(parsed.mindfulnessQuote);
        return;
      } catch {
        localStorage.removeItem('sakina_profile');
      }
    }
    if (user) {
      setProfile((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
      }));
      setUserName(user.name);
      setSelectedAvatar(user.avatarUrl);
    }
  }, [user]);

  const handleLanguageChange = (lang: 'en' | 'bn') => {
    i18n.changeLanguage(lang);
    localStorage.setItem('sakina_lang', lang);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      toast(t('profile.nameRequired'), 'error');
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const updatedProfile: UserProfile = {
      ...profile,
      name: userName.trim(),
      dailyGoalWords: dailyGoal,
      avatarUrl: selectedAvatar,
      selectedAuraGoal: activeGoal,
      notificationsEnabled: reminders,
      mindfulnessQuote: customQuote,
    };

    setProfile(updatedProfile);
    localStorage.setItem('sakina_profile', JSON.stringify(updatedProfile));
    updateUser({ name: userName.trim(), avatarUrl: selectedAvatar });
    setIsSubmitting(false);
    toast(t('profile.saveSuccess'), 'success');
  };

  const handleChangePassword = async (data: ChangePasswordFormData) => {
    setIsChangingPassword(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const result = changePassword(data.currentPassword, data.newPassword);
    setIsChangingPassword(false);

    if (!result.ok) {
      toast(result.message, 'error');
      return;
    }

    passwordForm.reset();
    toast(t('profile.passwordSuccess'), 'success');
  };

  const handleDeleteProfile = async () => {
    if (!confirm(t('profile.deleteConfirm'))) return;

    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    deleteAccount();
    toast(t('profile.deleteSuccess'), 'info');
    router.replace('/login');
  };

  const localeCode = isBn ? 'bn-BD' : 'en-US';

  return (
    <div className="space-y-5 sm:space-y-6 w-full max-w-3xl mx-auto animate-fade-in min-w-0 pb-8">
      <div className="space-y-1">
        <h2 className="font-serif text-2xl font-light text-foreground tracking-tight">
          {t('profile.title')}
        </h2>
        <p className="font-sans text-sm text-muted-foreground">{t('profile.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Summary + Preferences */}
        <div className="space-y-5 lg:col-span-1">
          <Card className="flex flex-col items-center text-center !p-5 space-y-3">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-primary/30 overflow-hidden bg-muted/40 p-2">
                <img
                  src={selectedAvatar || profile.avatarUrl}
                  alt=""
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground p-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="space-y-0.5 min-w-0 w-full">
              <CardTitle className="font-sans text-sm font-semibold truncate">
                {userName || profile.name}
              </CardTitle>
              <p className="font-mono text-xs text-muted-foreground truncate">{profile.email}</p>
              <p className="font-sans text-xs text-primary font-medium">
                {t('profile.joinedDate')}:{' '}
                {new Date(profile.joinedDate).toLocaleDateString(localeCode, {
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
          </Card>

          {/* Theme & Language */}
          <Card className="!p-5 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <Palette className="w-4 h-4 text-primary shrink-0" />
              <div>
                <CardTitle className="text-sm font-semibold font-sans">{t('profile.sectionPreferences')}</CardTitle>
                <p className="text-xs text-muted-foreground">{t('profile.sectionPreferencesDesc')}</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {t('profile.themeLabel')}
              </Label>
              <p className="text-xs text-muted-foreground -mt-1">{t('profile.themeDesc')}</p>
              <div className="grid grid-cols-1 gap-2">
                {themes.map((themeOption) => (
                  <button
                    key={themeOption.id}
                    type="button"
                    onClick={() => setTheme(themeOption.id as SakinaThemeId)}
                    className={cn(
                      'flex items-center gap-3 w-full p-2.5 rounded-lg border text-left transition-colors cursor-pointer',
                      theme === themeOption.id
                        ? 'border-primary/40 bg-primary/5'
                        : 'border-border hover:bg-muted/50',
                    )}
                  >
                    <span className="text-lg leading-none">{themeOption.emoji}</span>
                    <span className="flex-1 min-w-0">
                      <span className="text-sm font-medium block text-foreground">
                        {isBn ? themeOption.nameBn : themeOption.name}
                      </span>
                      <span className="text-xs text-muted-foreground line-clamp-1">
                        {isBn ? themeOption.descriptionBn : themeOption.description}
                      </span>
                    </span>
                    {theme === themeOption.id && <Check className="w-4 h-4 text-primary shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <Label htmlFor="language" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Languages className="w-3.5 h-3.5" />
                {t('profile.languageLabel')}
              </Label>
              <p className="text-xs text-muted-foreground">{t('profile.languageDesc')}</p>
              <Select value={i18n.language || 'en'} onValueChange={(v) => handleLanguageChange(v as 'en' | 'bn')}>
                <SelectTrigger id="language" className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">{t('profile.langEn')}</SelectItem>
                  <SelectItem value="bn">{t('profile.langBn')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
        </div>

        {/* Profile + Security + Delete */}
        <div className="space-y-5 lg:col-span-2">
          {/* Update Profile */}
          <Card className="!p-5 sm:!p-6 space-y-5">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <Sliders className="w-4 h-4 text-primary shrink-0" />
              <div>
                <CardTitle className="text-sm font-semibold font-sans">{t('profile.sectionProfile')}</CardTitle>
                <p className="text-xs text-muted-foreground">{t('profile.sectionProfileDesc')}</p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="userName">{t('profile.fieldName')}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
                    <Input
                      id="userName"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="pl-9 text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="userEmail">{t('profile.fieldEmail')}</Label>
                  <Input id="userEmail" value={profile.email} disabled className="text-sm opacity-70" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="customQuote">{t('profile.fieldMotto')}</Label>
                <textarea
                  id="customQuote"
                  value={customQuote}
                  onChange={(e) => setCustomQuote(e.target.value)}
                  rows={2}
                  className="w-full bg-muted/40 text-sm leading-relaxed italic p-3 border border-border rounded-md focus:border-primary/40 focus:ring-2 focus:ring-ring/30 outline-none text-foreground font-sans resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {t('profile.fieldAvatar')}
                </Label>
                <div className="grid grid-cols-4 gap-2">
                  {AVATAR_TEMPLATES.map((avatar) => {
                    const isActive = selectedAvatar === avatar.url;
                    return (
                      <button
                        key={avatar.name}
                        type="button"
                        onClick={() => {
                          setSelectedAvatar(avatar.url);
                          toast(t('profile.avatarChanged'), 'success');
                        }}
                        className={cn(
                          'p-1.5 rounded-md border transition-all hover:scale-105 cursor-pointer flex items-center justify-center',
                          isActive ? 'border-primary/40 ring-1 ring-primary/20 bg-primary/5' : 'border-border bg-muted/20',
                        )}
                        title={avatar.name}
                      >
                        <img src={avatar.url} alt="" className="w-10 h-10 object-contain" referrerPolicy="no-referrer" />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="dailyGoal">{t('profile.dailyGoal')}</Label>
                <Select value={String(dailyGoal)} onValueChange={(v) => setDailyGoal(Number(v))}>
                  <SelectTrigger id="dailyGoal" className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {WORD_GOAL_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t('profile.lifeTarget')}</Label>
                <RadioGroup value={activeGoal} onValueChange={setActiveGoal} className="gap-2">
                  {MINDFULNESS_GOALS.map((goal, index) => {
                    const goalId = `goal-${index}`;
                    return (
                      <div
                        key={goal}
                        className="flex items-start gap-3 rounded-md border border-border p-3 has-[[data-state=checked]]:border-primary/40 has-[[data-state=checked]]:bg-primary/5"
                      >
                        <RadioGroupItem value={goal} id={goalId} className="mt-0.5" />
                        <Label htmlFor={goalId} className="text-sm font-normal leading-normal cursor-pointer flex-1">
                          {goal}
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              </div>

              <div className="flex items-center justify-between gap-4 p-3.5 bg-muted/30 border border-border rounded-md">
                <div className="flex-1 min-w-0">
                  <Label htmlFor="reminders" className="text-sm font-semibold flex items-center gap-2 cursor-pointer">
                    <Bell className="w-3.5 h-3.5 text-primary shrink-0" />
                    {t('profile.notifications')}
                  </Label>
                  <p className="text-xs text-muted-foreground pl-5 mt-0.5">{t('profile.notificationsDesc')}</p>
                </div>
                <Switch id="reminders" checked={reminders} onCheckedChange={setReminders} />
              </div>

              <div className="flex justify-end">
                <Button type="submit" variant="primary" isLoading={isSubmitting} className="font-serif w-full sm:w-auto">
                  {t('profile.saveProfile')}
                </Button>
              </div>
            </form>
          </Card>

          {/* Change Password */}
          <Card className="!p-5 sm:!p-6 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <Lock className="w-4 h-4 text-primary shrink-0" />
              <div>
                <CardTitle className="text-sm font-semibold font-sans">{t('profile.sectionSecurity')}</CardTitle>
                <p className="text-xs text-muted-foreground">{t('profile.sectionSecurityDesc')}</p>
              </div>
            </div>

            {!hasStoredPassword() && (
              <p className="text-sm text-muted-foreground bg-muted/40 border border-border rounded-md px-3 py-2">
                {t('profile.noPasswordHint')}
              </p>
            )}

            <form onSubmit={passwordForm.handleSubmit(handleChangePassword)} className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="currentPassword">{t('profile.currentPassword')}</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  autoComplete="current-password"
                  className="text-sm"
                  {...passwordForm.register('currentPassword')}
                />
                {passwordForm.formState.errors.currentPassword && (
                  <p className="text-sm text-destructive">{passwordForm.formState.errors.currentPassword.message}</p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="newPassword">{t('profile.newPassword')}</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    autoComplete="new-password"
                    className="text-sm"
                    {...passwordForm.register('newPassword')}
                  />
                  {passwordForm.formState.errors.newPassword && (
                    <p className="text-sm text-destructive">{passwordForm.formState.errors.newPassword.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword">{t('profile.confirmPassword')}</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    className="text-sm"
                    {...passwordForm.register('confirmPassword')}
                  />
                  {passwordForm.formState.errors.confirmPassword && (
                    <p className="text-sm text-destructive">{passwordForm.formState.errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>
              <div className="flex justify-end pt-1">
                <Button type="submit" variant="outline" isLoading={isChangingPassword} className="w-full sm:w-auto">
                  {t('profile.changePasswordBtn')}
                </Button>
              </div>
            </form>
          </Card>

          {/* Delete Profile */}
          <Card className="!p-5 sm:!p-6 space-y-4 border-destructive/30 bg-destructive/5">
            <div className="flex items-center gap-2 pb-2 border-b border-destructive/20">
              <AlertTriangle className="w-4 h-4 text-destructive shrink-0" />
              <div>
                <CardTitle className="text-sm font-semibold font-sans text-destructive">
                  {t('profile.sectionDanger')}
                </CardTitle>
                <p className="text-xs text-muted-foreground">{t('profile.sectionDangerDesc')}</p>
              </div>
            </div>
            <Button
              type="button"
              variant="destructive"
              isLoading={isDeleting}
              onClick={handleDeleteProfile}
              className="w-full sm:w-auto"
            >
              <Trash2 className="w-4 h-4" />
              {t('profile.deleteBtn')}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
