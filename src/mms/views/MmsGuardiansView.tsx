import React, { useState, useEffect } from 'react';
import {
  Shield,
  Search,
  Plus,
  Eye,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  Briefcase,
  MapPin,
  Users,
  X,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { phase3Service } from '../services/phase3DataService';
import { DbGuardian, GuardianWithStudents } from '../types';

interface MmsGuardiansViewProps {
  onNavigateMms: (route: string) => void;
}

export const MmsGuardiansView: React.FC<MmsGuardiansViewProps> = ({ onNavigateMms }) => {
  const { t } = useLanguage();

  const [guardians, setGuardians] = useState<GuardianWithStudents[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Modals
  const [selectedGuardian, setSelectedGuardian] = useState<GuardianWithStudents | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [editingGuardian, setEditingGuardian] = useState<DbGuardian | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    full_name: '',
    relationship: 'والد (Father)',
    phone: '',
    email: '',
    address: '',
    occupation: '',
    notes: '',
  });

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await phase3Service.getGuardians({ search: searchTerm });
      setGuardians(data);
    } catch (err) {
      console.error(err);
      setFeedback({ type: 'error', message: t('ڈیٹا لوڈ کرنے میں خرابی ہوئی۔', 'Failed to load guardians.') });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [searchTerm]);

  const handleOpenAdd = () => {
    setEditingGuardian(null);
    setFormData({
      full_name: '',
      relationship: 'والد (Father)',
      phone: '',
      email: '',
      address: '',
      occupation: '',
      notes: '',
    });
    setFeedback(null);
    setIsAddEditModalOpen(true);
  };

  const handleOpenEdit = (guardian: DbGuardian) => {
    setEditingGuardian(guardian);
    setFormData({
      full_name: guardian.full_name,
      relationship: guardian.relationship,
      phone: guardian.phone,
      email: guardian.email || '',
      address: guardian.address || '',
      occupation: guardian.occupation || '',
      notes: guardian.notes || '',
    });
    setFeedback(null);
    setIsAddEditModalOpen(true);
  };

  const handleOpenView = (guardian: GuardianWithStudents) => {
    setSelectedGuardian(guardian);
    setIsViewModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      if (editingGuardian) {
        const res = await phase3Service.updateGuardian(editingGuardian.id, formData);
        if (res.success) {
          setFeedback({ type: 'success', message: t('سرپرست کی معلومات تبدیل ہو گئیں۔', 'Guardian updated successfully.') });
          setIsAddEditModalOpen(false);
          await loadData();
        } else {
          setFeedback({ type: 'error', message: res.error || 'Failed' });
        }
      } else {
        const res = await phase3Service.createGuardian(formData);
        if (res.success) {
          setFeedback({ type: 'success', message: t('نیا سرپرست شامل کر لیا گیا۔', 'Guardian added successfully.') });
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

  const handleDelete = async (guardian: GuardianWithStudents) => {
    if (guardian.students && guardian.students.length > 0) {
      alert(
        t(
          `اس سرپرست سے ${guardian.students.length} طلباء وابستہ ہیں۔ براہِ کرم پہلے ان کا تعلق ختم کریں۔`,
          `This guardian has ${guardian.students.length} linked students. Please unlink them first.`
        )
      );
      return;
    }

    if (!window.confirm(t(`کیا آپ سرپرست "${guardian.full_name}" کو حذف کرنا چاہتے ہیں؟`, `Delete guardian "${guardian.full_name}"?`))) {
      return;
    }

    try {
      const res = await phase3Service.deleteGuardian(guardian.id);
      if (res.success) {
        setFeedback({ type: 'success', message: t('سرپرست کا ریکارڈ حذف ہو گیا۔', 'Guardian deleted.') });
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
              {t('اولیاء کرام و سرپرست ڈائرکٹری', 'Guardians & Parents Directory')}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
              {t('فیز ۳ — بنیاد', 'Phase 3')}
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            {t(
              'طلباء کے والدین، قانونی سرپرستوں کے فون نمبر، پتے اور خاندانی روابط کا جامع ریکارڈ۔',
              'Directory of parents, legal guardians, emergency contacts, and linked student relationships.'
            )}
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>{t('نیا سرپرست درج کریں', 'Add New Guardian')}</span>
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

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute start-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('نام، موبائل نمبر، پیشہ یا پتے سے تلاش کریں...', 'Search guardians by name, phone, occupation, or address...')}
            className="w-full ps-9 pe-4 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Guardians Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-stone-500 text-xs">
            <div className="w-8 h-8 border-2 border-emerald-800 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <span>{t('سرپرستوں کا ریکارڈ لوڈ ہو رہا ہے...', 'Loading guardians...')}</span>
          </div>
        ) : guardians.length === 0 ? (
          <div className="p-12 text-center text-stone-500">
            <Shield className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <p className="font-semibold text-sm text-stone-700">
              {t('کوئی سرپرست نہیں ملا', 'No guardians found')}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead className="bg-stone-50 text-stone-600 border-b border-stone-200 uppercase font-semibold tracking-wider text-[11px]">
                <tr>
                  <th className="px-4 py-3 text-start">{t('نام سرپرست', 'Guardian Name')}</th>
                  <th className="px-4 py-3 text-start">{t('رشتے کی نوعیت', 'Relationship')}</th>
                  <th className="px-4 py-3 text-start">{t('رابطہ فون نمبر', 'Phone')}</th>
                  <th className="px-4 py-3 text-start">{t('پیشہ و کام', 'Occupation')}</th>
                  <th className="px-4 py-3 text-start">{t('منسلک طلباء', 'Linked Students')}</th>
                  <th className="px-4 py-3 text-end">{t('اقدامات', 'Actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {guardians.map((g) => (
                  <tr key={g.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-bold text-stone-900">{g.full_name}</div>
                      {g.email && <div className="text-[11px] text-stone-400 font-mono">{g.email}</div>}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-lg bg-stone-100 text-stone-700 font-medium">
                        {g.relationship}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono font-semibold text-stone-800">
                      {g.phone}
                    </td>
                    <td className="px-4 py-3 text-stone-600">
                      {g.occupation || <span className="text-stone-300">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      {g.students && g.students.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {g.students.map((sg) => (
                            <span
                              key={sg.id}
                              className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-[11px]"
                            >
                              {sg.student.first_name} {sg.student.last_name}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-stone-400 italic text-[11px]">
                          {t('کوئی طالب علم منسلک نہیں', 'None linked')}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-end">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => handleOpenView(g)}
                          title={t('تفصیلات دیکھیں', 'View details')}
                          className="p-1.5 rounded-lg text-stone-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(g)}
                          title={t('ترمیم کریں', 'Edit')}
                          className="p-1.5 rounded-lg text-stone-500 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(g)}
                          title={t('حذف کریں', 'Delete')}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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
                <Shield className="w-5 h-5 text-emerald-800" />
                <span>
                  {editingGuardian
                    ? t('سرپرست کی تفصیلات میں ترمیم', 'Edit Guardian Information')
                    : t('نئے سرپرست کا اندراج', 'Add New Guardian')}
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
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {t('مکمل نام (Full Name) *', 'Full Name *')}
                </label>
                <input
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  placeholder="e.g. عبد الرحمٰن صدیقی"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {t('رشتے کی نوعیت (Relationship) *', 'Relationship *')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.relationship}
                    onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                    placeholder="e.g. والد (Father), چچا, والدہ"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {t('موبائل فون نمبر (Phone) *', 'Phone Number *')}
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {t('ای میل ایڈریس (Email)', 'Email Address')}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="parent@example.com"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {t('پیشہ و ملازمت (Occupation)', 'Occupation')}
                  </label>
                  <input
                    type="text"
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    placeholder="e.g. تاجر (Businessman), وکیل"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {t('رہائشی پتہ (Residential Address)', 'Residential Address')}
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. مکان نمبر ۱۲، اسٹریٹ ۴، میرپور"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
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
                  {isSubmitting ? t('محفوظ ہو رہا ہے...', 'Saving...') : t('محفوظ کریں', 'Save Guardian')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 2. View Guardian & Linked Students Modal */}
      {/* ==================================================================== */}
      {isViewModalOpen && selectedGuardian && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-stone-200 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <h2 className="text-lg font-bold text-stone-900 font-h2">{selectedGuardian.full_name}</h2>
                <span className="text-xs text-stone-500">{selectedGuardian.relationship}</span>
              </div>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-stone-700">
                <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="font-mono font-semibold">{selectedGuardian.phone}</span>
              </div>
              {selectedGuardian.email && (
                <div className="flex items-center gap-2 text-stone-700">
                  <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{selectedGuardian.email}</span>
                </div>
              )}
              {selectedGuardian.occupation && (
                <div className="flex items-center gap-2 text-stone-700">
                  <Briefcase className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{selectedGuardian.occupation}</span>
                </div>
              )}
              {selectedGuardian.address && (
                <div className="flex items-center gap-2 text-stone-700">
                  <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{selectedGuardian.address}</span>
                </div>
              )}
            </div>

            {/* Linked Students List */}
            <div>
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-800" />
                <span>{t('وابستہ طلباء (Linked Students)', 'Linked Students')}</span>
              </h3>

              {selectedGuardian.students && selectedGuardian.students.length > 0 ? (
                <div className="space-y-2">
                  {selectedGuardian.students.map((link) => (
                    <div
                      key={link.id}
                      className="p-3 rounded-xl border border-stone-200 bg-white flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-bold text-stone-900">
                          {link.student.first_name} {link.student.last_name}
                        </div>
                        <div className="text-[11px] text-stone-500 font-mono">
                          {t('داخلہ نمبر:', 'Adm #:')} {link.student.admission_number}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {link.is_primary && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-800 font-bold">
                            {t('پرائمری', 'Primary')}
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-bold">
                          {link.relationship}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-stone-400 italic p-3 bg-stone-50 rounded-xl">
                  {t('اس سرپرست سے کوئی طالب علم وابستہ نہیں ہے۔', 'No students currently linked.')}
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
