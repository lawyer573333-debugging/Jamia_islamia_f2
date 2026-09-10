import React from 'react';
import { BookOpen, FolderCheck, Image, FileText, CheckCircle2, ShieldAlert, Database, ArrowLeft, ArrowRight, Phone } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { VerificationBadge } from '../VerificationBadge';

interface SetupGuideViewProps {
  onNavigate: (viewId: string) => void;
}

export const SetupGuideView: React.FC<SetupGuideViewProps> = ({ onNavigate }) => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-12">
      {/* 1. Header */}
      <div className="border-b border-stone-200 pb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
          <button onClick={() => onNavigate('home')} className="hover:text-emerald-800">
            {t('ہوم', 'Home')}
          </button>
          <span>/</span>
          <span className="text-emerald-800 font-semibold">{t('گائیڈ برائے انتظامیہ', 'Setup & Admin Guide')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">
          {t('جامعۃ العلوم الاسلامیہ ویب پورٹل - رہنمائے انتظامیہ و دیکھ بھال', 'Institution Web Portal - Maintenance & Content Setup Guide')}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-3xl">
          {t(
            'یہ صفحہ جامعہ کی انتظامیہ، میڈیا ٹیم اور ویب ڈویلپرز کے لیے ہے تاکہ تصاویر کی تبدیلی، مستند ڈیٹا کی شمولیت اور ویب سائٹ کو اپڈیٹ رکھنے کا طریقہ سمجھا جا سکے۔',
            'Practical guide for Jamia administrators, media desk, and web maintainers detailing asset replacement paths, data file configurations, and verification management.'
          )}
        </p>
      </div>

      {/* 2. Key Architecture Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-stone-900 text-lg">
            {t('مرکزی ڈیٹا فائلز (Central Data)', 'Centralized Data Files')}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {t(
              'تمام تحریری متن، نام، فون اور اعلانات src/data/ میں خالص فائلز میں رکھے گئے ہیں۔ کسی کوڈنگ کی ضرورت نہیں، صرف ڈیٹا فائل بدلیں۔',
              'All text, leadership names, phone numbers, and notices live inside clean TypeScript files in src/data/ for effortless non-technical editing.'
            )}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center">
            <Image className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-stone-900 text-lg">
            {t('کنٹرولڈ میڈیا پلیس ہولڈرز', 'Controlled Media System')}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {t(
              'کوئی ٹوٹی ہوئی تصویر نظر نہیں آئے گی۔ ہر خانے پر مخصوص فائل پاتھ اور سائز لکھا ہے، اصلی تصویر فولڈر میں ڈالتے ہی خود بخود ظاہر ہو جائے گی۔',
              'Zero broken images. Every slot displays its exact suggested path and aspect ratio. Dropping the actual photo automatically renders it.'
            )}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-stone-900 text-lg">
            {t('دیانت و شفافیت (Verification)', 'Verification Transparency')}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {t(
              'غیر مصدقہ یا فرضی معلومات پر واضح بیج اور نوٹس لگایا گیا ہے۔ تصدیق کے بعد status کو "verified" کر کے بیج ہٹایا جا سکتا ہے۔',
              'Placeholder and unconfirmed data are marked with visible badges to maintain institutional integrity until administrative approval.'
            )}
          </p>
        </div>
      </div>

      {/* 3. Image File Structure Reference Table */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs space-y-4 p-6">
        <div>
          <h3 className="text-xl font-bold text-stone-900">
            {t('تصاویر کے مجوزہ فولڈرز اور ڈائمینشنز', 'Recommended Image Paths & Dimensions in public/')}
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {t('نیچے دیے گئے فولڈرز میں مطلوبہ تصاویر رکھیں اور ڈیٹا فائل میں نام درج فرمائیں:', 'Place high-resolution photos into these directories in the public/ root:')}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-start">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold">
              <tr>
                <th className="p-3 text-start">{t('شعبہ / تصویر', 'Category / Subject')}</th>
                <th className="p-3 text-start">{t('فائل کا راستہ (File Path in public/)', 'Target File Path')}</th>
                <th className="p-3 text-start">{t('تجویز کردہ سائز', 'Recommended Resolution')}</th>
                <th className="p-3 text-start">{t('مربوط ڈیٹا فائل', 'Associated Data File')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-mono text-xs">
              <tr className="hover:bg-stone-50">
                <td className="p-3 font-sans font-medium text-stone-900">{t('مرکزی بینر (Hero Banner)', 'Main Hero Banner')}</td>
                <td className="p-3 text-emerald-800">public/images/hero/main-campus.jpg</td>
                <td className="p-3 text-stone-600">1920x1080 px (16:9)</td>
                <td className="p-3 text-stone-500 font-sans">src/data/siteContent.ts</td>
              </tr>
              <tr className="hover:bg-stone-50">
                <td className="p-3 font-sans font-medium text-stone-900">{t('جامعہ عمارت (Exterior)', 'Campus Exterior')}</td>
                <td className="p-3 text-emerald-800">public/images/campus/exterior.jpg</td>
                <td className="p-3 text-stone-600">1200x800 px (3:2)</td>
                <td className="p-3 text-stone-500 font-sans">src/data/siteContent.ts</td>
              </tr>
              <tr className="hover:bg-stone-50">
                <td className="p-3 font-sans font-medium text-stone-900">{t('درسِ نظامی کلاس روم', 'Dars-e-Nizami Class')}</td>
                <td className="p-3 text-emerald-800">public/images/departments/dars-e-nizami.jpg</td>
                <td className="p-3 text-stone-600">1200x800 px (3:2)</td>
                <td className="p-3 text-stone-500 font-sans">src/data/departments.ts</td>
              </tr>
              <tr className="hover:bg-stone-50">
                <td className="p-3 font-sans font-medium text-stone-900">{t('شعبۂ تحفیظ القرآن', 'Tahfeez-ul-Quran Circle')}</td>
                <td className="p-3 text-emerald-800">public/images/departments/hifz.jpg</td>
                <td className="p-3 text-stone-600">1200x800 px (3:2)</td>
                <td className="p-3 text-stone-500 font-sans">src/data/departments.ts</td>
              </tr>
              <tr className="hover:bg-stone-50">
                <td className="p-3 font-sans font-medium text-stone-900">{t('عصری اسکول و کالج کلاس', 'Contemporary Classroom')}</td>
                <td className="p-3 text-emerald-800">public/images/departments/contemporary.jpg</td>
                <td className="p-3 text-stone-600">1200x800 px (3:2)</td>
                <td className="p-3 text-stone-500 font-sans">src/data/departments.ts</td>
              </tr>
              <tr className="hover:bg-stone-50">
                <td className="p-3 font-sans font-medium text-stone-900">{t('کمپیوٹر لیب', 'Computer Laboratory')}</td>
                <td className="p-3 text-emerald-800">public/images/departments/computer-lab.jpg</td>
                <td className="p-3 text-stone-600">1200x800 px (3:2)</td>
                <td className="p-3 text-stone-500 font-sans">src/data/departments.ts</td>
              </tr>
              <tr className="hover:bg-stone-50">
                <td className="p-3 font-sans font-medium text-stone-900">{t('تصویرِ مہتمم صاحب', 'Muhtamim Portrait')}</td>
                <td className="p-3 text-emerald-800">public/images/leadership/muhtamim.jpg</td>
                <td className="p-3 text-stone-600">600x750 px (4:5)</td>
                <td className="p-3 text-stone-500 font-sans">src/data/faculty.ts</td>
              </tr>
              <tr className="hover:bg-stone-50">
                <td className="p-3 font-sans font-medium text-stone-900">{t('تصویرِ ناظمِ اعلیٰ صاحب', 'Nazim-e-Aala Portrait')}</td>
                <td className="p-3 text-emerald-800">public/images/leadership/nazim-e-aala.jpg</td>
                <td className="p-3 text-stone-600">600x750 px (4:5)</td>
                <td className="p-3 text-stone-500 font-sans">src/data/faculty.ts</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Quick Actions */}
      <div className="rounded-2xl bg-stone-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white">
            {t('مکمل تفصیلی گائیڈ فائل ملاحظہ فرمائیں', 'Full CONTENT_SETUP_GUIDE.md File in Workspace')}
          </h3>
          <p className="text-xs sm:text-sm text-stone-300">
            {t(
              'پروجیکٹ کی مین ڈائریکٹری میں CONTENT_SETUP_GUIDE.md فائل موجود ہے جس میں ہر ایک فائل کی مرحلہ وار رہنمائی درج ہے۔',
              'The complete technical markdown file is stored at the root of the codebase.'
            )}
          </p>
        </div>

        <button
          onClick={() => onNavigate('home')}
          className="px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shrink-0 transition-colors flex items-center gap-2"
        >
          <span>{t('مرکزی صفحہ پر جائیں', 'Return to Homepage')}</span>
          <ArrowIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
