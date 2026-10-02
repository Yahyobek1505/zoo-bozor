import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguageStore } from '@/store/useLanguageStore';

export default function SplashScreen() {
  const router = useRouter();
  const { t } = useLanguageStore();
  const tr = t();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Smooth fade in & scale animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto navigate to language selection after 1.8 seconds
    const timer = setTimeout(() => {
      router.replace('/language');
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  const handleSkip = () => {
    router.replace('/language');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={handleSkip} style={styles.touchArea}>
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}>
          {/* Exact ZOO BOZOR Cat Spiral Logo */}
          <Image
            source={require('@/assets/images/zoo_logo.png')}
            style={styles.logo}
            contentFit="contain"
          />

          {/* Heading */}
          <Text style={styles.title}>{tr.splashTitle}</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>{tr.splashSubtitle}</Text>
        </Animated.View>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  touchArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 90,
    height: 96,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: '#0E1424',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '500',
  },
});
