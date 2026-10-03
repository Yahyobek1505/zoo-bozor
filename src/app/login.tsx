import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  ScrollView,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { useLanguageStore } from '@/store/useLanguageStore';
import { useAuthStore } from '@/store/useAuthStore';
import { AppLanguage } from '@/constants/translations';

export default function LoginScreen() {
  const router = useRouter();
  const { language, setLanguage, t } = useLanguageStore();
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
  const [localError, setLocalError] = useState<string | null>(null);
  const [helpModalVisible, setHelpModalVisible] = useState(false);

  const activeError = localError || error;

  const handleAuthAction = async () => {
    setLocalError(null);
    clearError();
    if (!email.trim() || !password.trim()) {
      setLocalError('Iltimos, email va parolni to’liq kiriting.');
      return;
    }
    if (password.length < 6) {
      setLocalError('Parol kamida 6 ta belgidan iborat bo’lishi kerak.');
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
      // Error message is stored and displayed via activeError
    }
  };

  const handleGuestLogin = async () => {
    setLocalError(null);
    clearError();
    try {
      await signInAsGuest();
      router.replace('/(tabs)');
    } catch (err: any) {
      setLocalError(err?.message || 'Mehmon sifatida kirib bo’lmadi.');
    }
  };

  const handleGoogleLogin = async () => {
    setLocalError(null);
    clearError();
    try {
      await signInWithGoogle();
      router.replace('/(tabs)');
    } catch {
      // Error message is stored and displayed via activeError
    }
  };

  const handleAppleLogin = () => {
    setLocalError('Apple ID orqali kirish faqat iOS qurilmalarda ishlaydi.');
  };

  const handleHelp = () => {
    setHelpModalVisible(true);
  };

  const fillDemoAccount = () => {
    setEmail('demo_tester@zoobozor.uz');
    setPassword('zoobozor2026');
    setLocalError(null);
    clearError();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar: Back button & Fast Language Switcher */}
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color="#0E1424" />
        </Pressable>

        {/* Quick Language Toggle */}
        <View style={styles.langPills}>
          {(['uz', 'ru', 'en'] as const).map((l: AppLanguage) => (
            <Pressable
              key={l}
              onPress={() => setLanguage(l)}
              style={[
                styles.langPill,
                language === l && styles.langPillActive,
              ]}>
              <Text
                style={[
                  styles.langPillText,
                  language === l && styles.langPillTextActive,
                ]}>
                {l === 'uz' ? 'O’zb' : l === 'ru' ? 'Рус' : 'Eng'}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

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

          {/* Visible Error Banner */}
          {activeError ? (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle" size={18} color="#EF4444" style={{ marginTop: 2 }} />
              <Text style={styles.errorText}>{activeError}</Text>
              <Pressable
                onPress={() => {
                  setLocalError(null);
                  clearError();
                }}
                hitSlop={8}>
                <Ionicons name="close" size={18} color="#991B1B" />
              </Pressable>
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
              autoComplete="email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (activeError) {
                  setLocalError(null);
                  clearError();
                }
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
              autoComplete="password"
              returnKeyType="go"
              onSubmitEditing={handleAuthAction}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (activeError) {
                  setLocalError(null);
                  clearError();
                }
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

          {/* Demo Auto-Fill Shortcut */}
          <Pressable onPress={fillDemoAccount} style={styles.demoFillBtn}>
            <Ionicons name="flash" size={14} color="#16A34A" />
            <Text style={styles.demoFillText}>Tezkor demo hisob (1 bosishda to’ldirish)</Text>
          </Pressable>

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

          {/* Quick 1-Click Guest Access */}
          <Pressable
            onPress={handleGuestLogin}
            disabled={isLoading}
            style={({ pressed }) => [
              styles.guestFullBtn,
              pressed && styles.btnPressed,
            ]}>
            <FontAwesome5 name="ghost" size={16} color="#0E1424" />
            <Text style={styles.guestFullBtnText}>Mehmon sifatida tezkor kirish (0 soniya)</Text>
          </Pressable>

          {/* Toggle between Login and Sign Up */}
          <Pressable
            onPress={() => {
              setLocalError(null);
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
            {/* Google */}
            <Pressable
              onPress={handleGoogleLogin}
              disabled={isLoading}
              style={styles.socialBtn}>
              <FontAwesome5 name="google" size={24} color="#0E1424" />
            </Pressable>

            {/* Apple */}
            <Pressable
              onPress={handleAppleLogin}
              disabled={isLoading}
              style={styles.socialBtn}>
              <FontAwesome5 name="apple" size={28} color="#0E1424" />
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

      {/* Help Modal */}
      <Modal
        visible={helpModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setHelpModalVisible(false)}>
        <View style={styles.helpModalOverlay}>
          <View style={styles.helpModalCard}>
            <Ionicons name="information-circle" size={44} color="#0E1424" style={{ marginBottom: 12 }} />
            <Text style={styles.helpTitle}>{tr.needHelp}</Text>
            <Text style={styles.helpText}>
              ZOO BOZOR qo’llab-quvvatlash xizmati:{'\n\n'}
              ✈️ Telegram: @zoobozor_support{'\n'}
              📞 Telefon: +998 71 200 00 00{'\n'}
              ⏰ Ish vaqti: 09:00 - 20:00 (Har kuni)
            </Text>
            <Pressable
              onPress={() => setHelpModalVisible(false)}
              style={styles.helpCloseBtn}>
              <Text style={styles.helpCloseBtnText}>Tushunarli</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
  },
  backBtn: {
    padding: 4,
  },
  langPills: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    padding: 3,
    gap: 3,
  },
  langPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  langPillActive: {
    backgroundColor: '#0E1424',
  },
  langPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  langPillTextActive: {
    color: '#D0FE17',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  content: {
    paddingHorizontal: 28,
    alignItems: 'center',
    paddingTop: 2,
  },
  illustration: {
    width: 160,
    height: 98,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0E1424',
    marginBottom: 14,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: '100%',
    marginBottom: 12,
    gap: 8,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
    lineHeight: 18,
  },
  inputBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    marginBottom: 10,
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
  demoFillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
    paddingVertical: 4,
    marginBottom: 8,
  },
  demoFillText: {
    fontSize: 12,
    color: '#16A34A',
    fontWeight: '700',
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: '#0E1424',
    borderRadius: 14,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    marginBottom: 8,
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
  guestFullBtn: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: 6,
  },
  guestFullBtnText: {
    color: '#0E1424',
    fontSize: 13,
    fontWeight: '700',
  },
  switchModeBtn: {
    marginTop: 8,
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
    marginVertical: 14,
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
    gap: 24,
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
    marginTop: 20,
  },
  footerText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
  },
  helpModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  helpModalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0E1424',
    marginBottom: 12,
  },
  helpText: {
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  helpCloseBtn: {
    backgroundColor: '#0E1424',
    borderRadius: 12,
    height: 44,
    paddingHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpCloseBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
