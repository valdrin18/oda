import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { COLORS, SPACING, SHADOW, RADIUS } from '../theme';

const SECTORS = ['ICT', 'Manufacturing', 'Agriculture', 'Food & Beverage', 'Legal Services', 'Healthcare', 'Logistics', 'Finance', 'Energy', 'Construction', 'Retail', 'Education'];
const GOALS = ['Import', 'Export', 'Invest', 'Open a branch', 'Find clients', 'Find suppliers', 'Find distributors'];
const SUPPORT_OPTIONS = ['Partners', 'Legal advice', 'Workers/staff', 'Suppliers', 'Distributors', 'Government contacts', 'Translation', 'Market research', 'Address search', 'PR', 'B2B meetings', 'Trade fair participation'];
const TIMELINES = ['Immediately', '1–3 months', '3–6 months', 'Later'];
const SIZES = ['Small', 'Medium', 'Large'];

function generatePackage(market, sector, goals, supports) {
  const packages = [
    { id: 1, name: 'Market Research', reason: `Understand the ${market} market for ${sector} sector.`, icon: 'search' },
    { id: 2, name: 'B2B Matchmaking', reason: 'Find suitable business partners and clients.', icon: 'git-compare' },
    { id: 3, name: 'Legal Introduction', reason: `Navigate ${market} business law and compliance.`, icon: 'document-text' },
    { id: 4, name: 'Translation Support', reason: 'Prepare German-Albanian business materials.', icon: 'language' },
    { id: 5, name: 'Trade Fair Participation', reason: `Present your company at relevant ${market} trade fairs.`, icon: 'storefront' },
  ];
  if (supports.includes('Partners') || supports.includes('B2B meetings')) return packages;
  if (supports.includes('Legal advice')) return [packages[0], packages[2], packages[3]];
  if (supports.includes('Trade fair participation')) return [packages[0], packages[1], packages[4]];
  return packages.slice(0, 3);
}

