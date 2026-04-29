import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOW, RADIUS, SPACING } from '../theme';
import Badge from './Badge';

const categoryColors = {
  Conference: { bg: '#EFF6FF', text: '#1E5FA8' },
  'Info Session': { bg: '#F0FDF4', text: '#15803D' },
  Delegation: { bg: '#FFF8E7', text: '#8B6914' },
  'Trade Fair': { bg: '#FFF0F0', text: '#AA0000' },
  'Cluster Meeting': { bg: '#F9F0FF', text: '#7E22CE' },
  'Business Talk': { bg: '#F0F9FF', text: '#0369A1' },
  'Members Event': { bg: '#FAFAF5', text: '#4D5A0E' },
};

export default function EventCard({ event, onPress }) {
  const catStyle = categoryColors[event.category] || { bg: COLORS.background, text: COLORS.textSecondary };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.topRow}>
        <View style={[styles.categoryBadge, { backgroundColor: catStyle.bg }]}>
          <Text style={[styles.categoryText, { color: catStyle.text }]}>{event.category}</Text>
        </View>
        <Badge type={event.locationBadge} size="xs" />
      </View>

      <Text style={styles.title}>{event.title}</Text>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Ionicons name="calendar-outline" size={13} color={COLORS.gold} />
          <Text style={styles.metaText}>{event.dateDisplay}</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="time-outline" size={13} color={COLORS.textMuted} />
          <Text style={styles.metaText}>{event.time}</Text>
        </View>
      </View>

      <View style={styles.locationRow}>
        <Ionicons name="location-outline" size={13} color={COLORS.textMuted} />
        <Text style={styles.locationText}>{event.location}</Text>
      </View>

      <Text style={styles.description} numberOfLines={2}>{event.shortDescription}</Text>

      <View style={styles.footer}>
        <View style={styles.participantsRow}>
          <Ionicons name="people-outline" size={13} color={COLORS.textMuted} />
          <Text style={styles.participantsText}>{event.participantCount} registered</Text>
        </View>
        {event.isFeatured && (
          <View style={styles.featuredBadge}>
            <Ionicons name="star" size={11} color={COLORS.gold} />
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
        <TouchableOpacity style={styles.viewBtn} onPress={onPress} activeOpacity={0.7}>
          <Text style={styles.viewBtnText}>View Details</Text>
          <Ionicons name="arrow-forward" size={14} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: 12,
    ...SHADOW.card,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.navy,
    marginBottom: 8,
    lineHeight: 22,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 6,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 10,
  },
  locationText: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  description: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  participantsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  participantsText: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: COLORS.goldSoft,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  featuredText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.gold,
  },
  viewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.navy,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  viewBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.white,
  },
});
