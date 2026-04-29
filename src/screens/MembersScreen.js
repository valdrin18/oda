import React, { useState, useMemo } from 'react';
import {
  View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import BusinessCard from '../components/BusinessCard';
import { COLORS, SPACING, SHADOW, RADIUS } from '../theme';
import { members } from '../data/members';

const SECTORS = ['All', 'ICT', 'Metal Processing', 'Logistics', 'Finance', 'Manufacturing', 'Healthcare', 'BPO', 'Energy', 'Legal', 'Marketing', 'HR'];
const COUNTRIES = ['All', 'Kosovo', 'Germany', 'Kosovo & Germany'];
const SIZES = ['All', 'Small', 'Medium', 'Large'];

export default function MembersScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [premiumOnly, setPremiumOnly] = useState(false);

  const filtered = useMemo(() => {
    return members.filter((m) => {
      const matchSearch =
        !search ||
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.sector.toLowerCase().includes(search.toLowerCase()) ||
        m.services?.some((s) => s.toLowerCase().includes(search.toLowerCase())) ||
        m.tags?.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchSector = selectedSector === 'All' || m.sectorKey === selectedSector || m.sector.includes(selectedSector);
      const matchCountry = selectedCountry === 'All' || m.countryFocus.includes(selectedCountry);
      const matchSize = selectedSize === 'All' || m.size === selectedSize;
      const matchPremium = !premiumOnly || m.isPremium;
      return matchSearch && matchSector && matchCountry && matchSize && matchPremium;
    });
  }, [search, selectedSector, selectedCountry, selectedSize, premiumOnly]);

  return (
    <View style={styles.root}>
      <Header navigation={navigation} />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Page Header */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Members</Text>
          <Text style={styles.pageSub}>Discover verified member companies and potential business partners.</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchWrap}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color={COLORS.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by company, sector, service..."
              placeholderTextColor={COLORS.textMuted}
              value={search}
              onChangeText={setSearch}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Ionicons name="close-circle" size={18} color={COLORS.textMuted} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Filters */}
        <View style={styles.filtersSection}>
          <FilterRow label="Sector" options={SECTORS} selected={selectedSector} onSelect={setSelectedSector} />
          <FilterRow label="Country Focus" options={COUNTRIES} selected={selectedCountry} onSelect={setSelectedCountry} />
          <FilterRow label="Size" options={SIZES} selected={selectedSize} onSelect={setSelectedSize} />
          <TouchableOpacity
            style={[styles.premiumToggle, premiumOnly && styles.premiumToggleActive]}
            onPress={() => setPremiumOnly(!premiumOnly)}
            activeOpacity={0.7}
          >
            <Ionicons name="star" size={14} color={premiumOnly ? COLORS.gold : COLORS.textMuted} />
            <Text style={[styles.premiumToggleText, premiumOnly && styles.premiumToggleTextActive]}>
              Premium Only
            </Text>
          </TouchableOpacity>
        </View>

        {/* Results Count */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>{filtered.length} member{filtered.length !== 1 ? 's' : ''} found</Text>
        </View>

        {/* Members List */}
        <View style={styles.membersList}>
          {filtered.length === 0 ? (
            <EmptyState message="No members match your filters." />
          ) : (
            filtered.map((member) => (
              <BusinessCard
                key={member.id}
                member={member}
                onPress={() => navigation.navigate('BusinessDetail', { memberId: member.id })}
              />
            ))
          )}
        </View>
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

function FilterRow({ label, options, selected, onSelect }) {
  return (
    <View style={styles.filterRow}>
      <Text style={styles.filterLabel}>{label}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.filterOptions}>
          {options.map((opt) => (
            <TouchableOpacity
              key={opt}
              style={[styles.filterChip, selected === opt && styles.filterChipActive]}
              onPress={() => onSelect(opt)}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterChipText, selected === opt && styles.filterChipTextActive]}>
                {opt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function EmptyState({ message }) {
  return (
    <View style={styles.emptyState}>
      <Ionicons name="search" size={48} color={COLORS.border} />
      <Text style={styles.emptyText}>{message}</Text>
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
  pageTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: -0.5,
  },
  pageSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    marginTop: 6,
    lineHeight: 19,
  },
  searchWrap: {
    paddingHorizontal: SPACING.md,
    marginTop: -18,
    marginBottom: SPACING.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    paddingHorizontal: 14,
    paddingVertical: 12,
    ...SHADOW.cardStrong,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  filtersSection: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  filterRow: {
    marginBottom: SPACING.sm,
  },
  filterLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textMuted,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  filterOptions: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: SPACING.md,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipActive: {
    backgroundColor: COLORS.navy,
    borderColor: COLORS.navy,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  filterChipTextActive: {
    color: COLORS.white,
    fontWeight: '600',
  },
  premiumToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: SPACING.sm,
  },
  premiumToggleActive: {
    backgroundColor: COLORS.goldSoft,
    borderColor: COLORS.gold,
  },
  premiumToggleText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  premiumToggleTextActive: {
    color: COLORS.gold,
    fontWeight: '600',
  },
  resultsHeader: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  resultsCount: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  membersList: {
    paddingHorizontal: SPACING.md,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  bottomSpacer: { height: 40 },
});
