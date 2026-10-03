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

export const getFirebaseErrorMessage = (
  errorCode: string,
  rawMessage?: string
): string => {
  switch (errorCode) {
    case 'auth/operation-not-allowed':
      return 'Firebase Console’da ushbu kirish usuli (Google / Email) yoqilmagan. Iltimos, Firebase Console > Authentication > Sign-in method bo’limida uni yoqing (Enable).';
    case 'auth/unauthorized-domain':
      return 'Ushbu domen (localhost) Firebase Console ruxsat berilgan domenlar ro’yxatida yo’q.';
    case 'auth/popup-blocked':
      return 'Brauzer Google oynasini blokladi. Iltimos, brauzer manzil satridan pop-up oynalarga ruxsat bering.';
    case 'auth/popup-closed-by-user':
      return 'Google kirish oynasi tanlanmasdan yopildi.';
    case 'auth/cancelled-popup-request':
      return 'Oldingi kirish oynasi hali yopilmadi.';
    case 'auth/account-exists-with-different-credential':
      return 'Bu email boshqa usul orqali ro’yxatdan o’tgan.';
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
      return 'Email yoki parol noto’g’ri kiritildi.';
    case 'auth/user-not-found':
      return 'Bunday akkaunt topilmadi. Avval "Ro’yxatdan o’tish"ni bosing.';
    case 'auth/email-already-in-use':
      return 'Bu email orqali allaqachon ro’yxatdan o’tilgan. "Kirish" tugmasini bosing.';
    case 'auth/weak-password':
      return 'Parol juda qisqa. Kamida 6 ta belgi kiriting.';
    case 'auth/invalid-email':
      return 'Email formati noto’g’ri kiritildi.';
    case 'auth/network-request-failed':
      return 'Internet bilan aloqa mavjud emas yoki Firebase xizmatiga ulanib bo’lmadi.';
    case 'auth/too-many-requests':
      return 'Urinishlar soni oshib ketdi. Iltimos, biroz kutib qaytadan urinib ko’ring.';
    default:
      if (rawMessage && !rawMessage.includes('Firebase: Error')) {
        return rawMessage;
      }
      return 'Tizimga kirishda xatolik yuz berdi. Firebase sozlamalarini tekshiring.';
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  isGuest: false,
  error: null,
  isInitialized: false,

  setError: (msg: string | null) => set({ error: msg }),
  clearError: () => set({ error: null }),

  signInWithEmail: async (email: string, pass: string) => {
    set({ isLoading: true, error: null });
    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), pass);
      set({ user: cred.user, isGuest: false, isLoading: false, error: null });
    } catch (err: any) {
      const msg = getFirebaseErrorMessage(err?.code || '', err?.message);
      set({ error: msg, isLoading: false });
      throw err;
    }
  },

  signUpWithEmail: async (email: string, pass: string) => {
    set({ isLoading: true, error: null });
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), pass);
      set({ user: cred.user, isGuest: false, isLoading: false, error: null });
    } catch (err: any) {
      const msg = getFirebaseErrorMessage(err?.code || '', err?.message);
      set({ error: msg, isLoading: false });
      throw err;
    }
  },

  signInWithGoogle: async () => {
    set({ isLoading: true, error: null });
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const cred = await signInWithPopup(auth, provider);
      set({ user: cred.user, isGuest: false, isLoading: false, error: null });
    } catch (err: any) {
      const msg = getFirebaseErrorMessage(err?.code || '', err?.message);
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
      const msg = getFirebaseErrorMessage(err?.code || '', err?.message);
      set({ error: msg, isLoading: false });
      throw err;
    }
  },

  signOutUser: async () => {
    set({ isLoading: true, error: null });
    try {
      await signOut(auth);
      set({ user: null, isGuest: false, isLoading: false, error: null });
    } catch (err: any) {
      const msg = getFirebaseErrorMessage(err?.code || '', err?.message);
      set({ error: msg, isLoading: false });
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
