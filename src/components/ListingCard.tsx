import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Listing } from '@/types';
import { ZooColors } from '@/constants/zooTheme';
import { formatPrice } from '@/utils/formatters';
import { useListingStore } from '@/store/useListingStore';
import { Badge } from './Badge';

interface ListingCardProps {
  listing: Listing;
  layout?: 'grid' | 'full';
}

export const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  layout = 'grid',
}) => {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useListingStore();
  const favorited = isFavorite(listing.id);

  const handlePress = () => {
    router.push({
      pathname: '/listing/[id]',
      params: { id: listing.id },
    });
  };

  const isFull = layout === 'full';

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.card,
        isFull ? styles.cardFull : styles.cardGrid,
        pressed && styles.cardPressed,
      ]}>
      {/* Image Container */}
      <View style={[styles.imageContainer, isFull && styles.imageContainerFull]}>
        <Image
          source={{ uri: listing.images[0] }}
          style={styles.image}
          contentFit="cover"
          transition={300}
        />

        {/* Favorite Button */}
        <Pressable
          onPress={(e) => {
            e.stopPropagation();
            toggleFavorite(listing.id);
          }}
          style={styles.favoriteButton}
          hitSlop={8}>
          <Ionicons
            name={favorited ? 'heart' : 'heart-outline'}
            size={20}
            color={favorited ? '#EF4444' : '#334155'}
          />
        </Pressable>

        {/* Urgent Badge if applicable */}
        {listing.isUrgent && (
          <View style={styles.urgentBadge}>
            <Text style={styles.urgentText}>Shoshilinch</Text>
          </View>
        )}
      </View>

      {/* Content Container */}
      <View style={styles.content}>
        {/* Price */}
        <Text style={styles.price} numberOfLines={1}>
          {formatPrice(listing.price, listing.currency, listing.isFree)}
        </Text>

        {/* Title */}
        <Text style={styles.title} numberOfLines={2}>
          {listing.title}
        </Text>

        {/* Attributes: Badges for vaccines / passport */}
        <View style={styles.badgeRow}>
          {listing.isVaccinated && (
            <Badge label="Emlangan" variant="success" size="sm" />
          )}
          {listing.hasPassport && (
            <Badge label="Vet-pasport" variant="info" size="sm" />
          )}
          {listing.breed && (
            <Text style={styles.breedText} numberOfLines={1}>
              {listing.breed}
            </Text>
          )}
        </View>

        {/* Footer: Location and Date */}
        <View style={styles.footer}>
          <Text style={styles.locationText} numberOfLines={1}>
            {listing.location.district
              ? `${listing.location.district}, ${listing.location.region}`
              : listing.location.region}
          </Text>
          <Text style={styles.dateText}>{listing.createdAt}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: ZooColors.cardBackground,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: ZooColors.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  cardGrid: {
    flex: 1,
    margin: 5,
  },
  cardFull: {
    width: '100%',
    marginBottom: 12,
  },
  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  imageContainer: {
    width: '100%',
    height: 155,
    backgroundColor: '#F1F5F9',
    position: 'relative',
  },
  imageContainerFull: {
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  urgentBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: ZooColors.danger,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  urgentText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  content: {
    padding: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: ZooColors.primaryDark,
    marginBottom: 4,
  },
  title: {
    fontSize: 13,
    fontWeight: '500',
    color: ZooColors.dark,
    lineHeight: 18,
    marginBottom: 6,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  breedText: {
    fontSize: 11,
    color: ZooColors.gray,
    backgroundColor: ZooColors.grayLight,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
  },
  footer: {
    borderTopWidth: 0.5,
    borderTopColor: '#F1F5F9',
    paddingTop: 6,
    flexDirection: 'column',
    gap: 2,
  },
  locationText: {
    fontSize: 11,
    color: ZooColors.gray,
    fontWeight: '500',
  },
  dateText: {
    fontSize: 10,
    color: '#94A3B8',
  },
});
