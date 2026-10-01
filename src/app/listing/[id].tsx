import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
  Linking,
  Share,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons, Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { FIGMA_ANIMALS } from '@/data/figmaData';
import { ZooColors } from '@/constants/zooTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function AnimalDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const animal = FIGMA_ANIMALS.find((a) => a.id === id) || FIGMA_ANIMALS[1]; // Britanka default
  const [isSaved, setIsSaved] = useState(true);

  const handleCall = () => {
    Linking.openURL('tel:+998903604600');
  };

  const handleOpenChat = () => {
    router.push({
      pathname: '/chat/[id]',
      params: {
        id: `chat-${animal.id}`,
        userName: animal.sellerTag || 'thalipof',
        listingTitle: animal.name,
      },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        
        {/* Top Photo Section with Navigation */}
        <View style={styles.photoContainer}>
          <Image
            source={{ uri: animal.image }}
            style={styles.photo}
            contentFit="cover"
          />

          {/* Floating Top Bar (Back, Bookmark, Mail) */}
          <SafeAreaView edges={['top']} style={styles.topFloatingBar}>
            <Pressable onPress={() => router.back()} style={styles.topIconBtn}>
              <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
            </Pressable>

            <View style={styles.topRightBtns}>
              <Pressable
                onPress={() => setIsSaved(!isSaved)}
                style={styles.topIconBtn}>
                <Ionicons
                  name="bookmark"
                  size={24}
                  color={isSaved ? '#D2FF00' : '#FFFFFF'}
                />
              </Pressable>

              <Pressable
                onPress={() => router.push('/chat')}
                style={styles.topIconBtn}>
                <Ionicons name="mail" size={24} color="#FFFFFF" />
              </Pressable>
            </View>
          </SafeAreaView>

          {/* Slider Dots */}
          <View style={styles.sliderDots}>
            <View style={[styles.sDot, styles.sDotActive]} />
            <View style={styles.sDot} />
            <View style={styles.sDot} />
            <View style={styles.sDot} />
            <View style={styles.sDot} />
            <View style={styles.sDot} />
          </View>

          {/* Seller Tag Watermark (thalipof) */}
          <View style={styles.sellerTagBadge}>
            <Text style={styles.sellerTagText}>
              {animal.sellerTag || 'thalipof'}
            </Text>
          </View>
        </View>

        {/* Content Card */}
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
                    message: `${animal.name} — ZOO BOZOR: ${animal.formattedPrice}`,
                  })
                }
                style={styles.actionCircleBtn}>
                <Ionicons name="paper-plane-outline" size={20} color="#0E1424" />
              </Pressable>
            </View>

            <View style={styles.handleBar} />

            <View style={styles.ratingBadge}>
              <FontAwesome name="star" size={14} color={ZooColors.starYellow} />
              <Text style={styles.ratingScore}>{animal.rating || 7.9}</Text>
            </View>
          </View>

          {/* Title & 5 soat oldin */}
          <View style={styles.titleRow}>
            <Text style={styles.animalTitle}>{animal.name} Fold</Text>
            <Text style={styles.timeOld}>5 soat oldin</Text>
          </View>

          {/* Price & Kelishamiz Badge */}
          <View style={styles.priceRow}>
            <Text style={styles.priceText}>1.530.000 so’m</Text>
            <View style={styles.kelishamizBadge}>
              <Text style={styles.kelishamizText}>Kelishamiz!</Text>
            </View>
          </View>

          {/* Location & Map Buttons */}
          <View style={styles.buttonRow}>
            <Pressable style={styles.locationBtn}>
              <Ionicons name="location-sharp" size={16} color="#D2FF00" />
              <Text style={styles.locationBtnText}>Toshkent</Text>
            </Pressable>

            <Pressable
              onPress={() => router.push('/(tabs)/karta')}
              style={styles.mapBtn}>
              <Feather name="crosshair" size={16} color="#0E1424" />
              <Text style={styles.mapBtnText}>Karta bo’yicha</Text>
            </Pressable>
          </View>

          {/* Specs Table (Zebra Strips) */}
          <View style={styles.specsTable}>
            {[
              { label: 'Zoti', val: animal.name ? `${animal.name} fold` : 'Britan fold' },
              { label: 'Jinsi', val: animal.gender || 'Qiz' },
              { label: 'Rangi', val: animal.color || 'Kul rang' },
              { label: 'Yoshi', val: animal.age || '9 Oylik' },
              { label: 'Vazni', val: animal.weight || '5.5 kg' },
              { label: 'Sog’ligi', val: animal.health || 'Sog’lom' },
              { label: 'Pasporti', val: animal.passport || 'Bor' },
              { label: 'Tibbiy ko’rik', val: animal.medicalCheck || 'Emlangan' },
            ].map((item, idx) => (
              <View
                key={idx}
                style={[
                  styles.tableRow,
                  idx % 2 === 0 ? styles.tableRowLight : styles.tableRowWhite,
                ]}>
                <Text style={styles.tableLabel}>{item.label}</Text>
                <Text style={styles.tableVal}>{item.val}</Text>
              </View>
            ))}

            <View style={styles.tableDivider} />

            {[
              { label: 'Dostavka', val: animal.delivery || 'Yo’q' },
              { label: 'Bonus', val: animal.bonus || 'Bor' },
            ].map((item, idx) => (
              <View
                key={idx}
                style={[
                  styles.tableRow,
                  idx % 2 === 0 ? styles.tableRowLight : styles.tableRowWhite,
                ]}>
                <Text style={styles.tableLabel}>{item.label}</Text>
                <Text style={styles.tableVal}>{item.val}</Text>
              </View>
            ))}
          </View>

          {/* Qo'shimcha (Description Box) */}
          <View style={styles.descriptionBox}>
            <Text style={styles.descTitle}>Qo’shimcha:</Text>
            <Text style={styles.descText}>
              {animal.description ||
                'Britan mushugim juda aqilliy yuvosh o\'yinqaroq odamga juda mehribon bolalarni bilan tez qil topishadi yoqimtoy judayam.'}
            </Text>
          </View>

          {/* Report & Rating Row */}
          <View style={styles.reportRow}>
            <Pressable style={styles.reportBtn}>
              <MaterialCommunityIcons
                name="clipboard-alert-outline"
                size={16}
                color="#FFFFFF"
              />
              <Text style={styles.reportText}>Shikoyat bormi?</Text>
            </Pressable>

            <Pressable style={styles.rateBtn}>
              <FontAwesome name="star" size={14} color="#D2FF00" />
              <Text style={styles.rateText}>Baholash</Text>
            </Pressable>
          </View>

          {/* Full Width Contact Seller Button */}
          <Pressable onPress={handleCall} style={styles.contactBtn}>
            <Ionicons name="call" size={18} color="#D2FF00" />
            <Text style={styles.contactBtnText}>Sotuvchi bilan bog’lanish</Text>
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
    position: 'relative',
    backgroundColor: '#0E1424',
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
  sliderDots: {
    position: 'absolute',
    bottom: 16,
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
    bottom: 12,
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
    marginTop: -24,
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
    backgroundColor: '#475569',
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
    marginBottom: 8,
  },
  animalTitle: {
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
    marginBottom: 16,
  },
  priceText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0E1424',
  },
  kelishamizBadge: {
    backgroundColor: '#0E1424',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  kelishamizText: {
    color: '#D2FF00',
    fontSize: 12,
    fontWeight: '800',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  locationBtn: {
    flex: 1,
    backgroundColor: '#0E1424',
    borderRadius: 8,
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
    borderRadius: 8,
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
  specsTable: {
    marginBottom: 18,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  tableRowLight: {
    backgroundColor: '#F8FAFC',
  },
  tableRowWhite: {
    backgroundColor: '#FFFFFF',
  },
  tableLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0E1424',
  },
  tableVal: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '500',
  },
  tableDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 6,
  },
  descriptionBox: {
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
  },
  descTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0E1424',
    marginBottom: 6,
  },
  descText: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 19,
  },
  reportRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  reportBtn: {
    flex: 1,
    backgroundColor: '#0E1424',
    borderRadius: 22,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  reportText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  rateBtn: {
    flex: 1,
    backgroundColor: '#0E1424',
    borderRadius: 22,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  rateText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  contactBtn: {
    backgroundColor: '#0E1424',
    borderRadius: 25,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  contactBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
