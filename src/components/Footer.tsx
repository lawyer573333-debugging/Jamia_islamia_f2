import React from 'react';
import { MapPin, Phone, Mail, Globe, Shield, Heart, GraduationCap, ChevronRight, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { siteContent } from '../data/siteContent';
import { contactData } from '../data/contact';
import { navigationItems } from '../data/navigation';

interface FooterProps {
  onNavigate: (viewId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { language, setLanguage, t } = useLanguage();

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t-4 border-emerald-800">
      {/* 1. Development/Preliminary Status Banner */}
      <div className="bg-amber-950/70 border-b border-amber-900/50 py-2.5 px-4 text-center text-xs text-amber-200/90">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-2">
          <Shield className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            {t(
              'یہ ویب سائٹ آزمائشی و ترقیاتی مرحلے میں ہے۔ جامعہ انتظامیہ کی توثیق کے بعد مستند تصاویر، اسناد اور تفصیلات باضابطہ طور پر شامل کی جائیں گی۔',
              'This is a development preview. Official photographs, credentials, and full documentation are pending formal Jamia verification.'
            )}
          </span>
        </div>
      </div>

      {/* 2. Main Footer Content Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Institution Identity */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-900 border border-amber-400/50 flex flex-col items-center justify-center text-center p-0.5 shrink-0 overflow-hidden">
                <img
                  src="/gallery/photo-01.png"
                  alt="Jamia Emblem"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-h3">
                  {t(siteContent.nameUrdu, siteContent.nameEnglish)}
                </h3>
                <p className="text-xs text-amber-400/80">
                  {t('سیکٹر ایف-2، میرپور آزاد کشمیر', 'Sector F-2, Mirpur AJK')}
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed mb-4">
              {t(
                'قرآن و سنت کی مستند تعلیمات، شعبہ حفظ، مکتب، مکمل درسِ نظامی، اور چھٹی جماعت تا ایف اے عصری تعلیم و کمپیوٹر سائنس کا باوقار مرکز۔',
                'A distinguished center for sacred Islamic learning, Quran memorization, full Dars-e-Nizami, and modern schooling from grade 6 through FA.'
              )}
            </p>

            <div className="pt-2 border-t border-stone-800 text-xs text-stone-400 space-y-1">
              <p>
                <strong className="text-stone-300">{t('مہتمم جامعہ:', 'Principal/Muhtamim:')}</strong>{' '}
                {t('مولانا زید بوستان صاحب', 'Maulana Zaid Bostan')}
              </p>
              <p>
                <strong className="text-stone-300">{t('ناظمِ اعلیٰ:', 'Nazim-e-Aala:')}</strong>{' '}
                {t('مولانا قاری عابد حسین بٹ صاحب', 'Maulana Qari Abid Hussain Butt')}
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 pb-2 border-b border-stone-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              {t('اہم روابط', 'Quick Links')}
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'about', ur: 'جامعہ کا تعارف و مقاصد', en: 'About the Jamia' },
                { id: 'departments', ur: 'تمام تعلیمی شعبہ جات', en: 'All Departments' },
                { id: 'dars_nizami', ur: 'شعبہ درسِ نظامی (۸ سالہ نصاب)', en: 'Dars-e-Nizami Program' },
                { id: 'admissions', ur: 'داخلہ جات و طریقہ کار', en: 'Admissions Procedure' },
                { id: 'faculty', ur: 'اساتذہ کرام و انتظامیہ', en: 'Faculty & Scholars' },
                { id: 'announcements', ur: 'اعلانات و خبریں', en: 'Announcements' },
                { id: 'events', ur: 'تقریبات و سرگرمیاں', en: 'Activities & Events' },
                { id: 'gallery', ur: 'تصویری گیلری', en: 'Photo Gallery' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleLinkClick(item.id)}
                    className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-stone-400"
                  >
                    <ChevronRight className="w-3 h-3 text-emerald-500 rtl:rotate-180" />
                    <span>{t(item.ur, item.en)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Academic Departments */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 pb-2 border-b border-stone-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              {t('تعلیمی شعبہ جات', 'Academic Wings')}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{t('شعبہ تحفیظ القرآن الکریم', 'Tahfeez-ul-Quran Department')}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{t('شعبہ مکتب (ابتدائی ناظرہ و دعائیں)', 'Maktab & Nazira Department')}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{t('درسِ نظامی (اعدادیہ تا دورۂ حدیث شریف)', 'Dars-e-Nizami (Idadiya to Dawrah)')}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{t('دورۂ حدیث شریف (تکمیلِ فضیلت)', 'Dawrah-e-Hadith Final Year')}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{t('عصری تعلیم (چھٹی تا ایف اے اسکولنگ)', 'Contemporary Schooling (Class 6 - FA)')}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{t('بنیادی کمپیوٹر سائنس لیب', 'Computer Literacy Lab')}</span>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-stone-800">
              <button
                onClick={() => handleLinkClick('donations')}
                className="w-full py-2 px-3 rounded-lg bg-emerald-900/60 hover:bg-emerald-900 text-emerald-200 border border-emerald-700/50 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <Heart className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('جامعہ کے ساتھ مالی تعاون (عطیات)', 'Donate & Support Jamia')}</span>
              </button>
            </div>
          </div>

          {/* Column 4: Contact & Office Info */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 pb-2 border-b border-stone-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              {t('رابطہ و پتہ', 'Contact & Office')}
            </h4>

            <div className="space-y-3 text-xs text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">
                    {t('مرکزی کیمپس:', 'Main Campus:')}
                  </p>
                  <p className="text-stone-400 leading-relaxed">
                    {t(contactData.address.ur, contactData.address.en)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <p className="text-stone-400">{t('فون نمبر (دفتری اوقات):', 'Phone (Office Hours):')}</p>
                  <a
                    href="tel:03065042031"
                    className="text-white hover:text-amber-300 font-bold tracking-wider"
                    dir="ltr"
                  >
                    {contactData.primaryPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-stone-400">{t('ای میل ایڈریس:', 'Official Email:')}</p>
                  <span className="text-stone-500 font-mono text-[11px]">
                    PLACEHOLDER_OFFICIAL_EMAIL
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-stone-400 mb-1">{t('سوشل میڈیا روابط:', 'Social Links:')}</p>
                <div className="flex items-center gap-2 text-stone-500 text-[11px] font-mono">
                  <span className="px-2 py-1 bg-stone-900 rounded border border-stone-800">
                    FB: PLACEHOLDER
                  </span>
                  <span className="px-2 py-1 bg-stone-900 rounded border border-stone-800">
                    YT: PLACEHOLDER
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Bar: Copyright & Language */}
        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} {t('جامعۃ العلوم الاسلامیہ میرپور آزاد کشمیر۔ جملہ حقوق محفوظ ہیں۔', 'Jamia Tul Uloom Al-Islamia, Mirpur AJK. All rights reserved.')}
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => handleLinkClick('documents')}
              className="hover:text-stone-300 transition-colors flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t('دستاویزات', 'Documents')}</span>
            </button>
            <span className="text-stone-700">|</span>
            <button
              onClick={() => handleLinkClick('contact')}
              className="hover:text-stone-300 transition-colors"
            >
              {t('رابطہ کیجیے', 'Contact Us')}
            </button>
            <span className="text-stone-700">|</span>
            <button
              onClick={() => setLanguage(language === 'ur' ? 'en' : 'ur')}
              className="text-amber-400 hover:text-amber-300 font-medium"
            >
              {language === 'ur' ? 'Switch to English' : 'اردو میں دیکھیں'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
