# Jamia Tul Uloom Al-Islamia - Content & Asset Setup Guide
## جامعۃ العلوم الاسلامیہ - میرپور آزاد کشمیر (رہنمائے انتظامیہ و دیکھ بھال)

This guide documents the centralized, production-grade architecture of the **Jamia Tul Uloom Al-Islamia** web portal. It provides clear instructions for administrators, media personnel, and webmasters on how to replace placeholder assets, update official institutional data, and maintain strict data integrity.

---

## 1. Directory Architecture for Media Assets

All static images should be placed in the `public/` directory so they are served directly by the web server.

### Suggested Folder Hierarchy:
```
public/
├── images/
│   ├── hero/
│   │   └── main-campus.jpg          # 1920x1080 px (16:9) - Campus hero banner
│   ├── campus/
│   │   ├── exterior.jpg             # 1200x800 px (3:2) - Front facade
│   │   ├── courtyard.jpg            # 1200x800 px (3:2) - Central courtyard
│   │   └── library.jpg              # 1200x800 px (3:2) - Islamic reference library
│   ├── departments/
│   │   ├── dars-e-nizami.jpg        # 1200x800 px (3:2) - Classical lecture hall
│   │   ├── hifz.jpg                 # 1200x800 px (3:2) - Quran memorization circle
│   │   ├── maktab.jpg               # 1200x800 px (3:2) - Children's foundation class
│   │   ├── contemporary.jpg         # 1200x800 px (3:2) - School classroom (6th-FA)
│   │   └── computer-lab.jpg         # 1200x800 px (3:2) - IT lab workstations
│   ├── leadership/
│   │   ├── muhtamim.jpg             # 600x750 px (4:5 portrait) - Maulana Zaid Bostan
│   │   └── nazim-e-aala.jpg         # 600x750 px (4:5 portrait) - Maulana Qari Abid Hussain Butt
│   ├── faculty/
│   │   ├── hifz-head.jpg            # 600x750 px (4:5 portrait)
│   │   ├── shaikh-hadith.jpg        # 600x750 px (4:5 portrait)
│   │   └── contemporary-head.jpg    # 600x750 px (4:5 portrait)
│   ├── events/
│   │   ├── bukhari-khatm.jpg        # 1200x800 px (3:2) - Annual convocation
│   │   ├── qiraat-comp.jpg          # 1200x800 px (3:2) - Recitation competition
│   │   └── tarbiyah-seminar.jpg     # 1200x800 px (3:2) - Student development seminar
│   └── gallery/
│       ├── photo-01.jpg ... photo-12.jpg
└── documents/
    ├── admission-form-hifz.pdf      # Official application for Hifz & Maktab
    ├── admission-form-dars.pdf      # Official application for Dars-e-Nizami
    ├── admission-form-school.pdf    # Official application for Class 6 - FA
    ├── jamia-rules-regulations.pdf  # Student code of conduct and hostel rules
    ├── annual-academic-calendar.pdf # Official dates and holiday schedule
    └── examination-datesheet.pdf    # Mid-term and annual exams schedule
```

---

## 2. Central Data Files (`src/data/`)

Every section of the website reads from pure TypeScript data files located in `src/data/`. To update text, numbers, or statuses, edit the corresponding file:

| Data File | Purpose | Key Content to Update |
|---|---|---|
| `src/data/siteContent.ts` | Institutional overview, mission, vision, history notice | Add certified founding year, founder biographies, and historic milestones. |
| `src/data/contact.ts` | Address, primary phone, email, office hours, social links | Add official Facebook page, YouTube channel URL, WhatsApp business link. |
| `src/data/admissions.ts` | Admission cycle, deadlines, eligibility, required documents | Update for new academic year, toggle `isAdmissionsOpen: true/false`. |
| `src/data/departments.ts` | Department curricula, 8-year Dars-e-Nizami levels, school subjects | Update verified textbook syllabi and examination board affiliations. |
| `src/data/faculty.ts` | Leadership and teachers directory | Add official bios, degrees, and replace faculty placeholders. |
| `src/data/announcements.ts` | Live circulars, notices, exam alerts | Add authentic announcements and set `isDemo: false`. |
| `src/data/events.ts` | Institutional activities & annual programs | Record verified historical and upcoming convocations. |
| `src/data/documents.ts` | Downloads repository | Link certified PDF files stored in `public/documents/`. |
| `src/data/gallery.ts` | Photographic archive | Point to real campus photography in `public/images/gallery/`. |
| `src/data/media.ts` | Video/audio lectures, recitations, Friday sermons | Link official YouTube video IDs or audio stream URLs. |

---

## 3. Verification States (`status` field)

To ensure the utmost honesty and prevent misinformation, every data item has a `status` attribute:

- `'verified'`: Fully certified and approved by the Jamia administration (e.g., address, primary phone 0306-5042031, leadership names).
- `'unverified'`: Sourced from public listings, awaiting re-confirmation.
- `'placeholder'`: Structured dummy entry awaiting official administrative text (e.g., exact textbook lists, datesheets).
- `'draft'`: Internal staging content.

When real administrative data is entered into `src/data/`, simply change `'placeholder'` to `'verified'` and the UI will automatically update the badges!

---

## 4. How to Enable Real Images

When real photos are added to `public/images/...`:
1. In the relevant data file (e.g., `src/data/departments.ts` or `src/data/faculty.ts`), find the `placeholderImage` object.
2. Set `hasRealImage: true`.
3. Set `realImageUrl: "/images/departments/dars-e-nizami.jpg"`.
4. The system will automatically render the real image and dismiss the placeholder illustration!
