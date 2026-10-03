import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, ActivityIndicator, Dimensions } from 'react-native';
import { Image } from 'expo-image';

const { width, height } = Dimensions.get('window');

interface Props {
  onFinish?: () => void;
}

export const AppSplashScreen: React.FC<Props> = ({ onFinish }) => {
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Smooth entry animation
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.overlay}>
      <Animated.View
        style={[
          styles.card,
          {
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}>
        {/* Cat Spiral Logo */}
        <Image
          source={require('@/assets/images/zoo_logo.png')}
          style={styles.logo}
          contentFit="contain"
        />

        {/* Title */}
        <Text style={styles.title}>ZOO BOZOR</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>Hayvonlar savdosi e’lonlar</Text>

        {/* 2-Second Loader */}
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="small" color="#0E1424" />
        </View>
      </Animated.View>

      <Text style={styles.footerVersion}>ZOO BOZOR v1.0.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...(StyleSheet.absoluteFill as object),
    backgroundColor: '#FFFFFF',
    zIndex: 999999,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 96,
    height: 104,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0E1424',
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
    marginBottom: 28,
  },
  loaderContainer: {
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerVersion: {
    position: 'absolute',
    bottom: 30,
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
