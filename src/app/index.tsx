import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/useAuthStore';

export default function IndexScreen() {
  const router = useRouter();
  const { user, isInitialized } = useAuthStore();

  useEffect(() => {
    if (isInitialized) {
      if (user) {
        // If already logged in, enter main app immediately
        router.replace('/(tabs)');
      } else {
        // If not logged in, go straight to login screen
        router.replace('/login');
      }
    }
  }, [isInitialized, user]);

  return <View style={{ flex: 1, backgroundColor: '#FFFFFF' }} />;
}
