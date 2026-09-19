import React, { useState, useEffect } from 'react';
import {
  BookmarkCheck,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  GraduationCap,
  X,
  Filter,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { phase3Service } from '../services/phase3DataService';
import {
  DbClass,
  DbSubject,
  DbTeacher,
  ClassSubjectWithDetails,
} from '../types';

interface MmsClassSubjectsViewProps {
  onNavigateMms: (route: string) => void;
}

export const MmsClassSubjectsView: React.FC<MmsClassSubjectsViewProps> = ({ onNavigateMms }) => {
  const { t } = useLanguage();

  const [classes, setClasses] = useState<DbClass[]>([]);
  const [subjects, setSubjects] = useState<DbSubject[]>([]);
  const [teachers, setTeachers] = useState<DbTeacher[]>([]);

  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [assignedSubjects, setAssignedSubjects] = useState<ClassSubjectWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal for Assigning Subject
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [assignForm, setAssignForm] = useState({
    subject_id: '',
    teacher_id: '',
  });

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [classesData, subjectsData, teachersData] = await Promise.all([
        phase3Service.getClasses(),
        phase3Service.getSubjects(),
        phase3Service.getTeachers(),
      ]);
      setClasses(classesData);
      setSubjects(subjectsData);
      setTeachers(teachersData);

      if (classesData.length > 0 && !selectedClassId) {
        setSelectedClassId(classesData[0].id);
      }
    } catch (err) {
      console.error(err);
      setFeedback({ type: 'error', message: t('ڈیٹا لوڈ کرنے میں خرابی ہوئی۔', 'Failed to load initial data.') });
    } finally {
      setLoading(false);
    }
  };

  const loadAssignedSubjects = async (classId: string) => {
    if (!classId) return;
    try {
      const data = await phase3Service.getClassSubjects(classId);
      setAssignedSubjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (selectedClassId) {
      loadAssignedSubjects(selectedClassId);
    }
  }, [selectedClassId]);

  const handleOpenAssignModal = () => {
    setAssignForm({
      subject_id: subjects[0]?.id || '',
      teacher_id: teachers[0]?.id || '',
    });
    setFeedback(null);
    setIsAssignModalOpen(true);
  };

  const handleAssignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClassId || !assignForm.subject_id) return;
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const res = await phase3Service.assignSubjectToClass({
        class_id: selectedClassId,
        subject_id: assignForm.subject_id,
        teacher_id: assignForm.teacher_id ? assignForm.teacher_id : null,
      });

      if (res.success) {
        setFeedback({ type: 'success', message: t('مضمون کلاس کو کامیابی سے تفویض ہو گیا۔', 'Subject assigned to class successfully.') });
        setIsAssignModalOpen(false);
        await loadAssignedSubjects(selectedClassId);
      } else {
        setFeedback({ type: 'error', message: res.error || 'Failed' });
      }
    } catch (err: unknown) {
      setFeedback({ type: 'error', message: err instanceof Error ? err.message : 'Error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveAssignment = async (assignmentId: string, subjectName: string) => {
    if (
      !window.confirm(
        t(
          `کیا آپ کلاس سے مضمون "${subjectName}" کا تفویض ختم کرنا چاہتے ہیں؟`,
          `Are you sure you want to unassign subject "${subjectName}" from this class?`
        )
      )
    ) {
      return;
    }

    try {
      const res = await phase3Service.removeClassSubject(assignmentId);
      if (res.success) {
        setFeedback({ type: 'success', message: t('مضمون کا تفویض ختم کر دیا گیا۔', 'Subject unassigned from class.') });
        await loadAssignedSubjects(selectedClassId);
      } else {
        setFeedback({ type: 'error', message: res.error || 'Failed' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const selectedClass = classes.find((c) => c.id === selectedClassId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 font-h2">
              {t('کلاس مضامین تفویض (Class Subjects Assignment)', 'Class Subjects Assignment')}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              {t('فیز ۳ — بنیاد', 'Phase 3')}
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            {t(
              'ہر کلاس کے لیے نصابی کتب اور متعلقہ مضمون پڑھانے والے اساتذہ کرام کی باضابطہ تخصیص۔',
              'Link curriculum subjects to specific classrooms and designate subject teachers.'
            )}
          </p>
        </div>

        <button
          onClick={handleOpenAssignModal}
          disabled={!selectedClassId}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs transition-colors shadow-xs disabled:opacity-50"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>{t('کلاس میں نیا مضمون تفویض کریں', 'Assign Subject to Class')}</span>
        </button>
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

      {/* Class Selector Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
            <Filter className="w-4 h-4 text-emerald-700" />
            <span>{t('کلاس / درجہ کا انتخاب کریں:', 'Select Class / Level:')}</span>
          </div>

          <div className="sm:w-80">
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white"
            >
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.code}) - {c.academic_year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedClass && (
          <div className="mt-3 pt-3 border-t border-stone-100 flex flex-wrap items-center gap-4 text-xs text-stone-500">
            <span>
              {t('سیکشن:', 'Section:')} <strong className="text-stone-800">{selectedClass.section || 'عام'}</strong>
            </span>
            <span>•</span>
            <span>
              {t('نگران استاذ:', 'Class Teacher:')}{' '}
              <strong className="text-stone-800">
                {teachers.find((t) => t.id === selectedClass.teacher_id)?.full_name || t('مقرر نہیں', 'None')}
              </strong>
            </span>
            <span>•</span>
            <span>
              {t('مضامین کی کل تعداد:', 'Total Assigned Subjects:')}{' '}
              <strong className="text-emerald-800 font-mono">{assignedSubjects.length}</strong>
            </span>
          </div>
        )}
      </div>

      {/* Assigned Subjects Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-stone-500 text-xs">
            <div className="w-8 h-8 border-2 border-emerald-800 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <span>{t('مضامین لوڈ ہو رہے ہیں...', 'Loading assigned subjects...')}</span>
          </div>
        ) : assignedSubjects.length === 0 ? (
          <div className="p-12 text-center text-stone-500">
            <BookmarkCheck className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <p className="font-semibold text-sm text-stone-700">
              {t('اس کلاس میں کوئی مضمون شامل نہیں ہے', 'No subjects assigned to this class yet')}
            </p>
            <button
              onClick={handleOpenAssignModal}
              className="mt-3 px-3 py-1.5 rounded-xl bg-emerald-800 text-white font-semibold text-xs inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t('پہلا مضمون تفویض کریں', 'Assign First Subject')}</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead className="bg-stone-50 text-stone-600 border-b border-stone-200 uppercase font-semibold tracking-wider text-[11px]">
                <tr>
                  <th className="px-4 py-3 text-start">{t('کوڈ', 'Subject Code')}</th>
                  <th className="px-4 py-3 text-start">{t('نام کتاب / مضمون', 'Subject Name')}</th>
                  <th className="px-4 py-3 text-start">{t('زمرہ', 'Category')}</th>
                  <th className="px-4 py-3 text-start">{t('مضمون استاذ (Subject Teacher)', 'Assigned Teacher')}</th>
                  <th className="px-4 py-3 text-end">{t('اقدامات', 'Actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {assignedSubjects.map((asgn) => (
                  <tr key={asgn.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-emerald-800">
                      {asgn.subject.code}
                    </td>
                    <td className="px-4 py-3 font-bold text-stone-900">
                      {asgn.subject.name}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-stone-100 text-stone-700">
                        {asgn.subject.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {asgn.teacher ? (
                        <div className="flex items-center gap-1.5 text-stone-800">
                          <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
                          <span className="font-semibold">{asgn.teacher.full_name}</span>
                          <span className="text-[11px] text-stone-400 font-mono">
                            ({asgn.teacher.employee_number})
                          </span>
                        </div>
                      ) : (
                        <span className="text-stone-400 italic text-[11px]">
                          {t('کوئی استاذ تفویض نہیں', 'No teacher assigned')}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-end">
                      <button
                        onClick={() => handleRemoveAssignment(asgn.id, asgn.subject.name)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-rose-700 hover:bg-rose-50 transition-colors text-xs font-semibold"
                        title={t('تفویض ختم کریں', 'Remove assignment')}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{t('ختم کریں', 'Remove')}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ==================================================================== */}
      {/* Assign Subject Modal */}
      {/* ==================================================================== */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
              <h2 className="text-sm font-bold text-stone-900 font-h2 flex items-center gap-2">
                <BookmarkCheck className="w-4 h-4 text-emerald-800" />
                <span>{t('کلاس میں مضمون شامل کریں', 'Assign Subject to Class')}</span>
              </h2>
              <button
                onClick={() => setIsAssignModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAssignSubmit} className="space-y-3.5 text-xs">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-500">{t('منتخب کلاس:', 'Selected Class:')} </span>
                <strong className="text-stone-900">{selectedClass?.name} ({selectedClass?.code})</strong>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {t('مضمون منتخب کریں *', 'Select Subject *')}
                </label>
                <select
                  required
                  value={assignForm.subject_id}
                  onChange={(e) => setAssignForm({ ...assignForm, subject_id: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="">{t('-- مضمون منتخب کریں --', '-- Select Subject --')}</option>
                  {subjects.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name} ({sub.code}) - {sub.category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {t('تدریس کے لیے استاذ تفویض کریں (اختیاری)', 'Assign Subject Teacher (Optional)')}
                </label>
                <select
                  value={assignForm.teacher_id}
                  onChange={(e) => setAssignForm({ ...assignForm, teacher_id: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="">{t('-- کوئی استاذ مقرر نہیں --', '-- No teacher --')}</option>
                  {teachers.map((tch) => (
                    <option key={tch.id} value={tch.id}>
                      {tch.full_name} ({tch.employee_number}) - {tch.specialization}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsAssignModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100"
                >
                  {t('منسوخ', 'Cancel')}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !assignForm.subject_id}
                  className="px-5 py-2 rounded-xl font-bold bg-emerald-800 hover:bg-emerald-900 text-white transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? t('محفوظ ہو رہا ہے...', 'Saving...') : t('تفویض کریں', 'Assign Subject')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
