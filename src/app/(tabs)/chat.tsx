import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ChatThread } from '@/types';
import { ZooColors } from '@/constants/zooTheme';
import { formatPrice } from '@/utils/formatters';

const MOCK_CHATS: ChatThread[] = [
  {
    id: 'chat-1',
    listingId: 'zoo-1',
    listingTitle: 'Shotland osma quloq (Scottish Fold)',
    listingImage:
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800',
    listingPrice: 1800000,
    listingCurrency: 'UZS',
    otherUser: {
      id: 'seller-1',
      name: 'Aziza Karimova',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
      isOnline: true,
    },
    lastMessage: 'Assalomu alaykum! Mushukcha hali sotildimi?',
    lastMessageTime: '14:45',
    unreadCount: 2,
  },
  {
    id: 'chat-2',
    listingId: 'zoo-2',
    listingTitle: 'Whiskas 5 kg quruq ozuqa',
    listingImage:
      'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?q=80&w=800',
    listingPrice: 320000,
    listingCurrency: 'UZS',
    otherUser: {
      id: 'seller-2',
      name: 'ZooMarket Toshkent',
      avatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
      isOnline: false,
    },
    lastMessage: 'Dostavka ertaga ertalab soat 10:00 da yetib boradi.',
    lastMessageTime: 'Kecha',
    unreadCount: 0,
  },
  {
    id: 'chat-3',
    listingId: 'zoo-3',
    listingTitle: 'Nemis ovcharkasi kuchukchalari',
    listingImage:
      'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?q=80&w=800',
    listingPrice: 2500000,
    listingCurrency: 'UZS',
    otherUser: {
      id: 'seller-3',
      name: 'Jasur Beknazarov',
      isOnline: true,
    },
    lastMessage: 'Pasport va vaksina qog\'ozlari fotosini yubordim.',
    lastMessageTime: '28-sen',
    unreadCount: 0,
  },
];

export default function ChatListScreen() {
  const router = useRouter();

  const handleOpenChat = (chat: ChatThread) => {
    router.push({
      pathname: '/chat/[id]',
      params: {
        id: chat.id,
        userName: chat.otherUser.name,
        listingTitle: chat.listingTitle,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Xabarlar</Text>
      </View>

      <FlatList
        data={MOCK_CHATS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleOpenChat(item)}
            style={({ pressed }) => [
              styles.chatItem,
              pressed && styles.chatItemPressed,
            ]}>
            {/* User Avatar with Online Dot */}
            <View style={styles.avatarContainer}>
              {item.otherUser.avatar ? (
                <Image
                  source={{ uri: item.otherUser.avatar }}
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.avatarFallback}>
                  <Text style={styles.avatarFallbackText}>
                    {item.otherUser.name.charAt(0)}
                  </Text>
                </View>
              )}
              {item.otherUser.isOnline && <View style={styles.onlineBadge} />}
            </View>

            {/* Chat info */}
            <View style={styles.centerCol}>
              <View style={styles.nameRow}>
                <Text style={styles.userName}>{item.otherUser.name}</Text>
                <Text style={styles.timeText}>{item.lastMessageTime}</Text>
              </View>

              <Text style={styles.listingContext} numberOfLines={1}>
                {item.listingTitle} • {formatPrice(item.listingPrice, item.listingCurrency)}
              </Text>

              <Text
                style={[
                  styles.lastMessage,
                  item.unreadCount > 0 && styles.lastMessageUnread,
                ]}
                numberOfLines={1}>
                {item.lastMessage}
              </Text>
            </View>

            {/* Pet Thumbnail & Unread Badge */}
            <View style={styles.rightCol}>
              <Image
                source={{ uri: item.listingImage }}
                style={styles.listingThumb}
              />
              {item.unreadCount > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadText}>{item.unreadCount}</Text>
                </View>
              )}
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: ZooColors.dark,
  },
  list: {
    paddingVertical: 8,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#F1F5F9',
    gap: 12,
  },
  chatItemPressed: {
    backgroundColor: '#F8FAFC',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  avatarFallback: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: ZooColors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarFallbackText: {
    fontSize: 18,
    fontWeight: '700',
    color: ZooColors.primaryDark,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: ZooColors.primary,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  centerCol: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  userName: {
    fontSize: 15,
    fontWeight: '700',
    color: ZooColors.dark,
  },
  timeText: {
    fontSize: 11,
    color: '#94A3B8',
  },
  listingContext: {
    fontSize: 12,
    color: ZooColors.primaryDark,
    fontWeight: '600',
    marginBottom: 3,
  },
  lastMessage: {
    fontSize: 13,
    color: ZooColors.gray,
  },
  lastMessageUnread: {
    color: ZooColors.dark,
    fontWeight: '600',
  },
  rightCol: {
    alignItems: 'flex-end',
    gap: 4,
  },
  listingThumb: {
    width: 42,
    height: 42,
    borderRadius: 8,
  },
  unreadBadge: {
    backgroundColor: ZooColors.danger,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
    minWidth: 18,
    alignItems: 'center',
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
});
