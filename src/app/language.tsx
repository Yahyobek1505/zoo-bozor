import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { AppLanguage } from '@/constants/translations';
import { useLanguageStore } from '@/store/useLanguageStore';

export default function LanguageScreen() {
  const router = useRouter();
  const { setLanguage, t } = useLanguageStore();
  const tr = t();

  const handleSelectLanguage = (lang: AppLanguage) => {
    setLanguage(lang);
    router.push('/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Exact 3D Language Icon from Figma */}
        <Image
          source={require('@/assets/images/illustrations/lang_3d_icon.png')}
          style={styles.illustration}
          contentFit="contain"
        />

        {/* Heading */}
        <Text style={styles.title}>{tr.chooseLangTitle}</Text>

        {/* Language Options */}
        <View style={styles.buttonList}>
          <Pressable
            onPress={() => handleSelectLanguage('uz')}
            style={({ pressed }) => [
              styles.langBtn,
              pressed && styles.langBtnPressed,
            ]}>
            <Text style={styles.langBtnText}>O’zbek</Text>
          </Pressable>

          <Pressable
            onPress={() => handleSelectLanguage('ru')}
            style={({ pressed }) => [
              styles.langBtn,
              pressed && styles.langBtnPressed,
            ]}>
            <Text style={styles.langBtnText}>Rus</Text>
          </Pressable>

          <Pressable
            onPress={() => handleSelectLanguage('en')}
            style={({ pressed }) => [
              styles.langBtn,
              pressed && styles.langBtnPressed,
            ]}>
            <Text style={styles.langBtnText}>Eng</Text>
          </Pressable>
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  illustration: {
    width: 140,
    height: 110,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0E1424',
    marginBottom: 36,
  },
  buttonList: {
    width: '100%',
    maxWidth: 320,
    gap: 14,
  },
  langBtn: {
    backgroundColor: '#0E1424',
    borderRadius: 14,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  langBtnPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  langBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
