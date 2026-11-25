import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { MmsUser, MmsRole, InstitutionalPosition, SupabaseProfile } from '../types/index';
import { supabase, isSupabaseConfigured, isDemoModeAllowed } from '../lib/supabase';
import { DEMO_CREDENTIALS, DemoCredentialItem } from '../data/mockData';
import type { Session } from '@supabase/supabase-js';

export interface MmsAuthContextType {
  user: MmsUser | null;
  profile: SupabaseProfile | null;
  role: MmsRole | null;
  institutionalPosition: InstitutionalPosition | null;
  assignedDomain: string | null;
  canOversee: boolean;
  canManageOperations: boolean;
  canManageAcademics: boolean;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isConfigured: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; role?: MmsRole; position?: InstitutionalPosition }>;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    nameUrdu?: string
  ) => Promise<{ success: boolean; error?: string; role?: MmsRole }>;
  updateUserRole: (
    targetUserId: string,
    newRole: MmsRole,
    designationEnglish?: string,
    designationUrdu?: string,
    departmentEnglish?: string,
    departmentUrdu?: string
  ) => Promise<{ success: boolean; error?: string }>;
  updateUserPosition: (
    targetUserId: string,
    position: InstitutionalPosition,
    domain?: string | null,
    designationEnglish?: string,
    designationUrdu?: string,
    departmentEnglish?: string,
    departmentUrdu?: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const MmsAuthContext = createContext<MmsAuthContextType | undefined>(undefined);

// Helper to resolve institutional position with full backward compatibility
export function resolveInstitutionalPosition(profile: {
  role: MmsRole;
  institutional_position?: InstitutionalPosition | null;
}): InstitutionalPosition {
  if (profile.institutional_position) {
    return profile.institutional_position;
  }
  // Safe backward compatibility: legacy 'mudeer' default to chief operational authority
  if (profile.role === 'mudeer') return 'nazim_aala';
  if (profile.role === 'teacher') return 'teacher';
  if (profile.role === 'counter') return 'counter';
  return 'parent';
}

// Helper defaults for Jamia Tul Uloom institutional designations
export function getDefaultDesignation(
  role: MmsRole,
  lang: 'ur' | 'en',
  position?: InstitutionalPosition | null
): string {
  if (position === 'muhtamim') {
    return lang === 'ur' ? 'مہتممِ جامعہ (ادارہ جاتی معائنہ و نگرانی)' : 'Muhtamim (Institutional Oversight & Inspection)';
  }
  if (position === 'nazim_aala') {
    return lang === 'ur' ? 'ناظمِ اعلیٰ (چیف ایگزیکٹو ایڈمنسٹریٹر)' : 'Nazim-e-Aala (Chief Operational Authority)';
  }
  if (position === 'departmental_nazim') {
    return lang === 'ur' ? 'ناظمِ شعبہ (Department Head)' : 'Departmental Manager / Nazim';
  }
  if (position === 'worker') {
    return lang === 'ur' ? 'کارکن / دفتری عملہ' : 'Staff / Worker';
  }

  switch (role) {
    case 'mudeer':
      return lang === 'ur' ? 'ناظمِ اعلیٰ و مہتمم' : 'Director & Administrator';
    case 'teacher':
      return lang === 'ur' ? 'استاذِ جامعہ' : 'Teacher / Faculty';
    case 'counter':
      return lang === 'ur' ? 'اکاؤنٹس کلرک و فیس انچارج' : 'Accounts Clerk & Cashier';
    case 'parent':
      return lang === 'ur' ? 'سرپرست طالب علم' : 'Parent / Guardian';
  }
}

export function getDefaultDepartment(
  role: MmsRole,
  lang: 'ur' | 'en',
  position?: InstitutionalPosition | null,
  domain?: string | null
): string {
  if (position === 'muhtamim') {
    return lang === 'ur' ? 'دفترِ اہتمام و صدارت' : 'Office of the Rector';
  }
  if (position === 'nazim_aala') {
    return lang === 'ur' ? 'مرکزی نظامت' : 'Central Operations Directorate';
  }
  if (position === 'departmental_nazim') {
    if (domain === 'academic') {
      return lang === 'ur' ? 'شعبہ تعلیمات' : 'Academic Affairs';
    }
    return lang === 'ur' ? 'متعلقہ شعبہ' : 'Assigned Department';
  }

  switch (role) {
    case 'mudeer':
      return lang === 'ur' ? 'مرکزی انتظامیہ' : 'Central Administration';
    case 'teacher':
      return lang === 'ur' ? 'شعبہ تعلیمات' : 'Academic Affairs';
    case 'counter':
      return lang === 'ur' ? 'شعبہ مالیات و فیس کاؤنٹر' : 'Finance & Fee Counter';
    case 'parent':
      return lang === 'ur' ? 'اولیاء کرام پورٹل' : 'Parents Portal';
  }
}

function profileToMmsUser(profile: SupabaseProfile): MmsUser {
  const position = resolveInstitutionalPosition(profile);
  const domain = profile.assigned_domain !== undefined && profile.assigned_domain !== null
    ? profile.assigned_domain
    : (position === 'teacher' || (position === 'departmental_nazim' && !profile.assigned_domain))
    ? 'academic'
    : (position === 'counter')
    ? 'finance'
    : 'all';

  const canOversee = position === 'muhtamim' || position === 'nazim_aala' || profile.role === 'mudeer';
  const canManageOperations = position === 'nazim_aala' || (profile.role === 'mudeer' && position !== 'muhtamim');
  const canManageAcademics = canManageOperations || (position === 'departmental_nazim' && (domain === 'academic' || domain === 'all'));

  return {
    id: profile.id,
    nameEnglish: profile.full_name || 'User',
    nameUrdu: profile.name_urdu || profile.full_name || 'صارف',
    email: profile.email,
    role: profile.role,
    institutionalPosition: position,
    assignedDomain: domain,
    canOversee,
    canManageOperations,
    canManageAcademics,
    designationEnglish: profile.designation_english || getDefaultDesignation(profile.role, 'en', position),
    designationUrdu: profile.designation_urdu || getDefaultDesignation(profile.role, 'ur', position),
    departmentEnglish: profile.department_english || getDefaultDepartment(profile.role, 'en', position, domain),
    departmentUrdu: profile.department_urdu || getDefaultDepartment(profile.role, 'ur', position, domain),
    avatarUrl: profile.avatar_url || undefined,
    isActive: profile.is_active,
  };
}

// Internal development-only helper to map an allowlisted demo account into session state.
// Never used when Supabase is configured or in production builds.
function buildDemoSessionFromCredential(cred: DemoCredentialItem): {
  user: MmsUser;
  profile: SupabaseProfile;
} {
  const demoDomain = cred.domain ?? null;
  const canOversee = cred.position === 'muhtamim' || cred.position === 'nazim_aala';
  const canManageOperations = cred.position === 'nazim_aala';
  const canManageAcademics =
    canManageOperations ||
    (cred.position === 'departmental_nazim' && (demoDomain === 'academic' || demoDomain === 'all'));

  const mockUser: MmsUser = {
    id: cred.id,
    nameEnglish: cred.nameEnglish,
    nameUrdu: cred.nameUrdu,
    email: cred.email.toLowerCase(),
    role: cred.role,
    institutionalPosition: cred.position,
    assignedDomain: demoDomain,
    canOversee,
    canManageOperations,
    canManageAcademics,
    designationEnglish: cred.designationEnglish,
    designationUrdu: cred.designationUrdu,
    departmentEnglish: cred.departmentEnglish,
    departmentUrdu: cred.departmentUrdu,
    isActive: true,
  };

  const mockProfile: SupabaseProfile = {
    id: cred.id,
    email: cred.email.toLowerCase(),
    full_name: cred.nameEnglish,
    name_urdu: cred.nameUrdu,
    role: cred.role,
    institutional_position: cred.position,
    assigned_domain: demoDomain,
    designation_english: cred.designationEnglish,
    designation_urdu: cred.designationUrdu,
    department_english: cred.departmentEnglish,
    department_urdu: cred.departmentUrdu,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  return { user: mockUser, profile: mockProfile };
}

export const MmsAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<SupabaseProfile | null>(null);
  const [user, setUser] = useState<MmsUser | null>(null);
  const [role, setRole] = useState<MmsRole | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch profile strictly from public.profiles table by user ID
  const fetchAndSetProfile = useCallback(async (authUserId: string, authUserEmail?: string): Promise<SupabaseProfile | null> => {
    if (!isSupabaseConfigured) {
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUserId)
        .maybeSingle();

      if (error) {
        console.error('[MMS Auth] Error fetching user profile from Supabase:', error);
        return null;
      }

      if (data) {
        const userProfile = data as SupabaseProfile;
        // Verify active status
        if (!userProfile.is_active) {
          console.warn('[MMS Auth] User profile is deactivated:', authUserId);
          await supabase.auth.signOut();
          setUser(null);
          setProfile(null);
          setRole(null);
          return null;
        }

        const mappedUser = profileToMmsUser(userProfile);
        setProfile(userProfile);
        setUser(mappedUser);
        setRole(userProfile.role);
        return userProfile;
      }

      // If no profile exists yet in the database, attempt to create foundational profile row
      // Securely constrained: ALWAYS role = 'parent'
      const fallbackRole: MmsRole = 'parent';
      const email = authUserEmail || 'user@jamia.edu.pk';
      const fullName = email.split('@')[0];

      const { data: createdData, error: createError } = await supabase
        .from('profiles')
        .insert({
          id: authUserId,
          email: email,
          full_name: fullName,
          role: fallbackRole,
          designation_english: getDefaultDesignation('parent', 'en'),
          designation_urdu: getDefaultDesignation('parent', 'ur'),
          department_english: getDefaultDepartment('parent', 'en'),
          department_urdu: getDefaultDepartment('parent', 'ur'),
          is_active: true,
        })
        .select()
        .maybeSingle();

      if (!createError && createdData) {
        const newProfile = createdData as SupabaseProfile;
        const mappedUser = profileToMmsUser(newProfile);
        setProfile(newProfile);
        setUser(mappedUser);
        setRole(newProfile.role);
        return newProfile;
      }

      return null;
    } catch (err) {
      console.error('[MMS Auth] Unexpected error in fetchAndSetProfile:', err);
      return null;
    }
  }, []);

  // Restore session & listen for authentication state changes
  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      if (!isSupabaseConfigured) {
        if (isDemoModeAllowed) {
          try {
            const stored = localStorage.getItem('jamia_demo_auth_user');
            if (stored) {
              const parsed = JSON.parse(stored);
              const storedEmail =
                typeof parsed?.user?.email === 'string' ? parsed.user.email.trim().toLowerCase() : '';
              const matchedDemo = DEMO_CREDENTIALS.find(
                (cred) => cred.email.toLowerCase() === storedEmail
              );

              if (matchedDemo) {
                const { user: restoredUser, profile: restoredProfile } =
                  buildDemoSessionFromCredential(matchedDemo);
                setUser(restoredUser);
                setProfile(restoredProfile);
                setRole(restoredUser.role);
              } else {
                localStorage.removeItem('jamia_demo_auth_user');
                setUser(null);
                setProfile(null);
                setRole(null);
              }
            }
          } catch (e) {
            console.error('[MMS Auth] Failed to restore local demo user:', e);
            try {
              localStorage.removeItem('jamia_demo_auth_user');
            } catch {
              // ignore
            }
          } finally {
            setIsLoading(false);
          }
          return;
        }

        setUser(null);
        setProfile(null);
        setRole(null);
        setIsLoading(false);
        return;
      }

      try {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('[MMS Auth] Error reading Supabase session:', error);
        }

        if (isMounted) {
          setSession(initialSession);
          if (initialSession?.user) {
            await fetchAndSetProfile(initialSession.user.id, initialSession.user.email);
          } else {
            setUser(null);
            setProfile(null);
            setRole(null);
          }
        }
      } catch (err) {
        console.error('[MMS Auth] Failed to initialize Supabase session:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initAuth();

    if (!isSupabaseConfigured) {
      return () => {
        isMounted = false;
      };
    }

    // Subscribe to auth state changes only when Supabase is configured.
    // INITIAL_SESSION is handled by initAuth() above so isLoading stays true until profile loading completes.
    const { data: authListener } = supabase.auth.onAuthStateChange((event, newSession) => {
      if (!isMounted) return;

      if (event === 'INITIAL_SESSION') {
        return;
      }

      setSession(newSession);

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
        if (newSession?.user) {
          const authUserId = newSession.user.id;
          const authUserEmail = newSession.user.email;
          setTimeout(() => {
            if (isMounted) {
              void fetchAndSetProfile(authUserId, authUserEmail);
            }
          }, 0);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setProfile(null);
        setRole(null);
      }
    });

    return () => {
      isMounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, [fetchAndSetProfile]);

  // Real Supabase login with email & password.
  // Local development demo login is strictly restricted to !isSupabaseConfigured && isDemoModeAllowed.
  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string; role?: MmsRole; position?: InstitutionalPosition }> => {
    if (!isSupabaseConfigured) {
      if (!isDemoModeAllowed) {
        return {
          success: false,
          error: 'سپابیس (Supabase) کنفیگر نہیں ہے اور ڈیمو موڈ غیر فعال ہے۔ براہ کرم Supabase کی ترتیبات مکمل کریں۔ (Supabase is not configured and demo mode is disabled.)',
        };
      }

      const trimmedEmail = email.trim().toLowerCase();
      const matchedDemo = DEMO_CREDENTIALS.find(
        (cred) => cred.email.toLowerCase() === trimmedEmail
      );

      // Require both an exact recognized demo email and its matching demo password.
      // Reject arbitrary emails, missing passwords, and invalid credential pairs.
      if (!trimmedEmail || !password || !matchedDemo || matchedDemo.password !== password) {
        return {
          success: false,
          error: 'ای میل یا پاس ورڈ درست نہیں ہے۔ براہ کرم درست ڈیمو ای میل اور پاس ورڈ درج کریں۔ (Invalid demo email or password.)',
        };
      }

      const { user: mockUser, profile: mockProfile } = buildDemoSessionFromCredential(matchedDemo);

      try {
        localStorage.setItem('jamia_demo_auth_user', JSON.stringify({ user: mockUser, profile: mockProfile }));
      } catch (e) {
        console.error('Failed to save demo auth user', e);
      }
      setUser(mockUser);
      setProfile(mockProfile);
      setRole(mockUser.role);
      return { success: true, role: mockUser.role, position: mockUser.institutionalPosition };
    }

    try {
      const trimmedEmail = email.trim().toLowerCase();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });

      if (error) {
        let msg = error.message;
        if (error.message.includes('Invalid login credentials')) {
          msg = 'ای میل یا پاس ورڈ درست نہیں ہے۔ (Invalid email or password)';
        } else if (error.message.includes('Email not confirmed')) {
          msg = 'ای میل ایڈریس کی تصدیق درکار ہے۔ (Please verify your email address)';
        }
        return { success: false, error: msg };
      }

      if (!data.user) {
        return { success: false, error: 'صارف کی شناخت نہیں ہو سکی۔ (User identification failed)' };
      }

      // Fetch user profile from profiles table (source of truth for role & institutional position)
      const userProfile = await fetchAndSetProfile(data.user.id, data.user.email);

      if (!userProfile) {
        // Sign out if profile not found or deactivated
        await supabase.auth.signOut();
        setSession(null);
        setUser(null);
        setProfile(null);
        setRole(null);
        return {
          success: false,
          error: 'صارف کا پروفائل یا کردار (Role) دستیاب نہیں یا اکاؤنٹ غیر فعال ہے۔ براہ کرم سپابیس میں profiles ٹیبل چیک کریں۔ (Profile not found or deactivated in database)',
        };
      }

      setSession(data.session ?? null);
      const effectivePosition = resolveInstitutionalPosition(userProfile);

      return {
        success: true,
        role: userProfile.role,
        position: effectivePosition,
      };
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'نامعلوم خرابی پیش آئی۔ (An unexpected authentication error occurred)';
      return {
        success: false,
        error: errMsg,
      };
    }
  };

  // Secure User registration in Supabase:
  // Note: All new signups strictly register as 'parent' with NULL institutional position.
  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    nameUrdu?: string
  ): Promise<{ success: boolean; error?: string; role?: MmsRole }> => {
    if (!isSupabaseConfigured) {
      return {
        success: false,
        error: 'Supabase credentials are not configured in .env.local',
      };
    }

    try {
      const trimmedEmail = email.trim().toLowerCase();
      // Only send display metadata (name, urdu name). DO NOT send role or position.
      const { data, error } = await supabase.auth.signUp({
        email: trimmedEmail,
        password,
        options: {
          data: {
            full_name: fullName,
            name_urdu: nameUrdu || fullName,
          },
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        if (data.session) {
          const userProfile = await fetchAndSetProfile(data.user.id, data.user.email);
          return { success: true, role: userProfile?.role || 'parent' };
        }
        return {
          success: true,
          role: 'parent',
          error: 'اکاؤنٹ بن گیا ہے۔ اگر کنفرمیشن درکار ہو تو ای میل چیک کریں یا لاگ ان فرمائیں۔ (Account created successfully. Please sign in.)',
        };
      }

      return { success: false, error: 'اکاؤنٹ رجسٹر نہ ہو سکا۔ (Registration failed)' };
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'رجسٹریشن کے دوران خرابی پیش آئی۔';
      return { success: false, error: errMsg };
    }
  };

  // Chief Operational Authority management:
  // ONLY an authorized Chief Administrator (Nazim-e-Aala or legacy Mudeer) can update another user's position or role.
  // Note: Muhtamim is an oversight position and cannot alter operational staff positions.
  const updateUserPosition = async (
    targetUserId: string,
    newPosition: InstitutionalPosition,
    domain?: string | null,
    designationEnglish?: string,
    designationUrdu?: string,
    departmentEnglish?: string,
    departmentUrdu?: string
  ): Promise<{ success: boolean; error?: string }> => {
    const currentPosition = user?.institutionalPosition || (role === 'mudeer' ? 'nazim_aala' : null);
    if (currentPosition !== 'nazim_aala' && role !== 'mudeer') {
      return {
        success: false,
        error: 'صرف ناظمِ اعلیٰ کو عملے کے مناصب یا دائرہ کار تبدیل کرنے کا مجاز اختیار حاصل ہے۔ (Unauthorized: Only Nazim-e-Aala can update institutional positions)',
      };
    }

    // Map position to base mms_role for backward compatibility
    let mappedRole: MmsRole = 'parent';
    if (newPosition === 'muhtamim' || newPosition === 'nazim_aala' || newPosition === 'departmental_nazim') {
      mappedRole = 'mudeer';
    } else if (newPosition === 'teacher') {
      mappedRole = 'teacher';
    } else if (newPosition === 'counter') {
      mappedRole = 'counter';
    }

    try {
      const updatePayload = {
        role: mappedRole,
        institutional_position: newPosition,
        assigned_domain: domain || null,
        designation_english: designationEnglish || getDefaultDesignation(mappedRole, 'en', newPosition),
        designation_urdu: designationUrdu || getDefaultDesignation(mappedRole, 'ur', newPosition),
        department_english: departmentEnglish || getDefaultDepartment(mappedRole, 'en', newPosition, domain),
        department_urdu: departmentUrdu || getDefaultDepartment(mappedRole, 'ur', newPosition, domain),
      };

      const { error } = await supabase
        .from('profiles')
        .update(updatePayload)
        .eq('id', targetUserId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'منصب کی تبدیلی میں خرابی پیش آئی۔';
      return { success: false, error: errMsg };
    }
  };

  const updateUserRole = async (
    targetUserId: string,
    newRole: MmsRole,
    designationEnglish?: string,
    designationUrdu?: string,
    departmentEnglish?: string,
    departmentUrdu?: string
  ): Promise<{ success: boolean; error?: string }> => {
    // Legacy bridge calling updateUserPosition
    let defaultPos: InstitutionalPosition = 'parent';
    if (newRole === 'mudeer') defaultPos = 'nazim_aala';
    else if (newRole === 'teacher') defaultPos = 'teacher';
    else if (newRole === 'counter') defaultPos = 'counter';

    return updateUserPosition(
      targetUserId,
      defaultPos,
      defaultPos === 'teacher' ? 'academic' : defaultPos === 'counter' ? 'finance' : 'all',
      designationEnglish,
      designationUrdu,
      departmentEnglish,
      departmentUrdu
    );
  };

  // Real Supabase sign out
  const logout = async () => {
    try {
      if (isSupabaseConfigured) {
        await supabase.auth.signOut();
      }
    } catch (e) {
      console.error('[MMS Auth] Error during Supabase signOut:', e);
    } finally {
      try {
        localStorage.removeItem('jamia_demo_auth_user');
      } catch {
        // ignore
      }
      setUser(null);
      setProfile(null);
      setRole(null);
      setSession(null);
    }
  };

  const refreshProfile = async () => {
    if (session?.user) {
      await fetchAndSetProfile(session.user.id, session.user.email);
    }
  };

  const effectivePosition = user?.institutionalPosition || (profile ? resolveInstitutionalPosition(profile) : null);
  const effectiveDomain = user?.assignedDomain ?? profile?.assigned_domain ?? null;
  const canOversee = effectivePosition === 'muhtamim' || effectivePosition === 'nazim_aala' || role === 'mudeer';
  const canManageOperations = effectivePosition === 'nazim_aala' || (role === 'mudeer' && effectivePosition !== 'muhtamim');
  const canManageAcademics = canManageOperations || (effectivePosition === 'departmental_nazim' && (effectiveDomain === 'academic' || effectiveDomain === 'all'));

  return (
    <MmsAuthContext.Provider
      value={{
        user,
        profile,
        role,
        institutionalPosition: effectivePosition,
        assignedDomain: effectiveDomain,
        canOversee,
        canManageOperations,
        canManageAcademics,
        session,
        isAuthenticated: !!user && !!role,
        isLoading,
        isConfigured: isSupabaseConfigured,
        login,
        signUp,
        updateUserRole,
        updateUserPosition,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </MmsAuthContext.Provider>
  );
};

export const useMmsAuth = (): MmsAuthContextType => {
  const context = useContext(MmsAuthContext);
  if (!context) {
    throw new Error('useMmsAuth must be used within an MmsAuthProvider');
  }
  return context;
};
