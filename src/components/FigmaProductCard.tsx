import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { FigmaProductListing } from '@/data/figmaData';
import { ZooColors } from '@/constants/zooTheme';

interface Props {
  product: FigmaProductListing;
  onToggleSave?: (id: string) => void;
  isSaved?: boolean;
}

export const FigmaProductCard: React.FC<Props> = ({
  product,
  onToggleSave,
  isSaved = false,
}) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/product/[id]',
      params: { id: product.id },
    });
  };

  return (
    <Pressable onPress={handlePress} style={styles.card}>
      {/* Top Image */}
      <View style={styles.imageBox}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          contentFit="cover"
        />

        {/* Ribbon bookmark on top right */}
        <Pressable
          onPress={(e) => {
            e.stopPropagation();
            onToggleSave?.(product.id);
          }}
          style={styles.ribbonBtn}>
          <Ionicons
            name="bookmark"
            size={18}
            color={isSaved ? '#D2FF00' : '#475569'}
          />
        </Pressable>

        {/* Aksiya + Discount row */}
        {product.hasAksiya && (
          <View style={styles.aksiyaRow}>
            <View style={styles.aksiyaBadge}>
              <Text style={styles.aksiyaText}>AKSIYA</Text>
            </View>
            {product.discount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{product.discount}</Text>
              </View>
            )}
          </View>
        )}
      </View>

      {/* Product info */}
      <View style={styles.infoBox}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {product.title}
          </Text>
          <Text style={styles.weight}>{product.weight}</Text>
        </View>

        {/* Prices: Current + Old struck-through */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>{product.formattedPrice}</Text>
          {product.oldPrice && (
            <Text style={styles.oldPrice}>{product.oldPrice}</Text>
          )}
        </View>

        {/* Rating and Stock */}
        <View style={styles.metaRow}>
          <View style={styles.ratingCol}>
            <FontAwesome name="star" size={11} color={ZooColors.starYellow} />
            <Text style={styles.ratingText}>{product.rating}</Text>
          </View>
          <Text style={styles.stockText}>{product.stockCount}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 0.8,
    borderColor: '#EFEFEF',
  },
  imageBox: {
    width: '100%',
    height: 160,
    backgroundColor: '#F3F4F6',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  ribbonBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(14, 20, 36, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aksiyaRow: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  aksiyaBadge: {
    backgroundColor: '#FF1E1E',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 5,
  },
  aksiyaText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  discountBadge: {
    backgroundColor: '#D2FF00',
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 5,
  },
  discountText: {
    color: '#0E1424',
    fontSize: 9,
    fontWeight: '900',
  },
  infoBox: {
    padding: 10,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: ZooColors.textDark,
  },
  weight: {
    fontSize: 11,
    color: ZooColors.textSub,
    fontWeight: '500',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  price: {
    fontSize: 13,
    fontWeight: '800',
    color: ZooColors.textDark,
  },
  oldPrice: {
    fontSize: 11,
    color: '#EF4444',
    textDecorationLine: 'line-through',
    fontWeight: '500',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '600',
    color: ZooColors.textMuted,
  },
  stockText: {
    fontSize: 10,
    color: ZooColors.textSub,
    fontWeight: '500',
  },
});
