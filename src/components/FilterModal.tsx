import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ZooColors } from '@/constants/zooTheme';
import { useListingStore } from '@/store/useListingStore';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose }) => {
  const { filters, setFilters, resetFilters } = useListingStore();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Filtrlar</Text>
            <Pressable onPress={onClose} hitSlop={10}>
              <Ionicons name="close" size={24} color={ZooColors.dark} />
            </Pressable>
          </View>

          <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            {/* Quick switches specific to animal marketplace */}
            <Text style={styles.sectionHeader}>Maxsus parametrlar</Text>

            <View style={styles.switchRow}>
              <View style={styles.switchInfo}>
                <Text style={styles.switchTitle}>Faqat emlanganlar</Text>
                <Text style={styles.switchDesc}>Vaksina qilingan hayvonlar</Text>
              </View>
              <Switch
                value={filters.isVaccinated || false}
                onValueChange={(val) => setFilters({ isVaccinated: val })}
                trackColor={{ false: '#E2E8F0', true: ZooColors.primary }}
              />
            </View>

            <View style={styles.switchRow}>
              <View style={styles.switchInfo}>
                <Text style={styles.switchTitle}>Veterinariya pasporti bor</Text>
                <Text style={styles.switchDesc}>Hujjatlari tasdiqlangan</Text>
              </View>
              <Switch
                value={filters.hasPassport || false}
                onValueChange={(val) => setFilters({ hasPassport: val })}
                trackColor={{ false: '#E2E8F0', true: ZooColors.primary }}
              />
            </View>

            <View style={styles.switchRow}>
              <View style={styles.switchInfo}>
                <Text style={styles.switchTitle}>Tekinga (Asrab olish)</Text>
                <Text style={styles.switchDesc}>Mehrli qo'llarga bepul beriladi</Text>
              </View>
              <Switch
                value={filters.isFree || false}
                onValueChange={(val) => setFilters({ isFree: val })}
                trackColor={{ false: '#E2E8F0', true: ZooColors.primary }}
              />
            </View>

            {/* Sort Options */}
            <Text style={[styles.sectionHeader, { marginTop: 16 }]}>
              Saralash tartibi
            </Text>
            <View style={styles.sortContainer}>
              {[
                { id: 'newest', label: 'Eng yangilari' },
                { id: 'price_asc', label: 'Oldin arzonlari' },
                { id: 'price_desc', label: 'Oldin qimmatlari' },
              ].map((item) => {
                const isSelected = filters.sortBy === item.id;
                return (
                  <Pressable
                    key={item.id}
                    onPress={() => setFilters({ sortBy: item.id as any })}
                    style={[
                      styles.sortItem,
                      isSelected && styles.sortItemSelected,
                    ]}>
                    <Text
                      style={[
                        styles.sortText,
                        isSelected && styles.sortTextSelected,
                      ]}>
                      {item.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>

          {/* Footer Actions */}
          <View style={styles.footer}>
            <Pressable
              onPress={() => {
                resetFilters();
                onClose();
              }}
              style={styles.resetButton}>
              <Text style={styles.resetText}>Tozalash</Text>
            </Pressable>
            <Pressable onPress={onClose} style={styles.applyButton}>
              <Text style={styles.applyText}>Natijalarni ko'rish</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: ZooColors.dark,
  },
  body: {
    padding: 18,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: ZooColors.darkSecondary,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F1F5F9',
  },
  switchInfo: {
    flex: 1,
    paddingRight: 10,
  },
  switchTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: ZooColors.dark,
  },
  switchDesc: {
    fontSize: 12,
    color: ZooColors.gray,
    marginTop: 2,
  },
  sortContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 6,
  },
  sortItem: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },
  sortItemSelected: {
    borderColor: ZooColors.primary,
    backgroundColor: ZooColors.primaryLight,
  },
  sortText: {
    fontSize: 13,
    fontWeight: '500',
    color: ZooColors.darkSecondary,
  },
  sortTextSelected: {
    color: ZooColors.primaryDark,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingTop: 12,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  resetButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },
  resetText: {
    fontSize: 14,
    fontWeight: '600',
    color: ZooColors.darkSecondary,
  },
  applyButton: {
    flex: 2,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ZooColors.primary,
  },
  applyText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