export default function MarketEntryScreen({ navigation }) {
  const [selectedMarket, setSelectedMarket] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    market: '',
    sector: SECTORS[0],
    goals: [],
    supports: [],
    timeline: TIMELINES[0],
    size: SIZES[0],
    description: '',
  });
  const [result, setResult] = useState(null);

  const toggleGoal = (g) => {
    setForm((f) => ({
      ...f,
      goals: f.goals.includes(g) ? f.goals.filter((x) => x !== g) : [...f.goals, g],
    }));
  };

  const toggleSupport = (s) => {
    setForm((f) => ({
      ...f,
      supports: f.supports.includes(s) ? f.supports.filter((x) => x !== s) : [...f.supports, s],
    }));
  };

  const handleGetOffer = () => {
    const pkg = generatePackage(form.market, form.sector, form.goals, form.supports);
    setResult(pkg);
  };

  const openForm = (market) => {
    setSelectedMarket(market);
    setForm((f) => ({ ...f, market }));
    setShowForm(true);
    setResult(null);
  };

  return (
    <View style={styles.root}>
      <Header navigation={navigation} />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Page Header */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Market Entry</Text>
          <Text style={styles.pageSub}>Get guided support for entering the Kosovo or German market.</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.infoCard}>
            <Ionicons name="compass" size={22} color={COLORS.blue} />
            <Text style={styles.infoText}>
              This assistant helps you discover which OEGJK services are relevant for your market entry – from partner search and legal introduction to translation, PR, and trade fair participation.
            </Text>
          </View>

          {/* Market Cards */}
          <View style={styles.marketCards}>
            <TouchableOpacity
              style={[styles.marketCard, selectedMarket === 'Kosovo' && styles.marketCardSelected]}
              onPress={() => openForm('Kosovo')}
              activeOpacity={0.85}
            >
              <Text style={styles.marketFlag}>🇽🇰</Text>
              <Text style={styles.marketCardTitle}>Enter Kosovo Market</Text>
              <Text style={styles.marketCardDesc}>Access one of Europe's fastest-growing emerging markets with OEGJK's local expertise.</Text>
              <View style={styles.marketCardBtn}>
                <Text style={styles.marketCardBtnText}>Select</Text>
                <Ionicons name="arrow-forward" size={14} color={COLORS.white} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.marketCard, styles.marketCardGermany, selectedMarket === 'Germany' && styles.marketCardSelected]}
              onPress={() => openForm('Germany')}
              activeOpacity={0.85}
            >
              <Text style={styles.marketFlag}>🇩🇪</Text>
              <Text style={styles.marketCardTitle}>Enter German Market</Text>
              <Text style={styles.marketCardDesc}>Access Germany's powerful economy with OEGJK's chamber expertise and trade fair support.</Text>
              <View style={styles.marketCardBtn}>
                <Text style={styles.marketCardBtnText}>Select</Text>
                <Ionicons name="arrow-forward" size={14} color={COLORS.white} />
              </View>
            </TouchableOpacity>
          </View>

          {/* Form */}
          {showForm && (
            <View style={styles.formCard}>
              <View style={styles.formHeaderRow}>
                <Text style={styles.formTitle}>Market Entry Request</Text>
                <View style={styles.selectedMarketBadge}>
                  <Text style={styles.selectedMarketText}>{form.market}</Text>
                </View>
              </View>

              <FormField label="Which market do you want to enter?">
                <View style={styles.selectRow}>
                  {['Kosovo', 'Germany'].map((m) => (
                    <TouchableOpacity
                      key={m}
                      style={[styles.selectOption, form.market === m && styles.selectOptionActive]}
                      onPress={() => setForm({ ...form, market: m })}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.selectOptionText, form.market === m && styles.selectOptionTextActive]}>{m}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
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

              <FormField label="Main Goal (select all that apply)">
                <View style={styles.multiSelectGrid}>
                  {GOALS.map((g) => (
                    <TouchableOpacity
                      key={g}
                      style={[styles.multiChip, form.goals.includes(g) && styles.multiChipActive]}
                      onPress={() => toggleGoal(g)}
                      activeOpacity={0.7}
                    >
                      {form.goals.includes(g) && <Ionicons name="checkmark" size={12} color={COLORS.white} />}
                      <Text style={[styles.multiChipText, form.goals.includes(g) && styles.multiChipTextActive]}>{g}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </FormField>

              <FormField label="Support Needed (select all that apply)">
                <View style={styles.multiSelectGrid}>
                  {SUPPORT_OPTIONS.map((s) => (
                    <TouchableOpacity
                      key={s}
                      style={[styles.multiChip, form.supports.includes(s) && styles.multiChipActive]}
                      onPress={() => toggleSupport(s)}
                      activeOpacity={0.7}
                    >
                      {form.supports.includes(s) && <Ionicons name="checkmark" size={12} color={COLORS.white} />}
                      <Text style={[styles.multiChipText, form.supports.includes(s) && styles.multiChipTextActive]}>{s}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </FormField>

              <FormField label="Timeline">
                <View style={styles.selectRow}>
                  {TIMELINES.map((t) => (
                    <TouchableOpacity
                      key={t}
                      style={[styles.selectOption, form.timeline === t && styles.selectOptionActive]}
                      onPress={() => setForm({ ...form, timeline: t })}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.selectOptionText, form.timeline === t && styles.selectOptionTextActive]}>{t}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </FormField>

              <FormField label="Company Size">
                <View style={styles.selectRow}>
                  {SIZES.map((s) => (
                    <TouchableOpacity
                      key={s}
                      style={[styles.selectOption, form.size === s && styles.selectOptionActive]}
                      onPress={() => setForm({ ...form, size: s })}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.selectOptionText, form.size === s && styles.selectOptionTextActive]}>{s}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </FormField>

              <FormField label="Brief Description">
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  multiline
                  numberOfLines={3}
                  value={form.description}
                  onChangeText={(v) => setForm({ ...form, description: v })}
                  placeholder="Describe your company and market entry goals..."
                  placeholderTextColor={COLORS.textMuted}
                />
              </FormField>

              <TouchableOpacity style={styles.submitBtn} onPress={handleGetOffer} activeOpacity={0.8}>
                <Ionicons name="sparkles" size={18} color={COLORS.navy} />
                <Text style={styles.submitBtnText}>Get Offer</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Result */}
          {result && (
            <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <Ionicons name="sparkles" size={22} color={COLORS.gold} />
                <Text style={styles.resultTitle}>Recommended Market Entry Package</Text>
              </View>
              <Text style={styles.resultSubtitle}>
                Based on your request for the {form.market} market in the {form.sector} sector:
              </Text>
              {result.map((item, i) => (
                <View key={item.id} style={styles.packageItem}>
                  <View style={styles.packageNum}>
                    <Text style={styles.packageNumText}>{i + 1}</Text>
                  </View>
                  <View style={styles.packageIconWrap}>
                    <Ionicons name={item.icon} size={18} color={COLORS.blue} />
                  </View>
                  <View style={styles.packageContent}>
                    <Text style={styles.packageName}>{item.name}</Text>
                    <Text style={styles.packageReason}>{item.reason}</Text>
                  </View>
                </View>
              ))}
              <View style={styles.resultNote}>
                <Ionicons name="information-circle-outline" size={16} color={COLORS.textMuted} />
                <Text style={styles.resultNoteText}>
                  In the full platform, this request would be sent to OEGJK staff for review and follow-up.
                </Text>
              </View>
              <TouchableOpacity style={styles.consultBtn} activeOpacity={0.8}>
                <Text style={styles.consultBtnText}>Request Consultation</Text>
                <Ionicons name="arrow-forward" size={16} color={COLORS.white} />
              </TouchableOpacity>
            </View>
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
  marketCards: { flexDirection: 'column', gap: 12, marginBottom: SPACING.md },
  marketCard: {
    backgroundColor: COLORS.navy,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    ...SHADOW.card,
  },
  marketCardGermany: { backgroundColor: '#6B0000' },
  marketCardSelected: { borderWidth: 2, borderColor: COLORS.gold },
  marketFlag: { fontSize: 32, marginBottom: 8 },
  marketCardTitle: { fontSize: 18, fontWeight: '700', color: COLORS.white, marginBottom: 6 },
  marketCardDesc: { fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 19, marginBottom: 14 },
  marketCardBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
  },
  marketCardBtnText: { fontSize: 13, fontWeight: '600', color: COLORS.white },
  formCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    ...SHADOW.card,
    marginBottom: SPACING.md,
  },
  formHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: SPACING.md },
  formTitle: { fontSize: 17, fontWeight: '700', color: COLORS.navy },
  selectedMarketBadge: {
    backgroundColor: COLORS.navy,
    borderRadius: RADIUS.full,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  selectedMarketText: { fontSize: 12, fontWeight: '600', color: COLORS.white },
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
  multiSelectGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  multiChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  multiChipActive: { backgroundColor: COLORS.blue, borderColor: COLORS.blue },
  multiChipText: { fontSize: 12, color: COLORS.textSecondary, fontWeight: '500' },
  multiChipTextActive: { color: COLORS.white, fontWeight: '600' },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: COLORS.gold,
    borderRadius: RADIUS.md,
    paddingVertical: 15,
    marginTop: SPACING.sm,
  },
  submitBtnText: { fontSize: 15, fontWeight: '700', color: COLORS.navy },
  resultCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    ...SHADOW.cardStrong,
    marginBottom: SPACING.md,
    borderWidth: 1.5,
    borderColor: COLORS.gold,
  },
  resultHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  resultTitle: { fontSize: 17, fontWeight: '700', color: COLORS.navy, flex: 1 },
  resultSubtitle: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 19, marginBottom: SPACING.md },
  packageItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 12,
    padding: 12,
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
  },
  packageNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.navy,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  packageNumText: { fontSize: 12, fontWeight: '700', color: COLORS.white },
  packageIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: COLORS.verifiedBg,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  packageContent: { flex: 1 },
  packageName: { fontSize: 14, fontWeight: '600', color: COLORS.navy, marginBottom: 3 },
  packageReason: { fontSize: 12, color: COLORS.textSecondary, lineHeight: 17 },
  resultNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    padding: 12,
    marginTop: 4,
    marginBottom: SPACING.md,
  },
  resultNoteText: { flex: 1, fontSize: 12, color: COLORS.textMuted, lineHeight: 18 },
  consultBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.navy,
    borderRadius: RADIUS.md,
    paddingVertical: 14,
  },
  consultBtnText: { fontSize: 15, fontWeight: '700', color: COLORS.white },
  bottomSpacer: { height: 40 },
});
