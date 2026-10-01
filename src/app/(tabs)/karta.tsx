import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { ZooColors } from '@/constants/zooTheme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface MapPin {
  id: string;
  name: string;
  price: string;
  image: string;
  top: number;
  left: number;
  size: number;
  isCenter?: boolean;
}

const PINS: MapPin[] = [
  {
    id: 'f-1',
    name: 'Qora mushuk',
    price: '980.000 uzs',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=200',
    top: 360,
    left: SCREEN_WIDTH * 0.45 - 35,
    size: 70,
    isCenter: true,
  },
  {
    id: 'f-2',
    name: 'Siam mushukchasi',
    price: '1.200.000 uzs',
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=200',
    top: 220,
    left: SCREEN_WIDTH * 0.3,
    size: 50,
  },
  {
    id: 'f-3',
    name: 'Fors mushugi',
    price: '1.500.000 uzs',
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=200',
    top: 130,
    left: SCREEN_WIDTH * 0.6,
    size: 54,
  },
  {
    id: 'f-4',
    name: 'Zotdor mushuk',
    price: '850.000 uzs',
    image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=200',
    top: 320,
    left: SCREEN_WIDTH * 0.12,
    size: 52,
  },
  {
    id: 'f-5',
    name: 'Oq-qora mushukcha',
    price: '700.000 uzs',
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=200',
    top: 500,
    left: SCREEN_WIDTH * 0.08,
    size: 56,
  },
  {
    id: 'f-6',
    name: 'Mallavoy mushuk',
    price: '500.000 uzs',
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=200',
    top: 90,
    left: SCREEN_WIDTH * 0.04,
    size: 52,
  },
];

export default function KartaScreen() {
  const router = useRouter();
  const [selectedPin, setSelectedPin] = useState<MapPin | null>(PINS[0]);

  return (
    <View style={styles.container}>
      {/* Map Background representation */}
      <View style={styles.mapCanvas}>
        {/* Subtle grid and roads */}
        <View style={styles.road1} />
        <View style={styles.road2} />
        <View style={styles.road3} />
        <View style={styles.waterLake} />
        <View style={styles.districtLabel1}>
          <Text style={styles.districtText}>AMBABARI</Text>
        </View>
        <View style={styles.districtLabel2}>
          <Text style={styles.districtText}>BANI PARK</Text>
        </View>
        <View style={styles.districtLabel3}>
          <Text style={styles.districtText}>SINDHI CAMP</Text>
        </View>

        {/* Render Animal Pins */}
        {PINS.map((pin) => {
          const isSelected = selectedPin?.id === pin.id;
          return (
            <Pressable
              key={pin.id}
              onPress={() => setSelectedPin(pin)}
              style={[
                styles.pinWrapper,
                {
                  top: pin.top,
                  left: pin.left,
                },
              ]}>
              <View
                style={[
                  styles.pinCircle,
                  {
                    width: pin.size,
                    height: pin.size,
                    borderRadius: pin.size / 2,
                  },
                  isSelected && styles.pinCircleSelected,
                ]}>
                <Image
                  source={{ uri: pin.image }}
                  style={styles.pinImage}
                  contentFit="cover"
                />
              </View>
              {pin.isCenter && <View style={styles.pinTriangle} />}
            </Pressable>
          );
        })}
      </View>

      {/* Top Header Floating Overlay */}
      <SafeAreaView edges={['top']} style={styles.topHeader}>
        <View style={styles.headerRow}>
          <View style={styles.headerTitleBox}>
            <Feather name="crosshair" size={22} color={ZooColors.navyDark} />
            <Text style={styles.headerTitle}>Karta</Text>
          </View>

          <View style={styles.headerRightBtns}>
            <Pressable
              onPress={() => router.push('/chat')}
              style={styles.iconBtn}>
              <Ionicons name="mail" size={22} color={ZooColors.navyDark} />
            </Pressable>
            <Pressable style={styles.iconBtn}>
              <Ionicons name="menu" size={24} color={ZooColors.navyDark} />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>

      {/* Selected Pet Bottom Floating Popup */}
      {selectedPin && (
        <Pressable
          onPress={() =>
            router.push({
              pathname: '/listing/[id]',
              params: { id: selectedPin.id },
            })
          }
          style={styles.popupCard}>
          <Image
            source={{ uri: selectedPin.image }}
            style={styles.popupImg}
            contentFit="cover"
          />
          <View style={styles.popupInfo}>
            <Text style={styles.popupTitle}>{selectedPin.name}</Text>
            <Text style={styles.popupPrice}>{selectedPin.price}</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={ZooColors.navyDark}
          />
        </Pressable>
      )}

      {/* Floating "E'lon Berish" Button (Exact Figma Match) */}
      <View style={styles.createBtnWrapper}>
        <Pressable
          onPress={() => router.push('/create')}
          style={styles.createBtn}>
          <MaterialCommunityIcons
            name="bullhorn"
            size={18}
            color="#D2FF00"
          />
          <Text style={styles.createBtnText}>E’lon Berish</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
    position: 'relative',
  },
  topHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  headerTitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: ZooColors.navyDark,
  },
  headerRightBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtn: {
    padding: 4,
  },
  mapCanvas: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#F7F8FA',
    position: 'relative',
  },
  road1: {
    position: 'absolute',
    top: 260,
    left: -50,
    width: SCREEN_WIDTH + 100,
    height: 10,
    backgroundColor: '#E2E8F0',
    transform: [{ rotate: '-25deg' }],
  },
  road2: {
    position: 'absolute',
    top: 420,
    left: -50,
    width: SCREEN_WIDTH + 100,
    height: 14,
    backgroundColor: '#E2E8F0',
    transform: [{ rotate: '15deg' }],
  },
  road3: {
    position: 'absolute',
    top: 0,
    left: SCREEN_WIDTH * 0.48,
    width: 8,
    height: SCREEN_HEIGHT,
    backgroundColor: '#E2E8F0',
  },
  waterLake: {
    position: 'absolute',
    top: 240,
    left: 80,
    width: 70,
    height: 60,
    borderRadius: 20,
    backgroundColor: '#BAE6FD',
  },
  districtLabel1: {
    position: 'absolute',
    top: 250,
    left: 40,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  districtLabel2: {
    position: 'absolute',
    top: 440,
    left: 170,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  districtLabel3: {
    position: 'absolute',
    top: 500,
    left: 230,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  districtText: {
    fontSize: 9,
    color: '#94A3B8',
    fontWeight: '700',
  },
  pinWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinCircle: {
    overflow: 'hidden',
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
    backgroundColor: '#FFFFFF',
  },
  pinCircleSelected: {
    borderColor: '#D2FF00',
    borderWidth: 3,
    transform: [{ scale: 1.08 }],
  },
  pinImage: {
    width: '100%',
    height: '100%',
  },
  pinTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 12,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFFFFF',
    marginTop: -2,
  },
  popupCard: {
    position: 'absolute',
    bottom: 150,
    left: 24,
    right: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  popupImg: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  popupInfo: {
    flex: 1,
  },
  popupTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: ZooColors.navyDark,
  },
  popupPrice: {
    fontSize: 13,
    fontWeight: '800',
    color: '#16A34A',
    marginTop: 2,
  },
  createBtnWrapper: {
    position: 'absolute',
    bottom: 95,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 20,
  },
  createBtn: {
    backgroundColor: '#0E1424',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  createBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});
