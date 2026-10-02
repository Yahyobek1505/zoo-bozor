import { create } from 'zustand';
import { AppLanguage, TRANSLATIONS, Translations } from '@/constants/translations';

interface LanguageStore {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  t: () => Translations;
}

export const useLanguageStore = create<LanguageStore>((set, get) => ({
  language: 'uz',
  setLanguage: (lang: AppLanguage) => set({ language: lang }),
  t: () => TRANSLATIONS[get().language],
}));
