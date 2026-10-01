import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BadgeProps {
  label: string;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'purple';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'success',
  size = 'sm',
}) => {
  const getColors = () => {
    switch (variant) {
      case 'success':
        return { bg: '#DCFCE7', text: '#15803D' };
      case 'warning':
        return { bg: '#FEF3C7', text: '#B45309' };
      case 'danger':
        return { bg: '#FEE2E2', text: '#B91C1C' };
      case 'purple':
        return { bg: '#EDE9FE', text: '#6D28D9' };
      case 'info':
      default:
        return { bg: '#DBEAFE', text: '#1D4ED8' };
    }
  };

  const colors = getColors();

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: colors.bg },
        size === 'md' ? styles.badgeMd : styles.badgeSm,
      ]}>
      <Text
        style={[
          styles.text,
          { color: colors.text },
          size === 'md' ? styles.textMd : styles.textSm,
        ]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeSm: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeMd: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  text: {
    fontWeight: '600',
  },
  textSm: {
    fontSize: 11,
  },
  textMd: {
    fontSize: 13,
  },
});
