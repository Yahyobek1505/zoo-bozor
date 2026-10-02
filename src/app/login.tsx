import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { useLanguageStore } from '@/store/useLanguageStore';

export default function LoginScreen() {
  const router = useRouter();
  const { t } = useLanguageStore();
  const tr = t();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    router.replace('/(tabs)');
  };

  const handleGuestLogin = () => {
    Alert.alert(tr.guestLoginSuccess, '', [
      { text: 'OK', onPress: () => router.replace('/(tabs)') },
    ]);
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

      <View style={styles.content}>
        {/* Exact 3D Login Card Illustration */}
        <Image
          source={require('@/assets/images/illustrations/login_3d_card.png')}
          style={styles.illustration}
          contentFit="contain"
        />

        {/* Title */}
        <Text style={styles.title}>{tr.loginTitle}</Text>

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
            value={email}
            onChangeText={setEmail}
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
            value={password}
            onChangeText={setPassword}
          />
          <Pressable onPress={() => setShowPassword(!showPassword)} hitSlop={8}>
            <Feather
              name={showPassword ? 'eye' : 'eye-off'}
              size={18}
              color="#94A3B8"
            />
          </Pressable>
        </View>

        {/* Kirish Button */}
        <Pressable onPress={handleLogin} style={styles.primaryBtn}>
          <Text style={styles.primaryBtnText}>{tr.loginButton}</Text>
        </Pressable>

        {/* Email orqali kirish button */}
        <Pressable onPress={handleLogin} style={styles.emailBtn}>
          <Ionicons name="mail" size={18} color="#D2FF00" />
          <Text style={styles.emailBtnText}>{tr.loginWithEmail}</Text>
        </Pressable>

        {/* Or divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>{tr.orDivider}</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Icons (Ghost, Google, Apple) */}
        <View style={styles.socialRow}>
          {/* Ghost / Guest Login */}
          <Pressable onPress={handleGuestLogin} style={styles.socialBtn}>
            <FontAwesome5 name="ghost" size={28} color="#0E1424" />
          </Pressable>

          {/* Google */}
          <Pressable onPress={handleLogin} style={styles.socialBtn}>
            <FontAwesome5 name="google" size={28} color="#0E1424" />
          </Pressable>

          {/* Apple */}
          <Pressable onPress={handleLogin} style={styles.socialBtn}>
            <FontAwesome5 name="apple" size={32} color="#0E1424" />
          </Pressable>
        </View>

        {/* Footer */}
        <Pressable onPress={handleHelp} style={styles.footer}>
          <Text style={styles.footerText}>{tr.needHelp}</Text>
          <Ionicons name="information-circle-outline" size={16} color="#94A3B8" />
        </Pressable>
      </View>
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
  content: {
    paddingHorizontal: 28,
    alignItems: 'center',
    paddingTop: 10,
  },
  illustration: {
    width: 170,
    height: 110,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0E1424',
    marginBottom: 20,
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
    marginTop: 6,
    marginBottom: 10,
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
    color: '#D2FF00',
    fontSize: 14,
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
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
    padding: 6,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 36,
  },
  footerText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
  },
});
