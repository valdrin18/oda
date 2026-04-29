import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import BusinessCard from '../components/BusinessCard';
import StatusTracker from '../components/StatusTracker';
import { COLORS, SPACING, SHADOW, RADIUS } from '../theme';
import { members } from '../data/members';

const SECTORS = ['ICT', 'Metal Processing', 'Manufacturing', 'Logistics', 'Finance', 'Healthcare', 'BPO', 'Energy', 'Legal', 'Marketing', 'HR', 'Construction', 'Agriculture'];
const SIZES = ['Small', 'Medium', 'Large'];
const URGENCIES = ['Low', 'Medium', 'High'];
const COUNTRIES = ['Kosovo', 'Germany', 'Both'];
const LANGUAGES = ['Albanian', 'German', 'English'];
const MEETING_TYPES = ['Online', 'In person', 'Trade fair', 'Delegation'];

const STATUS_STEPS = ['Submitted', 'Under Review', 'Matches Found', 'Meeting Scheduled'];

function getMatches(sector, targetCountry, urgency) {
  const sectorMap = {
    ICT: ['ICT', 'Software Development', 'FinTech', 'E-Commerce'],
    'Metal Processing': ['Metal Processing', 'Manufacturing', 'Logistics'],
    Manufacturing: ['Manufacturing', 'Metal Processing', 'Logistics'],
    Logistics: ['Logistics', 'Manufacturing', 'Metal Processing'],
    Finance: ['Finance', 'Consulting', 'Legal'],
    Healthcare: ['Healthcare'],
    BPO: ['BPO'],
    Energy: ['Renewable Energy', 'Energy'],
    Legal: ['Legal', 'Finance'],
    Marketing: ['Marketing', 'ICT'],
    HR: ['HR'],
    Agriculture: ['Agriculture', 'Logistics'],
  };

  const relevantSectors = sectorMap[sector] || [sector];
  let results = members.filter((m) =>
    relevantSectors.some((rs) => m.sector.includes(rs) || m.sectorKey === sector)
  );

  if (targetCountry !== 'Both') {
    const prioritized = results.filter((m) => m.countryFocus.includes(targetCountry));
    const rest = results.filter((m) => !m.countryFocus.includes(targetCountry));
    results = [...prioritized, ...rest];
  }

  return results.slice(0, 4);
}

