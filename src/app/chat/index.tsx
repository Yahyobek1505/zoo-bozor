import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { ZooColors } from '@/constants/zooTheme';

interface HabarItem {
  id: string;
  name: string;
  unreadCount?: number;
  time: string;
  avatar?: string;
  isOfficial?: boolean;
}

const HABARLAR_DATA: HabarItem[] = [
  {
    id: 'h-1',
    name: 'thalipof',
    unreadCount: 7,
    time: '07:35',
    avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=200',
  },
  {
    id: 'h-2',
    name: 'Mahkamov',
    unreadCount: 10,
    time: '07:35',
  },
  {
    id: 'h-3',
    name: 'Oripova Gulbahor',
    unreadCount: 47,
    time: '07:35',
  },
  {
    id: 'h-4',
    name: 'ZOO BOZOR',
    unreadCount: 11,
    time: '07:35',
    isOfficial: true,
  },
  {
    id: 'h-5',
    name: 'Abdullayev Bakhodir',
    time: '07:35',
  },
];

export default function HabarlarScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

  const filteredData =
    activeTab === 'unread'
      ? HABARLAR_DATA.filter((i) => i.unreadCount && i.unreadCount > 0)
      : HABARLAR_DATA;

  return (
    <View style={styles.container}>
      {/* Curved Navy Header matching Figma */}
      <View style={styles.header}>
        <SafeAreaView edges={['top']}>
          <View style={styles.headerTopRow}>
            <Pressable onPress={() => router.back()} style={styles.backRow}>
              <Ionicons name="chevron-back" size={24} color="#D2FF00" />
              <Text style={styles.headerTitle}>Habarlar</Text>
            </Pressable>

            <View style={styles.headerRightIcons}>
              <Ionicons name="checkmark-done" size={22} color="#FFFFFF" />
              <Feather name="menu" size={22} color="#FFFFFF" />
            </View>
          </View>

          {/* Segmented Tabs: [Barchasi] vs [O'qilmagan] */}
          <View style={styles.tabsRow}>
            <Pressable
              onPress={() => setActiveTab('all')}
              style={[
                styles.tabBtn,
                activeTab === 'all' ? styles.tabBtnAllActive : styles.tabBtnInactive,
              ]}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'all' && styles.tabTextActive,
                ]}>
                Barchasi
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setActiveTab('unread')}
              style={[
                styles.tabBtn,
                activeTab === 'unread' ? styles.tabBtnAllActive : styles.tabBtnInactive,
              ]}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'unread' && styles.tabTextActive,
                ]}>
                O’qilmagan
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </View>

      {/* Date Header */}
      <View style={styles.dateRow}>
        <Text style={styles.dateText}>2026.04.06</Text>
      </View>

      {/* List */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: '/chat/[id]',
                params: {
                  id: item.id,
                  userName: item.name,
                },
              })
            }
            style={styles.chatCard}>
            {/* Avatar */}
            {item.avatar ? (
              <Image source={{ uri: item.avatar }} style={styles.avatarImg} />
            ) : item.isOfficial ? (
              <View style={styles.officialAvatar}>
                <Image
                  source={require('@/assets/images/zoo_logo.png')}
                  style={styles.officialLogo}
                  contentFit="contain"
                />
              </View>
            ) : (
              <View style={styles.defaultAvatar}>
                <Feather name="user" size={22} color="#FFFFFF" />
              </View>
            )}

            {/* Username */}
            <Text style={styles.userName}>{item.name}</Text>

            {/* Unread badge & time */}
            <View style={styles.rightCol}>
              {item.unreadCount ? (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadText}>{item.unreadCount}</Text>
                </View>
              ) : null}
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    backgroundColor: '#1B2544',
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  headerRightIcons: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 14,
  },
  tabBtn: {
    flex: 1,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBtnAllActive: {
    backgroundColor: '#D2FF00',
  },
  tabBtnInactive: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0E1424',
  },
  tabTextActive: {
    color: '#0E1424',
  },
  dateRow: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  dateText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  list: {
    paddingHorizontal: 16,
    gap: 10,
    paddingBottom: 30,
  },
  chatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarImg: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  officialAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#0E1424',
    alignItems: 'center',
    justifyContent: 'center',
  },
  officialLogo: {
    width: 26,
    height: 26,
    tintColor: '#D2FF00',
  },
  defaultAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#0E1424',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '800',
    color: '#0E1424',
  },
  rightCol: {
    alignItems: 'flex-end',
    gap: 4,
  },
  unreadBadge: {
    backgroundColor: '#263352',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: 'center',
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  timeText: {
    fontSize: 11,
    color: '#94A3B8',
  },
});
