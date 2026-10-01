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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { UZBEKISTAN_REGIONS, ZooColors } from '@/constants/zooTheme';
import { useListingStore } from '@/store/useListingStore';

interface HeaderSearchProps {
  onOpenFilter?: () => void;
}

export const HeaderSearch: React.FC<HeaderSearchProps> = ({ onOpenFilter }) => {
  const { filters, setFilters } = useListingStore();
  const [regionModalVisible, setRegionModalVisible] = useState(false);

  return (
    <View style={styles.header}>
      {/* Top Bar: Brand + Region Selector */}
      <View style={styles.topRow}>
        <View style={styles.brandContainer}>
          <View style={styles.logoBadge}>
            <MaterialCommunityIcons name="paw" size={18} color="#FFFFFF" />
          </View>
          <Text style={styles.brandTitle}>ZOO BOZOR</Text>
        </View>

        {/* Region Selector Button */}
        <Pressable
          onPress={() => setRegionModalVisible(true)}
          style={styles.regionButton}>
          <Ionicons name="location-sharp" size={14} color={ZooColors.primary} />
          <Text style={styles.regionText} numberOfLines={1}>
            {filters.region || 'Toshkent'}
          </Text>
          <Ionicons name="chevron-down" size={12} color={ZooColors.gray} />
        </Pressable>
      </View>

      {/* Search Input Bar + Filter Button */}
      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={ZooColors.gray} style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="Zot, hayvon yoki ozuqa qidirish..."
            placeholderTextColor="#94A3B8"
            value={filters.searchQuery}
            onChangeText={(text) => setFilters({ searchQuery: text })}
          />
          {filters.searchQuery.length > 0 && (
            <Pressable
              onPress={() => setFilters({ searchQuery: '' })}
              hitSlop={8}
              style={styles.clearButton}>
              <Ionicons name="close-circle" size={16} color={ZooColors.gray} />
            </Pressable>
          )}
        </View>

        {/* Filter Trigger Button */}
        <Pressable onPress={onOpenFilter} style={styles.filterButton}>
          <Ionicons name="options-outline" size={20} color={ZooColors.dark} />
          {(filters.isVaccinated || filters.hasPassport || filters.isFree) && (
            <View style={styles.filterIndicator} />
          )}
        </Pressable>
      </View>

      {/* Region Selection Modal */}
      <Modal
        visible={regionModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setRegionModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Hududni tanlang</Text>
              <Pressable onPress={() => setRegionModalVisible(false)}>
                <Ionicons name="close" size={22} color={ZooColors.dark} />
              </Pressable>
            </View>

            <FlatList
              data={UZBEKISTAN_REGIONS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                const isSelected = (filters.region || 'Barcha hududlar') === item;
                return (
                  <Pressable
                    onPress={() => {
                      setFilters({ region: item });
                      setRegionModalVisible(false);
                    }}
                    style={[
                      styles.regionItem,
                      isSelected && styles.regionItemSelected,
                    ]}>
                    <Text
                      style={[
                        styles.regionItemText,
                        isSelected && styles.regionItemTextSelected,
                      ]}>
                      {item}
                    </Text>
                    {isSelected && (
                      <Ionicons
                        name="checkmark"
                        size={18}
                        color={ZooColors.primary}
                      />
                    )}
                  </Pressable>
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoBadge: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: ZooColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: ZooColors.dark,
    letterSpacing: 0.5,
  },
  regionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 4,
    maxWidth: 160,
  },
  regionText: {
    fontSize: 12,
    fontWeight: '600',
    color: ZooColors.darkSecondary,
    maxWidth: 110,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: ZooColors.dark,
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  filterIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: ZooColors.primary,
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
    maxHeight: '65%',
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: ZooColors.dark,
  },
  regionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F8FAFC',
  },
  regionItemSelected: {
    backgroundColor: '#F0FDF4',
  },
  regionItemText: {
    fontSize: 15,
    color: ZooColors.dark,
  },
  regionItemTextSelected: {
    color: ZooColors.primary,
    fontWeight: '700',
  },
});
