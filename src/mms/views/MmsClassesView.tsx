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
  Users,
  GraduationCap,
  BookmarkCheck,
  Calendar,
  X,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useMmsAuth } from '../context/MmsAuthContext';
import { phase3Service } from '../services/phase3DataService';
import { DbClass, ClassWithDetails, DbTeacher, ClassStatus } from '../types';

interface MmsClassesViewProps {
  onNavigateMms: (route: string) => void;
}

export const MmsClassesView: React.FC<MmsClassesViewProps> = ({ onNavigateMms }) => {
  const { t } = useLanguage();
  const { institutionalPosition, canManageAcademics, assignedDomain } = useMmsAuth();
  const isMuhtamim = institutionalPosition === 'muhtamim';

  const [classes, setClasses] = useState<ClassWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState<string>('all');

  // Modals
  const [selectedClass, setSelectedClass] = useState<ClassWithDetails | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<DbClass | null>(null);
  const [availableTeachers, setAvailableTeachers] = useState<DbTeacher[]>([]);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    academic_year: '1446-1447 / 2025-2026',
    section: 'الف (Section A)',
    capacity: 35,
    teacher_id: '',
    status: 'active' as ClassStatus,
    description: '',
  });

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [classesData, teachersData] = await Promise.all([
        phase3Service.getClasses({ search: searchTerm, academic_year: yearFilter }),
        phase3Service.getTeachers(),
      ]);
      setClasses(classesData);
      setAvailableTeachers(teachersData);
    } catch (err) {
      console.error(err);
      setFeedback({ type: 'error', message: t('کلاسز لوڈ کرنے میں خرابی ہوئی۔', 'Failed to load classes.') });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [searchTerm, yearFilter]);

  const handleOpenAdd = () => {
    setEditingClass(null);
    setFormData({
      name: '',
      code: `CLS-${String(classes.length + 1).padStart(2, '0')}`,
      academic_year: '1446-1447 / 2025-2026',
      section: 'الف (Section A)',
      capacity: 35,
      teacher_id: availableTeachers[0]?.id || '',
      status: 'active',
      description: '',
    });
    setFeedback(null);
    setIsAddEditModalOpen(true);
  };

  const handleOpenEdit = (cls: DbClass) => {
    setEditingClass(cls);
    setFormData({
      name: cls.name,
      code: cls.code,
      academic_year: cls.academic_year,
      section: cls.section || '',
      capacity: cls.capacity,
      teacher_id: cls.teacher_id || '',
      status: cls.status,
      description: cls.description || '',
    });
    setFeedback(null);
    setIsAddEditModalOpen(true);
  };

  const handleOpenView = (cls: ClassWithDetails) => {
    setSelectedClass(cls);
    setIsViewModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const payload = {
        ...formData,
        teacher_id: formData.teacher_id ? formData.teacher_id : null,
      };

      if (editingClass) {
        const res = await phase3Service.updateClass(editingClass.id, payload);
        if (res.success) {
          setFeedback({ type: 'success', message: t('کلاس کی معلومات تبدیل ہو گئیں۔', 'Class updated successfully.') });
          setIsAddEditModalOpen(false);
          await loadData();
        } else {
          setFeedback({ type: 'error', message: res.error || 'Failed' });
        }
      } else {
        const res = await phase3Service.createClass(payload);
        if (res.success) {
          setFeedback({ type: 'success', message: t('نئی کلاس کا اندراج ہو گیا۔', 'Class added successfully.') });
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

  const handleDelete = async (cls: ClassWithDetails) => {
    if (cls.enrolledStudents && cls.enrolledStudents.length > 0) {
      alert(
        t(
          `اس کلاس میں ${cls.enrolledStudents.length} طلباء زیرِ تعلیم ہیں۔ کلاس ختم کرنے سے پہلے ان کا تبادلہ کریں۔`,
          `This class currently has ${cls.enrolledStudents.length} enrolled students. Transfer or unenroll them first.`
        )
      );
      return;
    }

    if (!window.confirm(t(`کیا آپ کلاس "${cls.name}" کو حذف کرنا چاہتے ہیں؟`, `Delete class "${cls.name}"?`))) {
      return;
    }

    try {
      const res = await phase3Service.deleteClass(cls.id);
      if (res.success) {
        setFeedback({ type: 'success', message: t('کلاس حذف کر دی گئی۔', 'Class deleted.') });
        await loadData();
      } else {
        setFeedback({ type: 'error', message: res.error || 'Failed' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 font-h2">
              {t('کلاسز، درجات و تعلیمی شعبہ جات', 'Classes & Academic Levels')}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              {t('فیز ۳ — بنیاد', 'Phase 3')}
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            {t(
              'حفظ، ناظرہ، درس نظامی اور معاصر تعلیمی کلاسز، نگران اساتذہ اور گنجائش کا باضابطہ ریکارڈ۔',
              'Class management, designated classroom teachers, seating capacities, and student allocations.'
            )}
          </p>
        </div>

        {canManageAcademics ? (
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>{t('نئی کلاس تشکیل دیں', 'Add New Class')}</span>
          </button>
        ) : isMuhtamim ? (
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold shadow-2xs">
            <Eye className="w-4 h-4 text-amber-700" />
            <span>{t('نگرانی و معائنہ — صرف مطالعہ (Read-Only)', 'Institutional Oversight — Read-Only Inspection')}</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold">
            <BookOpen className="w-4 h-4 text-stone-500" />
            <span>{t(`دائرہ کار: ${assignedDomain || 'غیر تعلیمی'} (صرف معائنہ)`, `Scope: ${assignedDomain || 'Non-academic'} (Inspection Only)`)}</span>
          </div>
        )}
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
              placeholder={t('کلاس کے نام یا کوڈ سے تلاش کریں...', 'Search by class name or code...')}
              className="w-full ps-9 pe-4 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all"
            >
              <option value="all">{t('تمام تعلیمی سال (All Years)', 'All Academic Years')}</option>
              <option value="1446-1447 / 2025-2026">1446-1447 / 2025-2026</option>
              <option value="1445-1446 / 2024-2025">1445-1446 / 2024-2025</option>
            </select>
          </div>
        </div>
      </div>

      {/* Classes Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-stone-500 text-xs">
            <div className="w-8 h-8 border-2 border-emerald-800 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <span>{t('کلاسز کا ڈیٹا لوڈ ہو رہا ہے...', 'Loading classes...')}</span>
          </div>
        ) : classes.length === 0 ? (
          <div className="p-12 text-center text-stone-500">
            <BookOpen className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <p className="font-semibold text-sm text-stone-700">{t('کوئی کلاس نہیں ملی', 'No classes found')}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead className="bg-stone-50 text-stone-600 border-b border-stone-200 uppercase font-semibold tracking-wider text-[11px]">
                <tr>
                  <th className="px-4 py-3 text-start">{t('کوڈ', 'Code')}</th>
                  <th className="px-4 py-3 text-start">{t('کلاس / درجہ', 'Class Name')}</th>
                  <th className="px-4 py-3 text-start">{t('نگران استاذ (Class Teacher)', 'Teacher In-Charge')}</th>
                  <th className="px-4 py-3 text-start">{t('طلباء تعداد / گنجائش', 'Students / Capacity')}</th>
                  <th className="px-4 py-3 text-start">{t('مضامین', 'Subjects')}</th>
                  <th className="px-4 py-3 text-start">{t('اسٹیٹس', 'Status')}</th>
                  <th className="px-4 py-3 text-end">{canManageAcademics ? t('اقدامات', 'Actions') : t('معائنہ', 'Inspection')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {classes.map((cls) => {
                  const studentCount = cls.enrolledStudents?.length || 0;
                  const subjectCount = cls.subjects?.length || 0;
                  return (
                    <tr key={cls.id} className="hover:bg-stone-50/70 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-emerald-800">{cls.code}</td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-stone-900">{cls.name}</div>
                        <div className="text-[11px] text-stone-400">
                          {cls.section} • {cls.academic_year}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {cls.teacher ? (
                          <div className="flex items-center gap-1.5 text-stone-800">
                            <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
                            <span className="font-medium">{cls.teacher.full_name}</span>
                          </div>
                        ) : (
                          <span className="text-stone-400 italic text-[11px]">
                            {t('کوئی استاذ تفویض نہیں', 'Not assigned')}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-800 font-mono">
                            {studentCount} / {cls.capacity}
                          </span>
                          <div className="w-16 bg-stone-100 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-full ${
                                studentCount >= cls.capacity ? 'bg-rose-500' : 'bg-emerald-600'
                              }`}
                              style={{ width: `${Math.min(100, (studentCount / cls.capacity) * 100)}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => onNavigateMms('mms_class_subjects')}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium text-[11px] transition-colors"
                          title={t('مضامین دیکھیں / تفویض کریں', 'View/Assign Subjects')}
                        >
                          <BookmarkCheck className="w-3 h-3 text-emerald-700" />
                          <span>{subjectCount} {t('مضامین', 'Subjects')}</span>
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            cls.status === 'active'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : 'bg-stone-100 text-stone-700 border border-stone-200'
                          }`}
                        >
                          {cls.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-end">
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => handleOpenView(cls)}
                            title={t('تفصیلات دیکھیں', 'View details')}
                            className="p-1.5 rounded-lg text-stone-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {canManageAcademics && (
                            <>
                              <button
                                onClick={() => handleOpenEdit(cls)}
                                title={t('ترمیم کریں', 'Edit')}
                                className="p-1.5 rounded-lg text-stone-500 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(cls)}
                                title={t('حذف کریں', 'Delete')}
                                className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
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
                  {editingClass
                    ? t('کلاس کی معلومات میں ترمیم', 'Edit Class Details')
                    : t('نئی کلاس کا اندراج', 'Add New Class')}
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
                    {t('کلاس کوڈ (Class Code) *', 'Class Code *')}
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
                    {t('تعلیمی سال (Academic Year) *', 'Academic Year *')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.academic_year}
                    onChange={(e) => setFormData({ ...formData, academic_year: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {t('کلاس کا نام (Class Name) *', 'Class Name *')}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. درجہ اولیٰ (درس نظامی)"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {t('سیکشن (Section)', 'Section')}
                  </label>
                  <input
                    type="text"
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    placeholder="الف / ب / ج"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {t('طلباء کی زیادہ سے زیادہ گنجائش (Capacity) *', 'Max Student Capacity *')}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    required
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 30 })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {t('نگران استاذ (Designated Class Teacher)', 'Class Teacher')}
                </label>
                <select
                  value={formData.teacher_id}
                  onChange={(e) => setFormData({ ...formData, teacher_id: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="">{t('-- کوئی نگران مقرر نہیں --', '-- No teacher assigned --')}</option>
                  {availableTeachers.map((tch) => (
                    <option key={tch.id} value={tch.id}>
                      {tch.full_name} ({tch.employee_number})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {t('اسٹیٹس (Status)', 'Status')}
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as ClassStatus })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="active">{t('فعال (Active)', 'Active')}</option>
                  <option value="archived">{t('محفوظ شدہ (Archived)', 'Archived')}</option>
                  <option value="completed">{t('مکمل شدہ (Completed)', 'Completed')}</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {t('تفصیل و نوٹس (Description)', 'Description')}
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                  {isSubmitting ? t('محفوظ ہو رہا ہے...', 'Saving...') : t('محفوظ کریں', 'Save Class')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 2. View Class Details Modal */}
      {/* ==================================================================== */}
      {isViewModalOpen && selectedClass && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 border border-stone-200 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-stone-900 font-h2">{selectedClass.name}</h2>
                  <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800">
                    {selectedClass.code}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  {selectedClass.section} • {selectedClass.academic_year}
                </p>
              </div>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* In-Charge Teacher Banner */}
            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-amber-700" />
                <div>
                  <span className="font-semibold text-amber-900">{t('نگران استاذ:', 'Class Teacher:')} </span>
                  <span className="font-bold text-stone-800">
                    {selectedClass.teacher ? selectedClass.teacher.full_name : t('مقرر نہیں', 'None')}
                  </span>
                </div>
              </div>
              {selectedClass.teacher && (
                <span className="font-mono text-stone-500">{selectedClass.teacher.phone}</span>
              )}
            </div>

            {/* Enrolled Students */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-emerald-800" />
                  <span>
                    {t('زیرِ تعلیم طلباء', 'Enrolled Students')} ({selectedClass.enrolledStudents?.length || 0})
                  </span>
                </h3>
                <button
                  onClick={() => onNavigateMms('mms_enrollments')}
                  className="text-xs text-emerald-800 hover:underline font-bold"
                >
                  {t('طلباء داخلہ فہرست', 'Enrollment Manager')}
                </button>
              </div>

              {selectedClass.enrolledStudents && selectedClass.enrolledStudents.length > 0 ? (
                <div className="max-h-48 overflow-y-auto border border-stone-200 rounded-xl divide-y divide-stone-100 text-xs">
                  {selectedClass.enrolledStudents.map((enr) => (
                    <div key={enr.id} className="p-2.5 flex items-center justify-between bg-white">
                      <div>
                        <span className="font-bold text-stone-900">
                          {enr.student.first_name} {enr.student.last_name}
                        </span>
                        <span className="ms-2 font-mono text-[11px] text-emerald-800">
                          ({enr.student.admission_number})
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-semibold uppercase">
                        {enr.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-stone-400 italic p-3 bg-stone-50 rounded-xl">
                  {t('اس کلاس میں ابھی کوئی طالب علم داخل نہیں ہے۔', 'No students enrolled yet.')}
                </p>
              )}
            </div>

            {/* Assigned Subjects */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                  <BookmarkCheck className="w-4 h-4 text-emerald-800" />
                  <span>
                    {t('نصابی مضامین و اساتذہ', 'Assigned Subjects')} ({selectedClass.subjects?.length || 0})
                  </span>
                </h3>
                <button
                  onClick={() => onNavigateMms('mms_class_subjects')}
                  className="text-xs text-emerald-800 hover:underline font-bold"
                >
                  {t('مضامین تفویض کریں', 'Assign / Manage')}
                </button>
              </div>

              {selectedClass.subjects && selectedClass.subjects.length > 0 ? (
                <div className="space-y-2">
                  {selectedClass.subjects.map((asgn) => (
                    <div
                      key={asgn.id}
                      className="p-2.5 rounded-xl border border-stone-200 bg-white flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-stone-900">{asgn.subject.name}</span>
                        <span className="ms-2 font-mono text-[11px] text-stone-400">{asgn.subject.code}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {asgn.teacher ? (
                          <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[11px] font-medium">
                            {asgn.teacher.full_name}
                          </span>
                        ) : (
                          <span className="text-[11px] text-stone-400 italic">{t('کوئی استاذ تفویض نہیں', 'No teacher')}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-stone-400 italic p-3 bg-stone-50 rounded-xl">
                  {t('اس کلاس میں کوئی مضمون شامل نہیں کیا گیا۔', 'No subjects mapped to this class yet.')}
                </p>
              )}
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
