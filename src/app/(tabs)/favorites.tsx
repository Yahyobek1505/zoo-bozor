import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FigmaAnimalCard } from '@/components/FigmaAnimalCard';
import { FIGMA_ANIMALS } from '@/data/figmaData';
import { ZooColors } from '@/constants/zooTheme';

export default function FavoritesScreen() {
  const router = useRouter();
  const [savedIds, setSavedIds] = useState<string[]>([
    'f-5', // Karlik
    'f-6', // Britanka
    'f-7', // Karlik (lamb)
    'f-8', // Britanka (goose)
  ]);

  const toggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const savedListings = FIGMA_ANIMALS.filter((item) =>
    savedIds.includes(item.id)
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header matching 13-Saqlangan */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons name="bookmark" size={24} color={ZooColors.navyDark} />
          <Text style={styles.headerTitle}>Saqlangan</Text>
        </View>

        <Pressable
          onPress={() => router.push('/chat')}
          style={styles.envelopeBtn}>
          <Ionicons name="mail" size={22} color={ZooColors.navyDark} />
        </Pressable>
      </View>

      {/* Grid */}
      <FlatList
        data={savedListings}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <FigmaAnimalCard
            item={item}
            isSaved={true}
            onToggleSave={toggleSave}
          />
        )}
        ListFooterComponent={<View style={{ height: 85 }} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="bookmark-outline" size={48} color="#94A3B8" />
            <Text style={styles.emptyTitle}>Hali hech narsa saqlanmagan</Text>
            <Text style={styles.emptySubtitle}>
              Sizga yoqqan jonivorlarni belgilar orqali saqlang.
            </Text>
          </View>
        }
      />
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: ZooColors.navyDark,
  },
  envelopeBtn: {
    padding: 4,
  },
  listContent: {
    paddingBottom: 20,
  },
  columnWrapper: {
    paddingHorizontal: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 60,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: ZooColors.navyDark,
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 13,
    color: ZooColors.textSub,
    textAlign: 'center',
    marginTop: 6,
  },
});
