import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons, Feather } from '@expo/vector-icons';
import { ZooColors } from '@/constants/zooTheme';

interface Message {
  id: string;
  sender: 'me' | 'other';
  text: string;
  time: string;
}

export default function ChatScreen() {
  const router = useRouter();
  const { userName } = useLocalSearchParams<{ userName?: string }>();
  const [inputText, setInputText] = useState('');

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'me',
      text: 'Vaqtini yuborolasizmi?',
      time: 'Soat: 00:59',
    },
    {
      id: 'm2',
      sender: 'me',
      text: 'Tekshirib ko’rdingizmi?',
      time: 'Soat: 01:02',
    },
    {
      id: 'm3',
      sender: 'other',
      text: 'To’lov qildizmi?',
      time: 'Soat: 01:00',
    },
    {
      id: 'm4',
      sender: 'me',
      text: 'Qanday to’lov',
      time: 'Soat: 01:20',
    },
    {
      id: 'm5',
      sender: 'other',
      text: 'Karta bo’yicha',
      time: 'Soat: 01:12',
    },
  ]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMsg: Message = {
      id: `m-${Date.now()}`,
      sender: 'me',
      text: inputText.trim(),
      time: 'Soat: 01:25',
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Simulate reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now() + 1}`,
          sender: 'other',
          text: 'Tushundim, manzilni tashlayman.',
          time: 'Soat: 01:26',
        },
      ]);
    }, 1200);
  };

  return (
    <View style={styles.container}>
      {/* Curved Navy Header with Avatar and Phone Call button */}
      <View style={styles.header}>
        <SafeAreaView edges={['top']} style={styles.safeHeader}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={26} color="#D2FF00" />
          </Pressable>

          <View style={styles.avatarBox}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=200',
              }}
              style={styles.avatarImg}
              contentFit="cover"
            />
          </View>

          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>{userName || 'thalipof'}</Text>
            <Text style={styles.headerDate}>Aprel 25.04.2025</Text>
          </View>

          <Pressable
            onPress={() => Linking.openURL('tel:+998903604600')}
            style={styles.callBtn}>
            <Ionicons name="call" size={22} color="#D2FF00" />
          </Pressable>
        </SafeAreaView>
      </View>

      {/* Date badge */}
      <View style={styles.dateBadgeContainer}>
        <View style={styles.dateBadge}>
          <Text style={styles.dateText}>Aprel 25.04.2025</Text>
        </View>
        <Text style={styles.todayText}>Bugun</Text>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView
        style={styles.chatArea}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          renderItem={({ item }) => {
            const isMe = item.sender === 'me';
            return (
              <View
                style={[
                  styles.bubbleWrapper,
                  isMe ? styles.bubbleWrapperMe : styles.bubbleWrapperOther,
                ]}>
                <View
                  style={[
                    styles.bubble,
                    isMe ? styles.bubbleMe : styles.bubbleOther,
                  ]}>
                  <Text
                    style={[
                      styles.msgText,
                      isMe ? styles.msgTextMe : styles.msgTextOther,
                    ]}>
                    {item.text}
                  </Text>
                  <Ionicons
                    name="checkmark"
                    size={14}
                    color={isMe ? '#FFFFFF' : '#16A34A'}
                    style={{ marginLeft: 6 }}
                  />
                </View>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
            );
          }}
        />

        {/* Bottom Input Bar */}
        <SafeAreaView edges={['bottom']} style={styles.inputSafeArea}>
          <View style={styles.inputBarRow}>
            <View style={styles.inputBox}>
              <Pressable style={styles.cameraBtn}>
                <Feather name="camera" size={20} color="#0E1424" />
              </Pressable>
              <TextInput
                style={styles.input}
                placeholder="Savolingizni yuboring..."
                placeholderTextColor="#94A3B8"
                value={inputText}
                onChangeText={setInputText}
              />
            </View>

            <Pressable onPress={handleSend} style={styles.sendBtn}>
              <Ionicons name="paper-plane" size={18} color="#FFFFFF" />
            </Pressable>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#1B2544',
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  safeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backBtn: {
    padding: 4,
  },
  avatarBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  headerDate: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 2,
  },
  callBtn: {
    padding: 6,
  },
  dateBadgeContainer: {
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 6,
  },
  dateBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
  },
  dateText: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '600',
  },
  todayText: {
    color: '#0E1424',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 4,
  },
  chatArea: {
    flex: 1,
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  bubbleWrapper: {
    marginBottom: 4,
  },
  bubbleWrapperMe: {
    alignItems: 'flex-end',
  },
  bubbleWrapperOther: {
    alignItems: 'flex-start',
  },
  bubble: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    maxWidth: '80%',
  },
  bubbleMe: {
    backgroundColor: '#394460',
    borderTopRightRadius: 6,
  },
  bubbleOther: {
    backgroundColor: '#F3F4F6',
    borderTopLeftRadius: 6,
  },
  msgText: {
    fontSize: 14,
    fontWeight: '600',
  },
  msgTextMe: {
    color: '#FFFFFF',
  },
  msgTextOther: {
    color: '#0E1424',
  },
  timeText: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 4,
    marginHorizontal: 4,
  },
  inputSafeArea: {
    backgroundColor: '#FFFFFF',
  },
  inputBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
  },
  inputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 46,
  },
  cameraBtn: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#0E1424',
  },
  sendBtn: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#0E1424',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
