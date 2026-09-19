import React, { useState, useEffect } from 'react';
import {
  Search,
  Users,
  BookOpen,
  Phone,
  Shield,
  Calendar,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  GraduationCap,
  Eye,
  X,
  UserCheck,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { phase3Service } from '../services/phase3DataService';
import {
  DbStudent,
  DbGuardian,
  StudentWithDetails,
  EnrollmentWithDetails,
} from '../types';

interface MmsCounterDashboardProps {
  onNavigateMms: (route: string) => void;
}

export const MmsCounterDashboard: React.FC<MmsCounterDashboardProps> = ({ onNavigateMms }) => {
  const { t } = useLanguage();

  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState<DbStudent[]>([]);
  const [enrollments, setEnrollments] = useState<EnrollmentWithDetails[]>([]);
  const [guardians, setGuardians] = useState<DbGuardian[]>([]);
  const [studentGuardians, setStudentGuardians] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal for Viewing Full Student & Guardian & Enrollment Details
  const [selectedStudent, setSelectedStudent] = useState<DbStudent | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    const loadCounterData = async () => {
      setLoading(true);
      try {
        const [stList, enrList, gdList, sgList] = await Promise.all([
          phase3Service.getStudents(),
          phase3Service.getEnrollments(),
          phase3Service.getGuardians(),
          phase3Service.getStudentGuardians(),
        ]);
        setStudents(stList);
        setEnrollments(enrList);
        setGuardians(gdList);
        setStudentGuardians(sgList);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadCounterData();
  }, []);

  const handleViewStudent = (student: DbStudent) => {
    setSelectedStudent(student);
    setIsDetailModalOpen(true);
  };

  // Filter students based on search term (name, admission number, phone)
  const filteredStudents = students.filter((s) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const fullName = `${s.first_name} ${s.last_name}`.toLowerCase();
    const admNo = s.admission_number.toLowerCase();
    const phone = (s.phone || '').toLowerCase();
    return fullName.includes(term) || admNo.includes(term) || phone.includes(term);
  });

  // Helper to find enrollment for student
  const getStudentEnrollment = (studentId: string) => {
    return (
      enrollments.find((e) => e.student_id === studentId && e.status === 'enrolled') ||
      enrollments.find((e) => e.student_id === studentId)
    );
  };

  // Helper to find guardians for student
  const getStudentGuardiansList = (studentId: string) => {
    const links = studentGuardians.filter((sg) => sg.student_id === studentId);
    return links.map((link) => {
      const g = guardians.find((gd) => gd.id === link.guardian_id);
      return {
        guardian: g,
        relationship: link.relationship,
        isPrimary: link.is_primary,
      };
    });
  };

  const selectedEnrollment = selectedStudent ? getStudentEnrollment(selectedStudent.id) : null;
  const selectedGuardians = selectedStudent ? getStudentGuardiansList(selectedStudent.id) : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 font-h2">
              {t('کاؤنٹر ڈیسک — تصدیق و معلوماتِ طلباء', 'Counter Desk — Student Verification & Info')}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
              {t('کاؤنٹر پورٹل (Counter Desk)', 'Counter Portal')}
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            {t(
              'طلباء کی فوری تلاش، بنیادی تعلیمی کوائف، کلاس و داخلہ اسٹیٹس اور سرپرست رابطہ معلومات۔',
              'Quick student directory lookup, verified academic records, class enrollment status, and parent contacts.'
            )}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-stone-100 border border-stone-200 text-xs">
            <span className="text-stone-500">{t('کل طلباء:', 'Total Students:')} </span>
            <strong className="text-emerald-800 font-mono font-bold">{students.length}</strong>
          </div>
        </div>
      </div>

      {/* Student Search & Quick Lookup Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute start-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t(
              'طالب علم کے نام، داخلہ نمبر (مثلاً: JTU-2026-001) یا فون نمبر سے تلاش کریں...',
              'Search by student name, admission # (e.g. JTU-2026-001), or phone number...'
            )}
            className="w-full ps-10 pe-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all font-medium"
          />
        </div>
      </div>

      {/* Directory Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-stone-500 text-xs">
            <div className="w-8 h-8 border-2 border-emerald-800 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <span>{t('طلباء ریکارڈ لوڈ ہو رہا ہے...', 'Loading student records...')}</span>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="p-12 text-center text-stone-500">
            <Users className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <p className="font-semibold text-sm text-stone-700">{t('کوئی طالب علم نہیں ملا', 'No students found')}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead className="bg-stone-50 text-stone-600 border-b border-stone-200 uppercase font-semibold tracking-wider text-[11px]">
                <tr>
                  <th className="px-4 py-3 text-start">{t('داخلہ نمبر', 'Adm #')}</th>
                  <th className="px-4 py-3 text-start">{t('نام طالب علم', 'Student Name')}</th>
                  <th className="px-4 py-3 text-start">{t('کلاس / درجہ', 'Current Class')}</th>
                  <th className="px-4 py-3 text-start">{t('سرپرست و رابطہ', 'Guardian & Contact')}</th>
                  <th className="px-4 py-3 text-start">{t('کیفیت', 'Status')}</th>
                  <th className="px-4 py-3 text-end">{t('تفصیلات', 'Details')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredStudents.map((s) => {
                  const enrollment = getStudentEnrollment(s.id);
                  const guardianLinks = getStudentGuardiansList(s.id);
                  const primaryGuardian = guardianLinks.find((g) => g.isPrimary) || guardianLinks[0];

                  return (
                    <tr key={s.id} className="hover:bg-stone-50/70 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-emerald-800">
                        {s.admission_number}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-stone-900">
                          {s.first_name} {s.last_name}
                        </div>
                        <div className="text-[11px] text-stone-400">
                          {s.gender === 'male' ? t('طالب علم', 'Male') : t('طالبہ', 'Female')} • {s.date_of_birth}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {enrollment ? (
                          <div>
                            <span className="font-semibold text-stone-800">{enrollment.class.name}</span>
                            <div className="text-[11px] text-stone-400 font-mono">
                              {enrollment.class.code} • {enrollment.academic_year}
                            </div>
                          </div>
                        ) : (
                          <span className="text-stone-400 italic text-[11px]">
                            {t('غیر مندرج', 'Not Enrolled')}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {primaryGuardian?.guardian ? (
                          <div>
                            <div className="font-semibold text-stone-800">
                              {primaryGuardian.guardian.full_name}{' '}
                              <span className="text-[10px] text-stone-400">({primaryGuardian.relationship})</span>
                            </div>
                            <div className="text-[11px] font-mono text-emerald-800 flex items-center gap-1">
                              <Phone className="w-3 h-3 text-emerald-600" />
                              <span>{primaryGuardian.guardian.phone}</span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-stone-400 italic text-[11px]">
                            {t('کوئی سرپرست نہیں', 'No guardian')}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            s.status === 'active'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : 'bg-stone-100 text-stone-700'
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-end">
                        <button
                          onClick={() => handleViewStudent(s)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-emerald-800 hover:bg-emerald-50 text-xs font-semibold border border-emerald-200 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{t('معائنہ', 'View')}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Student Details & Guardian Contact Modal */}
      {isDetailModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 border border-stone-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
              <h2 className="text-base font-bold text-stone-900 font-h2 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-800" />
                <span>{t('طالب علم کی تصدیقی معلومات', 'Student Verification Record')}</span>
              </h2>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Student Header */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-stone-900 font-h2">
                    {selectedStudent.first_name} {selectedStudent.last_name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-stone-500 font-mono">
                    <span className="font-bold text-emerald-800">{selectedStudent.admission_number}</span>
                    <span>•</span>
                    <span>{selectedStudent.admission_date}</span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {selectedStudent.status}
                </span>
              </div>

              {/* Bio Grid */}
              <div className="grid grid-cols-2 gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <span className="text-stone-400 block">{t('جنس:', 'Gender:')}</span>
                  <span className="font-semibold text-stone-800">
                    {selectedStudent.gender === 'male' ? t('مرد / طالب علم', 'Male') : t('خاتون / طالبہ', 'Female')}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block">{t('تاریخِ پیدائش:', 'Date of Birth:')}</span>
                  <span className="font-mono text-stone-800">{selectedStudent.date_of_birth}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">{t('رابطہ فون:', 'Contact Phone:')}</span>
                  <span className="font-mono text-stone-800">{selectedStudent.phone || t('درج نہیں', 'None')}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">{t('پتہ و رہائش:', 'Address:')}</span>
                  <span className="text-stone-800">{selectedStudent.address || t('درج نہیں', 'None')}</span>
                </div>
              </div>

              {/* Current Enrollment / Class Information */}
              <div className="border border-stone-200 rounded-xl p-3.5">
                <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-emerald-700" />
                  <span>{t('موجودہ کلاس و داخلہ ریکارڈ', 'Current Class & Enrollment')}</span>
                </h4>

                {selectedEnrollment ? (
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-stone-400">{t('کلاس کا نام:', 'Class Name:')} </span>
                      <strong className="text-stone-900">{selectedEnrollment.class.name}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400">{t('کلاس کوڈ:', 'Class Code:')} </span>
                      <strong className="text-emerald-800 font-mono">{selectedEnrollment.class.code}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400">{t('تعلیمی سال:', 'Academic Year:')} </span>
                      <strong className="text-stone-800 font-mono">{selectedEnrollment.academic_year}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400">{t('داخلہ تاریخ:', 'Enrollment Date:')} </span>
                      <strong className="text-stone-800 font-mono">{selectedEnrollment.enrollment_date}</strong>
                    </div>
                  </div>
                ) : (
                  <p className="text-stone-400 italic text-[11px]">
                    {t('اس طالب علم کا کوئی فعال کلاس داخلہ نہیں ہے۔', 'No active enrollment for this student.')}
                  </p>
                )}
              </div>

              {/* Guardian Contact Information */}
              <div className="border border-stone-200 rounded-xl p-3.5">
                <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-amber-700" />
                  <span>{t('قانونی سرپرست و ہنگامی رابطہ نمبرات', 'Guardian Contacts')}</span>
                </h4>

                {selectedGuardians.length === 0 ? (
                  <p className="text-stone-400 italic text-[11px]">
                    {t('کوئی سرپرست منسلک نہیں ہے۔', 'No linked guardians.')}
                  </p>
                ) : (
                  <div className="space-y-2">
                    {selectedGuardians.map((g, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between"
                      >
                        <div>
                          <div className="font-bold text-stone-900">
                            {g.guardian?.full_name}
                            <span className="ms-2 text-[10px] font-normal px-2 py-0.5 rounded bg-stone-200 text-stone-700">
                              {g.relationship}
                            </span>
                            {g.isPrimary && (
                              <span className="ms-1 text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                                {t('بنیادی سرپرست', 'Primary')}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-[11px] font-mono text-stone-600 mt-1">
                            <span className="flex items-center gap-1 text-emerald-800 font-bold">
                              <Phone className="w-3 h-3" />
                              {g.guardian?.phone}
                            </span>
                            {g.guardian?.alternate_phone && (
                              <span>• {g.guardian.alternate_phone}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsDetailModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs"
                >
                  {t('بند کریں', 'Close')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
