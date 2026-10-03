import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/useAuthStore';
import { AppSplashScreen } from '@/components/AppSplashScreen';

export default function RootLayout() {
  const { initAuthListener } = useAuthStore();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const unsubscribe = initAuthListener();
    // Fast, crisp branded splash loader (800ms) on page reload
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 800);

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#FFFFFF' },
        }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="language"
          options={{
            headerShown: false,
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="listing/[id]"
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="product/[id]"
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="chat/[id]"
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
      </Stack>

      {/* Global 2s splash/loader overlay on every page load/reload */}
      {showSplash && <AppSplashScreen />}
    </SafeAreaProvider>
  );
}
