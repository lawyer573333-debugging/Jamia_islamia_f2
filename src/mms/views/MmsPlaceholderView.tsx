import React from 'react';
import {
  Construction,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Database,
  Layers,
  Search,
  Filter,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useMmsAuth } from '../context/MmsAuthContext';

interface MmsPlaceholderViewProps {
  moduleRoute: string;
  onNavigateMms: (route: string) => void;
}

export const MmsPlaceholderView: React.FC<MmsPlaceholderViewProps> = ({
  moduleRoute,
  onNavigateMms,
}) => {
  const { isRtl, t } = useLanguage();
  const { role } = useMmsAuth();

  // Map route to module title & planned feature list
  const getModuleDetails = (route: string) => {
    switch (route) {
      case 'mms_students':
        return {
          titleUrdu: 'شعبہ طلباء و کوائف',
          titleEnglish: 'Students Management',
          descriptionUrdu: 'طلباء کے مکمل داخلہ فارمز، سوانحیائف، تعلیمی ریکارڈ اور شناختی اسناد۔',
          descriptionEnglish: 'Complete student admission forms, personal profiles, bio-data, and documents.',
          features: [
            { ur: 'آن لائن داخلہ کی تصدیق اور رول نمبر الاٹمنٹ', en: 'Online admission verification & roll number allotment' },
            { ur: 'شعبہ و درجہ وار فلٹرز (درس نظامی، حفظ، عصری اسکول)', en: 'Departmental filters (Nizami, Hifz, School)' },
            { ur: 'طالب علم کا شناختی کارڈ اور تصدیقی کارڈ پرنٹنگ', en: 'Student ID card generation & printable clearance' },
          ],
        };
      case 'mms_teachers':
        return {
          titleUrdu: 'اساتذہ کرام و ملازمین',
          titleEnglish: 'Teachers & Faculty Directory',
          descriptionUrdu: 'اساتذہ کرام کے تدریسی کوائف، مفوضہ کتب، درجات اور نظام الاوقات۔',
          descriptionEnglish: 'Teacher credentials, assigned books, lecture schedules, and workload.',
          features: [
            { ur: 'اساتذہ کے مفوضہ پیریڈز اور گھنٹوں کی تقسیم', en: 'Class periods and timetable assignment' },
            { ur: 'ماہانہ تدریسی کارکردگی اور جائزہ رپورٹ', en: 'Monthly teaching performance assessment' },
            { ur: 'سوانحی ریکارڈ اور تعلیمی اسناد ذخیرہ', en: 'Biographical profiles and educational credentials' },
          ],
        };
      case 'mms_classes':
      case 'mms_teacher_classes':
        return {
          titleUrdu: 'کلاسز، شعبہ جات و درجات',
          titleEnglish: 'Classes & Grade Sections',
          descriptionUrdu: 'اعدادیہ تا دورۂ حدیث، حفظ کے حلقہ جات اور عصری اسکول کے درجات کا انتظام۔',
          descriptionEnglish: 'Class groupings from Nizami introductory to Dora-e-Hadith, Hifz halqas, and school.',
          features: [
            { ur: 'کمرہ جماعت الاٹمنٹ اور نگران استاذ کی تقرری', en: 'Classroom allotment & in-charge teacher assignment' },
            { ur: 'نصابِ تعلیم اور سالانہ کتب کی فہرست', en: 'Curriculum syllabus & annual booklist mapping' },
            { ur: 'سیکشن و درجات کی گنجائش اور نشستیں', en: 'Classroom capacity and seating quotas' },
          ],
        };
      case 'mms_attendance':
      case 'mms_teacher_attendance':
      case 'mms_teacher_my_attendance':
      case 'mms_parent_attendance':
        return {
          titleUrdu: 'حاضری و رخصت کا باقاعدہ نظام',
          titleEnglish: 'Attendance & Leave Registry',
          descriptionUrdu: 'طلباء اور اساتذہ کی یومیہ، ہفتہ وار اور ماہانہ حاضری کا تفصیلی آڈٹ ٹریک۔',
          descriptionEnglish: 'Daily, weekly, and monthly attendance tracking for students and faculty.',
          features: [
            { ur: 'بایومیٹرک یا آن لائن حاضری مارکنگ', en: 'Biometric / digital one-click marking' },
            { ur: 'غیر حاضری پر سرپرست کو خودکار ایس ایم ایس اطلاع', en: 'Automated SMS notification to parent upon absence' },
            { ur: 'رخصت کی درخواست اور مہتمم صاحب کی منظوری', en: 'Leave request workflow and management approval' },
          ],
        };
      case 'mms_exams':
      case 'mms_teacher_exams':
      case 'mms_parent_exams':
        return {
          titleUrdu: 'امتحانات، نمبرات و نتائج',
          titleEnglish: 'Examinations & Results Module',
          descriptionUrdu: 'ششماہی و سالانہ امتحانات، ڈیٹ شیٹ، نمبرات کا اندراج اور ڈیجیٹل رزلٹ کارڈ۔',
          descriptionEnglish: 'Term exams, mark sheets, grade cards, and official transcripts.',
          features: [
            { ur: 'پرچہ جات کے نمبرات کا محفوظ اندراج', en: 'Secure score entry and grade boundaries' },
            { ur: 'وفاق المدارس طرز پر پوزیشن اور گریڈنگ (ممتاز، جید جدا، جید، مقبول)', en: 'Wifaq-ul-Madaris grading rubric' },
            { ur: 'مکمل تصدیقی رزلٹ کارڈ کی پرنٹنگ', en: 'Printable verified report cards with QR code' },
          ],
        };
      case 'mms_fees':
      case 'mms_counter_fees':
      case 'mms_parent_fees':
        return {
          titleUrdu: 'فیس و مالیاتی واجبات',
          titleEnglish: 'Fee Accounts & Dues Ledger',
          descriptionUrdu: 'طلباء کے ماہانہ تعلیمی، ہاسٹل اور مطعم فیس چالان اور آن لائن تصدیق۔',
          descriptionEnglish: 'Monthly tuition, hostel, and mess fee challans with ledger reconciliation.',
          features: [
            { ur: 'خودکار ماہانہ فیس چالان جنریشن', en: 'Automated monthly challan generation' },
            { ur: 'کیش، بینک اور آن لائن ادائیگی ریکارڈ', en: 'Cash, bank deposit, and online payment recording' },
            { ur: 'واجب الادا فیس کی فہرست اور یاد دہانی سرکلر', en: 'Defaulter aging list and SMS payment reminders' },
          ],
        };
      case 'mms_donations':
      case 'mms_counter_donations':
      case 'mms_counter_zakat':
      case 'mms_counter_sadaqah':
        return {
          titleUrdu: 'عطیات، زکوٰۃ و صدقات',
          titleEnglish: 'Donations, Zakat & Sadaqah',
          descriptionUrdu: 'مخیر حضرات کے عطیات، زکوٰۃ فنڈ، صدقات اور تعمیری فنڈ کا شفاف حساب کتاب۔',
          descriptionEnglish: 'Donor register, Zakat allocations, Sadaqah, and infrastructure funds.',
          features: [
            { ur: 'فوری تصدیقی رسید اور واؤچر کا اجراء', en: 'Instant verified receipt issuance' },
            { ur: 'زکوٰۃ فنڈ کے شرعی مصارف کا علاحدہ کھاتہ', en: 'Segregated Zakat compliant ledger accounts' },
            { ur: 'مخیر حضرات کے لیے سالانہ رپورٹ اور شکریہ نامہ', en: 'Annual donor ledger & appreciation letters' },
          ],
        };
      case 'mms_expenses':
        return {
          titleUrdu: 'جامعہ کے عمومی اخراجات',
          titleEnglish: 'Institutional Expense Management',
          descriptionUrdu: 'مطعم راشن، بجلی، گیس، مرمت، اسٹیشنری اور بلز کے اخراجات کا آڈٹ۔',
          descriptionEnglish: 'Mess ration, utilities, maintenance, stationery, and institutional bills.',
          features: [
            { ur: 'اخراجات کے واؤچر اور رسید کا اندراج', en: 'Expense voucher recording with invoice upload' },
            { ur: 'ماہانہ بجٹ اور شعبہ وار موازنہ', en: 'Budget limits vs actual departmental burn' },
            { ur: 'آڈٹ رپورٹ برائے شوریٰ و معتمدین', en: 'Audit ready statement for Governing Board' },
          ],
        };
      case 'mms_salaries':
        return {
          titleUrdu: 'تنخواہیں و وظائف ملازمین',
          titleEnglish: 'Payroll & Faculty Salaries',
          descriptionUrdu: 'اساتذہ کرام اور ملازمین کے ماہانہ وظائف، کٹوتی اور ادائیگی سلپس۔',
          descriptionEnglish: 'Monthly staff honorarium, advances, allowances, and salary slips.',
          features: [
            { ur: 'ماہانہ پے رول شیٹ کی تیاری', en: 'Monthly payroll generation' },
            { ur: 'حاضری کی بنیاد پر کٹوتی یا بونس', en: 'Attendance linked adjustments' },
            { ur: 'پرنٹ ایبل تنخواہ سلپ (Pay Slip)', en: 'Printable payslip with institutional stamp' },
          ],
        };
      case 'mms_hostel':
        return {
          titleUrdu: 'دار الاقامہ (ہاسٹل و رہائش)',
          titleEnglish: 'Hostel & Residential Wing',
          descriptionUrdu: 'طلباء کی رہائش، کمرہ و بستر الاٹمنٹ اور رات کی حاضری چیکنگ۔',
          descriptionEnglish: 'Hostel rooms, bed allotments, warden night rolls, and discipline.',
          features: [
            { ur: 'کمرہ وار اور بیڈ وار گنجائش کا جائزہ', en: 'Room and bed inventory tracking' },
            { ur: 'ہاسٹل چھوڑنے اور گیٹ پاس کا انتظام', en: 'Gate pass and weekend leave permissions' },
            { ur: 'وارڈن نائٹ رول کال سسٹم', en: 'Night attendance roll call register' },
          ],
        };
      case 'mms_kitchen':
        return {
          titleUrdu: 'مطعم و کچن (طعام طلباء)',
          titleEnglish: 'Kitchen, Mess & Nutrition',
          descriptionUrdu: 'مقیم طلباء کے صبح و شام طعام کا مینو، راشن کھپت اور صفائی معائنہ۔',
          descriptionEnglish: 'Weekly meal menus, dietary ration consumption, and hygiene inspection.',
          features: [
            { ur: 'ہفتہ وار کھانے کا مینو (صبح، دوپہر، شام)', en: 'Weekly meal schedule (Breakfast, Lunch, Dinner)' },
            { ur: 'یومیہ راشن استعمال اور باقیات', en: 'Daily ration issue register' },
            { ur: 'اسپیشل افطاری و تقریبات کا طعام پلان', en: 'Special Ramadan iftar and event meal planning' },
          ],
        };
      case 'mms_inventory':
        return {
          titleUrdu: 'اسٹاک و سامانِ جامعہ',
          titleEnglish: 'Inventory & Asset Store',
          descriptionUrdu: 'کتب، درسی کتب، فرنیچر، برقی سامان اور راشن کا سنٹرل اسٹور۔',
          descriptionEnglish: 'Books, furniture, electrical fixtures, and mess supply store.',
          features: [
            { ur: 'کم اسٹاک کی خودکار پیشگی الرٹ', en: 'Low-stock automated threshold alerts' },
            { ur: 'شعبہ جات کو سامان جاری کرنے کی رسید', en: 'Departmental issuance requisition slips' },
            { ur: 'جامعہ کے اثاثہ جات کی مکمل ٹیگنگ', en: 'Asset registration and tracking' },
          ],
        };
      case 'mms_purchases':
        return {
          titleUrdu: 'خریداری و پرچیز آرڈرز',
          titleEnglish: 'Purchases & Procurement',
          descriptionUrdu: 'وینڈرز، کوٹیشنز اور باضابطہ خریداری کے بلز کا انتظام۔',
          descriptionEnglish: 'Vendor management, comparative quotes, purchase orders.',
          features: [
            { ur: 'پرچیز آرڈر (PO) کی تیاری اور منظوری', en: 'Purchase order requisition workflow' },
            { ur: 'وینڈر لیجر اور ادائیگیاں', en: 'Vendor ledger and aging payments' },
            { ur: 'سامان وصولی کی تصدیق (GRN)', en: 'Goods received notes (GRN)' },
          ],
        };
      case 'mms_reports':
        return {
          titleUrdu: 'جامع تجزیاتی رپورٹس',
          titleEnglish: 'Reports & Analytics',
          descriptionUrdu: 'تعلیمی نتائج، مالیاتی صورتحال اور حاضری کے گراف اور ایکسپورٹ۔',
          descriptionEnglish: 'Academic results, financial health, and institutional audit reports.',
          features: [
            { ur: 'پی ڈی ایف اور ایکسل میں باآسانی ڈاؤنلوڈ', en: 'One-click export to PDF and Excel' },
            { ur: 'سالانہ مجلسِ شوریٰ کی رپورٹ', en: 'Annual Governing Council presentation deck' },
            { ur: 'طویل مدتی تعلیمی و مالیاتی رجحانات', en: 'Historical enrollment and financial trends' },
          ],
        };
      case 'mms_announcements':
      case 'mms_teacher_announcements':
      case 'mms_counter_announcements':
      case 'mms_parent_announcements':
        return {
          titleUrdu: 'اعلانات و نوٹس بورڈ',
          titleEnglish: 'Circulars & Announcements',
          descriptionUrdu: 'اساتذہ، عملہ اور اولیاء کرام کے لیے اہم سرکلرز اور پیغامات۔',
          descriptionEnglish: 'Internal notices, holiday circulars, and stakeholder broadcasts.',
          features: [
            { ur: 'کردار کی بنیاد پر ٹارگٹڈ اعلانات', en: 'Targeted broadcast by user role' },
            { ur: 'دستاویز یا پی ڈی ایف سرکلر کا اٹیچمنٹ', en: 'PDF and document attachments' },
            { ur: 'سرپرستوں کو فوری ایس ایم ایس یا واٹس ایپ نوٹیفکیشن', en: 'SMS / WhatsApp delivery triggers' },
          ],
        };
      case 'mms_settings':
      case 'mms_teacher_profile':
      case 'mms_counter_profile':
      case 'mms_parent_profile':
        return {
          titleUrdu: 'پورٹل سیٹنگز و پروفائل',
          titleEnglish: 'System Settings & Profile',
          descriptionUrdu: 'صارف کے کوائف، پاس ورڈ کی تبدیلی، سسٹم بیک اپ اور اختیارات۔',
          descriptionEnglish: 'User credentials, password update, system backups, and permissions.',
          features: [
            { ur: 'پاس ورڈ اور سیکیورٹی کی تجدید', en: 'Password reset and security credentials' },
            { ur: 'سسٹم بیک اپ اور ڈیٹا بیس ایکسپورٹ', en: 'System database backup and export' },
            { ur: 'کردار کی اجازتیں اور سیکیورٹی رولز', en: 'Role-based access control (RBAC)' },
          ],
        };
      default:
        return {
          titleUrdu: 'ماڈیول زیرِ تعمیر',
          titleEnglish: 'Module Under Development',
          descriptionUrdu: 'یہ ماڈیول فیز ۱ کے ابتدائی فریم ورک میں شامل ہے اور فیز ۲ میں فعال ہو گا۔',
          descriptionEnglish: 'This module is scheduled for full operational deployment in Phase 2.',
          features: [
            { ur: 'مکمل ڈیٹا بیس انضمام', en: 'Full database integration' },
            { ur: 'تفصیلی ڈیٹا گرڈ اور تلاش', en: 'Data grid and multi-criteria filters' },
            { ur: 'رپورٹ ایکسپورٹ اور پرنٹنگ', en: 'Export and printable reporting' },
          ],
        };
    }
  };

  const details = getModuleDetails(moduleRoute);

  // Return to appropriate dashboard based on role
  const getDashboardRoute = () => {
    switch (role) {
      case 'teacher': return 'mms_teacher';
      case 'counter': return 'mms_counter';
      case 'parent': return 'mms_parent';
      case 'mudeer':
      default:
        return 'mms_dashboard';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1.5">
                <Construction className="w-3.5 h-3.5 text-amber-700" />
                <span>{t('مرحلہ ۲ — زیرِ تکمیل', 'Phase 2 — Under Development')}</span>
              </span>
              <span className="text-xs text-stone-400 font-mono">
                #{moduleRoute}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-h2">
              {t(details.titleUrdu, details.titleEnglish)}
            </h1>

            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
              {t(details.descriptionUrdu, details.descriptionEnglish)}
            </p>
          </div>

          <button
            onClick={() => onNavigateMms(getDashboardRoute())}
            className="self-start sm:self-center px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold border border-stone-200 flex items-center gap-2 transition-colors"
          >
            {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{t('ڈیش بورڈ پر واپس جائیں', 'Back to Dashboard')}</span>
          </button>
        </div>
      </div>

      {/* Planned Capabilities Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Planned Features */}
        <div className="md:col-span-5 bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-800" />
            <h3 className="text-base font-bold text-stone-900 font-h2">
              {t('منصوبہ بند خصوصیات (فیز ۲)', 'Planned Specifications (Phase 2)')}
            </h3>
          </div>

          <p className="text-xs text-stone-500">
            {t(
              'جب سپابیس (Supabase) یا رئیل ڈیٹا بیس جوڑا جائے گا، تو اس ماڈیول میں درج ذیل مکمل خودکار صلاحیتیں فعال ہوں گی:',
              'When Supabase / relational database is connected in Phase 2, this module will provide:'
            )}
          </p>

          <ul className="space-y-3 pt-2">
            {details.features.map((f, i) => (
              <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{t(f.ur, f.en)}</span>
              </li>
            ))}
          </ul>

          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              {t(
                'اس ماڈیول کی ڈیٹا ماڈلنگ اور اسکیما پہلے سے تیار ہے۔',
                'Data schemas & TypeScript interfaces are prepared for rapid backend binding.'
              )}
            </span>
          </div>
        </div>

        {/* UI Mockup / Skeleton Preview */}
        <div className="md:col-span-7 bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-800 font-h2">
              {t('ماڈیول کا پیشگی خاکہ (UI Preview Mockup)', 'Module Interface Blueprint')}
            </h3>
            <span className="text-[11px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
              Mock Preview
            </span>
          </div>

          {/* Simulated search & filter bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
            <div className="relative flex-1 min-w-[180px]">
              <input
                disabled
                placeholder={t('تلاش کریں... (غیر فعال ماک)', 'Search records... (mock input)')}
                className="w-full ps-8 pe-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs opacity-70"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute start-2.5 top-2.5" />
            </div>

            <button
              disabled
              className="px-3 py-1.5 rounded-lg bg-stone-200 text-stone-600 text-xs flex items-center gap-1.5 opacity-70"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>{t('فلٹرز', 'Filters')}</span>
            </button>
          </div>

          {/* Skeleton Rows */}
          <div className="space-y-2.5 pt-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="p-3.5 rounded-xl border border-stone-100 bg-stone-50/60 flex items-center justify-between"
              >
                <div className="space-y-1.5">
                  <div className="w-40 sm:w-56 h-3 bg-stone-200 rounded animate-pulse" />
                  <div className="w-24 sm:w-36 h-2 bg-stone-200 rounded animate-pulse" />
                </div>
                <div className="w-16 h-6 bg-stone-200 rounded-lg animate-pulse" />
              </div>
            ))}
          </div>

          <p className="text-[11px] text-stone-400 text-center pt-2">
            {t(
              'فیز ۱ میں بنیادی ڈیش بورڈز اور نیویگیشن شیل مکمل فعال ہیں۔',
              'Phase 1 provides complete interactive role dashboards and navigation shells.'
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
