import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { FigmaAnimalListing } from '@/data/figmaData';
import { ZooColors } from '@/constants/zooTheme';

interface Props {
  item: FigmaAnimalListing;
  onToggleSave?: (id: string) => void;
  isSaved?: boolean;
}

export const FigmaAnimalCard: React.FC<Props> = ({
  item,
  onToggleSave,
  isSaved = false,
}) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/listing/[id]',
      params: { id: item.id },
    });
  };

  const handleOpenChat = (e: any) => {
    e.stopPropagation();
    router.push({
      pathname: '/chat/[id]',
      params: {
        id: `chat-${item.id}`,
        userName: item.sellerTag || 'thalipof',
        listingTitle: item.name,
      },
    });
  };

  return (
    <Pressable onPress={handlePress} style={styles.card}>
      {/* Top Image Container */}
      <View style={styles.imageBox}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />

        {/* VIP Lightning Badge (Yellow) */}
        {item.isVip && (
          <View style={styles.vipBadge}>
            <Ionicons name="flash" size={14} color="#D2FF00" />
          </View>
        )}

        {/* AKSIYA Badge */}
        {item.hasAksiya && (
          <View style={styles.aksiyaBadge}>
            <Text style={styles.aksiyaText}>AKSIYA</Text>
          </View>
        )}

        {/* Floating Chat / Messenger Button */}
        <Pressable onPress={handleOpenChat} style={styles.chatButton}>
          <MaterialCommunityIcons
            name="chat-processing-outline"
            size={18}
            color="#0E1424"
          />
        </Pressable>
      </View>

      {/* Card Info Bottom */}
      <View style={styles.infoBox}>
        {/* Title and Bookmark ribbon */}
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {item.name}
          </Text>
          <Pressable
            onPress={(e) => {
              e.stopPropagation();
              onToggleSave?.(item.id);
            }}
            hitSlop={6}>
            <Ionicons
              name={isSaved ? 'bookmark' : 'bookmark-outline'}
              size={18}
              color={ZooColors.navyDark}
            />
          </Pressable>
        </View>

        {/* Price */}
        <Text style={styles.price}>{item.formattedPrice}</Text>

        {/* Rating and Views */}
        <View style={styles.metaRow}>
          <View style={styles.ratingCol}>
            <FontAwesome name="star" size={12} color={ZooColors.starYellow} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>

          <View style={styles.viewsCol}>
            <Text style={styles.viewsText}>{item.views}</Text>
            <Ionicons name="eye-outline" size={13} color={ZooColors.textSub} />
          </View>
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
  vipBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: 'rgba(14, 20, 36, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aksiyaBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: '#D2FF00',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  aksiyaText: {
    color: '#0E1424',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  chatButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  infoBox: {
    padding: 10,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: ZooColors.textDark,
    flex: 1,
  },
  price: {
    fontSize: 14,
    fontWeight: '800',
    color: ZooColors.textDark,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '600',
    color: ZooColors.textMuted,
  },
  viewsCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  viewsText: {
    fontSize: 11,
    color: ZooColors.textSub,
    fontWeight: '500',
  },
});
