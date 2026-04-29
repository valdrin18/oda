import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import EventCard from '../components/EventCard';
import { COLORS, SPACING, SHADOW, RADIUS } from '../theme';
import { events, highlightedDates } from '../data/events';

const EVENT_CATEGORIES = ['All', 'Conference', 'Info Session', 'Delegation', 'Trade Fair', 'Cluster Meeting', 'Business Talk', 'Members Event'];
const LOCATION_FILTERS = ['All', 'Germany', 'Kosovo', 'Online'];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTH_NAME = 'May 2026';

// Simple May 2026 calendar (May 1 = Friday, index 4)
function buildCalendar() {
  const firstDayIndex = 4; // Friday
  const daysInMonth = 31;
  const cells = [];
  for (let i = 0; i < firstDayIndex; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

function hasEvent(day) {
  if (!day) return false;
  const dateStr = `2026-05-${String(day).padStart(2, '0')}`;
  return highlightedDates.includes(dateStr);
}

export default function EventsScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedDay, setSelectedDay] = useState(null);
  const calendarCells = buildCalendar();

  const filtered = events.filter((e) => {
    const matchCat = selectedCategory === 'All' || e.category === selectedCategory;
    const matchLoc = selectedLocation === 'All' || e.locationBadge === selectedLocation;
    const matchDay = !selectedDay || e.date === `2026-05-${String(selectedDay).padStart(2, '0')}`;
    return matchCat && matchLoc && matchDay;
  });

  return (
    <View style={styles.root}>
      <Header navigation={navigation} />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Page Header */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Events & Fairs</Text>
          <Text style={styles.pageSub}>Discover OEGJK events, German trade fairs, delegations, and member activities.</Text>
        </View>

        {/* Calendar */}
        <View style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <Ionicons name="calendar" size={18} color={COLORS.navy} />
            <Text style={styles.calendarMonth}>{MONTH_NAME}</Text>
            {selectedDay && (
              <TouchableOpacity onPress={() => setSelectedDay(null)} style={styles.clearDayBtn}>
                <Text style={styles.clearDayText}>Clear</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.calendarGrid}>
            {DAYS.map((d) => (
              <View key={d} style={styles.calendarDayHeader}>
                <Text style={styles.calendarDayHeaderText}>{d}</Text>
              </View>
            ))}
            {calendarCells.map((day, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.calendarCell,
                  !day && styles.calendarCellEmpty,
                  hasEvent(day) && styles.calendarCellEvent,
                  selectedDay === day && styles.calendarCellSelected,
                ]}
                onPress={day && hasEvent(day) ? () => setSelectedDay(selectedDay === day ? null : day) : undefined}
                activeOpacity={hasEvent(day) ? 0.7 : 1}
              >
                {day && (
                  <>
                    <Text style={[
                      styles.calendarDayNum,
                      hasEvent(day) && styles.calendarDayNumEvent,
                      selectedDay === day && styles.calendarDayNumSelected,
                    ]}>{day}</Text>
                    {hasEvent(day) && <View style={styles.eventDot} />}
                  </>
                )}
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.calendarLegend}>
            <View style={styles.legendItem}>
              <View style={styles.legendDot} />
              <Text style={styles.legendText}>Has event – tap to filter</Text>
            </View>
          </View>
        </View>

        {/* Filters */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filterRow}>
              {EVENT_CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.filterChip, selectedCategory === cat && styles.filterChipActive]}
                  onPress={() => setSelectedCategory(cat)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.filterChipText, selectedCategory === cat && styles.filterChipTextActive]}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <Text style={[styles.filterLabel, { marginTop: 10 }]}>Location</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filterRow}>
              {LOCATION_FILTERS.map((loc) => (
                <TouchableOpacity
                  key={loc}
                  style={[styles.filterChip, selectedLocation === loc && styles.filterChipActive]}
                  onPress={() => setSelectedLocation(loc)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.filterChipText, selectedLocation === loc && styles.filterChipTextActive]}>{loc}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Events Count */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {filtered.length} event{filtered.length !== 1 ? 's' : ''}
            {selectedDay ? ` on May ${selectedDay}` : ''}
          </Text>
        </View>

        {/* Event Cards */}
        <View style={styles.eventsList}>
          {filtered.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={48} color={COLORS.border} />
              <Text style={styles.emptyText}>No events match your filters.</Text>
            </View>
          ) : (
            filtered.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onPress={() => navigation.navigate('EventDetail', { eventId: event.id })}
              />
            ))
          )}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  pageHeader: {
    backgroundColor: COLORS.navy,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  pageTitle: { fontSize: 28, fontWeight: '800', color: COLORS.white, letterSpacing: -0.5 },
  pageSub: { fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 6, lineHeight: 19 },
  calendarCard: {
    backgroundColor: COLORS.white,
    margin: SPACING.md,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    ...SHADOW.card,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  calendarMonth: { fontSize: 16, fontWeight: '700', color: COLORS.navy, flex: 1 },
  clearDayBtn: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  clearDayText: { fontSize: 12, color: COLORS.blue, fontWeight: '600' },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDayHeader: {
    width: '14.285714%',
    alignItems: 'center',
    paddingVertical: 6,
  },
  calendarDayHeaderText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
  },
  calendarCell: {
    width: '14.285714%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  calendarCellEmpty: { opacity: 0 },
  calendarCellEvent: {
    backgroundColor: COLORS.verifiedBg,
  },
  calendarCellSelected: {
    backgroundColor: COLORS.navy,
  },
  calendarDayNum: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  calendarDayNumEvent: {
    color: COLORS.blue,
    fontWeight: '700',
  },
  calendarDayNumSelected: {
    color: COLORS.white,
    fontWeight: '700',
  },
  eventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.gold,
    marginTop: 2,
  },
  calendarLegend: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.gold },
  legendText: { fontSize: 11, color: COLORS.textMuted },
  filterSection: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  filterLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textMuted,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  filterRow: { flexDirection: 'row', gap: 8, paddingBottom: 4, paddingRight: SPACING.md },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipActive: { backgroundColor: COLORS.navy, borderColor: COLORS.navy },
  filterChipText: { fontSize: 12, fontWeight: '500', color: COLORS.textSecondary },
  filterChipTextActive: { color: COLORS.white, fontWeight: '600' },
  resultsHeader: { paddingHorizontal: SPACING.md, paddingBottom: SPACING.sm },
  resultsCount: { fontSize: 13, fontWeight: '600', color: COLORS.textMuted },
  eventsList: { paddingHorizontal: SPACING.md },
  emptyState: { alignItems: 'center', paddingVertical: SPACING.xxl, gap: 12 },
  emptyText: { fontSize: 14, color: COLORS.textMuted, textAlign: 'center' },
  bottomSpacer: { height: 40 },
});
