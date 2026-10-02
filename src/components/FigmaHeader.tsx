import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Modal,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { UZBEKISTAN_REGIONS, ZooColors } from '@/constants/zooTheme';

import { useLanguageStore } from '@/store/useLanguageStore';

interface Props {
  variant?: 'home' | 'market';
  searchQuery?: string;
  onSearchChange?: (text: string) => void;
  selectedRegion?: string;
  onSelectRegion?: (region: string) => void;
  onFilterPress?: () => void;
}

export const FigmaHeader: React.FC<Props> = ({
  variant = 'home',
  searchQuery = '',
  onSearchChange,
  selectedRegion = 'Toshkent',
  onSelectRegion,
  onFilterPress,
}) => {
  const router = useRouter();
  const { t } = useLanguageStore();
  const tr = t();
  const [regionModalVisible, setRegionModalVisible] = useState(false);

  return (
    <View style={styles.header}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {/* Top Row: Location & Messages */}
        <View style={styles.topRow}>
          <Pressable
            onPress={() => setRegionModalVisible(true)}
            style={styles.locationBtn}>
            <Ionicons name="location-sharp" size={18} color="#FFFFFF" />
            <Text style={styles.locationText}>{selectedRegion}</Text>
            <Ionicons name="chevron-down" size={15} color="#D2FF00" />
          </Pressable>

          <Pressable
            onPress={() => router.push('/chat')}
            style={styles.envelopeBtn}>
            <Ionicons name="mail" size={22} color="#FFFFFF" />
            <View style={styles.mailBadge} />
          </Pressable>
        </View>

        {/* Search Row */}
        <View style={styles.searchRow}>
          <View style={styles.searchInputBox}>
            <Ionicons
              name="search"
              size={18}
              color="#94A3B8"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.input}
              placeholder={
                variant === 'market'
                  ? tr.categorySearchPlaceholder
                  : tr.searchPlaceholder
              }
              placeholderTextColor="#94A3B8"
              value={searchQuery}
              onChangeText={onSearchChange}
            />
          </View>

          {/* Action Button: Filter / Basket */}
          <Pressable
            onPress={onFilterPress}
            style={[
              styles.actionBtn,
              variant === 'market' && styles.actionBtnMarket,
            ]}>
            {variant === 'market' ? (
              <View style={styles.basketRow}>
                <Ionicons name="basket" size={18} color="#FFFFFF" />
                <Ionicons name="chevron-down" size={13} color="#FFFFFF" />
              </View>
            ) : (
              <Ionicons name="chevron-down" size={20} color="#D2FF00" />
            )}
          </Pressable>
        </View>
      </SafeAreaView>

      {/* Region Picker Modal */}
      <Modal
        visible={regionModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setRegionModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{tr.selectRegion}</Text>
              <Pressable onPress={() => setRegionModalVisible(false)}>
                <Ionicons name="close" size={22} color={ZooColors.textDark} />
              </Pressable>
            </View>

            <FlatList
              data={UZBEKISTAN_REGIONS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    onSelectRegion?.(item);
                    setRegionModalVisible(false);
                  }}
                  style={styles.regionItem}>
                  <Text
                    style={[
                      styles.regionItemText,
                      selectedRegion === item && styles.regionItemTextActive,
                    ]}>
                    {item}
                  </Text>
                  {selectedRegion === item && (
                    <Ionicons name="checkmark" size={18} color="#D2FF00" />
                  )}
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1B2544',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  safeArea: {
    backgroundColor: 'transparent',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  locationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  envelopeBtn: {
    position: 'relative',
    padding: 4,
  },
  mailBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D2FF00',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  searchInputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingHorizontal: 14,
    height: 44,
  },
  searchIcon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#0E1424',
    paddingVertical: 0,
  },
  actionBtn: {
    backgroundColor: '#121A30',
    width: 60,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnMarket: {
    backgroundColor: '#10B981',
    width: 64,
  },
  basketRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0E1424',
  },
  regionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F8FAFC',
  },
  regionItemText: {
    fontSize: 15,
    color: '#0E1424',
  },
  regionItemTextActive: {
    color: '#16A34A',
    fontWeight: '700',
  },
});
