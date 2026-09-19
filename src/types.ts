export type Language = 'ur' | 'en';

export type ContentStatus = 'verified' | 'unverified' | 'placeholder' | 'draft';

export interface LocalizedString {
  ur: string;
  en: string;
}

export interface ImagePlaceholder {
  id: string;
  category: 'branding' | 'campus' | 'leadership' | 'departments' | 'faculty' | 'gallery' | 'events';
  suggestedPath: string;
  title: LocalizedString;
  recommendedResolution: string;
  aspectRatio: string;
  isPlaceholder: boolean;
  status: ContentStatus;
  hasRealImage?: boolean;
  realImageUrl?: string;
}

export interface Department {
  id: string;
  slug: string;
  title: LocalizedString;
  category: 'deeni' | 'asri' | 'quran' | 'skills';
  shortDescription: LocalizedString;
  fullDescription: LocalizedString;
  objectives: {
    ur: string[];
    en: string[];
  };
  duration: LocalizedString;
  eligibility: LocalizedString;
  curriculumStatus: ContentStatus;
  curriculumNotes: LocalizedString;
  levels?: {
    nameUrdu: string;
    nameEnglish: string;
    levelNumber: number;
    descriptionUrdu: string;
    descriptionEnglish: string;
  }[];
  placeholderImage: ImagePlaceholder;
  status: ContentStatus;
}

export interface FacultyMember {
  id: string;
  name: LocalizedString;
  designation: LocalizedString;
  role: 'leadership' | 'head_of_department' | 'teacher' | 'administration';
  department: LocalizedString;
  biography: LocalizedString;
  qualifications: LocalizedString;
  contactNotes?: LocalizedString;
  verified: boolean;
  status: ContentStatus;
  placeholderImage: ImagePlaceholder;
  sourceNote: string;
}

export interface AdmissionProgram {
  id: string;
  departmentId: string;
  programTitle: LocalizedString;
  ageLimit: LocalizedString;
  prerequisite: LocalizedString;
  sessionDuration: LocalizedString;
  seats: LocalizedString;
  status: ContentStatus;
}

export interface AdmissionInformation {
  isAdmissionsOpen: boolean;
  currentAcademicYear: string;
  admissionCycleUrdu: string;
  admissionCycleEnglish: string;
  noticeUrdu: string;
  noticeEnglish: string;
  requirementsUrdu: string[];
  requirementsEnglish: string[];
  documentsUrdu: string[];
  documentsEnglish: string[];
  stepsUrdu: { step: number; title: string; description: string }[];
  stepsEnglish: { step: number; title: string; description: string }[];
  importantDates: {
    eventTitle: LocalizedString;
    date: LocalizedString;
    status: ContentStatus;
  }[];
  contactForAdmission: {
    phone: string;
    incharge: LocalizedString;
    timing: LocalizedString;
  };
  status: ContentStatus;
}

export interface Announcement {
  id: string;
  title: LocalizedString;
  date: string;
  category: 'admission' | 'exams' | 'holidays' | 'events' | 'important';
  categoryLabel: LocalizedString;
  summary: LocalizedString;
  fullText: LocalizedString;
  isImportant: boolean;
  isDemo: boolean;
  status: ContentStatus;
  documentUrl?: string;
  placeholderImage?: ImagePlaceholder;
}

export interface EventItem {
  id: string;
  title: LocalizedString;
  date: string;
  location: LocalizedString;
  description: LocalizedString;
  category: 'khatm_bukhari' | 'conference' | 'competition' | 'student_activity' | 'seminar';
  categoryLabel: LocalizedString;
  isVerifiedEvent: boolean;
  status: ContentStatus;
  placeholderImage: ImagePlaceholder;
}

export interface GalleryItem {
  id: string;
  title: LocalizedString;
  category: 'campus' | 'students' | 'faculty' | 'classrooms' | 'events' | 'quran';
  categoryLabel: LocalizedString;
  caption: LocalizedString;
  dateAdded: string;
  suggestedFilePath: string;
  status: ContentStatus;
  hasRealImage?: boolean;
  realImageUrl?: string;
}

export interface MediaItem {
  id: string;
  title: LocalizedString;
  type: 'video' | 'lecture' | 'bayan' | 'quran_recitation';
  speaker: LocalizedString;
  date: string;
  duration: string;
  placeholderVideoUrl: string;
  status: ContentStatus;
}

export interface DocumentItem {
  id: string;
  title: LocalizedString;
  category: 'admission' | 'prospectus' | 'academic' | 'exam' | 'notice';
  categoryLabel: LocalizedString;
  fileFormat: 'PDF' | 'DOCX';
  fileSize: string;
  filePath: string;
  status: ContentStatus;
  available: boolean;
}

export interface ContactInformation {
  institutionName: LocalizedString;
  address: LocalizedString;
  city: LocalizedString;
  state: LocalizedString;
  country: LocalizedString;
  postalCode?: string;
  primaryPhone: string;
  phoneVerified: boolean;
  emailPlaceholder: string;
  emailStatus: ContentStatus;
  workingHours: LocalizedString;
  googleMapsCoordinates: {
    lat: number;
    lng: number;
    query: string;
  };
  socialLinks: {
    facebook: { url: string; status: ContentStatus };
    youtube: { url: string; status: ContentStatus };
    whatsapp: { url: string; status: ContentStatus };
  };
  status: ContentStatus;
}

export interface DonationInformation {
  headline: LocalizedString;
  description: LocalizedString;
  verificationNotice: LocalizedString;
  causes: {
    id: string;
    title: LocalizedString;
    description: LocalizedString;
  }[];
  bankDetailsNotice: LocalizedString;
  status: ContentStatus;
}
