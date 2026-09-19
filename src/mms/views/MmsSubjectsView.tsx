import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Search,
  Plus,
  Eye,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  BookmarkCheck,
  X,
  Layers,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { phase3Service } from '../services/phase3DataService';
import { DbSubject, SubjectCategory, SubjectStatus } from '../types';

interface MmsSubjectsViewProps {
  onNavigateMms: (route: string) => void;
}

export const MmsSubjectsView: React.FC<MmsSubjectsViewProps> = ({ onNavigateMms }) => {
  const { t } = useLanguage();

  const [subjects, setSubjects] = useState<DbSubject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Modals
  const [selectedSubject, setSelectedSubject] = useState<DbSubject | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<DbSubject | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    category: 'dars_e_nizami' as SubjectCategory,
    description: '',
    status: 'active' as SubjectStatus,
  });

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await phase3Service.getSubjects({
        search: searchTerm,
        category: categoryFilter,
      });
      setSubjects(data);
    } catch (err) {
      console.error(err);
      setFeedback({ type: 'error', message: t('مضامین لوڈ کرنے میں خرابی ہوئی۔', 'Failed to load subjects.') });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [searchTerm, categoryFilter]);

  const handleOpenAdd = () => {
    setEditingSubject(null);
    setFormData({
      name: '',
      code: `SUB-${String(subjects.length + 1).padStart(3, '0')}`,
      category: 'dars_nizami',
      description: '',
      status: 'active',
    });
    setFeedback(null);
    setIsAddEditModalOpen(true);
  };

  const handleOpenEdit = (sub: DbSubject) => {
    setEditingSubject(sub);
    setFormData({
      name: sub.name,
      code: sub.code,
      category: sub.category,
      description: sub.description || '',
      status: sub.status,
    });
    setFeedback(null);
    setIsAddEditModalOpen(true);
  };

  const handleOpenView = (sub: DbSubject) => {
    setSelectedSubject(sub);
    setIsViewModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      if (editingSubject) {
        const res = await phase3Service.updateSubject(editingSubject.id, formData);
        if (res.success) {
          setFeedback({ type: 'success', message: t('مضمون کی تفصیلات تبدیل ہو گئیں۔', 'Subject updated successfully.') });
          setIsAddEditModalOpen(false);
          await loadData();
        } else {
          setFeedback({ type: 'error', message: res.error || 'Failed' });
        }
      } else {
        const res = await phase3Service.createSubject(formData);
        if (res.success) {
          setFeedback({ type: 'success', message: t('نیا مضمون کامیابی سے درج ہو گیا۔', 'Subject added successfully.') });
          setIsAddEditModalOpen(false);
          await loadData();
        } else {
          setFeedback({ type: 'error', message: res.error || 'Failed' });
        }
      }
    } catch (err: unknown) {
      setFeedback({ type: 'error', message: err instanceof Error ? err.message : 'Error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (sub: DbSubject) => {
    if (!window.confirm(t(`کیا آپ مضمون "${sub.name}" کو حذف کرنا چاہتے ہیں؟`, `Delete subject "${sub.name}"?`))) {
      return;
    }

    try {
      const res = await phase3Service.deleteSubject(sub.id);
      if (res.success) {
        setFeedback({ type: 'success', message: t('مضمون حذف کر دیا گیا۔', 'Subject deleted.') });
        await loadData();
      } else {
        setFeedback({ type: 'error', message: res.error || 'Failed' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getCategoryBadge = (cat: SubjectCategory) => {
    switch (cat) {
      case 'quran':
        return { label: t('قرآن و تجوید', 'Quran & Tajweed'), color: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
      case 'dars_nizami':
        return { label: t('درسِ نظامی', 'Dars-e-Nizami'), color: 'bg-amber-100 text-amber-900 border-amber-200' };
      case 'contemporary':
        return { label: t('معاصر علوم / اسکول', 'Contemporary'), color: 'bg-blue-100 text-blue-800 border-blue-200' };
      default:
        return { label: t('عمومی نصاب', 'General'), color: 'bg-stone-100 text-stone-700 border-stone-200' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 font-h2">
              {t('مضامین و درسی نصاب ڈائرکٹری', 'Curriculum & Subjects Directory')}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              {t('فیز ۳ — بنیاد', 'Phase 3')}
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            {t(
              'قرآن کریم، کتبِ درسِ نظامی اور عصری مضامین (انگریزی، ریاضی، کمپیوٹر) کی باضابطہ درجہ بندی۔',
              'Comprehensive subject catalog across Quranic studies, Dars-e-Nizami Islamic syllabus, and contemporary sciences.'
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateMms('mms_class_subjects')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition-colors"
          >
            <BookmarkCheck className="w-4 h-4 text-emerald-800" />
            <span>{t('کلاس تفویض', 'Assign to Class')}</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>{t('نیا مضمون شامل کریں', 'Add Subject')}</span>
          </button>
        </div>
      </div>

      {/* Feedback */}
      {feedback && (
        <div
          className={`p-3.5 rounded-xl border text-xs flex items-center justify-between gap-2 ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-stone-400 hover:text-stone-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-stone-400 absolute start-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('مضمون کے نام یا کوڈ سے تلاش کریں...', 'Search by subject name or code...')}
              className="w-full ps-9 pe-4 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all"
            >
              <option value="all">{t('تمام زمرہ جات (All Categories)', 'All Categories')}</option>
              <option value="quran">{t('قرآن و تجوید (Quran & Tajweed)', 'Quran')}</option>
              <option value="dars_nizami">{t('درسِ نظامی (Dars-e-Nizami)', 'Dars-e-Nizami')}</option>
              <option value="contemporary">{t('عصری و جدید تعلیم (Contemporary)', 'Contemporary')}</option>
              <option value="general">{t('عمومی (General)', 'General')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Subjects Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-stone-500 text-xs">
            <div className="w-8 h-8 border-2 border-emerald-800 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <span>{t('مضامین کا ریکارڈ لوڈ ہو رہا ہے...', 'Loading subjects...')}</span>
          </div>
        ) : subjects.length === 0 ? (
          <div className="p-12 text-center text-stone-500">
            <BookOpen className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <p className="font-semibold text-sm text-stone-700">{t('کوئی مضمون نہیں ملا', 'No subjects found')}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead className="bg-stone-50 text-stone-600 border-b border-stone-200 uppercase font-semibold tracking-wider text-[11px]">
                <tr>
                  <th className="px-4 py-3 text-start">{t('کوڈ', 'Code')}</th>
                  <th className="px-4 py-3 text-start">{t('نام کتاب / مضمون', 'Subject / Book Title')}</th>
                  <th className="px-4 py-3 text-start">{t('شعبہ و زمرہ', 'Category')}</th>
                  <th className="px-4 py-3 text-start">{t('وضاحت', 'Description')}</th>
                  <th className="px-4 py-3 text-start">{t('اسٹیٹس', 'Status')}</th>
                  <th className="px-4 py-3 text-end">{t('اقدامات', 'Actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {subjects.map((sub) => {
                  const badge = getCategoryBadge(sub.category);
                  return (
                    <tr key={sub.id} className="hover:bg-stone-50/70 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-emerald-800">{sub.code}</td>
                      <td className="px-4 py-3 font-bold text-stone-900">{sub.name}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${badge.color}`}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-stone-500 max-w-xs truncate">
                        {sub.description || '—'}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            sub.status === 'active'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : 'bg-stone-100 text-stone-700 border border-stone-200'
                          }`}
                        >
                          {sub.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-end">
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => handleOpenView(sub)}
                            title={t('تفصیلات دیکھیں', 'View details')}
                            className="p-1.5 rounded-lg text-stone-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(sub)}
                            title={t('ترمیم کریں', 'Edit')}
                            className="p-1.5 rounded-lg text-stone-500 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(sub)}
                            title={t('حذف کریں', 'Delete')}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ==================================================================== */}
      {/* 1. Add / Edit Modal */}
      {/* ==================================================================== */}
      {isAddEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-stone-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
              <h2 className="text-base font-bold text-stone-900 font-h2 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-800" />
                <span>
                  {editingSubject
                    ? t('مضمون کی تفصیلات میں ترمیم', 'Edit Subject')
                    : t('نیا مضمون / کتاب کا اندراج', 'Add New Subject')}
                </span>
              </h2>
              <button
                onClick={() => setIsAddEditModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {t('مضمون کوڈ (Subject Code) *', 'Subject Code *')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl font-mono font-bold text-emerald-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {t('شعبہ / زمرہ (Category) *', 'Category *')}
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as SubjectCategory })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  >
                    <option value="quran">{t('قرآن و تجوید', 'Quran & Tajweed')}</option>
                    <option value="dars_nizami">{t('درسِ نظامی', 'Dars-e-Nizami')}</option>
                    <option value="contemporary">{t('عصری و جدید تعلیم', 'Contemporary')}</option>
                    <option value="general">{t('عمومی', 'General')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {t('نام کتاب / مضمون (Subject / Book Name) *', 'Subject Name *')}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. مشکوٰۃ المصابیح (حدیث شریف)"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {t('اسٹیٹس (Status)', 'Status')}
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as SubjectStatus })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="active">{t('فعال (Active)', 'Active')}</option>
                  <option value="inactive">{t('غیر فعال (Inactive)', 'Inactive')}</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {t('نصاب و کتب کی تفصیل (Description / Syllabus)', 'Description')}
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder={t('مضمون کا نصابی خاکہ، تدریسی مقاصد یا مؤلف کا نام درج کریں...', 'Enter syllabus outlines or author details...')}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsAddEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100"
                >
                  {t('منسوخ', 'Cancel')}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-800 hover:bg-emerald-900 text-white transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? t('محفوظ ہو رہا ہے...', 'Saving...') : t('محفوظ کریں', 'Save Subject')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 2. View Modal */}
      {/* ==================================================================== */}
      {isViewModalOpen && selectedSubject && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-stone-200 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <h2 className="text-lg font-bold text-stone-900 font-h2">{selectedSubject.name}</h2>
                <span className="font-mono text-xs font-bold text-emerald-800">{selectedSubject.code}</span>
              </div>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2 text-xs">
              <div>
                <span className="text-stone-400 font-medium">{t('زمرہ:', 'Category:')} </span>
                <span className="font-bold text-stone-800">{selectedSubject.category}</span>
              </div>
              <div>
                <span className="text-stone-400 font-medium">{t('اسٹیٹس:', 'Status:')} </span>
                <span className="font-bold uppercase text-emerald-800">{selectedSubject.status}</span>
              </div>
              <div>
                <span className="text-stone-400 font-medium">{t('وضاحت:', 'Description:')} </span>
                <p className="text-stone-700 mt-1">{selectedSubject.description || t('کوئی تفصیل موجود نہیں', 'No description')}</p>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-stone-200">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-stone-800 text-white hover:bg-stone-900"
              >
                {t('بند کریں', 'Close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
