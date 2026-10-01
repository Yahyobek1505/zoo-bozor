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
import { useRouter } from 'expo-router';
import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { ZooColors } from '@/constants/zooTheme';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    Alert.alert('Muvaffaqiyatli', 'Tizimga muvaffaqiyatli kirdingiz!', [
      { text: 'Davom etish', onPress: () => router.push('/(tabs)') },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back button */}
      <Pressable onPress={() => router.back()} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={24} color={ZooColors.navyDark} />
      </Pressable>

      <View style={styles.content}>
        {/* 3D Illustration Badge */}
        <View style={styles.illustrationBox}>
          <View style={styles.cardIllustration}>
            <View style={styles.dotsBar}>
              <View style={[styles.miniDot, { backgroundColor: '#EF4444' }]} />
              <View style={[styles.miniDot, { backgroundColor: '#F59E0B' }]} />
            </View>
            <View style={styles.userGraphic}>
              <Ionicons name="person-circle" size={44} color="#F59E0B" />
              <View style={styles.linesGraphic}>
                <View style={styles.line1} />
                <View style={styles.line2} />
              </View>
            </View>
            <View style={styles.signInPill}>
              <Text style={styles.signInPillText}>Sign In</Text>
            </View>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Kirishni tasdiqlang!</Text>

        {/* Email Input */}
        <View style={styles.inputBox}>
          <Feather name="at-sign" size={20} color="#94A3B8" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#94A3B8"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputBox}>
          <Feather name="lock" size={20} color="#94A3B8" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Parol"
            placeholderTextColor="#94A3B8"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Feather
              name={showPassword ? 'eye' : 'eye-off'}
              size={18}
              color="#94A3B8"
            />
          </Pressable>
        </View>

        {/* Kirish Button */}
        <Pressable onPress={handleLogin} style={styles.primaryBtn}>
          <Text style={styles.primaryBtnText}>Kirish</Text>
        </Pressable>

        {/* Email orqali kirish button */}
        <Pressable onPress={handleLogin} style={styles.emailBtn}>
          <Ionicons name="mail" size={18} color="#D2FF00" />
          <Text style={styles.emailBtnText}>Email orqali kirish</Text>
        </Pressable>

        {/* Or divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Icons (Ghost, Google, Apple) */}
        <View style={styles.socialRow}>
          {/* Ghost / Guest */}
          <Pressable onPress={handleLogin} style={styles.socialBtn}>
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
        <View style={styles.footer}>
          <Text style={styles.footerText}>Yordam kerakmi?</Text>
          <Ionicons name="information-circle-outline" size={16} color="#94A3B8" />
        </View>
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
    padding: 16,
  },
  content: {
    paddingHorizontal: 28,
    alignItems: 'center',
  },
  illustrationBox: {
    marginVertical: 14,
  },
  cardIllustration: {
    width: 140,
    height: 110,
    backgroundColor: '#F3F4F6',
    borderRadius: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  dotsBar: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    gap: 4,
    marginBottom: 6,
  },
  miniDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  userGraphic: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  linesGraphic: {
    gap: 4,
  },
  line1: {
    width: 45,
    height: 5,
    backgroundColor: '#CBD5E1',
    borderRadius: 3,
  },
  line2: {
    width: 30,
    height: 5,
    backgroundColor: '#CBD5E1',
    borderRadius: 3,
  },
  signInPill: {
    marginTop: 8,
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 12,
  },
  signInPillText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0E1424',
    marginBottom: 24,
  },
  inputBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 50,
    marginBottom: 14,
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
    borderRadius: 12,
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
    borderRadius: 12,
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
    marginVertical: 24,
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
    marginTop: 48,
  },
  footerText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
  },
});
