import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, RADIUS } from '../theme';

const badgeConfig = {
  Premium: { bg: '#FFF8E7', border: '#C9A84C', text: '#8B6914', icon: '★' },
  Verified: { bg: '#EFF6FF', border: '#1E5FA8', text: '#1E5FA8', icon: '✓' },
  Kosovo: { bg: '#EBF0FF', border: '#003082', text: '#003082', icon: '🇽🇰' },
  Germany: { bg: '#FFF0F0', border: '#DD0000', text: '#AA0000', icon: '🇩🇪' },
  'Kosovo & Germany': { bg: '#F0F4FF', border: '#5A6B9A', text: '#2D3A6A', icon: '🌍' },
  Online: { bg: '#F0FDF4', border: '#22C55E', text: '#15803D', icon: '●' },
  'Member Only': { bg: '#F9F0FF', border: '#9333EA', text: '#7E22CE', icon: '♦' },
  Featured: { bg: '#FFFBEB', border: '#F59E0B', text: '#D97706', icon: '⭐' },
  Priority: { bg: '#FFF7ED', border: '#F97316', text: '#C2410C', icon: '↑' },
  New: { bg: '#F0FDF4', border: '#22C55E', text: '#15803D', icon: '✦' },
};

export default function Badge({ type, label, size = 'sm' }) {
  const config = badgeConfig[type] || { bg: COLORS.background, border: COLORS.border, text: COLORS.textSecondary, icon: '' };
  const text = label || type;
  const isSmall = size === 'xs';

  return (
    <View style={[
      styles.badge,
      {
        backgroundColor: config.bg,
        borderColor: config.border,
        paddingHorizontal: isSmall ? 6 : 9,
        paddingVertical: isSmall ? 2 : 4,
      }
    ]}>
      <Text style={[styles.text, { color: config.text, fontSize: isSmall ? 10 : 11 }]}>
        {config.icon ? `${config.icon} ${text}` : text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: RADIUS.full,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
