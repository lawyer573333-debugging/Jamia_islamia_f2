import React, { createContext, useContext, useState, useEffect } from 'react';
import { MmsUser, MmsRole } from '../types';
import { DEMO_CREDENTIALS } from '../data/mockData';

/**
 * ============================================================================
 * MMS AUTHENTICATION CONTEXT (PHASE 1 - MOCK / DEMO ONLY)
 * ============================================================================
 * NOTE FOR FUTURE BACKEND INTEGRATION (SUPABASE / DB):
 * This interface is architected to mirror standard authentication state.
 * In Phase 2:
 * 1. Replace the mock authentication check inside `login()` with:
 *    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
 * 2. Fetch the corresponding profile & role from `public.profiles` or `auth.users.app_metadata`.
 * 3. Bind `supabase.auth.onAuthStateChange((event, session) => ...)` inside `useEffect`.
 * ============================================================================
 */

interface MmsAuthContextType {
  user: MmsUser | null;
  role: MmsRole | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; role?: MmsRole }>;
  quickLogin: (targetRole: MmsRole) => { success: boolean; role: MmsRole };
  logout: () => void;
}

const STORAGE_KEY = 'jamia_mms_auth_user';

const MmsAuthContext = createContext<MmsAuthContextType | undefined>(undefined);

export const MmsAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<MmsUser | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          return JSON.parse(stored);
        }
      } catch (e) {
        console.error('Error parsing stored MMS session', e);
      }
    }
    return null;
  });

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string; role?: MmsRole }> => {
    // Artificial small delay to simulate network auth handshake
    await new Promise((resolve) => setTimeout(resolve, 350));

    const trimmedEmail = email.trim().toLowerCase();
    const demoAccount = DEMO_CREDENTIALS.find(
      (acc) => acc.email.toLowerCase() === trimmedEmail && acc.password === password
    );

    if (!demoAccount) {
      return {
        success: false,
        error: 'ای میل یا پاس ورڈ درست نہیں ہے۔ براہ کرم ڈیمو اسناد چیک کریں۔ (Invalid credentials)'
      };
    }

    const authenticatedUser: MmsUser = {
      id: `usr-${demoAccount.role}-${Date.now()}`,
      nameUrdu: demoAccount.nameUrdu,
      nameEnglish: demoAccount.nameEnglish,
      email: demoAccount.email,
      role: demoAccount.role,
      designationUrdu: demoAccount.designationUrdu,
      designationEnglish: demoAccount.designationEnglish,
      departmentUrdu: demoAccount.departmentUrdu,
      departmentEnglish: demoAccount.departmentEnglish,
    };

    setUser(authenticatedUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authenticatedUser));
    } catch (e) {
      console.warn('Unable to persist session to localStorage', e);
    }

    return {
      success: true,
      role: demoAccount.role,
    };
  };

  const quickLogin = (targetRole: MmsRole) => {
    const demoAccount = DEMO_CREDENTIALS.find((acc) => acc.role === targetRole);
    if (!demoAccount) {
      return { success: false, role: 'mudeer' as MmsRole };
    }

    const authenticatedUser: MmsUser = {
      id: `usr-${demoAccount.role}-${Date.now()}`,
      nameUrdu: demoAccount.nameUrdu,
      nameEnglish: demoAccount.nameEnglish,
      email: demoAccount.email,
      role: demoAccount.role,
      designationUrdu: demoAccount.designationUrdu,
      designationEnglish: demoAccount.designationEnglish,
      departmentUrdu: demoAccount.departmentUrdu,
      departmentEnglish: demoAccount.departmentEnglish,
    };

    setUser(authenticatedUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authenticatedUser));
    } catch (e) {
      console.warn('Unable to persist session to localStorage', e);
    }

    return { success: true, role: demoAccount.role };
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Unable to clear localStorage', e);
    }
  };

  return (
    <MmsAuthContext.Provider
      value={{
        user,
        role: user ? user.role : null,
        isAuthenticated: !!user,
        login,
        quickLogin,
        logout,
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
