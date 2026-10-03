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
  clearError: () => void;
  initAuthListener: () => () => void;
}

export const getFirebaseErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Email yoki parol noto’g’ri kiritildi.';
    case 'auth/email-already-in-use':
      return 'Bu email orqali allaqachon ro’yxatdan o’tilgan.';
    case 'auth/weak-password':
      return 'Parol kamida 6 ta belgidan iborat bo’lishi kerak.';
    case 'auth/invalid-email':
      return 'Email formati noto’g’ri kiritildi.';
    case 'auth/network-request-failed':
      return 'Internet bilan aloqa mavjud emas.';
    case 'auth/popup-closed-by-user':
      return 'Google kirish oynasi bekor qilindi.';
    default:
      return 'Tizimga kirishda xatolik yuz berdi.';
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  isGuest: false,
  error: null,
  isInitialized: false,

  clearError: () => set({ error: null }),

  signInWithEmail: async (email: string, pass: string) => {
    set({ isLoading: true, error: null });
    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), pass);
      set({ user: cred.user, isGuest: false, isLoading: false });
    } catch (err: any) {
      set({
        error: getFirebaseErrorMessage(err?.code || ''),
        isLoading: false,
      });
      throw err;
    }
  },

  signUpWithEmail: async (email: string, pass: string) => {
    set({ isLoading: true, error: null });
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), pass);
      set({ user: cred.user, isGuest: false, isLoading: false });
    } catch (err: any) {
      set({
        error: getFirebaseErrorMessage(err?.code || ''),
        isLoading: false,
      });
      throw err;
    }
  },

  signInWithGoogle: async () => {
    set({ isLoading: true, error: null });
    try {
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(auth, provider);
      set({ user: cred.user, isGuest: false, isLoading: false });
    } catch (err: any) {
      set({
        error: getFirebaseErrorMessage(err?.code || ''),
        isLoading: false,
      });
      throw err;
    }
  },

  signInAsGuest: async () => {
    set({ isLoading: true, error: null });
    try {
      const cred = await signInAnonymously(auth);
      set({ user: cred.user, isGuest: true, isLoading: false });
    } catch (err: any) {
      set({
        error: getFirebaseErrorMessage(err?.code || ''),
        isLoading: false,
      });
      throw err;
    }
  },

  signOutUser: async () => {
    set({ isLoading: true, error: null });
    try {
      await signOut(auth);
      set({ user: null, isGuest: false, isLoading: false });
    } catch (err: any) {
      set({
        error: getFirebaseErrorMessage(err?.code || ''),
        isLoading: false,
      });
      throw err;
    }
  },

  initAuthListener: () => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      set({
        user: firebaseUser,
        isGuest: firebaseUser?.isAnonymous || false,
        isInitialized: true,
      });
    });
    return unsubscribe;
  },
}));
