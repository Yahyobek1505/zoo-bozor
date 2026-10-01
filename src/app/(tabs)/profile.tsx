import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { ZooColors } from '@/constants/zooTheme';

export default function ProfileScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'info' | 'balance'>('info');
  const [adsTab, setAdsTab] = useState<'my_ads' | 'rejected'>('my_ads');
  
  const [showName, setShowName] = useState(true);
  const [showPhone, setShowPhone] = useState(true);

  const handleLogout = () => {
    Alert.alert('Chiqish', 'Haqiqatan ham profilingizdan chiqmoqchimisiz?', [
      { text: 'Bekor qilish', style: 'cancel' },
      { text: 'Chiqish', style: 'destructive', onPress: () => router.push('/login') },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Curved Navy Header with User and Balance */}
      <View style={styles.header}>
        <SafeAreaView edges={['top']}>
          {/* Top Actions: Mail & Edit */}
          <View style={styles.headerTopRow}>
            <View />
            <View style={styles.headerIcons}>
              <Pressable
                onPress={() => router.push('/chat')}
                style={styles.iconBtn}>
                <Ionicons name="mail" size={20} color="#FFFFFF" />
              </Pressable>
              <Pressable
                onPress={() => router.push('/settings')}
                style={styles.iconBtn}>
                <Feather name="edit" size={20} color="#FFFFFF" />
              </Pressable>
            </View>
          </View>

          {/* Balance Widget */}
          <View style={styles.balanceRow}>
            <View style={styles.walletBadge}>
              <Ionicons name="wallet" size={20} color="#0E1424" />
            </View>
            <Text style={styles.balanceAmount}>530.000</Text>
            <Text style={styles.balanceCurrency}>UZS</Text>
          </View>

          {/* User Profile Bar */}
          <View style={styles.userRow}>
            <View style={styles.avatarWrapper}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=200',
                }}
                style={styles.avatarImg}
                contentFit="cover"
              />
              <View style={styles.cameraBadge}>
                <Ionicons name="camera" size={12} color="#0E1424" />
              </View>
            </View>

            <Text style={styles.userName}>thalipof</Text>

            <Pressable onPress={handleLogout} style={styles.logoutBtn}>
              <Feather name="log-out" size={22} color="#FFFFFF" />
            </Pressable>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}>
        
        {/* Segmented Pill Tabs: [Shaxsiy Ma'lumot] vs [BALANS] */}
        <View style={styles.segmentedControl}>
          <Pressable
            onPress={() => setActiveTab('info')}
            style={[
              styles.segmentBtn,
              activeTab === 'info' && styles.segmentBtnActive,
            ]}>
            <Text
              style={[
                styles.segmentText,
                activeTab === 'info' && styles.segmentTextActive,
              ]}>
              Shaxsiy Ma’lumot
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab('balance')}
            style={[
              styles.segmentBtn,
              activeTab === 'balance' && styles.segmentBtnActive,
            ]}>
            <View style={styles.balansRow}>
              <Ionicons
                name="wallet-outline"
                size={16}
                color={activeTab === 'balance' ? '#0E1424' : '#FFFFFF'}
              />
              <Text
                style={[
                  styles.segmentText,
                  activeTab === 'balance' && styles.segmentTextActive,
                ]}>
                BALANS
              </Text>
            </View>
          </Pressable>
        </View>

        {/* User Info Fields */}
        <View style={styles.infoFields}>
          {/* Ism */}
          <View style={styles.fieldRow}>
            <View style={styles.fieldIcon}>
              <Feather name="user" size={18} color="#94A3B8" />
            </View>
            <View style={styles.fieldTextCol}>
              <Text style={styles.fieldSub}>ism</Text>
              <Text style={styles.fieldMain}>Tolipov Ixtiyorjon</Text>
            </View>
            <Switch
              value={showName}
              onValueChange={setShowName}
              trackColor={{ false: '#CBD5E1', true: '#D2FF00' }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Nomer */}
          <View style={styles.fieldRow}>
            <View style={styles.fieldIcon}>
              <Feather name="smartphone" size={18} color="#94A3B8" />
            </View>
            <View style={styles.fieldTextCol}>
              <Text style={styles.fieldSub}>Nomer</Text>
              <Text style={styles.fieldMain}>+998 90 360 46 00</Text>
            </View>
            <Switch
              value={showPhone}
              onValueChange={setShowPhone}
              trackColor={{ false: '#CBD5E1', true: '#D2FF00' }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* E-mail */}
          <View style={styles.fieldRow}>
            <View style={styles.fieldIcon}>
              <Feather name="at-sign" size={18} color="#94A3B8" />
            </View>
            <View style={styles.fieldTextCol}>
              <Text style={styles.fieldSub}>E-mail</Text>
              <Text style={styles.fieldMain}>Dottallap@gmail.com</Text>
            </View>
          </View>

          {/* Data */}
          <View style={styles.fieldRow}>
            <View style={styles.fieldIcon}>
              <Feather name="calendar" size={18} color="#94A3B8" />
            </View>
            <View style={styles.fieldTextCol}>
              <Text style={styles.fieldSub}>Data</Text>
              <Text style={styles.fieldMain}>15.11.1994</Text>
            </View>
          </View>
        </View>

        {/* Ads Tabs: [E'lonlarim] vs [Rad Etilgan] */}
        <View style={styles.adsTabRow}>
          <Pressable
            onPress={() => setAdsTab('my_ads')}
            style={[
              styles.adsTabBtn,
              adsTab === 'my_ads' && styles.adsTabBtnActive,
            ]}>
            <Text
              style={[
                styles.adsTabText,
                adsTab === 'my_ads' && styles.adsTabTextActive,
              ]}>
              E’lonlarim
            </Text>
            {adsTab === 'my_ads' && <View style={styles.adsTabUnderline} />}
          </Pressable>

          <Pressable
            onPress={() => setAdsTab('rejected')}
            style={[
              styles.adsTabBtn,
              adsTab === 'rejected' && styles.adsTabBtnInactive,
            ]}>
            <Text
              style={[
                styles.adsTabText,
                adsTab === 'rejected' ? styles.adsTabTextActive : styles.adsTabTextMuted,
              ]}>
              Rad Etilgan
            </Text>
          </Pressable>
        </View>

        {/* My Ads Content */}
        <View style={styles.adsListPlaceholder}>
          <Text style={styles.emptyAdsText}>
            {adsTab === 'my_ads'
              ? 'Hozirda 3 ta faol e\'loningiz bor'
              : 'Rad etilgan e\'lonlar mavjud emas'}
          </Text>
        </View>

        {/* Spacer for bottom navigation */}
        <View style={{ height: 90 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#161F38',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingHorizontal: 20,
    paddingBottom: 22,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 14,
  },
  iconBtn: {
    padding: 4,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
    marginBottom: 16,
  },
  walletBadge: {
    backgroundColor: '#D2FF00',
    padding: 6,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceAmount: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
  },
  balanceCurrency: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '700',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatarWrapper: {
    position: 'relative',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    overflow: 'visible',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#FFFFFF',
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  logoutBtn: {
    padding: 6,
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    padding: 20,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#0E1424',
    borderRadius: 24,
    padding: 4,
    marginBottom: 20,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  segmentBtnActive: {
    backgroundColor: '#D2FF00',
  },
  segmentText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  segmentTextActive: {
    color: '#0E1424',
  },
  balansRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoFields: {
    gap: 16,
    marginBottom: 24,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fieldIcon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldTextCol: {
    flex: 1,
  },
  fieldSub: {
    fontSize: 11,
    color: '#94A3B8',
    textTransform: 'lowercase',
  },
  fieldMain: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0E1424',
    marginTop: 2,
  },
  adsTabRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  adsTabBtn: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 10,
    position: 'relative',
  },
  adsTabBtnActive: {
    backgroundColor: '#0E1424',
  },
  adsTabBtnInactive: {
    backgroundColor: '#E2E8F0',
  },
  adsTabText: {
    fontSize: 13,
    fontWeight: '700',
  },
  adsTabTextActive: {
    color: '#FFFFFF',
  },
  adsTabTextMuted: {
    color: '#64748B',
  },
  adsTabUnderline: {
    position: 'absolute',
    bottom: -6,
    left: '25%',
    width: '50%',
    height: 3,
    borderRadius: 2,
    backgroundColor: '#D2FF00',
  },
  adsListPlaceholder: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  emptyAdsText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '500',
  },
});
