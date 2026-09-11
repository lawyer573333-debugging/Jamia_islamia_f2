import React, { useState } from 'react';
import { Phone, MapPin, Clock, Globe, Menu, X, ChevronDown, GraduationCap, Heart, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { navigationItems, topBarContent } from '../data/navigation';
import { siteContent } from '../data/siteContent';

interface HeaderProps {
  currentView: string;
  onNavigate: (viewId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const { language, setLanguage, isRtl, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [academicDropdownOpen, setAcademicDropdownOpen] = useState(false);

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
    setAcademicDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Academic group for quick desktop navigation dropdown
  const academicGroup = [
    { id: 'departments', labelUrdu: 'تمام شعبہ جات کا جائزہ', labelEnglish: 'All Departments' },
    { id: 'dars_nizami', labelUrdu: 'درسِ نظامی (اعدادیہ تا دورۂ حدیث)', labelEnglish: 'Dars-e-Nizami (8-Year Course)' },
    { id: 'quran', labelUrdu: 'شعبہ حفظ و مکتب', labelEnglish: 'Hifz & Maktab' },
    { id: 'contemporary', labelUrdu: 'عصری و اسکول تعلیم (ششم تا ایف اے)', labelEnglish: 'Contemporary Schooling (Class 6 - FA)' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm border-b border-stone-200">
      {/* 1. Top Information Bar */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-2 px-4 border-b border-emerald-900/60">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Contact and Timings */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href="tel:03065042031"
              className="inline-flex items-center gap-1.5 hover:text-amber-300 transition-colors"
              dir="ltr"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold tracking-wider">0306-5042031</span>
            </a>
            <div className="hidden sm:inline-flex items-center gap-1.5 text-emerald-200/80">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('سیکٹر ایف-2، میرپور آزاد کشمیر', 'Sector F-2, Mirpur AJK')}</span>
            </div>
            <div className="hidden md:inline-flex items-center gap-1.5 text-emerald-200/80">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{t(topBarContent.timingUrdu, topBarContent.timingEnglish)}</span>
            </div>
          </div>

          {/* Action links & Language switcher */}
          <div className="flex items-center gap-3 ms-auto">
            <button
              onClick={() => handleNavClick('admissions')}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 text-xs font-medium border border-amber-500/30 transition-colors"
            >
              <GraduationCap className="w-3 h-3" />
              <span>{t('داخلہ معلومات', 'Admissions')}</span>
            </button>

            <button
              onClick={() => handleNavClick('donations')}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-emerald-800/60 hover:bg-emerald-800 text-emerald-200 text-xs font-medium transition-colors"
            >
              <Heart className="w-3 h-3 text-amber-400" />
              <span>{t('تعاون و عطیات', 'Donations')}</span>
            </button>

            {/* Language Switcher Pill */}
            <div className="inline-flex items-center rounded-full bg-emerald-900/80 p-0.5 border border-emerald-800 text-xs font-medium">
              <button
                onClick={() => setLanguage('ur')}
                className={`px-2.5 py-0.5 rounded-full transition-all ${
                  language === 'ur'
                    ? 'bg-amber-400 text-stone-950 font-bold shadow-sm'
                    : 'text-emerald-200 hover:text-white'
                }`}
                title="اردو زبان منتخب کریں"
              >
                اردو
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-0.5 rounded-full transition-all ${
                  language === 'en'
                    ? 'bg-amber-400 text-stone-950 font-bold shadow-sm'
                    : 'text-emerald-200 hover:text-white'
                }`}
                title="Switch to English"
              >
                English
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Branding Header Bar */}
      <div className="bg-emerald-900 text-white px-4 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo and Institution Title */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Logo Emblem Placeholder */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-stone-950 border-2 border-amber-400 flex flex-col items-center justify-center text-center p-1 shrink-0 shadow-md group-hover:border-amber-300 transition-colors">
              <span className="text-[9px] text-amber-300 font-bold leading-tight uppercase font-mono">جامعہ</span>
              <span className="text-[8px] text-stone-300 leading-none">MIRPUR</span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors font-h1">
                  {t(siteContent.nameUrdu, siteContent.nameEnglish)}
                </h1>
                <span className="hidden lg:inline-block px-2 py-0.5 text-[11px] rounded bg-emerald-800 text-emerald-200 border border-emerald-700">
                  {t('میرپور، آزاد کشمیر', 'Mirpur, AJK')}
                </span>
              </div>
              <p className="text-xs text-emerald-200/90 line-clamp-1 mt-0.5">
                {t(siteContent.taglineUrdu, siteContent.taglineEnglish)}
              </p>
            </div>
          </div>

          {/* Quick Action Buttons for Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('admissions')}
              className="px-4 py-2 rounded-lg bg-amber-500 text-stone-950 hover:bg-amber-400 font-semibold text-sm transition-all shadow-sm flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>{t('آن لائن داخلہ فارم', 'Admissions Portal')}</span>
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-medium text-sm transition-colors border border-emerald-700"
            >
              {t('رابطہ کیجیے', 'Contact Jamia')}
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 3. Primary Navigation Menu (Desktop) */}
      <nav className="hidden lg:block bg-stone-100 border-b border-stone-200 text-stone-800">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <ul className="flex items-center flex-wrap">
            {navigationItems.map((item) => {
              const isActive = currentView === item.id;

              // If it's departments, we can show a rich dropdown
              if (item.id === 'departments') {
                return (
                  <li key={item.id} className="relative group">
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`px-3.5 py-3 text-sm font-medium flex items-center gap-1 transition-colors border-b-2 ${
                        isActive
                          ? 'border-emerald-800 text-emerald-900 bg-white font-bold'
                          : 'border-transparent text-stone-700 hover:text-emerald-800 hover:bg-stone-200/60'
                      }`}
                    >
                      <span>{t(item.labelUrdu, item.labelEnglish)}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-stone-500 group-hover:rotate-180 transition-transform" />
                    </button>

                    {/* Academic Dropdown Submenu */}
                    <div className="absolute top-full start-0 w-64 bg-white shadow-xl rounded-b-lg border border-stone-200 py-2 hidden group-hover:block z-50">
                      {academicGroup.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handleNavClick(sub.id)}
                          className="w-full text-start px-4 py-2.5 text-xs font-medium text-stone-700 hover:bg-emerald-50 hover:text-emerald-900 transition-colors flex items-center justify-between"
                        >
                          <span>{t(sub.labelUrdu, sub.labelEnglish)}</span>
                        </button>
                      ))}
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3.5 py-3 text-sm font-medium transition-colors border-b-2 ${
                      isActive
                        ? 'border-emerald-800 text-emerald-900 bg-white font-bold shadow-xs'
                        : 'border-transparent text-stone-700 hover:text-emerald-800 hover:bg-stone-200/60'
                    } ${item.isImportant ? 'text-emerald-800 font-semibold' : ''}`}
                  >
                    {t(item.labelUrdu, item.labelEnglish)}
                    {item.isImportant && (
                      <span className="ms-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-amber-100 text-amber-800 border border-amber-300">
                        {t('جاری', 'Open')}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Quick Prospectus / Document Link */}
          <button
            onClick={() => handleNavClick('documents')}
            className="text-xs font-medium text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:bg-stone-200/60 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-amber-600" />
            <span>{t('ڈاؤنلوڈ دستاویزات', 'Downloads')}</span>
          </button>
        </div>
      </nav>

      {/* 4. Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-300 shadow-xl max-h-[80vh] overflow-y-auto">
          {/* Quick info in mobile drawer */}
          <div className="p-3 bg-stone-100 border-b border-stone-200 flex items-center justify-between text-xs">
            <span className="text-stone-600">
              {t('سیکٹر ایف-2، میرپور آزاد کشمیر', 'Sector F-2, Mirpur AJK')}
            </span>
            <a
              href="tel:03065042031"
              className="text-emerald-800 font-bold flex items-center gap-1"
              dir="ltr"
            >
              <Phone className="w-3 h-3 text-amber-600" />
              0306-5042031
            </a>
          </div>

          <ul className="divide-y divide-stone-100">
            {navigationItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-start px-4 py-3 text-sm flex items-center justify-between transition-colors ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-900 font-bold border-s-4 border-emerald-800'
                        : 'text-stone-800 hover:bg-stone-50'
                    }`}
                  >
                    <span>{t(item.labelUrdu, item.labelEnglish)}</span>
                    {item.isImportant && (
                      <span className="px-2 py-0.5 text-xs rounded bg-amber-100 text-amber-800 border border-amber-200">
                        {t('داخلہ جاری', 'Admissions')}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('admissions')}
              className="w-full py-2.5 rounded-lg bg-emerald-800 text-white font-semibold text-sm text-center shadow-sm"
            >
              {t('داخلہ کی معلومات و طریقہ کار', 'Admission Information')}
            </button>
            <button
              onClick={() => handleNavClick('donations')}
              className="w-full py-2 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 font-medium text-sm text-center"
            >
              {t('عطیات و مالی تعاون', 'Donations & Support')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
