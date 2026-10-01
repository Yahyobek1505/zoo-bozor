import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CATEGORIES_DATA, ZooColors } from '@/constants/zooTheme';
import { PetCategory } from '@/types';
import { useListingStore } from '@/store/useListingStore';

export const CategoryBar: React.FC = () => {
  const { filters, setFilters } = useListingStore();

  const getIconName = (id: string): any => {
    switch (id) {
      case 'all':
        return 'paw';
      case 'cats':
        return 'cat';
      case 'dogs':
        return 'dog';
      case 'food':
        return 'food-drumstick';
      case 'birds':
        return 'bird';
      case 'fish':
        return 'fish';
      case 'rodents':
        return 'rodent';
      case 'accessories':
        return 'shopping';
      case 'veterinary':
        return 'medical-bag';
      default:
        return 'paw';
    }
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {CATEGORIES_DATA.map((cat) => {
        const isSelected = filters.category === cat.id;

        return (
          <Pressable
            key={cat.id}
            onPress={() => setFilters({ category: cat.id as PetCategory })}
            style={[
              styles.pill,
              isSelected ? styles.pillSelected : styles.pillDefault,
            ]}>
            <MaterialCommunityIcons
              name={getIconName(cat.id)}
              size={18}
              color={isSelected ? '#FFFFFF' : ZooColors.primaryDark}
            />
            <Text
              style={[
                styles.label,
                isSelected ? styles.labelSelected : styles.labelDefault,
              ]}>
              {cat.name}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  pillDefault: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  pillSelected: {
    backgroundColor: ZooColors.primary,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
  labelDefault: {
    color: ZooColors.darkSecondary,
  },
  labelSelected: {
    color: '#FFFFFF',
  },
});
