import React, { useState } from 'react';
import {
  Lock,
  Mail,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  Database,
  UserPlus,
  Info,
  ExternalLink,
  Code2,
  Copy,
  Check,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useMmsAuth } from '../context/MmsAuthContext';
import { DEMO_CREDENTIALS } from '../data/mockData';
import { MmsRole, InstitutionalPosition } from '../types';

interface MmsLoginViewProps {
  onLoginSuccess: (role: MmsRole, position?: InstitutionalPosition) => void;
  onBackToWebsite: () => void;
}

export const MmsLoginView: React.FC<MmsLoginViewProps> = ({
  onLoginSuccess,
  onBackToWebsite,
}) => {
  const { language, setLanguage, isRtl, t } = useLanguage();
  const { login, signUp, isConfigured } = useMmsAuth();

  // Mode: 'signin' | 'register'
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');

  // Form states
  const [email, setEmail] = useState('nazimaala@demo.local');
  const [password, setPassword] = useState('Demo@123');
  const [fullName, setFullName] = useState('Maulana Muhammad Abdul Rehman');
  const [nameUrdu, setNameUrdu] = useState('مولانا محمد عبد الرحمٰن');
  const [selectedRole, setSelectedRole] = useState<MmsRole>('mudeer');
  const [selectedPreset, setSelectedPreset] = useState<string>('nazim_aala');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Setup / SQL modal state
  const [showSqlModal, setShowSqlModal] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const handleSelectPreset = (presetKey: string) => {
    setSelectedPreset(presetKey);
    setErrorMessage(null);
    setSuccessMessage(null);

    const cred = DEMO_CREDENTIALS.find(c => {
      if (presetKey === 'muhtamim') return c.position === 'muhtamim';
      if (presetKey === 'nazim_aala') return c.position === 'nazim_aala';
      if (presetKey === 'departmental_nazim') return c.position === 'departmental_nazim';
      return c.role === presetKey;
    });

    if (cred) {
      setSelectedRole(cred.role);
      setEmail(cred.email);
      setPassword(cred.password);
      setFullName(cred.nameEnglish);
      setNameUrdu(cred.nameUrdu);
    }
  };

  const handleRoleSelect = (role: MmsRole) => {
    setSelectedRole(role);
    setErrorMessage(null);
    setSuccessMessage(null);

    // Provide default email & names matching the 4 Jamia institutional accounts
    switch (role) {
      case 'mudeer':
        handleSelectPreset('nazim_aala');
        break;
      case 'teacher':
        handleSelectPreset('teacher');
        break;
      case 'counter':
        handleSelectPreset('counter');
        break;
      case 'parent':
        handleSelectPreset('parent');
        break;
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success && res.role) {
        onLoginSuccess(res.role, res.position);
      } else {
        setErrorMessage(
          res.error ||
            t(
              'لاگ ان ناکام رہا۔ براہ کرم ای میل اور پاس ورڈ کی تصدیق کریں۔',
              'Authentication failed. Please verify email and password.'
            )
        );
      }
    } catch {
      setErrorMessage(t('غیر متوقع خرابی پیش آئی۔', 'An unexpected error occurred.'));
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const res = await signUp(email, password, fullName, nameUrdu);
      if (res.success && res.role) {
        setSuccessMessage(
          t(
            'اکاؤنٹ بطور "سرپرست" کامیابی سے رجسٹر ہو گیا! آپ کو لاگ ان کیا جا رہا ہے...',
            'Account successfully registered as Parent! Signing you in...'
          )
        );
        // Attempt sign in with newly created credentials
        const loginRes = await login(email, password);
        if (loginRes.success && loginRes.role) {
          onLoginSuccess(loginRes.role);
        } else {
          setSuccessMessage(
            t(
              'اکاؤنٹ بن گیا ہے۔ براہ کرم لاگ ان فارم کے ذریعے لاگ ان فرمائیں۔',
              'Account created. Please log in using the credentials.'
            )
          );
          setAuthMode('signin');
        }
      } else {
        setErrorMessage(
          res.error ||
            t('رجسٹریشن ناکام رہی۔ براہ کرم تفصیلات چیک کریں۔', 'Registration failed. Please check inputs.')
        );
      }
    } catch {
      setErrorMessage(t('غیر متوقع خرابی پیش آئی۔', 'An unexpected error occurred.'));
    } finally {
      setLoading(false);
    }
  };

  const handleCopySqlPath = () => {
    navigator.clipboard?.writeText('supabase/phase2_foundation.sql');
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col justify-between selection:bg-amber-200 selection:text-stone-900">
      {/* Top Bar on Login Page */}
      <header className="w-full bg-emerald-950 text-white px-4 sm:px-8 py-3 flex items-center justify-between border-b border-emerald-900 shadow-sm">
        <button
          onClick={onBackToWebsite}
          className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-200 hover:text-white bg-emerald-900/60 hover:bg-emerald-900 px-3 py-1.5 rounded-lg border border-emerald-800 transition-colors"
        >
          {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{t('مرکزی ویب سائٹ پر واپس جائیں', 'Back to Public Website')}</span>
        </button>

        <div className="flex items-center gap-3">
          {/* Supabase Status Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-900/80 border border-emerald-800 text-[11px]">
            <span
              className={`w-2 h-2 rounded-full ${
                isConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
              }`}
            />
            <span className="text-emerald-200 font-mono">
              {isConfigured ? 'Supabase Auth' : 'Supabase Not Configured'}
            </span>
          </div>

          {/* Language Switcher */}
          <div className="inline-flex items-center rounded-lg bg-emerald-900/80 p-0.5 border border-emerald-800 text-xs font-medium">
            <button
              onClick={() => setLanguage('ur')}
              className={`px-3 py-1 rounded-md transition-all ${
                language === 'ur'
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              اردو
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-md transition-all ${
                language === 'en'
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              English
            </button>
          </div>
        </div>
      </header>

      {/* Main Login Card Container */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Branding Banner (5 columns on large screens) */}
          <div className="lg:col-span-5 bg-emerald-900 text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-stone-950 border-2 border-amber-400 flex items-center justify-center p-0.5 shadow-md overflow-hidden">
                  <img
                    src="/gallery/photo-01.png"
                    alt="Jamia Emblem"
                    className="w-full h-full object-cover rounded-xl"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white font-h2 leading-snug">
                    {t('جامعۃ العلوم الاسلامیہ', 'Jamia Tul Uloom Al-Islamia')}
                  </h1>
                  <p className="text-xs text-amber-300 font-medium">
                    {t('سیکٹر ایف-۲، میرپور آزاد کشمیر', 'Sector F-2, Mirpur AJK')}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-400 text-stone-950 inline-block">
                    {t('فیز ۲ — سپابیس اتھ و آر ایل ایس', 'Phase 2 — Supabase Auth & RLS')}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white font-h2 leading-tight">
                  {t('مدارس مینجمنٹ سسٹم', 'Madaris Management System (MMS)')}
                </h2>
                <p className="mt-2 text-xs text-emerald-100/90 leading-relaxed">
                  {t(
                    'سپابیس ڈیٹا بیس اور رو لیول سیکیورٹی (RLS) پر مبنی مستحکم، محفوظ اور کردار کی بنیاد پر مجاز انتظامی پورٹل۔',
                    'Production-grade institutional management system secured with Supabase Auth, PostgreSQL profiles, and strict Row Level Security (RLS).'
                  )}
                </p>
              </div>
            </div>

            {/* Phase 4 Institutional Authority Summary */}
            <div className="relative z-10 mt-8 pt-6 border-t border-emerald-800/80">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-emerald-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>{t('ادارہ جاتی اختیارات کا ماڈل (Phase 4):', 'Institutional Authority Model:')}</span>
                </p>
                <button
                  onClick={() => setShowSqlModal(true)}
                  className="text-[11px] text-amber-300 hover:text-amber-200 flex items-center gap-1 underline underline-offset-2"
                >
                  <Code2 className="w-3 h-3" />
                  <span>SQL Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-100">
                  <p className="font-bold text-amber-300">{t('مہتمم (معائنہ و نگرانی)', 'Muhtamim (Inspection)')}</p>
                  <p className="text-[10px] text-stone-300 mt-0.5 font-mono truncate">muhtamim@demo.local</p>
                </div>
                <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-100">
                  <p className="font-bold text-amber-300">{t('ناظمِ اعلیٰ (چیف ایگزیکٹو)', 'Nazim-e-Aala (Operations)')}</p>
                  <p className="text-[10px] text-stone-300 mt-0.5 font-mono truncate">nazimaala@demo.local</p>
                </div>
                <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-100">
                  <p className="font-bold text-amber-300">{t('ناظمِ تعلیمات (تعلیمی شعبہ)', 'Academic Manager')}</p>
                  <p className="text-[10px] text-stone-300 mt-0.5 font-mono truncate">nazimtaleemat@demo.local</p>
                </div>
                <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-100">
                  <p className="font-bold text-amber-300">{t('اساتذہ و کاؤنٹر و اولیاء', 'Teachers / Staff / Parents')}</p>
                  <p className="text-[10px] text-stone-300 mt-0.5 font-mono truncate">teacher@demo.local</p>
                </div>
              </div>
              <p className="text-[10px] text-emerald-300/80 mt-2 font-mono">
                {t('تجرباتی پاس ورڈ:', 'Default Test Password:')}{' '}
                <span className="text-amber-300 font-bold">Demo@123</span>
              </p>
            </div>
          </div>

          {/* Right Login Form (7 columns on large screens) */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-stone-900 font-h2">
                  {authMode === 'signin'
                    ? t('سپابیس پورٹل میں لاگ ان کریں', 'Sign In to MMS Portal')
                    : t('نیا سپابیس اکاؤنٹ بنائیں', 'Register User Account in Supabase')}
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  {authMode === 'signin'
                    ? t(
                        'اپنے مفوضہ کردار کی اسناد درج فرما کر لاگ ان کریں:',
                        'Enter your authenticated Supabase credentials to access your dashboard:'
                      )
                    : t(
                        'مطلوبہ کردار کے ساتھ سپابیس ڈیٹا بیس میں نیا صارف رجسٹر کریں:',
                        'Register a new authenticated profile in the Supabase database:'
                      )}
                </p>
              </div>

              {/* Mode Toggle Button */}
              <button
                type="button"
                onClick={() => {
                  setAuthMode(authMode === 'signin' ? 'register' : 'signin');
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-emerald-700/30 text-emerald-800 hover:bg-emerald-50 transition-colors shrink-0"
              >
                {authMode === 'signin' ? (
                  <span className="flex items-center gap-1">
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>{t('رجسٹر کریں', 'New Account')}</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>{t('لاگ ان پر جائیں', 'Sign In')}</span>
                  </span>
                )}
              </button>
            </div>

            {/* Quick Presets for Institutional Authority testing */}
            {authMode === 'signin' ? (
              <div className="mb-5">
                <label className="block text-xs font-semibold text-stone-700 mb-2">
                  {t('ادارہ جاتی منصب و کردار کا انتخاب (Institutional Presets):', 'Select Institutional Authority Preset:')}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { key: 'muhtamim', labelUr: 'مہتممِ جامعہ', labelEn: 'Muhtamim', subUr: 'معائنہ و نگرانی', subEn: 'Oversight' },
                    { key: 'nazim_aala', labelUr: 'ناظمِ اعلیٰ', labelEn: 'Nazim-e-Aala', subUr: 'چیف ایگزیکٹو', subEn: 'Chief Admin' },
                    { key: 'departmental_nazim', labelUr: 'ناظمِ تعلیمات', labelEn: 'Academic Head', subUr: 'شعبہ تعلیمات', subEn: 'Academic Dept' },
                    { key: 'teacher', labelUr: 'استاذِ جامعہ', labelEn: 'Teacher', subUr: 'کلاسز و حاضری', subEn: 'Faculty' },
                    { key: 'counter', labelUr: 'کاؤنٹر کلرک', labelEn: 'Fee Counter', subUr: 'مالیات و کیش', subEn: 'Cashier' },
                    { key: 'parent', labelUr: 'سرپرست طالب علم', labelEn: 'Parent', subUr: 'بچوں کا ریکارڈ', subEn: 'Guardian' },
                  ].map((p) => {
                    const isSelected = selectedPreset === p.key;
                    return (
                      <button
                        key={p.key}
                        type="button"
                        onClick={() => handleSelectPreset(p.key)}
                        className={`px-2.5 py-2 rounded-xl text-start border text-xs font-semibold transition-all ${
                          isSelected
                            ? 'border-emerald-800 bg-emerald-50 text-emerald-900 shadow-xs ring-2 ring-emerald-700/20'
                            : 'border-stone-200 hover:border-stone-300 bg-stone-50/70 text-stone-700'
                        }`}
                      >
                        <div className="font-bold truncate text-[11px]">
                          {t(p.labelUr, p.labelEn)}
                        </div>
                        <div className="text-[10px] text-stone-500 truncate mt-0.5">
                          {t(p.subUr, p.subEn)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="mb-5 p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-950 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>{t('سیکیورٹی پالیسی: ازخود سرپرست رجسٹریشن', 'Security Policy: Default Parent Role')}</span>
                </div>
                <p className="text-[11px] leading-relaxed text-amber-900/90">
                  {t(
                    'تمام نئے رجسٹر ہونے والے صارفین کا ابتدائی کردار خودکار طور پر "سرپرست" (Parent) متعین ہوگا۔ استاذ یا کاؤنٹر جیسے انتظامی اختیارات صرف مہتمم (Mudeer) کے ذریعے ہی تفویض کیے جا سکتے ہیں۔',
                    'All self-registered users are assigned the "Parent" role by default. Administrative roles (Teacher, Counter, Mudeer) can only be granted by an authenticated Mudeer.'
                  )}
                </p>
              </div>
            )}

            {/* Error Message Alert */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                <div className="flex-1">
                  <span>{errorMessage}</span>
                  {errorMessage.includes('profiles') && (
                    <button
                      type="button"
                      onClick={() => setShowSqlModal(true)}
                      className="block text-[11px] text-rose-900 font-bold underline mt-1"
                    >
                      {t('ڈیٹا بیس اسکرپٹ (SQL Guide) ملاحظہ فرمائیں', 'View Supabase SQL migration script')}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Success Message Alert */}
            {successMessage && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Standard Login or Register Form */}
            <form onSubmit={authMode === 'signin' ? handleSignIn : handleRegister} className="space-y-3.5">
              {authMode === 'register' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {t('پورا نام (Full Name)', 'Full Name')}
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all"
                      placeholder="e.g. Maulana Muhammad Abdul Rehman"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {t('نام (اردو)', 'Name in Urdu (Optional)')}
                    </label>
                    <input
                      type="text"
                      dir="rtl"
                      value={nameUrdu}
                      onChange={(e) => setNameUrdu(e.target.value)}
                      className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all font-urdu"
                      placeholder="مثلاً: مولانا محمد عبد الرحمٰن"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  {t('ای میل ایڈریس (Email Address)', 'Email Address')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-stone-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    dir="ltr"
                    className="w-full ps-10 pe-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all font-mono"
                    placeholder="name@jamia.edu.pk"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  {t('پاس ورڈ (Password)', 'Password')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-stone-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    dir="ltr"
                    className="w-full ps-10 pe-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all font-mono"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex-1 py-3 px-6 rounded-xl bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : authMode === 'signin' ? (
                    <>
                      <KeyRound className="w-4 h-4 text-amber-300" />
                      <span>{t('پورٹل میں لاگ ان کریں (Supabase)', 'Sign In to Portal')}</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 text-amber-300" />
                      <span>{t('سپابیس میں نیا اکاؤنٹ رجسٹر کریں', 'Create Supabase Account')}</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Note regarding Supabase & Database Architecture */}
            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
              <p className="flex items-center gap-1.5 font-medium text-stone-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>
                  {t(
                    'سپابیس اتھنٹیکیشن و رو لیول سیکیورٹی (RLS) فعال ہے۔',
                    'Real Supabase Authentication & PostgreSQL RLS active.'
                  )}
                </span>
              </p>
              <button
                type="button"
                onClick={() => setShowSqlModal(true)}
                className="text-emerald-800 hover:text-emerald-900 font-bold flex items-center gap-1"
              >
                <Database className="w-3.5 h-3.5" />
                <span>{t('ڈیٹا بیس گائیڈ', 'Database Schema')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SQL Setup Modal */}
      {showSqlModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 border border-stone-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
              <div className="flex items-center gap-2 text-emerald-900 font-bold font-h2 text-lg">
                <Database className="w-5 h-5 text-emerald-700" />
                <span>{t('فیز ۲ سپابیس ڈیٹا بیس اسکرپٹ گائیڈ', 'Phase 2 Supabase SQL & Schema Guide')}</span>
              </div>
              <button
                onClick={() => setShowSqlModal(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-stone-700 leading-relaxed">
              <p>
                {t(
                  'فیز ۲ و فیز ۴ کے لیے تیار کردہ ایس کیو ایل اسکرپٹس پروجیکٹ میں محفوظ ہیں۔ انہیں اپنے سپابیس ایس کیو ایل ایڈیٹر میں رن فرمائیں:',
                  'The SQL migration scripts for Phase 2 and Phase 4 are prepared in the codebase. Run them in your Supabase project SQL Editor:'
                )}
              </p>

              <div className="space-y-2">
                <div className="bg-stone-900 text-stone-100 p-3 rounded-xl font-mono text-xs flex items-center justify-between">
                  <span>supabase/phase4_institutional_authority.sql</span>
                  <span className="text-amber-400 font-bold text-[10px] uppercase px-2 py-0.5 rounded bg-stone-800">
                    Phase 4 Authority
                  </span>
                </div>
                <div className="bg-stone-900 text-stone-100 p-3 rounded-xl font-mono text-xs flex items-center justify-between">
                  <span>supabase/phase2_foundation.sql</span>
                  <span className="text-emerald-400 font-bold text-[10px] uppercase px-2 py-0.5 rounded bg-stone-800">
                    Phase 2 Core
                  </span>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
                <h4 className="font-bold text-emerald-900 mb-1">
                  {t('فیز ۴ ادارہ جاتی ماڈل (Phase 4 Authority Schema):', 'Phase 4 Authority Schema Features:')}
                </h4>
                <ul className="list-disc list-inside space-y-1 text-emerald-800 text-[11px]">
                  <li>
                    <strong>institutional_position enum</strong>: <code className="font-mono">muhtamim</code> (oversight/inspection), <code className="font-mono">nazim_aala</code> (chief operations), <code className="font-mono">departmental_nazim</code> (department manager), <code className="font-mono">teacher</code>, <code className="font-mono">counter</code>, <code className="font-mono">worker</code>, <code className="font-mono">parent</code>.
                  </li>
                  <li>
                    <strong>assigned_domain column</strong>: generic domain support (<code className="font-mono">academic</code>, <code className="font-mono">finance</code>, <code className="font-mono">all</code>).
                  </li>
                  <li>
                    <strong>SECURITY DEFINER helper functions</strong>: <code className="font-mono">can_oversee_institution()</code>, <code className="font-mono">can_manage_operations()</code>, <code className="font-mono">can_manage_academic_domain()</code>, <code className="font-mono">can_read_academic_data()</code>.
                  </li>
                  <li>
                    <strong>Non-recursive RLS</strong>: Zero recursive subqueries, strict anti-self-elevation policy, and operational protection against unauthorized modifications.
                  </li>
                </ul>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setShowSqlModal(false)}
                  className="px-4 py-2 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition-colors"
                >
                  {t('سمجھ آ گیا (Done)', 'Close Guide')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer info */}
      <footer className="py-4 text-center text-xs text-stone-500 border-t border-stone-200 bg-stone-50">
        <p>
          {t(
            'جامعۃ العلوم الاسلامیہ — مدارس مینجمنٹ سسٹم (MMS) فیز ۲ | جملہ حقوق محفوظ ہیں ۲۰۲۶ء',
            'Jamia Tul Uloom Al-Islamia — Madaris Management System (MMS) Phase 2 | All Rights Reserved 2026'
          )}
        </p>
      </footer>
    </div>
  );
};
