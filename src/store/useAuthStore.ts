import { create } from 'zustand';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '@/services/firebase';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isGuest: boolean;
  error: string | null;
  isInitialized: boolean;

  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInAsGuest: () => Promise<void>;
  signOutUser: () => Promise<void>;
  setError: (msg: string | null) => void;
  clearError: () => void;
  initAuthListener: () => () => void;
}

// Compact fast-lookup error dictionary
const ERR_MAP: Record<string, string> = {
  'auth/invalid-credential': 'Email yoki parol noto’g’ri.',
  'auth/wrong-password': 'Parol noto’g’ri kiritildi.',
  'auth/user-not-found': 'Bunday akkaunt topilmadi. Ro’yxatdan o’ting.',
  'auth/email-already-in-use': 'Bu email orqali allaqachon ro’yxatdan o’tilgan.',
  'auth/weak-password': 'Parol kamida 6 ta belgidan iborat bo’lsin.',
  'auth/invalid-email': 'Email formati noto’g’ri kiritildi.',
  'auth/popup-blocked': 'Google oynasi ochilmadi. Mehmon yoki Demo hisob orqali kiring.',
  'auth/popup-closed-by-user': 'Google kirish oynasi yopildi.',
  'auth/cancelled-popup-request': 'Oldingi kirish oynasi hali yopilmadi.',
  'auth/unauthorized-domain': 'Ushbu domen Firebase ruxsatlarida yo’q. Demo hisobdan foydalaning.',
  'auth/operation-not-allowed': 'Firebase Console’da ushbu kirish usuli yoqilmagan.',
  'auth/network-request-failed': 'Internet bilan aloqa mavjud emas.',
  'auth/too-many-requests': 'Urinishlar ko’p bo’ldi, birozdan so’ng urinib ko’ring.',
};

export const getFirebaseErrorMessage = (code: string, raw?: string): string => {
  if (ERR_MAP[code]) return ERR_MAP[code];
  if (raw && !raw.includes('Firebase: Error')) return raw;
  return 'Tizimga kirishda xatolik yuz berdi. Demo yoki mehmon hisobidan kiring.';
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  isGuest: false,
  error: null,
  isInitialized: false,

  setError: (msg) => set({ error: msg }),
  clearError: () => set({ error: null }),

  signInWithEmail: async (email: string, pass: string) => {
    set({ isLoading: true, error: null });
    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), pass);
      set({ user: cred.user, isGuest: false, isLoading: false, error: null });
    } catch (err: any) {
      set({ error: getFirebaseErrorMessage(err?.code, err?.message), isLoading: false });
      throw err;
    }
  },

  signUpWithEmail: async (email: string, pass: string) => {
    set({ isLoading: true, error: null });
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), pass);
      set({ user: cred.user, isGuest: false, isLoading: false, error: null });
    } catch (err: any) {
      set({ error: getFirebaseErrorMessage(err?.code, err?.message), isLoading: false });
      throw err;
    }
  },

  signInWithGoogle: async () => {
    set({ isLoading: true, error: null });
    try {
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(auth, provider);
      set({ user: cred.user, isGuest: false, isLoading: false, error: null });
    } catch (err: any) {
      const code = err?.code || '';
      let msg = ERR_MAP[code];
      if (!msg) {
        if (code === 'auth/popup-blocked') {
          msg = 'Brauzer Google oynasini blokladi. Mehmon yoki Demo hisob orqali kiring.';
        } else if (code.includes('closed') || code.includes('cancelled')) {
          msg = 'Google kirish bekor qilindi.';
        } else {
          msg = 'Google orqali kirib bo’lmadi. Mehmon yoki Demo hisob orqali kiring.';
        }
      }
      set({ error: msg, isLoading: false });
      throw err;
    }
  },

  signInAsGuest: async () => {
    set({ isLoading: true, error: null });
    try {
      const cred = await signInAnonymously(auth);
      set({ user: cred.user, isGuest: true, isLoading: false, error: null });
    } catch (err: any) {
      set({ error: getFirebaseErrorMessage(err?.code, err?.message), isLoading: false });
      throw err;
    }
  },

  signOutUser: async () => {
    set({ isLoading: true, error: null });
    try {
      await signOut(auth);
      set({ user: null, isGuest: false, isLoading: false, error: null });
    } catch (err: any) {
      set({ error: getFirebaseErrorMessage(err?.code, err?.message), isLoading: false });
      throw err;
    }
  },

  initAuthListener: () => {
    return onAuthStateChanged(auth, (firebaseUser) => {
      set({
        user: firebaseUser,
        isGuest: firebaseUser?.isAnonymous || false,
        isInitialized: true,
      });
    });
  },
}));
