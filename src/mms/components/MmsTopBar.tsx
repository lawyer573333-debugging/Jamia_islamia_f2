import React, { useState } from 'react';
import {
  Menu,
  Globe,
  LogOut,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  User,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useMmsAuth } from '../context/MmsAuthContext';

interface MmsTopBarProps {
  onToggleSidebar: () => void;
  onNavigateHome: () => void;
  onNavigateMms: (route: string) => void;
}

export const MmsTopBar: React.FC<MmsTopBarProps> = ({
  onToggleSidebar,
  onNavigateHome,
  onNavigateMms,
}) => {
  const { language, setLanguage, isRtl, t } = useLanguage();
  const { user, logout } = useMmsAuth();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const roleColors = {
    mudeer: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    teacher: 'bg-sky-100 text-sky-900 border-sky-300',
    counter: 'bg-amber-100 text-amber-900 border-amber-300',
    parent: 'bg-purple-100 text-purple-900 border-purple-300',
  }[user?.role || 'mudeer'];

  const roleLabels = {
    mudeer: { ur: 'مہتمم پورٹل (Mudeer)', en: 'Mudeer / Director' },
    teacher: { ur: 'استاذ پورٹل (Teacher)', en: 'Teacher / Faculty' },
    counter: { ur: 'کاؤنٹر و فیس (Cashier)', en: 'Cashier / Counter' },
    parent: { ur: 'سرپرست پورٹل (Parent)', en: 'Parent / Guardian' },
  }[user?.role || 'mudeer'];

  const handleLogout = async () => {
    await logout();
    onNavigateMms('mms_login');
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-stone-200 shadow-2xs">
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Left Side: Mobile toggle + Breadcrumb / Role banner */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Toggle Navigation Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block font-bold text-stone-900 text-sm font-h2">
              {t('جامعۃ العلوم الاسلامیہ', 'Jamia Tul Uloom Al-Islamia')}
            </span>
            <span className="hidden md:inline-block text-stone-300">/</span>
            <span className="text-xs sm:text-sm font-semibold text-emerald-900 font-sans flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {t('مدارس مینجمنٹ سسٹم', 'Madaris Management System')}
            </span>

            {/* Role indicator tag */}
            <span
              className={`ms-1.5 px-2 py-0.5 rounded text-[11px] font-bold border ${roleColors}`}
            >
              {t(roleLabels.ur, roleLabels.en)}
            </span>
          </div>
        </div>

        {/* Right Side: Back to Website, Language Switcher, User Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Back to Public Website Button */}
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-lg transition-colors"
            title={t('مرکزی ویب سائٹ پر واپس جائیں', 'Return to Public Madrasa Website')}
          >
            {isRtl ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{t('مرکزی ویب سائٹ', 'Public Website')}</span>
            <span className="sm:hidden">{t('ویب سائٹ', 'Website')}</span>
          </button>

          {/* Language Switcher */}
          <div className="inline-flex items-center rounded-lg bg-stone-100 p-0.5 border border-stone-200 text-xs font-medium">
            <button
              onClick={() => setLanguage('ur')}
              className={`px-2 py-1 rounded-md transition-all ${
                language === 'ur'
                  ? 'bg-emerald-800 text-white font-bold shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              اردو
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-md transition-all ${
                language === 'en'
                  ? 'bg-emerald-800 text-white font-bold shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              EN
            </button>
          </div>

          {/* User Profile & Logout Dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 transition-colors text-start"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-900 text-amber-300 font-bold text-xs flex items-center justify-center border border-amber-400/40 shrink-0">
                {user?.nameEnglish.charAt(0) || 'U'}
              </div>
              <div className="hidden md:block">
                <p className="text-xs font-bold text-stone-800 line-clamp-1">
                  {t(user?.nameUrdu || '', user?.nameEnglish || '')}
                </p>
                <p className="text-[10px] text-stone-500 line-clamp-1">
                  {t(user?.designationUrdu || '', user?.designationEnglish || '')}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 hidden sm:block" />
            </button>

            {/* Dropdown Menu */}
            {userDropdownOpen && (
              <div
                className={`absolute ${
                  isRtl ? 'left-0' : 'right-0'
                } mt-2 w-64 bg-white border border-stone-200 rounded-xl shadow-xl py-2 z-50`}
              >
                <div className="px-4 py-2 border-b border-stone-100">
                  <p className="text-xs text-stone-400 uppercase tracking-wider font-semibold">
                    {t('لاگ ان صارف', 'Signed in as')}
                  </p>
                  <p className="text-sm font-bold text-stone-900 mt-0.5">
                    {t(user?.nameUrdu || '', user?.nameEnglish || '')}
                  </p>
                  <p className="text-xs text-emerald-800 font-mono mt-0.5">{user?.email}</p>
                  <span
                    className={`inline-block mt-1.5 px-2 py-0.5 text-[10px] font-bold rounded border ${roleColors}`}
                  >
                    {t(roleLabels.ur, roleLabels.en)}
                  </span>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onNavigateHome();
                    }}
                    className="w-full text-start px-4 py-2 text-xs text-stone-700 hover:bg-stone-100 flex items-center gap-2"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
                    <span>{t('جامعہ پبلک ویب سائٹ دیکھیں', 'View Public Website')}</span>
                  </button>
                </div>

                <div className="pt-1 border-t border-stone-100">
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-start px-4 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-600" />
                    <span>{t('لاگ آؤٹ کریں (Sign Out)', 'Sign Out')}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
