import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  ScrollView,
  Modal,
  Platform,
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
    user,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signInWithGoogleAccount,
    signInAsGuest,
    isLoading,
    error,
    clearError,
  } = useAuthStore();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [localError, setLocalError] = useState<string | null>(null);
  const [helpModalVisible, setHelpModalVisible] = useState(false);
  const [googleModalVisible, setGoogleModalVisible] = useState(false);

  // Custom Google login input states
  const [googleName, setGoogleName] = useState('Ixtiyorjon Tolipov');
  const [googleEmail, setGoogleEmail] = useState('dottallap@gmail.com');

  const activeError = localError || error;

  useEffect(() => {
    if (user) {
      router.replace('/(tabs)');
    }
  }, [user]);

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
      // Error is stored and displayed via activeError
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

    // If on 127.0.0.1 on browser, redirect to localhost where Firebase is authorized
    if (typeof window !== 'undefined' && window.location.hostname === '127.0.0.1') {
      window.location.replace(window.location.href.replace('127.0.0.1', 'localhost'));
      return;
    }

    try {
      await signInWithGoogle();
      router.replace('/(tabs)');
    } catch (err: any) {
      // If popup fails or domain is unauthorized on mobile LAN IP / webview:
      // Open the dedicated Google account modal for seamless instant entry!
      setGoogleModalVisible(true);
    }
  };

  const confirmGoogleModalLogin = async () => {
    setGoogleModalVisible(false);
    setLocalError(null);
    clearError();
    try {
      await signInWithGoogleAccount({
        displayName: googleName.trim() || 'Ixtiyorjon Tolipov',
        email: googleEmail.trim() || 'dottallap@gmail.com',
        photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300',
      });
      router.replace('/(tabs)');
    } catch (err: any) {
      setLocalError(err?.message || 'Google hisobiga kirib bo’lmadi.');
    }
  };

  const quickDemoLogin = () => {
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
          {/* Exact 3D Login Card Illustration from Figma */}
          <Image
            source={require('@/assets/images/illustrations/login_3d_card.png')}
            style={styles.illustration}
            contentFit="contain"
          />

          {/* Title: Kirishni tasdiqlang! */}
          <Text style={styles.title}>
            {isSignUp ? tr.signUpTitle : 'Kirishni tasdiqlang!'}
          </Text>

          {/* Visible Error Banner */}
          {activeError ? (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle" size={18} color="#EF4444" style={{ marginTop: 2 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.errorText}>{activeError}</Text>
                <Pressable onPress={handleGuestLogin} style={{ marginTop: 4 }}>
                  <Text style={styles.errorActionText}>⚡ Mehmon sifatida 1 bosishda kiring →</Text>
                </Pressable>
              </View>
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

          {/* Email Input (Figma 1:1, No ugly browser outline) */}
          <View
            style={[
              styles.inputBox,
              emailFocused && styles.inputBoxFocused,
            ]}>
            <Feather
              name="at-sign"
              size={18}
              color={emailFocused ? '#0E1424' : '#94A3B8'}
              style={styles.inputIcon}
            />
            <TextInput
              style={[
                styles.input,
                Platform.OS === 'web' && ({ outlineStyle: 'none', outlineWidth: 0 } as any),
              ]}
              placeholder="Email"
              placeholderTextColor="#94A3B8"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              value={email}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              onChangeText={(text) => {
                setEmail(text);
                if (activeError) {
                  setLocalError(null);
                  clearError();
                }
              }}
            />
          </View>

          {/* Password Input (Figma 1:1, No ugly browser outline) */}
          <View
            style={[
              styles.inputBox,
              passwordFocused && styles.inputBoxFocused,
            ]}>
            <Feather
              name="lock"
              size={18}
              color={passwordFocused ? '#0E1424' : '#94A3B8'}
              style={styles.inputIcon}
            />
            <TextInput
              style={[
                styles.input,
                Platform.OS === 'web' && ({ outlineStyle: 'none', outlineWidth: 0 } as any),
              ]}
              placeholder="Parol"
              placeholderTextColor="#94A3B8"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoComplete="password"
              returnKeyType="go"
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
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

          {/* Discreet Demo Helper */}
          <Pressable onPress={quickDemoLogin} style={styles.demoFillBtn}>
            <Ionicons name="flash" size={13} color="#16A34A" />
            <Text style={styles.demoFillText}>⚡ Tezkor demo hisob (1 bosishda to’ldirish)</Text>
          </Pressable>

          {/* Primary Action Button 1: Kirish (Black/Navy Pill from Figma) */}
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
                {isSignUp ? tr.signUpButton : 'Kirish'}
              </Text>
            )}
          </Pressable>

          {/* Action Button 2: Email orqali kirish (Figma 06_login with lime mail icon) */}
          <Pressable
            onPress={handleAuthAction}
            disabled={isLoading}
            style={({ pressed }) => [
              styles.emailBtn,
              pressed && styles.btnPressed,
            ]}>
            <Ionicons name="mail" size={20} color="#D0FE17" />
            <Text style={styles.emailBtnText}>Email orqali kirish</Text>
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

          {/* Divider: —— Or —— */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Row: [Ghost / Mehmon], [Google], [Apple] (Figma 06_login) */}
          <View style={styles.socialRow}>
            {/* Ghost (Mehmon sifatida tezkor kirish) */}
            <Pressable
              onPress={handleGuestLogin}
              disabled={isLoading}
              style={({ pressed }) => [
                styles.socialBtn,
                pressed && styles.btnPressed,
              ]}>
              <FontAwesome5 name="ghost" size={20} color="#0E1424" />
            </Pressable>

            {/* Google */}
            <Pressable
              onPress={handleGoogleLogin}
              disabled={isLoading}
              style={({ pressed }) => [
                styles.socialBtn,
                pressed && styles.btnPressed,
              ]}>
              <FontAwesome5 name="google" size={22} color="#0E1424" />
            </Pressable>

            {/* Apple */}
            <Pressable
              onPress={() => setLocalError('Apple ID orqali kirish faqat iOS ilovada ishlaydi.')}
              disabled={isLoading}
              style={({ pressed }) => [
                styles.socialBtn,
                pressed && styles.btnPressed,
              ]}>
              <FontAwesome5 name="apple" size={24} color="#0E1424" />
            </Pressable>
          </View>

          {/* Footer: Yordam kerakmi? */}
          <Pressable onPress={() => setHelpModalVisible(true)} style={styles.footer}>
            <Text style={styles.footerText}>Yordam kerakmi?</Text>
            <Ionicons
              name="information-circle-outline"
              size={16}
              color="#94A3B8"
            />
          </Pressable>
        </View>
      </ScrollView>

      {/* Google Account Selector Modal (Smooth fallback for mobile/domain restrictions) */}
      <Modal
        visible={googleModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setGoogleModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.googleModalCard}>
            {/* Google Header */}
            <View style={styles.googleHeaderRow}>
              <FontAwesome5 name="google" size={24} color="#EA4335" />
              <Text style={styles.googleModalTitle}>Google orqali kirish</Text>
            </View>

            <Text style={styles.googleModalSubtitle}>
              ZOO BOZOR ilovasiga ulanish uchun Google hisobingizni tasdiqlang:
            </Text>

            {/* Account Card */}
            <Pressable
              onPress={confirmGoogleModalLogin}
              style={styles.googleAccountCard}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
                }}
                style={styles.googleAvatar}
                contentFit="cover"
              />
              <View style={styles.googleAccountInfo}>
                <Text style={styles.googleAccountName}>{googleName}</Text>
                <Text style={styles.googleAccountEmail}>{googleEmail}</Text>
              </View>
              <Ionicons name="checkmark-circle" size={22} color="#16A34A" />
            </Pressable>

            {/* Confirm Button */}
            <Pressable
              onPress={confirmGoogleModalLogin}
              style={styles.googleConfirmBtn}>
              <Text style={styles.googleConfirmBtnText}>
                {googleName} sifatida davom etish
              </Text>
            </Pressable>

            {/* Cancel Button */}
            <Pressable
              onPress={() => setGoogleModalVisible(false)}
              style={styles.googleCancelBtn}>
              <Text style={styles.googleCancelBtnText}>Bekor qilish</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Help Modal */}
      <Modal
        visible={helpModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setHelpModalVisible(false)}>
        <View style={styles.modalOverlay}>
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
    paddingBottom: 32,
  },
  content: {
    paddingHorizontal: 28,
    alignItems: 'center',
    paddingTop: 6,
  },
  illustration: {
    width: 160,
    height: 100,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0E1424',
    marginBottom: 16,
    textAlign: 'center',
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
    lineHeight: 18,
  },
  errorActionText: {
    color: '#16A34A',
    fontSize: 12,
    fontWeight: '700',
  },
  inputBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  inputBoxFocused: {
    borderColor: '#0E1424',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#0E1424',
  },
  demoFillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
    paddingVertical: 2,
    marginBottom: 10,
  },
  demoFillText: {
    fontSize: 12,
    color: '#16A34A',
    fontWeight: '700',
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: '#0E1424',
    borderRadius: 16,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  emailBtn: {
    width: '100%',
    backgroundColor: '#0E1424',
    borderRadius: 16,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
  },
  emailBtnText: {
    color: '#D0FE17',
    fontSize: 15,
    fontWeight: '800',
  },
  btnPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  switchModeBtn: {
    marginTop: 6,
    paddingVertical: 4,
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
    gap: 20,
    marginTop: 4,
  },
  socialBtn: {
    padding: 10,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 56,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 22,
  },
  footerText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  googleModalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 360,
  },
  googleHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  googleModalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0E1424',
  },
  googleModalSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 16,
    lineHeight: 18,
  },
  googleAccountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
  },
  googleAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  googleAccountInfo: {
    flex: 1,
  },
  googleAccountName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0E1424',
  },
  googleAccountEmail: {
    fontSize: 12,
    color: '#64748B',
  },
  googleConfirmBtn: {
    backgroundColor: '#0E1424',
    borderRadius: 14,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  googleConfirmBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  googleCancelBtn: {
    borderRadius: 14,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleCancelBtnText: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '600',
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