export default function B2BMatchmakingScreen({ navigation, route }) {
  const prefillSector = route?.params?.sector || '';
  const [form, setForm] = useState({
    companyName: 'Pixellent Solutions',
    offering: '',
    seeking: '',
    targetCountry: 'Both',
    sector: prefillSector || 'ICT',
    size: 'Medium',
    urgency: 'Medium',
    language: 'English',
    meetingType: 'Online',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [matches, setMatches] = useState([]);

  const handleSubmit = () => {
    const found = getMatches(form.sector, form.targetCountry, form.urgency);
    setMatches(found);
    setSubmitted(true);
  };

  return (
    <View style={styles.root}>
      <Header navigation={navigation} />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Page Header */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>B2B Matchmaking</Text>
          <Text style={styles.pageSub}>Tell OEGJK what you offer and what partner you need.</Text>
        </View>

        <View style={styles.content}>
          {/* Info Card */}
          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={20} color={COLORS.blue} />
            <Text style={styles.infoText}>
              The Members page lets you search independently. B2B Matchmaking is a structured request where OEGJK helps identify and connect you with the right partners.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Your B2B Request</Text>

            <FormField label="Company Name">
              <TextInput
                style={styles.textInput}
                value={form.companyName}
                onChangeText={(v) => setForm({ ...form, companyName: v })}
                placeholder="Your company name"
                placeholderTextColor={COLORS.textMuted}
              />
            </FormField>

            <FormField label="What does your company offer?">
              <TextInput
                style={[styles.textInput, styles.textArea]}
                multiline
                numberOfLines={3}
                value={form.offering}
                onChangeText={(v) => setForm({ ...form, offering: v })}
                placeholder="Describe your main products or services..."
                placeholderTextColor={COLORS.textMuted}
              />
            </FormField>

            <FormField label="What are you looking for?">
              <TextInput
                style={[styles.textInput, styles.textArea]}
                multiline
                numberOfLines={3}
                value={form.seeking}
                onChangeText={(v) => setForm({ ...form, seeking: v })}
                placeholder="Describe the type of partner or cooperation you need..."
                placeholderTextColor={COLORS.textMuted}
              />
            </FormField>

            <FormField label="Target Country">
              <SelectRow options={COUNTRIES} selected={form.targetCountry} onSelect={(v) => setForm({ ...form, targetCountry: v })} />
            </FormField>

            <FormField label="Sector">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.chipsRow}>
                  {SECTORS.map((s) => (
                    <TouchableOpacity
                      key={s}
                      style={[styles.chip, form.sector === s && styles.chipActive]}
                      onPress={() => setForm({ ...form, sector: s })}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.chipText, form.sector === s && styles.chipTextActive]}>{s}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </FormField>

            <FormField label="Company Size">
              <SelectRow options={SIZES} selected={form.size} onSelect={(v) => setForm({ ...form, size: v })} />
            </FormField>

            <FormField label="Urgency">
              <SelectRow options={URGENCIES} selected={form.urgency} onSelect={(v) => setForm({ ...form, urgency: v })} />
            </FormField>

            <FormField label="Preferred Language">
              <SelectRow options={LANGUAGES} selected={form.language} onSelect={(v) => setForm({ ...form, language: v })} />
            </FormField>

            <FormField label="Meeting Type">
              <SelectRow options={MEETING_TYPES} selected={form.meetingType} onSelect={(v) => setForm({ ...form, meetingType: v })} />
            </FormField>

            <FormField label="Additional Notes">
              <TextInput
                style={[styles.textInput, styles.textArea]}
                multiline
                numberOfLines={3}
                value={form.notes}
                onChangeText={(v) => setForm({ ...form, notes: v })}
                placeholder="Any additional context or requirements..."
                placeholderTextColor={COLORS.textMuted}
              />
            </FormField>

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.8}>
              <Ionicons name="search" size={18} color={COLORS.white} />
              <Text style={styles.submitBtnText}>Search for B2B Opportunities</Text>
            </TouchableOpacity>
          </View>

          {/* Results */}
          {submitted && (
            <>
              {/* Status Tracker */}
              <View style={styles.statusCard}>
                <Text style={styles.statusTitle}>Request Status</Text>
                {form.urgency === 'High' && (
                  <View style={styles.priorityBadge}>
                    <Ionicons name="arrow-up" size={12} color={COLORS.white} />
                    <Text style={styles.priorityText}>Priority Request</Text>
                  </View>
                )}
                <StatusTracker steps={STATUS_STEPS} activeIndex={2} />
              </View>

              {/* Success Message */}
              <View style={styles.successCard}>
                <Ionicons name="checkmark-circle" size={24} color={COLORS.success} />
                <Text style={styles.successTitle}>Matches Found!</Text>
                <Text style={styles.successText}>
                  Based on your request, we found {matches.length} potential business partners. In the full platform, OEGJK would review these matches and facilitate introductions.
                </Text>
              </View>

              {/* Match Cards */}
              <Text style={styles.matchesTitle}>Suggested Partners</Text>
              {matches.map((m, i) => (
                <View key={m.id} style={styles.matchWrapper}>
                  <View style={styles.matchReasonBadge}>
                    <Text style={styles.matchReasonText}>
                      ✓ Matches: {m.sector} · {m.countryFocus}
                    </Text>
                  </View>
                  <BusinessCard
                    member={m}
                    onPress={() => navigation.navigate('BusinessDetail', { memberId: m.id })}
                    compact
                  />
                </View>
              ))}
            </>
          )}
        </View>
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

function FormField({ label, children }) {
  return (
    <View style={styles.formField}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {children}
    </View>
  );
}

function SelectRow({ options, selected, onSelect }) {
  return (
    <View style={styles.selectRow}>
      {options.map((opt) => (
        <TouchableOpacity
          key={opt}
          style={[styles.selectOption, selected === opt && styles.selectOptionActive]}
          onPress={() => onSelect(opt)}
          activeOpacity={0.7}
        >
          <Text style={[styles.selectOptionText, selected === opt && styles.selectOptionTextActive]}>{opt}</Text>
        </TouchableOpacity>
      ))}
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
  content: { paddingHorizontal: SPACING.md, paddingTop: SPACING.md },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: COLORS.verifiedBg,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoText: { flex: 1, fontSize: 13, color: COLORS.textSecondary, lineHeight: 19 },
  formCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    ...SHADOW.card,
    marginBottom: SPACING.md,
  },
  formTitle: { fontSize: 17, fontWeight: '700', color: COLORS.navy, marginBottom: SPACING.md },
  formField: { marginBottom: SPACING.md },
  fieldLabel: { fontSize: 12, fontWeight: '600', color: COLORS.textSecondary, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  textInput: {
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  textArea: { minHeight: 80, textAlignVertical: 'top' },
  selectRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  selectOption: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  selectOptionActive: { backgroundColor: COLORS.navy, borderColor: COLORS.navy },
  selectOptionText: { fontSize: 13, color: COLORS.textSecondary, fontWeight: '500' },
  selectOptionTextActive: { color: COLORS.white, fontWeight: '600' },
  chipsRow: { flexDirection: 'row', gap: 8, paddingBottom: 4 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  chipActive: { backgroundColor: COLORS.navy, borderColor: COLORS.navy },
  chipText: { fontSize: 12, color: COLORS.textSecondary, fontWeight: '500' },
  chipTextActive: { color: COLORS.white, fontWeight: '600' },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: COLORS.navy,
    borderRadius: RADIUS.md,
    paddingVertical: 15,
    marginTop: SPACING.sm,
  },
  submitBtnText: { fontSize: 15, fontWeight: '700', color: COLORS.white },
  statusCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    ...SHADOW.card,
    marginBottom: SPACING.md,
  },
  statusTitle: { fontSize: 16, fontWeight: '700', color: COLORS.navy, marginBottom: SPACING.sm },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    backgroundColor: '#F97316',
    borderRadius: RADIUS.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: SPACING.sm,
  },
  priorityText: { fontSize: 11, fontWeight: '700', color: COLORS.white },
  successCard: {
    backgroundColor: COLORS.successLight,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    alignItems: 'center',
    gap: 8,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  successTitle: { fontSize: 17, fontWeight: '700', color: '#15803D' },
  successText: { fontSize: 13, color: '#166534', textAlign: 'center', lineHeight: 19 },
  matchesTitle: { fontSize: 17, fontWeight: '700', color: COLORS.navy, marginBottom: SPACING.sm },
  matchWrapper: { marginBottom: 4 },
  matchReasonBadge: {
    backgroundColor: COLORS.verifiedBg,
    borderRadius: RADIUS.sm,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  matchReasonText: { fontSize: 11, color: COLORS.blue, fontWeight: '600' },
  bottomSpacer: { height: 40 },
});
