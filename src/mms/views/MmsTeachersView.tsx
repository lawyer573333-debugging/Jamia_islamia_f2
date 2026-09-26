import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Search,
  Plus,
  Eye,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  Calendar,
  BookOpen,
  X,
  Briefcase,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useMmsAuth } from '../context/MmsAuthContext';
import { phase3Service } from '../services/phase3DataService';
import { DbTeacher, TeacherWithAssignments, TeacherStatus } from '../types';

interface MmsTeachersViewProps {
  onNavigateMms: (route: string) => void;
}

export const MmsTeachersView: React.FC<MmsTeachersViewProps> = ({ onNavigateMms }) => {
  const { t } = useLanguage();
  const { institutionalPosition, canManageAcademics, assignedDomain } = useMmsAuth();
  const isMuhtamim = institutionalPosition === 'muhtamim';

  const [teachers, setTeachers] = useState<TeacherWithAssignments[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Modals
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherWithAssignments | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<DbTeacher | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    employee_number: '',
    full_name: '',
    phone: '',
    email: '',
    qualification: '',
    specialization: '',
    joining_date: new Date().toISOString().split('T')[0],
    status: 'active' as TeacherStatus,
    notes: '',
  });

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await phase3Service.getTeachers({
        search: searchTerm,
        status: statusFilter,
      });
      setTeachers(data);
    } catch (err) {
      console.error(err);
      setFeedback({ type: 'error', message: t('اساتذہ کا ڈیٹا لوڈ کرنے میں خرابی ہوئی۔', 'Failed to load teachers.') });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [searchTerm, statusFilter]);

  const handleOpenAdd = () => {
    setEditingTeacher(null);
    setFormData({
      employee_number: `TCH-${new Date().getFullYear()}-${String(teachers.length + 1).padStart(3, '0')}`,
      full_name: '',
      phone: '',
      email: '',
      qualification: 'شہادت العالمیہ (وفاق المدارس)',
      specialization: 'تفسیر و حدیث',
      joining_date: new Date().toISOString().split('T')[0],
      status: 'active',
      notes: '',
    });
    setFeedback(null);
    setIsAddEditModalOpen(true);
  };

  const handleOpenEdit = (teacher: DbTeacher) => {
    setEditingTeacher(teacher);
    setFormData({
      employee_number: teacher.employee_number,
      full_name: teacher.full_name,
      phone: teacher.phone,
      email: teacher.email || '',
      qualification: teacher.qualification,
      specialization: teacher.specialization,
      joining_date: teacher.joining_date,
      status: teacher.status,
      notes: teacher.notes || '',
    });
    setFeedback(null);
    setIsAddEditModalOpen(true);
  };

  const handleOpenView = (teacher: TeacherWithAssignments) => {
    setSelectedTeacher(teacher);
    setIsViewModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      if (editingTeacher) {
        const res = await phase3Service.updateTeacher(editingTeacher.id, formData);
        if (res.success) {
          setFeedback({ type: 'success', message: t('استاذ کی معلومات محفوظ ہو گئیں۔', 'Teacher updated successfully.') });
          setIsAddEditModalOpen(false);
          await loadData();
        } else {
          setFeedback({ type: 'error', message: res.error || 'Failed' });
        }
      } else {
        const res = await phase3Service.createTeacher(formData);
        if (res.success) {
          setFeedback({ type: 'success', message: t('نیا استاذ کامیابی سے شامل کر لیا گیا۔', 'Teacher added successfully.') });
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

  const handleDelete = async (teacher: TeacherWithAssignments) => {
    if (
      !window.confirm(
        t(
          `کیا آپ واقعی استاذ "${teacher.full_name}" کو خارج کرنا چاہتے ہیں؟`,
          `Are you sure you want to remove teacher "${teacher.full_name}"?`
        )
      )
    ) {
      return;
    }

    try {
      const res = await phase3Service.deleteTeacher(teacher.id);
      if (res.success) {
        setFeedback({ type: 'success', message: t('استاذ کا ریکارڈ حذف کر دیا گیا۔', 'Teacher record removed.') });
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
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 font-h2">
              {t('اساتذہ کرام ڈائرکٹری', 'Teachers & Faculty Directory')}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              {t('فیز ۳ — بنیاد', 'Phase 3')}
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            {t(
              'جامعہ کے جملہ معزز اساتذہ کرام کا تعلیمی ریکارڈ، تفویض کردہ درجات اور مضامین۔',
              'Faculty staff profiles, academic specializations, assigned classes, and active subjects.'
            )}
          </p>
        </div>

        {canManageAcademics ? (
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>{t('نیا استاذ شامل کریں', 'Add New Teacher')}</span>
          </button>
        ) : isMuhtamim ? (
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold shadow-2xs">
            <Eye className="w-4 h-4 text-amber-700" />
            <span>{t('نگرانی و معائنہ — صرف مطالعہ (Read-Only)', 'Institutional Oversight — Read-Only Inspection')}</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold">
            <Briefcase className="w-4 h-4 text-stone-500" />
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

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-stone-400 absolute start-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('ملازمت نمبر، نام، تخصص، یا فون سے تلاش کریں...', 'Search by employee #, name, specialization, or phone...')}
              className="w-full ps-9 pe-4 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all"
            >
              <option value="all">{t('تمام کیفیات (All Statuses)', 'All Statuses')}</option>
              <option value="active">{t('فعال / برسرِ خدمت (Active)', 'Active')}</option>
              <option value="on_leave">{t('رخصت پر (On Leave)', 'On Leave')}</option>
              <option value="resigned">{t('مستعفی (Resigned)', 'Resigned')}</option>
              <option value="retired">{t('ریٹائرڈ (Retired)', 'Retired')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Teachers Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-stone-500 text-xs">
            <div className="w-8 h-8 border-2 border-emerald-800 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <span>{t('اساتذہ کا ریکارڈ لوڈ ہو رہا ہے...', 'Loading teachers...')}</span>
          </div>
        ) : teachers.length === 0 ? (
          <div className="p-12 text-center text-stone-500">
            <GraduationCap className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <p className="font-semibold text-sm text-stone-700">{t('کوئی استاذ نہیں ملا', 'No teachers found')}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead className="bg-stone-50 text-stone-600 border-b border-stone-200 uppercase font-semibold tracking-wider text-[11px]">
                <tr>
                  <th className="px-4 py-3 text-start">{t('ملازمت نمبر', 'Emp #')}</th>
                  <th className="px-4 py-3 text-start">{t('نام استاذ', 'Teacher Name')}</th>
                  <th className="px-4 py-3 text-start">{t('تخصص و قابلیت', 'Specialization')}</th>
                  <th className="px-4 py-3 text-start">{t('فون', 'Phone')}</th>
                  <th className="px-4 py-3 text-start">{t('تفویض شدہ کلاسز', 'Assigned Classes')}</th>
                  <th className="px-4 py-3 text-start">{t('اسٹیٹس', 'Status')}</th>
                  <th className="px-4 py-3 text-end">{canManageAcademics ? t('اقدامات', 'Actions') : t('معائنہ', 'Inspection')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {teachers.map((teacher) => (
                  <tr key={teacher.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-emerald-800">
                      {teacher.employee_number}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-stone-900">{teacher.full_name}</div>
                      <div className="text-[11px] text-stone-400">{teacher.qualification}</div>
                    </td>
                    <td className="px-4 py-3 text-stone-700 font-medium">
                      {teacher.specialization}
                    </td>
                    <td className="px-4 py-3 font-mono text-stone-600">
                      {teacher.phone}
                    </td>
                    <td className="px-4 py-3">
                      {teacher.primaryClasses && teacher.primaryClasses.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {teacher.primaryClasses.map((cls) => (
                            <span
                              key={cls.id}
                              className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-semibold"
                            >
                              {cls.name}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-stone-400 italic text-[11px]">
                          {t('کوئی انچارج کلاس نہیں', 'No primary class')}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          teacher.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : teacher.status === 'on_leave'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-stone-100 text-stone-700 border border-stone-200'
                        }`}
                      >
                        {teacher.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-end">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => handleOpenView(teacher)}
                          title={t('تفصیلات دیکھیں', 'View details')}
                          className="p-1.5 rounded-lg text-stone-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {canManageAcademics && (
                          <>
                            <button
                              onClick={() => handleOpenEdit(teacher)}
                              title={t('ترمیم کریں', 'Edit')}
                              className="p-1.5 rounded-lg text-stone-500 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(teacher)}
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
                ))}
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
                <GraduationCap className="w-5 h-5 text-emerald-800" />
                <span>
                  {editingTeacher
                    ? t('استاذ کی معلومات میں ترمیم', 'Edit Teacher Details')
                    : t('نئے استاذ کا اندراج', 'Add New Teacher')}
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
                    {t('ملازمت نمبر (Emp #) *', 'Employee Number *')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.employee_number}
                    onChange={(e) => setFormData({ ...formData, employee_number: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl font-mono font-bold text-emerald-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {t('تاریخِ شمولیت (Joining Date) *', 'Joining Date *')}
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.joining_date}
                    onChange={(e) => setFormData({ ...formData, joining_date: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {t('پورا نام (Full Name) *', 'Full Name *')}
                </label>
                <input
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  placeholder="e.g. مولانا مفتی محمد قاسم صاحب"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {t('تخصص و مہارت (Specialization) *', 'Specialization *')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    placeholder="e.g. فقہ و حدیث، تجوید"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {t('علمی قابلیت (Qualification) *', 'Qualification *')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    placeholder="e.g. عالمیہ وفاق المدارس، ایم اے اسلامیات"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {t('موبائل فون (Phone) *', 'Phone *')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0300-1234567"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {t('ای میل ایڈریس (Email)', 'Email')}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="teacher@jamia.edu.pk"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {t('اسٹیٹس (Status) *', 'Status *')}
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as TeacherStatus })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="active">{t('فعال / برسرِ خدمت (Active)', 'Active')}</option>
                  <option value="on_leave">{t('رخصت پر (On Leave)', 'On Leave')}</option>
                  <option value="resigned">{t('مستعفی (Resigned)', 'Resigned')}</option>
                  <option value="retired">{t('ریٹائرڈ (Retired)', 'Retired')}</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {t('اضافی نوٹس (Notes)', 'Notes')}
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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
                  {isSubmitting ? t('محفوظ ہو رہا ہے...', 'Saving...') : t('محفوظ کریں', 'Save Teacher')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 2. View Teacher Details Modal */}
      {/* ==================================================================== */}
      {isViewModalOpen && selectedTeacher && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-stone-200 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <h2 className="text-lg font-bold text-stone-900 font-h2">{selectedTeacher.full_name}</h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-mono text-xs font-bold text-emerald-800">
                    {selectedTeacher.employee_number}
                  </span>
                  <span className="text-xs text-stone-400">•</span>
                  <span className="text-xs text-stone-600">{selectedTeacher.specialization}</span>
                </div>
              </div>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-stone-400">{t('تعلیمی اسناد:', 'Qualification:')}</span>
                <p className="font-semibold text-stone-800 mt-0.5">{selectedTeacher.qualification}</p>
              </div>
              <div>
                <span className="text-stone-400">{t('تاریخِ شمولیت:', 'Joining Date:')}</span>
                <p className="font-mono font-semibold text-stone-800 mt-0.5">{selectedTeacher.joining_date}</p>
              </div>
              <div>
                <span className="text-stone-400">{t('رابطہ فون:', 'Phone:')}</span>
                <p className="font-mono font-semibold text-stone-800 mt-0.5">{selectedTeacher.phone}</p>
              </div>
              <div>
                <span className="text-stone-400">{t('اسٹیٹس:', 'Status:')}</span>
                <p className="font-bold uppercase text-emerald-800 mt-0.5">{selectedTeacher.status}</p>
              </div>
            </div>

            {/* Assigned Primary Classes */}
            <div>
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-800" />
                <span>{t('بطور نگران استاذ درجات (Class Teacher)', 'Supervised Classes')}</span>
              </h3>

              {selectedTeacher.primaryClasses && selectedTeacher.primaryClasses.length > 0 ? (
                <div className="space-y-2">
                  {selectedTeacher.primaryClasses.map((cls) => (
                    <div
                      key={cls.id}
                      className="p-3 rounded-xl border border-stone-200 bg-white flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-bold text-stone-900">{cls.name}</div>
                        <div className="text-[11px] text-stone-500 font-mono">
                          {cls.code} • {t('تعلیمی سال:', 'Year:')} {cls.academic_year}
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-bold uppercase">
                        {cls.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-stone-400 italic p-3 bg-stone-50 rounded-xl">
                  {t('فی الوقت کسی کلاس کے نگران نہیں ہیں۔', 'Not assigned as primary class teacher currently.')}
                </p>
              )}
            </div>

            {/* Subject Teaching Assignments */}
            <div>
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-emerald-800" />
                <span>{t('تدریس کے مضامین (Assigned Subjects)', 'Teaching Subjects')}</span>
              </h3>

              {selectedTeacher.teachingAssignments && selectedTeacher.teachingAssignments.length > 0 ? (
                <div className="space-y-2">
                  {selectedTeacher.teachingAssignments.map((asgn) => (
                    <div
                      key={asgn.id}
                      className="p-3 rounded-xl border border-stone-200 bg-white flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-stone-900">{asgn.subject.name}</span>
                        <div className="text-[11px] text-stone-500 font-mono">
                          {asgn.subject.code} • {asgn.class.name}
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[10px] font-medium">
                        {asgn.subject.category}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-stone-400 italic p-3 bg-stone-50 rounded-xl">
                  {t('کوئی انفرادی مضمون تدریس تفویض نہیں ہے۔', 'No subject teaching assignments.')}
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
