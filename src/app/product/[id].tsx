import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
  Share,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons, Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { FIGMA_PRODUCTS } from '@/data/figmaData';
import { ZooColors } from '@/constants/zooTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const product =
    FIGMA_PRODUCTS.find((p) => p.id === id) || FIGMA_PRODUCTS[0]; // Whiskas default
  const [isSaved, setIsSaved] = useState(true);

  const handleOrder = () => {
    Alert.alert(
      'Buyurtma qabul qilindi',
      `${product.title} mahsulotiga buyurtmangiz rasmiylashtirildi! Tez orada kuryer siz bilan bog'lanadi.`,
      [{ text: 'Tushunarli' }]
    );
  };

  const handleOpenChat = () => {
    router.push({
      pathname: '/chat/[id]',
      params: {
        id: `chat-${product.id}`,
        userName: 'Zoo Market',
        listingTitle: product.title,
      },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        
        {/* Top Product Image */}
        <View style={styles.photoContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.photo}
            contentFit="cover"
          />

          {/* Floating Header */}
          <SafeAreaView edges={['top']} style={styles.topFloatingBar}>
            <Pressable onPress={() => router.back()} style={styles.topIconBtn}>
              <Ionicons name="arrow-back" size={24} color={ZooColors.navyDark} />
            </Pressable>

            <View style={styles.topRightBtns}>
              <Pressable
                onPress={() => setIsSaved(!isSaved)}
                style={styles.topIconBtn}>
                <Ionicons
                  name="bookmark"
                  size={24}
                  color={isSaved ? '#D2FF00' : '#475569'}
                />
              </Pressable>

              <Pressable
                onPress={() => router.push('/chat')}
                style={styles.topIconBtn}>
                <Ionicons name="mail" size={24} color="#CBD5E1" />
              </Pressable>
            </View>
          </SafeAreaView>

          {/* Aksiya Badge */}
          {product.hasAksiya && (
            <View style={styles.aksiyaBadge}>
              <Text style={styles.aksiyaText}>AKSIYA</Text>
            </View>
          )}

          {/* Slider Dots */}
          <View style={styles.sliderDots}>
            <View style={[styles.sDot, styles.sDotActive]} />
            <View style={styles.sDot} />
            <View style={styles.sDot} />
            <View style={styles.sDot} />
            <View style={styles.sDot} />
            <View style={styles.sDot} />
          </View>

          {/* Watermark Tag (thalipof) */}
          <View style={styles.sellerTagBadge}>
            <Text style={styles.sellerTagText}>thalipof</Text>
          </View>
        </View>

        {/* Card Content */}
        <View style={styles.cardContent}>
          {/* Top Handle Bar + Icons + Rating */}
          <View style={styles.handleRow}>
            <View style={styles.leftActions}>
              <Pressable onPress={handleOpenChat} style={styles.actionCircleBtn}>
                <MaterialCommunityIcons
                  name="chat-processing-outline"
                  size={22}
                  color="#0E1424"
                />
              </Pressable>
              <Pressable
                onPress={() =>
                  Share.share({
                    message: `${product.title} — ZOO BOZOR: ${product.formattedPrice}`,
                  })
                }
                style={styles.actionCircleBtn}>
                <Ionicons name="paper-plane-outline" size={20} color="#0E1424" />
              </Pressable>
            </View>

            <View style={styles.handleBar} />

            <View style={styles.ratingBadge}>
              <FontAwesome name="star" size={14} color={ZooColors.starYellow} />
              <Text style={styles.ratingScore}>{product.rating}</Text>
            </View>
          </View>

          {/* Title & 5 soat oldin */}
          <View style={styles.titleRow}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.timeOld}>5 soat oldin</Text>
          </View>

          {/* Price & Orders count */}
          <View style={styles.priceRow}>
            <Text style={styles.priceText}>{product.formattedPrice}</Text>
            <Text style={styles.orderCount}>58 / Buyurtma</Text>
          </View>

          {/* Location & Store Buttons */}
          <View style={styles.buttonRow}>
            <Pressable style={styles.locationBtn}>
              <Ionicons name="location-sharp" size={16} color="#D2FF00" />
              <Text style={styles.locationBtnText}>Toshkent</Text>
            </Pressable>

            <Pressable
              onPress={() => router.push('/(tabs)/karta')}
              style={styles.mapBtn}>
              <Feather name="crosshair" size={16} color="#0E1424" />
              <Text style={styles.mapBtnText}>Do’kon Manzili</Text>
            </Pressable>
          </View>

          {/* Description Box (Tavsif) */}
          <View style={styles.descBox}>
            <Text style={styles.descTitle}>Tavsif</Text>
            <Text style={styles.descText}>
              {product.description ||
                'Tabiiy go\'sht tarkibi: Mushuklar uchun zarur bo\'lgan sifatli oqsil manbai. Mushugingizning mushak tizimini va umumiy jismoniy holatini mustahkamlaydi.'}
            </Text>
          </View>

          {/* Buyurtma Button */}
          <Pressable onPress={handleOrder} style={styles.orderBtn}>
            <View style={styles.orderPinBadge}>
              <Ionicons name="location-sharp" size={16} color="#0E1424" />
            </View>
            <Text style={styles.orderBtnText}>Buyurtma</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  photoContainer: {
    width: SCREEN_WIDTH,
    height: 380,
    backgroundColor: '#F8FAFC',
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  topFloatingBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  topIconBtn: {
    padding: 6,
  },
  topRightBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  aksiyaBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: '#FF1E1E',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
  },
  aksiyaText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  sliderDots: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  sDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  sDotActive: {
    width: 24,
    backgroundColor: '#D2FF00',
  },
  sellerTagBadge: {
    position: 'absolute',
    bottom: 14,
    right: 16,
    backgroundColor: '#D2FF00',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  sellerTagText: {
    color: '#0E1424',
    fontSize: 12,
    fontWeight: '800',
  },
  cardContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -20,
    padding: 20,
  },
  handleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  leftActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionCircleBtn: {
    padding: 2,
  },
  handleBar: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#0E1424',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingScore: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0E1424',
  },
  timeOld: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  priceText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0E1424',
  },
  orderCount: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  locationBtn: {
    flex: 1,
    backgroundColor: '#0E1424',
    borderRadius: 10,
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  locationBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  mapBtn: {
    flex: 1,
    backgroundColor: '#D2FF00',
    borderRadius: 10,
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  mapBtnText: {
    color: '#0E1424',
    fontSize: 13,
    fontWeight: '800',
  },
  descBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 28,
  },
  descTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0E1424',
    marginBottom: 8,
  },
  descText: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 20,
  },
  orderBtn: {
    backgroundColor: '#0E1424',
    borderRadius: 12,
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 40,
  },
  orderPinBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#D2FF00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
