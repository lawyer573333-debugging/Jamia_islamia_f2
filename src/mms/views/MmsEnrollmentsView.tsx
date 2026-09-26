import React, { useState, useEffect } from 'react';
import {
  FileSpreadsheet,
  Search,
  Plus,
  Eye,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Users,
  BookOpen,
  Calendar,
  X,
  History,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useMmsAuth } from '../context/MmsAuthContext';
import { phase3Service } from '../services/phase3DataService';
import {
  DbEnrollment,
  EnrollmentWithDetails,
  EnrollmentStatus,
  DbStudent,
  DbClass,
} from '../types';

interface MmsEnrollmentsViewProps {
  onNavigateMms: (route: string) => void;
}

export const MmsEnrollmentsView: React.FC<MmsEnrollmentsViewProps> = ({ onNavigateMms }) => {
  const { t } = useLanguage();
  const { institutionalPosition, canManageAcademics, assignedDomain } = useMmsAuth();
  const isMuhtamim = institutionalPosition === 'muhtamim';

  const [enrollments, setEnrollments] = useState<EnrollmentWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [classFilter, setClassFilter] = useState<string>('all');

  // Modals
  const [selectedEnrollment, setSelectedEnrollment] = useState<EnrollmentWithDetails | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  const [availableStudents, setAvailableStudents] = useState<DbStudent[]>([]);
  const [availableClasses, setAvailableClasses] = useState<DbClass[]>([]);

  // Create Form State
  const [createForm, setCreateForm] = useState({
    student_id: '',
    class_id: '',
    academic_year: '1446-1447 / 2025-2026',
    enrollment_date: new Date().toISOString().split('T')[0],
    status: 'enrolled' as EnrollmentStatus,
    notes: '',
  });

  // Status Change State
  const [statusForm, setStatusForm] = useState({
    status: 'completed' as EnrollmentStatus,
    notes: '',
  });

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [enrollmentsData, studentsData, classesData] = await Promise.all([
        phase3Service.getEnrollments({
          status: statusFilter,
          classId: classFilter,
        }),
        phase3Service.getStudents(),
        phase3Service.getClasses(),
      ]);
      setEnrollments(enrollmentsData);
      setAvailableStudents(studentsData);
      setAvailableClasses(classesData);
    } catch (err) {
      console.error(err);
      setFeedback({ type: 'error', message: t('داخلہ ریکارڈ لوڈ کرنے میں خرابی ہوئی۔', 'Failed to load enrollments.') });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [statusFilter, classFilter]);

  const handleOpenCreate = () => {
    setCreateForm({
      student_id: availableStudents[0]?.id || '',
      class_id: availableClasses[0]?.id || '',
      academic_year: '1446-1447 / 2025-2026',
      enrollment_date: new Date().toISOString().split('T')[0],
      status: 'enrolled',
      notes: '',
    });
    setFeedback(null);
    setIsCreateModalOpen(true);
  };

  const handleOpenStatusModal = (enr: EnrollmentWithDetails) => {
    setSelectedEnrollment(enr);
    setStatusForm({
      status: enr.status,
      notes: enr.notes || '',
    });
    setFeedback(null);
    setIsStatusModalOpen(true);
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createForm.student_id || !createForm.class_id) return;
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const res = await phase3Service.createEnrollment(createForm);
      if (res.success) {
        setFeedback({ type: 'success', message: t('طالب علم کا کلاس میں داخلہ مکمل ہو گیا۔', 'Student enrolled successfully.') });
        setIsCreateModalOpen(false);
        await loadData();
      } else {
        setFeedback({ type: 'error', message: res.error || 'Failed' });
      }
    } catch (err: unknown) {
      setFeedback({ type: 'error', message: err instanceof Error ? err.message : 'Error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnrollment) return;
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const res = await phase3Service.updateEnrollment(selectedEnrollment.id, {
        status: statusForm.status,
        notes: statusForm.notes,
      });

      if (res.success) {
        setFeedback({ type: 'success', message: t('داخلہ اسٹیٹس کامیابی سے تبدیل ہو گیا۔', 'Enrollment status updated.') });
        setIsStatusModalOpen(false);
        await loadData();
      } else {
        setFeedback({ type: 'error', message: res.error || 'Failed' });
      }
    } catch (err: unknown) {
      setFeedback({ type: 'error', message: err instanceof Error ? err.message : 'Error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteEnrollment = async (enr: EnrollmentWithDetails) => {
    if (
      !window.confirm(
        t(
          `کیا آپ واقعی طالب علم "${enr.student.first_name} ${enr.student.last_name}" کا کلاس "${enr.class.name}" سے داخلہ خارج کرنا چاہتے ہیں؟`,
          `Are you sure you want to remove this enrollment for "${enr.student.first_name} ${enr.student.last_name}"?`
        )
      )
    ) {
      return;
    }

    try {
      const res = await phase3Service.deleteEnrollment(enr.id);
      if (res.success) {
        setFeedback({ type: 'success', message: t('داخلہ ریکارڈ خارج کر دیا گیا۔', 'Enrollment removed.') });
        await loadData();
      } else {
        setFeedback({ type: 'error', message: res.error || 'Failed' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filter by search term on student name or admission number
  const filteredEnrollments = enrollments.filter((enr) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const studentName = `${enr.student.first_name} ${enr.student.last_name}`.toLowerCase();
    const admNo = enr.student.admission_number.toLowerCase();
    const className = enr.class.name.toLowerCase();
    return studentName.includes(term) || admNo.includes(term) || className.includes(term);
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 font-h2">
              {t('طلباء داخلہ و تعلیمی اندراج (Enrollments Management)', 'Enrollments Management')}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              {t('فیز ۳ — بنیاد', 'Phase 3')}
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            {t(
              'طلباء کے باضابطہ درجات میں داخلے، تعلیمی سال کی تخصیص اور تعلیمی ترقی / فراغت کی تاریخ۔',
              'Class admissions, academic terms, promotions, withdrawals, and historical enrollment tracking.'
            )}
          </p>
        </div>

        {canManageAcademics ? (
          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>{t('نیا داخلہ درج کریں', 'New Enrollment')}</span>
          </button>
        ) : isMuhtamim ? (
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold shadow-2xs">
            <Eye className="w-4 h-4 text-amber-700" />
            <span>{t('نگرانی و معائنہ — صرف مطالعہ (Read-Only)', 'Institutional Oversight — Read-Only Inspection')}</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold">
            <FileSpreadsheet className="w-4 h-4 text-stone-500" />
            <span>{t(`دائرہ کار: ${assignedDomain || 'غیر تعلیمی'} (صرف معائنہ)`, `Scope: ${assignedDomain || 'Non-academic'} (Inspection Only)`)}</span>
          </div>
        )}
      </div>

      {/* Feedback Banner */}
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

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-stone-400 absolute start-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('طالب علم کے نام، داخلہ نمبر یا کلاس سے تلاش کریں...', 'Search student name, adm #, or class...')}
              className="w-full ps-9 pe-4 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all"
            >
              <option value="all">{t('تمام کیفیات (All Statuses)', 'All Statuses')}</option>
              <option value="enrolled">{t('زیرِ تعلیم / حاضر (Enrolled)', 'Enrolled')}</option>
              <option value="completed">{t('کورس مکمل (Completed)', 'Completed')}</option>
              <option value="promoted">{t('اگلی کلاس میں ترقی (Promoted)', 'Promoted')}</option>
              <option value="dropped">{t('خارج / ترک کردہ (Dropped)', 'Dropped')}</option>
              <option value="suspended">{t('معطل (Suspended)', 'Suspended')}</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all"
            >
              <option value="all">{t('تمام درجات (All Classes)', 'All Classes')}</option>
              {availableClasses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.code})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Enrollments Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-stone-500 text-xs">
            <div className="w-8 h-8 border-2 border-emerald-800 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <span>{t('داخلہ ریکارڈ لوڈ ہو رہا ہے...', 'Loading enrollments...')}</span>
          </div>
        ) : filteredEnrollments.length === 0 ? (
          <div className="p-12 text-center text-stone-500">
            <FileSpreadsheet className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <p className="font-semibold text-sm text-stone-700">{t('کوئی داخلہ ریکارڈ نہیں ملا', 'No enrollments found')}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead className="bg-stone-50 text-stone-600 border-b border-stone-200 uppercase font-semibold tracking-wider text-[11px]">
                <tr>
                  <th className="px-4 py-3 text-start">{t('داخلہ نمبر', 'Adm #')}</th>
                  <th className="px-4 py-3 text-start">{t('نام طالب علم', 'Student Name')}</th>
                  <th className="px-4 py-3 text-start">{t('کلاس / درجہ', 'Class')}</th>
                  <th className="px-4 py-3 text-start">{t('تعلیمی سال', 'Academic Year')}</th>
                  <th className="px-4 py-3 text-start">{t('تاریخِ داخلہ', 'Enrollment Date')}</th>
                  <th className="px-4 py-3 text-start">{t('کیفیت / اسٹیٹس', 'Status')}</th>
                  <th className="px-4 py-3 text-end">{canManageAcademics ? t('اقدامات', 'Actions') : t('معائنہ', 'Inspection')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredEnrollments.map((enr) => (
                  <tr key={enr.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-emerald-800">
                      {enr.student.admission_number}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-stone-900">
                        {enr.student.first_name} {enr.student.last_name}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-semibold text-stone-800">{enr.class.name}</span>
                      <span className="ms-1.5 font-mono text-[11px] text-stone-400">({enr.class.code})</span>
                    </td>
                    <td className="px-4 py-3 text-stone-600 font-mono">
                      {enr.academic_year}
                    </td>
                    <td className="px-4 py-3 font-mono text-stone-600">
                      {enr.enrollment_date}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          enr.status === 'enrolled'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : enr.status === 'promoted'
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : enr.status === 'completed'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-rose-100 text-rose-800 border border-rose-200'
                        }`}
                      >
                        {enr.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-end">
                      {canManageAcademics ? (
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => handleOpenStatusModal(enr)}
                            title={t('کیفیت تبدیل کریں', 'Update Status')}
                            className="px-2 py-1 rounded-lg text-emerald-800 hover:bg-emerald-50 text-[11px] font-semibold border border-emerald-200 transition-colors"
                          >
                            {t('کیفیت تبدیل', 'Status')}
                          </button>
                          <button
                            onClick={() => handleDeleteEnrollment(enr)}
                            title={t('خارج کریں', 'Delete')}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-stone-400 italic text-[11px]">
                          {t('صرف مطالعہ', 'Read-only')}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ==================================================================== */}
      {/* 1. Create Enrollment Modal */}
      {/* ==================================================================== */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-stone-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
              <h2 className="text-base font-bold text-stone-900 font-h2 flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-800" />
                <span>{t('طالب علم کا کلاس میں نیا داخلہ', 'Register Student into Class')}</span>
              </h2>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {t('طالب علم منتخب کریں *', 'Select Student *')}
                </label>
                <select
                  required
                  value={createForm.student_id}
                  onChange={(e) => setCreateForm({ ...createForm, student_id: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="">{t('-- طالب علم کا انتخاب کریں --', '-- Select Student --')}</option>
                  {availableStudents.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.first_name} {st.last_name} ({st.admission_number})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {t('کلاس / درجہ کا انتخاب کریں *', 'Select Target Class *')}
                </label>
                <select
                  required
                  value={createForm.class_id}
                  onChange={(e) => setCreateForm({ ...createForm, class_id: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="">{t('-- کلاس منتخب کریں --', '-- Select Class --')}</option>
                  {availableClasses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.code}) - {c.academic_year}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {t('تعلیمی سال (Academic Year) *', 'Academic Year *')}
                  </label>
                  <input
                    type="text"
                    required
                    value={createForm.academic_year}
                    onChange={(e) => setCreateForm({ ...createForm, academic_year: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {t('تاریخِ داخلہ (Enrollment Date) *', 'Enrollment Date *')}
                  </label>
                  <input
                    type="date"
                    required
                    value={createForm.enrollment_date}
                    onChange={(e) => setCreateForm({ ...createForm, enrollment_date: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {t('داخلہ کیفیت (Status)', 'Enrollment Status')}
                </label>
                <select
                  value={createForm.status}
                  onChange={(e) => setCreateForm({ ...createForm, status: e.target.value as EnrollmentStatus })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="enrolled">{t('زیرِ تعلیم / حاضر (Enrolled)', 'Enrolled')}</option>
                  <option value="promoted">{t('ترقی یافتہ (Promoted)', 'Promoted')}</option>
                  <option value="completed">{t('کامیاب / مکمل (Completed)', 'Completed')}</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {t('نوٹس / وجوہات (Notes)', 'Notes')}
                </label>
                <textarea
                  rows={2}
                  value={createForm.notes}
                  onChange={(e) => setCreateForm({ ...createForm, notes: e.target.value })}
                  placeholder={t('داخلہ ٹیسٹ نمبر، سابقہ مدرسہ یا خصوصی ہدایات...', 'Test marks or special remarks...')}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100"
                >
                  {t('منسوخ', 'Cancel')}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !createForm.student_id || !createForm.class_id}
                  className="px-5 py-2 rounded-xl font-bold bg-emerald-800 hover:bg-emerald-900 text-white transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? t('محفوظ ہو رہا ہے...', 'Saving...') : t('داخلہ درج کریں', 'Complete Enrollment')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 2. Status Update Modal */}
      {/* ==================================================================== */}
      {isStatusModalOpen && selectedEnrollment && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
              <h2 className="text-sm font-bold text-stone-900 font-h2">
                {t('داخلہ کیفیت تبدیل کریں', 'Update Enrollment Status')}
              </h2>
              <button
                onClick={() => setIsStatusModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleStatusSubmit} className="space-y-3.5 text-xs">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <div className="font-bold text-stone-900">
                  {selectedEnrollment.student.first_name} {selectedEnrollment.student.last_name}
                </div>
                <div className="text-[11px] text-stone-500">
                  {selectedEnrollment.class.name} ({selectedEnrollment.academic_year})
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {t('نئی کیفیت (New Status) *', 'New Status *')}
                </label>
                <select
                  value={statusForm.status}
                  onChange={(e) => setStatusForm({ ...statusForm, status: e.target.value as EnrollmentStatus })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="enrolled">{t('زیرِ تعلیم / حاضر (Enrolled)', 'Enrolled')}</option>
                  <option value="promoted">{t('اگلی کلاس میں ترقی یافتہ (Promoted)', 'Promoted')}</option>
                  <option value="completed">{t('فراغت / کورس مکمل (Completed)', 'Completed')}</option>
                  <option value="dropped">{t('خارج / تعلیم ترک کر دی (Dropped)', 'Dropped')}</option>
                  <option value="suspended">{t('معطل (Suspended)', 'Suspended')}</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {t('تبدیلی کی وجوہات و نوٹس', 'Notes / Remarks')}
                </label>
                <textarea
                  rows={2}
                  value={statusForm.notes}
                  onChange={(e) => setStatusForm({ ...statusForm, notes: e.target.value })}
                  placeholder={t('کیفیت کی تبدیلی کا باضابطہ سبب...', 'Reason for status update...')}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsStatusModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-stone-600 hover:bg-stone-100"
                >
                  {t('منسوخ', 'Cancel')}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl font-bold bg-emerald-800 hover:bg-emerald-900 text-white transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? t('محفوظ ہو رہا ہے...', 'Saving...') : t('تبدیل کریں', 'Update Status')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
