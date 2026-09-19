import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { MmsUser, MmsRole, SupabaseProfile } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Session } from '@supabase/supabase-js';

export interface MmsAuthContextType {
  user: MmsUser | null;
  profile: SupabaseProfile | null;
  role: MmsRole | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isConfigured: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; role?: MmsRole }>;
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
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const MmsAuthContext = createContext<MmsAuthContextType | undefined>(undefined);

// Helper defaults for Jamia Tul Uloom institutional designations
export function getDefaultDesignation(role: MmsRole, lang: 'ur' | 'en'): string {
  switch (role) {
    case 'mudeer':
      return lang === 'ur' ? 'مہتمم و ناظمِ اعلیٰ' : 'Director & Muhtamim';
    case 'teacher':
      return lang === 'ur' ? 'استاذِ جامعہ' : 'Teacher / Faculty';
    case 'counter':
      return lang === 'ur' ? 'اکاؤنٹس کلرک و فیس انچارج' : 'Accounts Clerk & Cashier';
    case 'parent':
      return lang === 'ur' ? 'سرپرست طالب علم' : 'Parent / Guardian';
  }
}

export function getDefaultDepartment(role: MmsRole, lang: 'ur' | 'en'): string {
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
  return {
    id: profile.id,
    nameEnglish: profile.full_name || 'User',
    nameUrdu: profile.name_urdu || profile.full_name || 'صارف',
    email: profile.email,
    role: profile.role,
    designationEnglish: profile.designation_english || getDefaultDesignation(profile.role, 'en'),
    designationUrdu: profile.designation_urdu || getDefaultDesignation(profile.role, 'ur'),
    departmentEnglish: profile.department_english || getDefaultDepartment(profile.role, 'en'),
    departmentUrdu: profile.department_urdu || getDefaultDepartment(profile.role, 'ur'),
    avatarUrl: profile.avatar_url || undefined,
    isActive: profile.is_active,
  };
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
        try {
          const stored = localStorage.getItem('jamia_demo_auth_user');
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.user && parsed.profile) {
              setUser(parsed.user);
              setProfile(parsed.profile);
              setRole(parsed.user.role);
            }
          }
        } catch (e) {
          console.error('[MMS Auth] Failed to restore local demo user:', e);
        } finally {
          setIsLoading(false);
        }
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

    // Subscribe to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      if (!isMounted) return;

      setSession(newSession);

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
        if (newSession?.user) {
          await fetchAndSetProfile(newSession.user.id, newSession.user.email);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setProfile(null);
        setRole(null);
      }

      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, [fetchAndSetProfile]);

  // Real Supabase login with email & password (with demo fallback if credentials not configured)
  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string; role?: MmsRole }> => {
    if (!isSupabaseConfigured) {
      const trimmedEmail = email.trim().toLowerCase();
      let demoRole: MmsRole = 'parent';
      let nameEn = 'Chaudhry Tariq Aziz';
      let nameUr = 'چوہدری طارق عزیز';
      let desigEn = 'Parent / Guardian';
      let desigUr = 'سرپرست طالب علم';
      let deptEn = 'Parents Portal';
      let deptUr = 'اولیاء کرام پورٹل';
      let demoId = '44444444-4444-4444-4444-444444444444';

      if (trimmedEmail.includes('mudeer')) {
        demoRole = 'mudeer';
        nameEn = 'Maulana Muhammad Abdul Rehman';
        nameUr = 'مولانا محمد عبد الرحمٰن';
        desigEn = 'Director & Muhtamim';
        desigUr = 'مہتمم و ناظمِ اعلیٰ';
        deptEn = 'Central Administration';
        deptUr = 'مرکزی انتظامیہ';
        demoId = '11111111-1111-1111-1111-111111111111';
      } else if (trimmedEmail.includes('teacher')) {
        demoRole = 'teacher';
        nameEn = 'Mufti Qari Shabbir Ahmad';
        nameUr = 'مفتی قاری شبیر احمد';
        desigEn = 'Hadith Lecturer & Hifz Supervisor';
        desigUr = 'استاذِ حدیث و نگراں شعبہ حفظ';
        deptEn = 'Dars-e-Nizami & Hifz Department';
        deptUr = 'درسِ نظامی و شعبہ حفظ';
        demoId = '22222222-2222-2222-2222-222222222222';
      } else if (trimmedEmail.includes('counter')) {
        demoRole = 'counter';
        nameEn = 'Hafiz Waqas Mahmood';
        nameUr = 'حافظ وقاص محمود';
        desigEn = 'Accounts Clerk & Cashier';
        desigUr = 'اکاؤنٹس کلرک و فیس انچارج';
        deptEn = 'Finance & Fee Counter';
        deptUr = 'شعبہ مالیات و فیس کاؤنٹر';
        demoId = '33333333-3333-3333-3333-333333333333';
      }

      const mockUser: MmsUser = {
        id: demoId,
        nameEnglish: nameEn,
        nameUrdu: nameUr,
        email: trimmedEmail,
        role: demoRole,
        designationEnglish: desigEn,
        designationUrdu: desigUr,
        departmentEnglish: deptEn,
        departmentUrdu: deptUr,
        isActive: true,
      };
      const mockProfile: SupabaseProfile = {
        id: demoId,
        email: trimmedEmail,
        full_name: nameEn,
        name_urdu: nameUr,
        role: demoRole,
        designation_english: desigEn,
        designation_urdu: desigUr,
        department_english: deptEn,
        department_urdu: deptUr,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      try {
        localStorage.setItem('jamia_demo_auth_user', JSON.stringify({ user: mockUser, profile: mockProfile }));
      } catch (e) {
        console.error('Failed to save demo auth user', e);
      }
      setUser(mockUser);
      setProfile(mockProfile);
      setRole(demoRole);
      return { success: true, role: demoRole };
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

      // Fetch user profile from profiles table (source of truth for role)
      const userProfile = await fetchAndSetProfile(data.user.id, data.user.email);

      if (!userProfile) {
        // Sign out if profile not found or deactivated
        await supabase.auth.signOut();
        return {
          success: false,
          error: 'صارف کا پروفائل یا کردار (Role) دستیاب نہیں یا اکاؤنٹ غیر فعال ہے۔ براہ کرم سپابیس میں profiles ٹیبل چیک کریں۔ (Profile not found or deactivated in database)',
        };
      }

      return {
        success: true,
        role: userProfile.role,
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
  // Note: All new signups strictly register as 'parent'. Role is NOT sent or accepted from metadata.
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
      // Only send display metadata (name, urdu name). DO NOT send role.
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
        // If session was returned immediately (auto-confirm enabled in Supabase)
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

  // Mudeer role management: ONLY an authenticated Mudeer can update another user's role.
  // Enforced by PostgreSQL RLS Policy 4 on public.profiles.
  const updateUserRole = async (
    targetUserId: string,
    newRole: MmsRole,
    designationEnglish?: string,
    designationUrdu?: string,
    departmentEnglish?: string,
    departmentUrdu?: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (role !== 'mudeer') {
      return {
        success: false,
        error: 'صرف مہتمم (Mudeer) کو صارفین کے کردار یا اختیارات تبدیل کرنے کی اجازت ہے۔ (Unauthorized: Only Mudeer can manage user roles)',
      };
    }

    try {
      const updatePayload = {
        role: newRole,
        designation_english: designationEnglish || getDefaultDesignation(newRole, 'en'),
        designation_urdu: designationUrdu || getDefaultDesignation(newRole, 'ur'),
        department_english: departmentEnglish || getDefaultDepartment(newRole, 'en'),
        department_urdu: departmentUrdu || getDefaultDepartment(newRole, 'ur'),
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
      const errMsg = err instanceof Error ? err.message : 'کردار کی تبدیلی میں خرابی پیش آئی۔';
      return { success: false, error: errMsg };
    }
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

  return (
    <MmsAuthContext.Provider
      value={{
        user,
        profile,
        role,
        session,
        isAuthenticated: !!user && !!role,
        isLoading,
        isConfigured: isSupabaseConfigured,
        login,
        signUp,
        updateUserRole,
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
