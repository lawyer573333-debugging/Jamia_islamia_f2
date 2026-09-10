import React, { useState } from 'react';
import { FileText, Download, AlertCircle, FileCheck, CheckCircle2, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { documentsData } from '../../data/documents';
import { VerificationBadge } from '../VerificationBadge';
import { DocumentItem } from '../../types';

interface DocumentsViewProps {
  onNavigate: (viewId: string) => void;
}

export const DocumentsView: React.FC<DocumentsViewProps> = ({ onNavigate }) => {
  const { language, isRtl, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeDownloadModal, setActiveDownloadModal] = useState<DocumentItem | null>(null);

  const categories = [
    { id: 'all', ur: 'تمام دستاویزات', en: 'All Documents' },
    { id: 'admission', ur: 'داخلہ فارمز', en: 'Admission Forms' },
    { id: 'prospectus', ur: 'پراسپیکٹس و تعارف', en: 'Prospectus' },
    { id: 'academic', ur: 'تعلیمی نصاب و کیلنڈر', en: 'Academic & Calendar' },
  ];

  const filteredDocs = selectedCategory === 'all'
    ? documentsData
    : documentsData.filter((d) => d.category === selectedCategory);

  const handleDownloadClick = (doc: DocumentItem) => {
    setActiveDownloadModal(doc);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-10">
      {/* 1. Header */}
      <div className="border-b border-stone-200 pb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
          <button onClick={() => onNavigate('home')} className="hover:text-emerald-800">
            {t('ہوم', 'Home')}
          </button>
          <span>/</span>
          <span className="text-emerald-800 font-semibold">{t('دستاویزات و فارمز', 'Documents & Downloads')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">
          {t('دستاویزات، داخلہ فارمز و قواعد نامہ', 'Official Documents & Forms Repository')}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-3xl">
          {t(
            'جامعۃ العلوم الاسلامیہ میرپور کے باضابطہ داخلہ فارمز، تعلیمی قواعد و ضوابط، ہاسٹل پالیسی اور امتحانی شیڈول ڈاؤنلوڈ کریں۔',
            'Download certified admission applications, code of conduct, hostel policy manuals, and examination schedules.'
          )}
        </p>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {t(cat.ur, cat.en)}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Controlled Document Notice */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-xs sm:text-sm text-amber-950 flex items-start gap-3 shadow-2xs">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {t(
            'ہدایت برائے طلبہ و سرپرست حضرات: سرکاری پی ڈی ایف دستاویزات اور باضابطہ مہر والے فارمز انتظامیہ کی باضابطہ توثیق کے بعد یہاں دستیاب ہوں گے۔ موجودہ لنکس تکنیکی پلیس ہولڈرز ہیں جن کی فائل کے راستے CONTENT_SETUP_GUIDE.md میں درج ہیں۔',
            'Guidance: Certified PDF forms and stamped rulebooks will be hosted here upon official administrative approval. The download buttons demonstrate workflow and indicate exact destination folders.'
          )}
        </p>
      </div>

      {/* 3. Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <VerificationBadge status={doc.status} />
              </div>

              <h3 className="text-lg font-bold text-stone-900">
                {t(doc.title.ur, doc.title.en)}
              </h3>

              <div className="text-xs font-bold text-emerald-800 bg-emerald-50 inline-block px-2 py-0.5 rounded border border-emerald-200">
                {t(doc.categoryLabel.ur, doc.categoryLabel.en)}
              </div>

              <div className="pt-2 text-xs text-stone-500 space-y-1 font-mono">
                <p>
                  <span className="font-sans font-semibold text-stone-700">{t('فائل کی قسم:', 'Format:')}</span>{' '}
                  {doc.fileFormat}
                </p>
                <p>
                  <span className="font-sans font-semibold text-stone-700">{t('فائل کا پتہ:', 'Path:')}</span>{' '}
                  <span className="truncate block max-w-full text-stone-600">{doc.filePath}</span>
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <button
                onClick={() => handleDownloadClick(doc)}
                className="w-full py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t('فارم ڈاؤنلوڈ کریں', 'Download Form')}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Download Modal for Controlled Placeholder System */}
      {activeDownloadModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200">
            <div className="p-4 bg-emerald-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                  {t('دستاویز کی فراہمی کا اسٹیٹس', 'Document Status Notice')}
                </span>
              </div>
              <button
                onClick={() => setActiveDownloadModal(null)}
                className="p-1 rounded-lg hover:bg-emerald-900 text-stone-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 mx-auto flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>

              <div className="text-center space-y-1">
                <h3 className="font-bold text-stone-900 text-lg">
                  {t(activeDownloadModal.title.ur, activeDownloadModal.title.en)}
                </h3>
                <p className="text-xs text-amber-800 font-medium">
                  {t(
                    'یہ دستاویز جامعہ کی انتظامی تصدیق کے بعد اپلوڈ کی جائے گی۔',
                    'This document will be uploaded upon official administrative verification.'
                  )}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed text-center">
                {t(
                  'اگر آپ کو فوری طور پر یہ فارم درکار ہے، تو براہِ کرم جامعۃ العلوم الاسلامیہ کے دفتری نمبر 0306-5042031 پر رابطہ فرمائیں یا جامعہ کے دفترِ تعلیمات (سیکٹر ایف-2 میرپور) تشریف لائیں۔',
                  'If you urgently require this document, please contact the Jamia administration desk at 0306-5042031 or visit the Academic Office at Sector F-2, Mirpur AJK.'
                )}
              </p>

              {/* Maintenance Guide Details */}
              <div className="p-4 rounded-xl bg-stone-100 border border-stone-200 text-xs space-y-1 font-mono text-stone-700">
                <p className="font-sans font-bold text-stone-900 mb-1">
                  {t('فائل کا تکنیکی پتہ (File Target):', 'Technical Target Path:')}
                </p>
                <p className="text-emerald-900">
                  {activeDownloadModal.filePath}
                </p>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
              <button
                onClick={() => {
                  setActiveDownloadModal(null);
                  onNavigate('contact');
                }}
                className="text-xs text-emerald-800 font-bold hover:underline"
              >
                {t('جامعہ سے رابطہ کریں', 'Contact Jamia Office')}
              </button>

              <button
                onClick={() => setActiveDownloadModal(null)}
                className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold transition-colors"
              >
                {t('سمجھ گیا / بند کریں', 'Understood')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
