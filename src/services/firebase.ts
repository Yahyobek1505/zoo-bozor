import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

// Firebase configuration for zoo-bozor-2cae4
const firebaseConfig = {
  apiKey: 'AIzaSyD7egnBAvpdDb9ngK_-l8I_WzuvNVwhnY4',
  authDomain: 'zoo-bozor-2cae4.firebaseapp.com',
  projectId: 'zoo-bozor-2cae4',
  storageBucket: 'zoo-bozor-2cae4.firebasestorage.app',
  messagingSenderId: '2033297872',
  appId: '1:2033297872:web:f6ad76e0b23fbfa866f1d5',
  measurementId: 'G-5V9BDQBW6P',
};

// Initialize Firebase App
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth
export const auth: Auth = getAuth(app);
