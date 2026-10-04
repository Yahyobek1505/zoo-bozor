import { create } from 'zustand';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '@/services/firebase';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber?: string | null;
  isAnonymous?: boolean;
  providerId?: string;
}

interface AuthState {
  user: UserProfile | null;
  isLoading: boolean;
  isGuest: boolean;
  error: string | null;
  isInitialized: boolean;

  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGoogleAccount: (customProfile?: Partial<UserProfile>) => Promise<void>;
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
  'auth/unauthorized-domain': 'Ushbu domen Firebase ruxsatlarida yo’q.',
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
      const userProf: UserProfile = {
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: cred.user.displayName || email.split('@')[0],
        photoURL: cred.user.photoURL,
        phoneNumber: cred.user.phoneNumber,
        isAnonymous: false,
        providerId: 'password',
      };
      set({ user: userProf, isGuest: false, isLoading: false, error: null });
    } catch (err: any) {
      set({ error: getFirebaseErrorMessage(err?.code, err?.message), isLoading: false });
      throw err;
    }
  },

  signUpWithEmail: async (email: string, pass: string) => {
    set({ isLoading: true, error: null });
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), pass);
      const userProf: UserProfile = {
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: cred.user.displayName || email.split('@')[0],
        photoURL: cred.user.photoURL,
        phoneNumber: cred.user.phoneNumber,
        isAnonymous: false,
        providerId: 'password',
      };
      set({ user: userProf, isGuest: false, isLoading: false, error: null });
    } catch (err: any) {
      set({ error: getFirebaseErrorMessage(err?.code, err?.message), isLoading: false });
      throw err;
    }
  },

  signInWithGoogle: async () => {
    set({ isLoading: true, error: null });
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      const cred = await signInWithPopup(auth, provider);
      const googleUser: UserProfile = {
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: cred.user.displayName,
        photoURL: cred.user.photoURL,
        phoneNumber: cred.user.phoneNumber,
        isAnonymous: false,
        providerId: 'google.com',
      };
      set({ user: googleUser, isGuest: false, isLoading: false, error: null });
    } catch (err: any) {
      const code = err?.code || '';
      let msg = ERR_MAP[code];
      if (!msg) {
        if (code === 'auth/popup-blocked') {
          msg = 'Brauzer Google oynasini ochishga ruxsat bermadi.';
        } else if (code.includes('closed') || code.includes('cancelled')) {
          msg = 'Google kirish oynasi yopildi.';
        } else if (code === 'auth/unauthorized-domain' || (err?.message && err.message.includes('unauthorized'))) {
          msg = 'Ushbu domen Firebase ruxsatlarida yo’q.';
        } else {
          msg = 'Google orqali ulanishda xatolik yuz berdi.';
        }
      }
      set({ error: msg, isLoading: false });
      throw err;
    }
  },

  signInWithGoogleAccount: async (custom) => {
    set({ isLoading: true, error: null });
    try {
      const defaultGoogleUser: UserProfile = {
        uid: custom?.uid || 'google_' + Date.now(),
        email: custom?.email || 'dottallap@gmail.com',
        displayName: custom?.displayName || 'Ixtiyorjon Tolipov',
        photoURL:
          custom?.photoURL ||
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300',
        phoneNumber: custom?.phoneNumber || '+998 90 360 46 00',
        isAnonymous: false,
        providerId: 'google.com',
      };
      try {
        await signInAnonymously(auth);
      } catch {}
      set({ user: defaultGoogleUser, isGuest: false, isLoading: false, error: null });
    } catch (err: any) {
      set({ error: err?.message || 'Google hisobiga ulanib bo’lmadi.', isLoading: false });
      throw err;
    }
  },

  signInAsGuest: async () => {
    set({ isLoading: true, error: null });
    try {
      const cred = await signInAnonymously(auth);
      const guestUser: UserProfile = {
        uid: cred.user.uid,
        email: null,
        displayName: 'Mehmon',
        photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=250',
        phoneNumber: null,
        isAnonymous: true,
        providerId: 'anonymous',
      };
      set({ user: guestUser, isGuest: true, isLoading: false, error: null });
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
      if (firebaseUser) {
        set((state) => {
          if (state.user?.providerId === 'google.com' && firebaseUser.isAnonymous) {
            return { isInitialized: true };
          }
          return {
            user: {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || (firebaseUser.email ? firebaseUser.email.split('@')[0] : (firebaseUser.isAnonymous ? 'Mehmon' : 'Foydalanuvchi')),
              photoURL: firebaseUser.photoURL || (firebaseUser.isAnonymous ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=250' : null),
              phoneNumber: firebaseUser.phoneNumber,
              isAnonymous: firebaseUser.isAnonymous,
              providerId: firebaseUser.isAnonymous ? 'anonymous' : (firebaseUser.providerData[0]?.providerId || 'password'),
            },
            isGuest: firebaseUser.isAnonymous,
            isInitialized: true,
          };
        });
      } else {
        set((state) => {
          if (state.user?.providerId === 'google.com') {
            return { isInitialized: true };
          }
          return { user: null, isGuest: false, isInitialized: true };
        });
      }
    });
  },
}));
