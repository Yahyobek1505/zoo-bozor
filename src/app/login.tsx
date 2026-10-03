import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { useLanguageStore } from '@/store/useLanguageStore';
import { useAuthStore } from '@/store/useAuthStore';

export default function LoginScreen() {
  const router = useRouter();
  const { t } = useLanguageStore();
  const tr = t();

  const {
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signInAsGuest,
    isLoading,
    error,
    clearError,
  } = useAuthStore();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleAuthAction = async () => {
    clearError();
    if (!email.trim() || !password.trim()) {
      Alert.alert('Diqqat', 'Email va parolni to’liq kiriting');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Diqqat', 'Parol kamida 6 ta belgidan iborat bo’lishi kerak');
      return;
    }

    try {
      if (isSignUp) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
      router.replace('/(tabs)');
    } catch {
      // Error message is captured and shown via store
    }
  };

  const handleGuestLogin = async () => {
    clearError();
    try {
      await signInAsGuest();
      router.replace('/(tabs)');
    } catch (err: any) {
      Alert.alert('Xatolik', err.message || 'Mehmon sifatida kirib bo’lmadi.');
    }
  };

  const handleGoogleLogin = async () => {
    clearError();
    try {
      await signInWithGoogle();
      router.replace('/(tabs)');
    } catch (err: any) {
      if (err?.code !== 'auth/popup-closed-by-user') {
        Alert.alert('Google xatosi', err?.message || 'Google orqali kirib bo’lmadi.');
      }
    }
  };

  const handleAppleLogin = () => {
    Alert.alert(
      'Apple ID',
      'Apple orqali kirish iOS qurilmalarda tez orada ishga tushadi.'
    );
  };

  const handleHelp = () => {
    Alert.alert(
      tr.needHelp,
      'ZOO BOZOR Telegram: @zoobozor_support\nTel: +998 71 200 00 00'
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back button */}
      <Pressable onPress={() => router.back()} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={24} color="#0E1424" />
      </Pressable>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          {/* Exact 3D Login Card Illustration */}
          <Image
            source={require('@/assets/images/illustrations/login_3d_card.png')}
            style={styles.illustration}
            contentFit="contain"
          />

          {/* Title */}
          <Text style={styles.title}>
            {isSignUp ? tr.signUpTitle : tr.loginTitle}
          </Text>

          {/* Error Banner */}
          {error ? (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle" size={16} color="#EF4444" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Email Input */}
          <View style={styles.inputBox}>
            <Feather
              name="at-sign"
              size={18}
              color="#94A3B8"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder={tr.emailPlaceholder}
              placeholderTextColor="#94A3B8"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (error) clearError();
              }}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputBox}>
            <Feather
              name="lock"
              size={18}
              color="#94A3B8"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder={tr.passwordPlaceholder}
              placeholderTextColor="#94A3B8"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (error) clearError();
              }}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)} hitSlop={8}>
              <Feather
                name={showPassword ? 'eye' : 'eye-off'}
                size={18}
                color="#94A3B8"
              />
            </Pressable>
          </View>

          {/* Primary Action Button (Kirish / Ro'yxatdan o'tish) */}
          <Pressable
            onPress={handleAuthAction}
            disabled={isLoading}
            style={({ pressed }) => [
              styles.primaryBtn,
              pressed && styles.btnPressed,
              isLoading && { opacity: 0.8 },
            ]}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.primaryBtnText}>
                {isSignUp ? tr.signUpButton : tr.loginButton}
              </Text>
            )}
          </Pressable>

          {/* Email orqali kirish / ro'yxatdan o'tish tugmasi */}
          <Pressable
            onPress={handleAuthAction}
            disabled={isLoading}
            style={({ pressed }) => [
              styles.emailBtn,
              pressed && styles.btnPressed,
            ]}>
            <Ionicons name="mail" size={18} color="#D0FE17" />
            <Text style={styles.emailBtnText}>
              {isSignUp ? tr.signUpButton : tr.loginWithEmail}
            </Text>
          </Pressable>

          {/* Toggle between Login and Sign Up */}
          <Pressable
            onPress={() => {
              clearError();
              setIsSignUp(!isSignUp);
            }}
            style={styles.switchModeBtn}>
            <Text style={styles.switchModeText}>
              {isSignUp ? tr.switchToLogin : tr.switchToSignUp}
            </Text>
          </Pressable>

          {/* Or divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>{tr.orDivider}</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Icons (Ghost/Guest, Google, Apple) */}
          <View style={styles.socialRow}>
            {/* Ghost / Guest Login */}
            <Pressable
              onPress={handleGuestLogin}
              disabled={isLoading}
              style={styles.socialBtn}>
              <FontAwesome5 name="ghost" size={26} color="#0E1424" />
            </Pressable>

            {/* Google */}
            <Pressable
              onPress={handleGoogleLogin}
              disabled={isLoading}
              style={styles.socialBtn}>
              <FontAwesome5 name="google" size={26} color="#0E1424" />
            </Pressable>

            {/* Apple */}
            <Pressable
              onPress={handleAppleLogin}
              disabled={isLoading}
              style={styles.socialBtn}>
              <FontAwesome5 name="apple" size={30} color="#0E1424" />
            </Pressable>
          </View>

          {/* Footer */}
          <Pressable onPress={handleHelp} style={styles.footer}>
            <Text style={styles.footerText}>{tr.needHelp}</Text>
            <Ionicons
              name="information-circle-outline"
              size={16}
              color="#94A3B8"
            />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backBtn: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  content: {
    paddingHorizontal: 28,
    alignItems: 'center',
    paddingTop: 6,
  },
  illustration: {
    width: 170,
    height: 105,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0E1424',
    marginBottom: 16,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: '100%',
    marginBottom: 12,
    gap: 8,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  inputBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 50,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#0E1424',
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: '#0E1424',
    borderRadius: 14,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 10,
  },
  btnPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  emailBtn: {
    width: '100%',
    backgroundColor: '#0E1424',
    borderRadius: 14,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  emailBtnText: {
    color: '#D0FE17',
    fontSize: 14,
    fontWeight: '700',
  },
  switchModeBtn: {
    marginTop: 14,
    paddingVertical: 6,
  },
  switchModeText: {
    color: '#2563EB',
    fontSize: 13,
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 16,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 36,
  },
  socialBtn: {
    padding: 10,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    height: 52,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 24,
  },
  footerText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
  },
});
