import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FigmaHeader } from '@/components/FigmaHeader';
import { FigmaAnimalCard } from '@/components/FigmaAnimalCard';
import { CATEGORIES_AVATARS, ZooColors } from '@/constants/zooTheme';
import { FIGMA_ANIMALS, FigmaAnimalListing } from '@/data/figmaData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [selectedRegion, setSelectedRegion] = useState('Toshkent');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>(['f-2', 'f-4', 'f-6']);

  const toggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredAnimals = FIGMA_ANIMALS.filter((item) => {
    if (selectedCategory && item.category !== selectedCategory) return false;
    if (searchQuery.trim() !== '') {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const renderHeader = () => (
    <View>
      {/* 1. Carousel Banner (Hissori Qo'ylar 100-250 kg) */}
      <View style={styles.bannerWrapper}>
        <View style={styles.bannerCard}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?q=80&w=800',
            }}
            style={styles.bannerBg}
            contentFit="cover"
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>HISSORI QO'YLAR</Text>
            <View style={styles.bannerPill}>
              <Text style={styles.bannerPillText}>100-250 KG GACHA</Text>
            </View>
            <Text style={styles.bannerSub}>TABIIY VA SOG'LOM • YUKSAK SIFAT</Text>
          </View>
        </View>

        {/* Dots */}
        <View style={styles.dotsRow}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>

      {/* 2. Circular Animal Category Avatars */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryRow}>
        {CATEGORIES_AVATARS.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <Pressable
              key={cat.id}
              onPress={() =>
                setSelectedCategory(isSelected ? null : cat.id)
              }
              style={styles.categoryItem}>
              <View
                style={[
                  styles.categoryAvatarBox,
                  isSelected && styles.categoryAvatarBoxActive,
                ]}>
                <Image
                  source={{ uri: cat.image }}
                  style={styles.categoryAvatarImg}
                  contentFit="cover"
                />
              </View>
              <Text
                style={[
                  styles.categoryLabel,
                  isSelected && styles.categoryLabelActive,
                ]}>
                {cat.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footerContainer}>
      {/* Ko'proq (Load More) button */}
      <Pressable style={styles.loadMoreBtn}>
        <Text style={styles.loadMoreText}>Ko’proq</Text>
        <Ionicons name="chevron-down" size={16} color={ZooColors.navyDark} />
      </Pressable>

      {/* O'xshash e'lonlar */}
      <View style={styles.similarHeader}>
        <Text style={styles.similarTitle}>O’xshash e’lonlar</Text>
        <Pressable
          onPress={() => router.push('/(tabs)/market')}
          style={styles.allLinkRow}>
          <Text style={styles.allLinkText}>Barchasi</Text>
          <Ionicons
            name="chevron-forward"
            size={14}
            color={ZooColors.navyDark}
          />
        </Pressable>
      </View>

      {/* Horizontal Carousel */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.similarRow}>
        {FIGMA_ANIMALS.slice(0, 3).map((item) => (
          <Pressable
            key={item.id}
            onPress={() =>
              router.push({
                pathname: '/listing/[id]',
                params: { id: item.id },
              })
            }
            style={styles.similarCard}>
            <Image
              source={{ uri: item.image }}
              style={styles.similarImg}
              contentFit="cover"
            />
            <View style={styles.similarOverlay}>
              <Text style={styles.similarName}>{item.name}</Text>
              <Text style={styles.similarPrice}>{item.formattedPrice}</Text>
              <View style={styles.similarMeta}>
                <Text style={styles.similarMetaText}>★ {item.rating}</Text>
                <Text style={styles.similarMetaText}>{item.views} 👁</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {/* Bottom spacer for floating bottom bar */}
      <View style={{ height: 85 }} />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <FigmaHeader
        variant="home"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedRegion={selectedRegion}
        onSelectRegion={setSelectedRegion}
      />

      {/* 2-Column Grid */}
      <FlatList
        data={filteredAnimals}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        renderItem={({ item }) => (
          <FigmaAnimalCard
            item={item}
            isSaved={savedIds.includes(item.id)}
            onToggleSave={toggleSave}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listContent: {
    paddingBottom: 20,
  },
  columnWrapper: {
    paddingHorizontal: 10,
  },
  bannerWrapper: {
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 10,
  },
  bannerCard: {
    height: 150,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0F2618',
  },
  bannerBg: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(10, 35, 20, 0.45)',
    padding: 14,
    justifyContent: 'center',
  },
  bannerTitle: {
    color: '#D2FF00',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  bannerPill: {
    backgroundColor: '#D2FF00',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginVertical: 4,
  },
  bannerPillText: {
    color: '#0E1424',
    fontSize: 11,
    fontWeight: '900',
  },
  bannerSub: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#CBD5E1',
  },
  dotActive: {
    width: 28,
    backgroundColor: '#334155',
  },
  categoryRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 16,
  },
  categoryItem: {
    alignItems: 'center',
    gap: 6,
  },
  categoryAvatarBox: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  categoryAvatarBoxActive: {
    borderColor: '#D2FF00',
  },
  categoryAvatarImg: {
    width: '100%',
    height: '100%',
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0E1424',
  },
  categoryLabelActive: {
    color: '#16A34A',
  },
  footerContainer: {
    marginTop: 10,
  },
  loadMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 12,
  },
  loadMoreText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0E1424',
  },
  similarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 10,
  },
  similarTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0E1424',
  },
  allLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  allLinkText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0E1424',
  },
  similarRow: {
    paddingHorizontal: 16,
    gap: 12,
  },
  similarCard: {
    width: 140,
    height: 140,
    borderRadius: 18,
    overflow: 'hidden',
    position: 'relative',
  },
  similarImg: {
    width: '100%',
    height: '100%',
  },
  similarOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.65)',
    padding: 8,
  },
  similarName: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  similarPrice: {
    color: '#D2FF00',
    fontSize: 11,
    fontWeight: '800',
  },
  similarMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  similarMetaText: {
    color: '#E2E8F0',
    fontSize: 10,
  },
});
