import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';
import { ZooColors } from '@/constants/zooTheme';

export default function SettingsScreen() {
  const router = useRouter();

  const [nickName, setNickName] = useState('thalipof');
  const [name, setName] = useState('Tolipov Ixtiyorjon');
  const [phone, setPhone] = useState('+998 90 360 46 00');
  const [email, setEmail] = useState('Dottallap@gmail.com');
  const [birthYear, setBirthYear] = useState('15.11.1994');

  const handleSave = () => {
    Alert.alert('Saqlandi', 'Ma\'lumotlaringiz muvaffaqiyatli saqlandi!', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={ZooColors.navyDark} />
        </Pressable>
        <View style={styles.titleRow}>
          <Feather name="edit" size={22} color={ZooColors.navyDark} />
          <Text style={styles.title}>Sozlama</Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.form}
        contentContainerStyle={styles.formContent}
        showsVerticalScrollIndicator={false}>
        {/* Nick name */}
        <View style={styles.fieldBox}>
          <Text style={styles.label}>Nick name</Text>
          <TextInput
            style={styles.input}
            value={nickName}
            onChangeText={setNickName}
          />
        </View>

        {/* Ism */}
        <View style={styles.fieldBox}>
          <Text style={styles.label}>Ism</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Tel raqam */}
        <View style={styles.fieldBox}>
          <Text style={styles.label}>Tel raqam</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        {/* E-mail */}
        <View style={styles.fieldBox}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Tug'ilgan yil */}
        <View style={styles.fieldBox}>
          <Text style={styles.label}>Tug’ilgan yil</Text>
          <TextInput
            style={styles.input}
            value={birthYear}
            onChangeText={setBirthYear}
          />
        </View>

        {/* SAQLASH Button */}
        <Pressable onPress={handleSave} style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>SAQLASH</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  backBtn: {
    padding: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: ZooColors.navyDark,
  },
  form: {
    flex: 1,
  },
  formContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  fieldBox: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0E1424',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#0E1424',
    backgroundColor: '#FFFFFF',
  },
  saveBtn: {
    backgroundColor: '#0E1424',
    borderRadius: 12,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
