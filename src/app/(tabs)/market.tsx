import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Pressable,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FigmaHeader } from '@/components/FigmaHeader';
import { FigmaProductCard } from '@/components/FigmaProductCard';
import { FIGMA_PRODUCTS } from '@/data/figmaData';
import { ZooColors } from '@/constants/zooTheme';

export default function MarketScreen() {
  const router = useRouter();
  const [selectedRegion, setSelectedRegion] = useState('Qo’qon');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedIds, setSavedIds] = useState<string[]>(['fp-1', 'fp-2', 'fp-5']);

  const toggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredProducts = FIGMA_PRODUCTS.filter((item) => {
    if (searchQuery.trim() !== '') {
      return item.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const renderHeader = () => (
    <View>
      {/* Big Market Banner */}
      <View style={styles.bannerWrapper}>
        <View style={styles.bannerCard}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=800',
            }}
            style={styles.bannerBg}
            contentFit="cover"
          />
        </View>

        {/* Carousel Dots */}
        <View style={styles.dotsRow}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footerContainer}>
      {/* Ko'proq (Load More) */}
      <Pressable style={styles.loadMoreBtn}>
        <Text style={styles.loadMoreText}>Ko’proq</Text>
        <Ionicons name="chevron-down" size={16} color={ZooColors.navyDark} />
      </Pressable>

      {/* O'xshash e'lonlar */}
      <View style={styles.similarHeader}>
        <Text style={styles.similarTitle}>O’xshash e’lonlar</Text>
        <Pressable
          onPress={() => router.push('/(tabs)')}
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
        {FIGMA_PRODUCTS.slice(0, 3).map((item) => (
          <Pressable
            key={item.id}
            onPress={() =>
              router.push({
                pathname: '/product/[id]',
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
              <Text style={styles.similarName}>{item.title}</Text>
              <Text style={styles.similarPrice}>{item.formattedPrice}</Text>
              <View style={styles.similarMeta}>
                <Text style={styles.similarMetaText}>★ {item.rating}</Text>
                <Text style={styles.similarMetaText}>{item.stockCount}</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {/* Bottom spacer for floating bottom tab bar */}
      <View style={{ height: 85 }} />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Market Header with Qo'qon and Green Basket */}
      <FigmaHeader
        variant="market"
        selectedRegion={selectedRegion}
        onSelectRegion={setSelectedRegion}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 2-Column Products Grid */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        renderItem={({ item }) => (
          <FigmaProductCard
            product={item}
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
    height: 145,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
  },
  bannerBg: {
    width: '100%',
    height: '100%',
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
