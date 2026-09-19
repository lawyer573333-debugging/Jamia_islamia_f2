import React, { useState } from 'react';
import {
  Lock,
  Mail,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  KeyRound,
  GraduationCap,
  Users,
  CreditCard,
  UserCheck,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useMmsAuth } from '../context/MmsAuthContext';
import { DEMO_CREDENTIALS } from '../data/mockData';
import { MmsRole } from '../types';

interface MmsLoginViewProps {
  onLoginSuccess: (role: MmsRole) => void;
  onBackToWebsite: () => void;
}

export const MmsLoginView: React.FC<MmsLoginViewProps> = ({
  onLoginSuccess,
  onBackToWebsite,
}) => {
  const { language, setLanguage, isRtl, t } = useLanguage();
  const { login, quickLogin } = useMmsAuth();

  const [email, setEmail] = useState('mudeer@demo.local');
  const [password, setPassword] = useState('Demo@123');
  const [selectedRole, setSelectedRole] = useState<MmsRole>('mudeer');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success && res.role) {
        onLoginSuccess(res.role);
      } else {
        setErrorMessage(
          res.error ||
            t(
              'لاگ ان ناکام رہا۔ براہ کرم ای میل اور پاس ورڈ کی تصدیق کریں۔',
              'Authentication failed. Please verify demo credentials.'
            )
        );
      }
    } catch (err) {
      setErrorMessage(t('غیر متوقع خرابی پیش آئی۔', 'An unexpected error occurred.'));
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDemoAccount = (role: MmsRole) => {
    setSelectedRole(role);
    const demo = DEMO_CREDENTIALS.find((c) => c.role === role);
    if (demo) {
      setEmail(demo.email);
      setPassword(demo.password);
      setErrorMessage(null);
    }
  };

  const handleInstantQuickLogin = (role: MmsRole) => {
    const res = quickLogin(role);
    if (res.success) {
      onLoginSuccess(res.role);
    }
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
      </header>

      {/* Main Login Card Container */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left/Right Branding Banner (5 columns on large screens) */}
          <div className="lg:col-span-5 bg-emerald-900 text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Islamic subtle geometric background overlay */}
            <div className="absolute inset-0 bg-pattern-subtle opacity-10 pointer-events-none" />

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
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-400 text-stone-950 inline-block mb-3">
                  {t('مرحلہ اول — ماک ڈیمو', 'Phase 1 — Mock Demo')}
                </span>
                <h2 className="text-2xl font-bold text-white font-h2 leading-tight">
                  {t('مدارس مینجمنٹ سسٹم', 'Madaris Management System (MMS)')}
                </h2>
                <p className="mt-2 text-xs text-emerald-100/90 leading-relaxed">
                  {t(
                    'ادارے کے انتظامی، تدریسی، مالیاتی اور طلبہ کے جملہ ریکارڈز کے لیے ایک جامع و جدید ڈیجیٹل پورٹل۔',
                    'Comprehensive administrative, academic, financial, and student management portal for the institution.'
                  )}
                </p>
              </div>
            </div>

            {/* Quick Demo Info Cards */}
            <div className="relative z-10 mt-8 pt-6 border-t border-emerald-800/80">
              <p className="text-xs font-semibold text-emerald-200 mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>{t('۴ ڈیمو اکاؤنٹس دستیاب ہیں:', '4 Demo Roles Available:')}</span>
              </p>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-100">
                  <p className="font-bold text-amber-300">{t('۱. مہتمم (Mudeer)', '1. Mudeer')}</p>
                  <p className="text-[10px] text-stone-300 mt-0.5 font-mono truncate">mudeer@demo.local</p>
                </div>
                <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-100">
                  <p className="font-bold text-amber-300">{t('۲. استاذ (Teacher)', '2. Teacher')}</p>
                  <p className="text-[10px] text-stone-300 mt-0.5 font-mono truncate">teacher@demo.local</p>
                </div>
                <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-100">
                  <p className="font-bold text-amber-300">{t('۳. کاؤنٹر (Counter)', '3. Counter')}</p>
                  <p className="text-[10px] text-stone-300 mt-0.5 font-mono truncate">counter@demo.local</p>
                </div>
                <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-100">
                  <p className="font-bold text-amber-300">{t('۴. سرپرست (Parent)', '4. Parent')}</p>
                  <p className="text-[10px] text-stone-300 mt-0.5 font-mono truncate">parent@demo.local</p>
                </div>
              </div>
              <p className="text-[10px] text-emerald-300/80 mt-2 font-mono">
                {t('تمام پاس ورڈز:', 'Default Password:')} <span className="text-amber-300 font-bold">Demo@123</span>
              </p>
            </div>
          </div>

          {/* Right/Left Login Form (7 columns on large screens) */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-white">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-stone-900 font-h2">
                {t('سسٹم میں لاگ ان کریں', 'Sign In to MMS Portal')}
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                {t(
                  'اپنے مفوضہ کردار کا انتخاب کریں یا ڈیمو اسناد درج فرمائیں:',
                  'Select a demo role or sign in with your credentials:'
                )}
              </p>
            </div>

            {/* Role Quick Selector Tabs */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-stone-700 mb-2">
                {t('ایک کلک سے کردار منتخب کریں (1-Click Switch):', 'Select Demo Role (1-Click Fill):')}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {DEMO_CREDENTIALS.map((demo) => {
                  const isSelected = selectedRole === demo.role;
                  return (
                    <button
                      key={demo.role}
                      type="button"
                      onClick={() => handleSelectDemoAccount(demo.role)}
                      className={`px-2.5 py-2 rounded-xl text-center border text-xs font-semibold transition-all ${
                        isSelected
                          ? 'border-emerald-800 bg-emerald-50 text-emerald-900 shadow-xs ring-2 ring-emerald-700/20'
                          : 'border-stone-200 hover:border-stone-300 bg-stone-50/70 text-stone-700'
                      }`}
                    >
                      <div className="font-bold truncate">
                        {demo.role === 'mudeer' && t('مہتمم', 'Mudeer')}
                        {demo.role === 'teacher' && t('استاذ', 'Teacher')}
                        {demo.role === 'counter' && t('کاؤنٹر', 'Counter')}
                        {demo.role === 'parent' && t('سرپرست', 'Parent')}
                      </div>
                      <div className="text-[10px] text-stone-400 capitalize mt-0.5">
                        {demo.role}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Standard Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    placeholder="name@demo.local"
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
                  className="w-full sm:flex-1 py-3 px-6 rounded-xl bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4 text-amber-300" />
                      <span>{t('پورٹل میں لاگ ان کریں', 'Sign In to Portal')}</span>
                    </>
                  )}
                </button>

                {/* Instant Demo Launch Button */}
                <button
                  type="button"
                  onClick={() => handleInstantQuickLogin(selectedRole)}
                  className="w-full sm:w-auto py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  title="Bypass credential entry and directly log in as this role"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t('براہِ راست ڈیش بورڈ', 'Instant Launch')}</span>
                </button>
              </div>
            </form>

            {/* Note regarding Supabase & Database Architecture */}
            <div className="mt-8 pt-4 border-t border-stone-100 text-[11px] text-stone-500">
              <p className="flex items-center gap-1.5 font-medium text-stone-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>
                  {t(
                    'نوٹ برائے ڈویلپر: یہ فیز ۱ ماک انٹرفیس ہے۔ فیز ۲ میں سپابیس اتھ (Supabase Auth) سے باآسانی منسلک کیا جائے گا۔',
                    'Architecture note: Phase 1 Mock Auth. Ready for seamless Supabase Auth integration in Phase 2.'
                  )}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <footer className="py-4 text-center text-xs text-stone-500 border-t border-stone-200 bg-stone-50">
        <p>
          {t(
            'جامعۃ العلوم الاسلامیہ — مدارس مینجمنٹ سسٹم (MMS) | جملہ حقوق محفوظ ہیں ۲۰۲۶ء',
            'Jamia Tul Uloom Al-Islamia — Madaris Management System (MMS) | All Rights Reserved 2026'
          )}
        </p>
      </footer>
    </div>
  );
};
