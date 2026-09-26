import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  Eye,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Phone,
  Calendar,
  UserCheck,
  Shield,
  GraduationCap,
  Heart,
  X,
  BookOpen,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useMmsAuth } from '../context/MmsAuthContext';
import { phase3Service } from '../services/phase3DataService';
import {
  DbStudent,
  StudentWithDetails,
  StudentStatus,
  StudentGender,
  DbGuardian,
  DbClass,
} from '../types';

interface MmsStudentsViewProps {
  onNavigateMms: (route: string) => void;
}

export const MmsStudentsView: React.FC<MmsStudentsViewProps> = ({ onNavigateMms }) => {
  const { t } = useLanguage();
  const { institutionalPosition, canManageAcademics, assignedDomain } = useMmsAuth();
  const isMuhtamim = institutionalPosition === 'muhtamim';

  const [students, setStudents] = useState<StudentWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [genderFilter, setGenderFilter] = useState<string>('all');

  // Modals
  const [selectedStudent, setSelectedStudent] = useState<StudentWithDetails | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<DbStudent | null>(null);
  const [isLinkGuardianModalOpen, setIsLinkGuardianModalOpen] = useState(false);
  const [availableGuardians, setAvailableGuardians] = useState<DbGuardian[]>([]);
  const [availableClasses, setAvailableClasses] = useState<DbClass[]>([]);

  // Add / Edit Form State
  const [formData, setFormData] = useState({
    admission_number: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    date_of_birth: '',
    gender: 'male' as StudentGender,
    phone: '',
    address: '',
    admission_date: new Date().toISOString().split('T')[0],
    status: 'active' as StudentStatus,
    notes: '',
  });

  // Link Guardian Form State
  const [guardianForm, setGuardianForm] = useState({
    guardian_id: '',
    relationship: 'والد (Father)',
    is_primary: true,
    can_pickup: true,
    notes: '',
  });

  // Feedback State
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await phase3Service.getStudents({
        search: searchTerm,
        status: statusFilter,
        gender: genderFilter,
      });
      setStudents(data);

      const [guardiansData, classesData] = await Promise.all([
        phase3Service.getGuardians(),
        phase3Service.getClasses(),
      ]);
      setAvailableGuardians(guardiansData);
      setAvailableClasses(classesData);
    } catch (err) {
      console.error('Error loading students:', err);
      setFeedback({ type: 'error', message: t('ڈیٹا لوڈ کرنے میں خرابی ہوئی۔', 'Failed to load students data.') });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [searchTerm, statusFilter, genderFilter]);

  const handleOpenAdd = () => {
    setEditingStudent(null);
    setFormData({
      admission_number: `ADM-${new Date().getFullYear()}-${String(students.length + 1).padStart(3, '0')}`,
      first_name: '',
      middle_name: '',
      last_name: '',
      date_of_birth: '',
      gender: 'male',
      phone: '',
      address: '',
      admission_date: new Date().toISOString().split('T')[0],
      status: 'active',
      notes: '',
    });
    setFeedback(null);
    setIsAddEditModalOpen(true);
  };

  const handleOpenEdit = (student: DbStudent) => {
    setEditingStudent(student);
    setFormData({
      admission_number: student.admission_number,
      first_name: student.first_name,
      middle_name: student.middle_name || '',
      last_name: student.last_name,
      date_of_birth: student.date_of_birth,
      gender: student.gender,
      phone: student.phone || '',
      address: student.address || '',
      admission_date: student.admission_date,
      status: student.status,
      notes: student.notes || '',
    });
    setFeedback(null);
    setIsAddEditModalOpen(true);
  };

  const handleOpenView = async (student: StudentWithDetails) => {
    setSelectedStudent(student);
    setIsViewModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      if (editingStudent) {
        const res = await phase3Service.updateStudent(editingStudent.id, formData);
        if (res.success) {
          setFeedback({ type: 'success', message: t('طالب علم کی معلومات کامیابی سے تبدیل ہو گئیں۔', 'Student details updated successfully.') });
          setIsAddEditModalOpen(false);
          await loadData();
        } else {
          setFeedback({ type: 'error', message: res.error || t('تبدیلی ناکام رہی۔', 'Update failed.') });
        }
      } else {
        const res = await phase3Service.createStudent(formData);
        if (res.success) {
          setFeedback({ type: 'success', message: t('نیا طالب علم کامیابی سے درج ہو گیا۔', 'New student registered successfully.') });
          setIsAddEditModalOpen(false);
          await loadData();
        } else {
          setFeedback({ type: 'error', message: res.error || t('اندراج ناکام رہا۔', 'Registration failed.') });
        }
      }
    } catch (err: unknown) {
      setFeedback({ type: 'error', message: err instanceof Error ? err.message : 'Error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (student: DbStudent) => {
    if (
      !window.confirm(
        t(
          `کیا آپ واقعی طالب علم "${student.first_name} ${student.last_name}" کو خارج / ڈیلیٹ کرنا چاہتے ہیں؟`,
          `Are you sure you want to remove student "${student.first_name} ${student.last_name}"?`
        )
      )
    ) {
      return;
    }

    try {
      const res = await phase3Service.deleteStudent(student.id);
      if (res.success) {
        setFeedback({ type: 'success', message: t('طالب علم کا ریکارڈ حذف کر دیا گیا۔', 'Student record removed.') });
        if (selectedStudent?.id === student.id) {
          setIsViewModalOpen(false);
        }
        await loadData();
      } else {
        setFeedback({ type: 'error', message: res.error || 'Failed' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLinkGuardian = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || !guardianForm.guardian_id) return;
    setIsSubmitting(true);

    try {
      const res = await phase3Service.linkStudentGuardian({
        student_id: selectedStudent.id,
        guardian_id: guardianForm.guardian_id,
        relationship: guardianForm.relationship,
        is_primary: guardianForm.is_primary,
        can_pickup: guardianForm.can_pickup,
        notes: guardianForm.notes,
      });

      if (res.success) {
        setFeedback({ type: 'success', message: t('سرپرست کو کامیابی سے منسلک کر دیا گیا۔', 'Guardian linked successfully.') });
        setIsLinkGuardianModalOpen(false);
        // Refresh selected student details
        const updated = await phase3Service.getStudentById(selectedStudent.id);
        setSelectedStudent(updated);
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

  const handleUnlinkGuardian = async (linkId: string) => {
    if (!window.confirm(t('کیا آپ اس سرپرست کا تعلق ختم کرنا چاہتے ہیں؟', 'Unlink this guardian?'))) return;
    try {
      const res = await phase3Service.unlinkStudentGuardian(linkId);
      if (res.success && selectedStudent) {
        const updated = await phase3Service.getStudentById(selectedStudent.id);
        setSelectedStudent(updated);
        await loadData();
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
              {t('طلباء ریکارڈ و نظم و نسق', 'Student Management & Records')}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              {t('فیز ۳ — بنیاد', 'Phase 3')}
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            {t(
              'طلباء کی بنیادی معلومات، سرپرستوں کے روابط، اور کلاس داخلہ جات کی مستند فہرست۔',
              'Official directory of admitted students, guardian relationships, and active enrollments.'
            )}
          </p>
        </div>

        {canManageAcademics ? (
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>{t('نیا طالب علم شامل کریں', 'Add New Student')}</span>
          </button>
        ) : isMuhtamim ? (
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold shadow-2xs">
            <Eye className="w-4 h-4 text-amber-700" />
            <span>{t('نگرانی و معائنہ — صرف مطالعہ (Read-Only)', 'Institutional Oversight — Read-Only Inspection')}</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold">
            <Shield className="w-4 h-4 text-stone-500" />
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
          <button
            onClick={() => setFeedback(null)}
            className="text-stone-400 hover:text-stone-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-stone-400 absolute start-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('داخلہ نمبر، نام یا موبائل نمبر سے تلاش کریں...', 'Search by admission #, name, or phone...')}
              className="w-full ps-9 pe-4 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all"
            />
          </div>

          {/* Status Filter */}
          <div className="sm:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all"
            >
              <option value="all">{t('تمام کیفیات (All Statuses)', 'All Statuses')}</option>
              <option value="active">{t('فعال / حاضر (Active)', 'Active')}</option>
              <option value="inactive">{t('غیر فعال (Inactive)', 'Inactive')}</option>
              <option value="graduated">{t('فارغ التحصیل (Graduated)', 'Graduated')}</option>
              <option value="suspended">{t('معطل (Suspended)', 'Suspended')}</option>
            </select>
          </div>

          {/* Gender Filter */}
          <div className="sm:col-span-3">
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all"
            >
              <option value="all">{t('تمام جنس (All Genders)', 'All Genders')}</option>
              <option value="male">{t('طالب علم / لڑکا (Male)', 'Male')}</option>
              <option value="female">{t('طالبہ / لڑکی (Female)', 'Female')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Data Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-stone-500 text-xs">
            <div className="w-8 h-8 border-2 border-emerald-800 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <span>{t('طلباء کا ریکارڈ لوڈ ہو رہا ہے...', 'Loading student records...')}</span>
          </div>
        ) : students.length === 0 ? (
          <div className="p-12 text-center text-stone-500">
            <Users className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <p className="font-semibold text-sm text-stone-700">
              {t('کوئی طالب علم دستیاب نہیں ہے', 'No students found')}
            </p>
            <p className="text-xs text-stone-400 mt-1">
              {t('تلاش کا معیار تبدیل کریں یا نیا طالب علم درج کریں۔', 'Try adjusting filters or add a new student.')}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead className="bg-stone-50 text-stone-600 border-b border-stone-200 uppercase font-semibold tracking-wider text-[11px]">
                <tr>
                  <th className="px-4 py-3 text-start">{t('داخلہ نمبر', 'Adm #')}</th>
                  <th className="px-4 py-3 text-start">{t('نام طالب علم', 'Student Name')}</th>
                  <th className="px-4 py-3 text-start">{t('جنس و عمر', 'Gender / DOB')}</th>
                  <th className="px-4 py-3 text-start">{t('فعال کلاس', 'Active Class')}</th>
                  <th className="px-4 py-3 text-start">{t('سرپرست', 'Guardian')}</th>
                  <th className="px-4 py-3 text-start">{t('اسٹیٹس', 'Status')}</th>
                  <th className="px-4 py-3 text-end">{canManageAcademics ? t('اقدامات', 'Actions') : t('معائنہ', 'Inspection')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {students.map((student) => {
                  const primaryGuardian = student.guardians?.find((g) => g.is_primary) || student.guardians?.[0];
                  return (
                    <tr key={student.id} className="hover:bg-stone-50/70 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-emerald-800">
                        {student.admission_number}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-stone-900">
                          {student.first_name} {student.middle_name} {student.last_name}
                        </div>
                        {student.phone && (
                          <div className="text-[11px] text-stone-400 font-mono flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3 text-stone-400" />
                            <span>{student.phone}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className="capitalize text-stone-700 font-medium">
                          {student.gender === 'male' ? t('طالب علم', 'Male') : t('طالبہ', 'Female')}
                        </span>
                        <div className="text-[11px] text-stone-400 font-mono mt-0.5">
                          {student.date_of_birth}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {student.activeEnrollment ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-[11px]">
                            <BookOpen className="w-3 h-3 text-emerald-600" />
                            <span>{student.activeEnrollment.class.name}</span>
                          </span>
                        ) : (
                          <span className="text-[11px] text-stone-400 italic">
                            {t('غیر داخل شدہ', 'Not Enrolled')}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {primaryGuardian ? (
                          <div>
                            <div className="font-medium text-stone-800">
                              {primaryGuardian.guardian.full_name}
                            </div>
                            <div className="text-[10px] text-stone-400">
                              {primaryGuardian.relationship}
                            </div>
                          </div>
                        ) : (
                          <span className="text-[11px] text-stone-400 italic">
                            {t('کوئی سرپرست منسلک نہیں', 'No Guardian')}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            student.status === 'active'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : student.status === 'graduated'
                              ? 'bg-blue-100 text-blue-800 border border-blue-200'
                              : student.status === 'suspended'
                              ? 'bg-rose-100 text-rose-800 border border-rose-200'
                              : 'bg-stone-100 text-stone-700 border border-stone-200'
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-end">
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => handleOpenView(student)}
                            title={t('تفصیلات دیکھیں', 'View details')}
                            className="p-1.5 rounded-lg text-stone-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {canManageAcademics && (
                            <>
                              <button
                                onClick={() => handleOpenEdit(student)}
                                title={t('ترمیم کریں', 'Edit')}
                                className="p-1.5 rounded-lg text-stone-500 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(student)}
                                title={t('خارج کریں', 'Delete / Archive')}
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
      {/* 1. Add / Edit Student Modal */}
      {/* ==================================================================== */}
      {isAddEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 border border-stone-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
              <h2 className="text-base font-bold text-stone-900 font-h2 flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-800" />
                <span>
                  {editingStudent
                    ? t('طالب علم کی معلومات میں ترمیم', 'Edit Student Information')
                    : t('نئے طالب علم کا اندراج', 'Register New Student')}
                </span>
              </h2>
              <button
                onClick={() => setIsAddEditModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t('داخلہ نمبر (Admission No) *', 'Admission Number *')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.admission_number}
                    onChange={(e) => setFormData({ ...formData, admission_number: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono font-bold text-emerald-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t('تاریخِ داخلہ (Admission Date) *', 'Admission Date *')}
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.admission_date}
                    onChange={(e) => setFormData({ ...formData, admission_date: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t('پہلا نام (First Name) *', 'First Name *')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    placeholder="e.g. محمد"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t('درمیانی نام (Middle Name)', 'Middle Name')}
                  </label>
                  <input
                    type="text"
                    value={formData.middle_name}
                    onChange={(e) => setFormData({ ...formData, middle_name: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t('خاندانی نام (Last Name)', 'Last Name')}
                  </label>
                  <input
                    type="text"
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    placeholder="e.g. قریشی"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t('تاریخِ پیدائش (Date of Birth) *', 'Date of Birth *')}
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date_of_birth}
                    onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t('جنس (Gender) *', 'Gender *')}
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as StudentGender })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  >
                    <option value="male">{t('مرد / طالب علم (Male)', 'Male')}</option>
                    <option value="female">{t('عورت / طالبہ (Female)', 'Female')}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t('رابطہ فون نمبر (Phone)', 'Phone Number')}
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0300-1234567"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t('حالت / اسٹیٹس (Status) *', 'Status *')}
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as StudentStatus })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  >
                    <option value="active">{t('فعال (Active)', 'Active')}</option>
                    <option value="inactive">{t('غیر فعال (Inactive)', 'Inactive')}</option>
                    <option value="graduated">{t('فارغ التحصیل (Graduated)', 'Graduated')}</option>
                    <option value="suspended">{t('معطل (Suspended)', 'Suspended')}</option>
                    <option value="withdrawn">{t('خارج شدہ (Withdrawn)', 'Withdrawn')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t('مکمل پتہ (Address)', 'Address')}
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. سیکٹر ایف-۲، میرپور آزاد کشمیر"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t('اضافی نوٹس (Notes)', 'Notes')}
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
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
                  {isSubmitting ? t('محفوظ ہو رہا ہے...', 'Saving...') : t('محفوظ کریں', 'Save Student')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 2. View Student Details Modal */}
      {/* ==================================================================== */}
      {isViewModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 border border-stone-200 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-stone-900 font-h2">
                    {selectedStudent.first_name} {selectedStudent.middle_name} {selectedStudent.last_name}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800">
                    {selectedStudent.admission_number}
                  </span>
                </div>
                <p className="text-xs text-stone-400 mt-0.5">
                  {t('داخلہ بتاریخ:', 'Admitted on:')} {selectedStudent.admission_date}
                </p>
              </div>

              <button
                onClick={() => setIsViewModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Basic Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-stone-50 p-4 rounded-xl border border-stone-200">
              <div>
                <p className="text-stone-400 font-medium">{t('جنس', 'Gender')}</p>
                <p className="font-bold text-stone-800 capitalize mt-0.5">
                  {selectedStudent.gender === 'male' ? t('طالب علم (Male)', 'Male') : t('طالبہ (Female)', 'Female')}
                </p>
              </div>
              <div>
                <p className="text-stone-400 font-medium">{t('تاریخِ پیدائش', 'DOB')}</p>
                <p className="font-bold text-stone-800 font-mono mt-0.5">{selectedStudent.date_of_birth}</p>
              </div>
              <div>
                <p className="text-stone-400 font-medium">{t('موبائل نمبر', 'Phone')}</p>
                <p className="font-bold text-stone-800 font-mono mt-0.5">{selectedStudent.phone || 'N/A'}</p>
              </div>
              <div>
                <p className="text-stone-400 font-medium">{t('اسٹیٹس', 'Status')}</p>
                <p className="font-bold text-emerald-800 uppercase mt-0.5">{selectedStudent.status}</p>
              </div>
              <div className="col-span-2 sm:col-span-4 mt-2 pt-2 border-t border-stone-200">
                <p className="text-stone-400 font-medium">{t('پتہ', 'Address')}</p>
                <p className="text-stone-700 mt-0.5">{selectedStudent.address || t('کوئی پتہ درج نہیں', 'No address recorded')}</p>
              </div>
            </div>

            {/* Guardian Relationships Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-stone-900 font-h2 flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-amber-600" />
                  <span>{t('منسلک اولیاء کرام و سرپرست (Guardians)', 'Linked Guardians')}</span>
                </h3>

                {canManageAcademics && (
                  <button
                    onClick={() => {
                      setGuardianForm({
                        guardian_id: availableGuardians[0]?.id || '',
                        relationship: 'والد (Father)',
                        is_primary: true,
                        can_pickup: true,
                        notes: '',
                      });
                      setIsLinkGuardianModalOpen(true);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{t('سرپرست منسلک کریں', 'Link Guardian')}</span>
                  </button>
                )}
              </div>

              {selectedStudent.guardians && selectedStudent.guardians.length > 0 ? (
                <div className="space-y-2">
                  {selectedStudent.guardians.map((link) => (
                    <div
                      key={link.id}
                      className="p-3 rounded-xl border border-stone-200 bg-white flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-900">{link.guardian.full_name}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] bg-stone-100 text-stone-700 font-medium">
                            {link.relationship}
                          </span>
                          {link.is_primary && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-800 font-bold">
                              {t('مرکزی سرپرست (Primary)', 'Primary')}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-stone-500 mt-1 flex items-center gap-3">
                          <span className="font-mono">📞 {link.guardian.phone}</span>
                          {link.guardian.address && <span>📍 {link.guardian.address}</span>}
                        </div>
                      </div>

                      {canManageAcademics && (
                        <button
                          onClick={() => handleUnlinkGuardian(link.id)}
                          className="text-stone-400 hover:text-rose-600 p-1 rounded-md"
                          title={t('تعلق ختم کریں', 'Unlink')}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-center text-xs text-stone-500">
                  {t('اس طالب علم سے کوئی سرپرست منسلک نہیں ہے۔', 'No guardians linked yet.')}
                </div>
              )}
            </div>

            {/* Enrollments History Section */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-stone-900 font-h2 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-emerald-700" />
                  <span>{t('کلاس داخلے و تعلیمی تاریخ (Enrollment History)', 'Enrollment History')}</span>
                </h3>

                <button
                  onClick={() => onNavigateMms('mms_enrollments')}
                  className="text-xs text-emerald-800 hover:text-emerald-900 font-bold underline"
                >
                  {t('داخلہ ماڈیول پر جائیں', 'Manage Enrollments')}
                </button>
              </div>

              {selectedStudent.enrollments && selectedStudent.enrollments.length > 0 ? (
                <div className="space-y-2">
                  {selectedStudent.enrollments.map((enr) => (
                    <div
                      key={enr.id}
                      className="p-3 rounded-xl border border-stone-200 bg-white flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="font-bold text-stone-900">{enr.class.name}</div>
                        <div className="text-[11px] text-stone-500 mt-0.5">
                          {t('تعلیمی سال:', 'Academic Year:')} {enr.academic_year} | {t('تاریخ:', 'Date:')}{' '}
                          {enr.enrollment_date}
                        </div>
                      </div>

                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          enr.status === 'enrolled'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        {enr.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-center text-xs text-stone-500">
                  {t('کوئی داخلہ ریکارڈ نہیں ملا۔', 'No enrollment records found.')}
                </div>
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

      {/* ==================================================================== */}
      {/* 3. Link Guardian Modal */}
      {/* ==================================================================== */}
      {isLinkGuardianModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-60 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
              <h3 className="text-sm font-bold text-stone-900 font-h2">
                {t('سرپرست منسلک کریں', 'Link Guardian to Student')}
              </h3>
              <button
                onClick={() => setIsLinkGuardianModalOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleLinkGuardian} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {t('سرپرست کا انتخاب کریں *', 'Select Guardian *')}
                </label>
                <select
                  required
                  value={guardianForm.guardian_id}
                  onChange={(e) => setGuardianForm({ ...guardianForm, guardian_id: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="">{t('-- سرپرست منتخب کریں --', '-- Select Guardian --')}</option>
                  {availableGuardians.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.full_name} ({g.phone}) - {g.relationship}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {t('رشتے کی نوعیت (Relationship) *', 'Relationship *')}
                </label>
                <input
                  type="text"
                  required
                  value={guardianForm.relationship}
                  onChange={(e) => setGuardianForm({ ...guardianForm, relationship: e.target.value })}
                  placeholder="e.g. والد (Father), چچا, والدہ"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="space-y-2 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={guardianForm.is_primary}
                    onChange={(e) => setGuardianForm({ ...guardianForm, is_primary: e.target.checked })}
                    className="w-4 h-4 text-emerald-800 rounded border-stone-300 focus:ring-emerald-700"
                  />
                  <span className="text-stone-700">{t('مرکزی رابطہ کار سرپرست (Primary Guardian)', 'Primary Guardian')}</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={guardianForm.can_pickup}
                    onChange={(e) => setGuardianForm({ ...guardianForm, can_pickup: e.target.checked })}
                    className="w-4 h-4 text-emerald-800 rounded border-stone-300 focus:ring-emerald-700"
                  />
                  <span className="text-stone-700">{t('چھٹی کے وقت لے جانے کا مجاز (Authorized for Pickup)', 'Authorized for Pickup')}</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsLinkGuardianModalOpen(false)}
                  className="px-3 py-1.5 rounded-xl text-stone-600 hover:bg-stone-100"
                >
                  {t('منسوخ', 'Cancel')}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !guardianForm.guardian_id}
                  className="px-4 py-1.5 rounded-xl font-bold bg-emerald-800 hover:bg-emerald-900 text-white disabled:opacity-50"
                >
                  {isSubmitting ? t('ربط ہو رہا ہے...', 'Linking...') : t('منسلک کریں', 'Link Guardian')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
