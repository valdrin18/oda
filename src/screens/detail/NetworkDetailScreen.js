import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';
import { COLORS, SPACING, SHADOW, RADIUS } from '../../theme';
import { getNetworkById } from '../../data/networks';

export default function NetworkDetailScreen({ route, navigation }) {
  const { networkId } = route.params;
  const network = getNetworkById(networkId);

  if (!network) {
    return (
      <View style={styles.root}>
        <Header navigation={navigation} showBack title="Network" />
        <View style={styles.errorWrap}><Text style={styles.errorText}>Network not found.</Text></View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <Header navigation={navigation} showBack title="Network" />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <LinearGradient colors={[COLORS.navy, network.color + 'CC']} style={styles.hero}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoText}>{network.shortName}</Text>
          </View>
          <Text style={styles.heroName}>{network.name}</Text>
          <Text style={styles.heroTagline}>{network.tagline}</Text>
          <View style={styles.heroMeta}>
            <View style={styles.heroMetaItem}>
              <Ionicons name="people-outline" size={13} color="rgba(255,255,255,0.6)" />
              <Text style={styles.heroMetaText}>{network.memberCount} members</Text>
            </View>
            <View style={styles.heroMetaItem}>
              <Ionicons name="prism-outline" size={13} color="rgba(255,255,255,0.6)" />
              <Text style={styles.heroMetaText}>{network.focusArea}</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          {/* About */}
          <Section title="About" icon="information-circle">
            <Text style={styles.descText}>{network.description}</Text>
            {network.purpose && (
              <View style={styles.purposeCard}>
                <Text style={styles.purposeLabel}>Our Purpose</Text>
                <Text style={styles.purposeText}>{network.purpose}</Text>
              </View>
            )}
          </Section>

          {/* Features */}
          {network.features?.length > 0 && (
            <Section title="What We Offer" icon="gift">
              {network.features.map((feat) => (
                <View key={feat.title} style={styles.featRow}>
                  <View style={[styles.featIcon, { backgroundColor: network.color + '20' }]}>
                    <Ionicons name={feat.icon} size={18} color={network.color} />
                  </View>
                  <View style={styles.featInfo}>
                    <Text style={styles.featTitle}>{feat.title}</Text>
                    {(feat.desc || feat.description) ? <Text style={styles.featDesc}>{feat.desc || feat.description}</Text> : null}
                  </View>
                </View>
              ))}
            </Section>
          )}

          {/* n1: Providers (Clean Call Alliance) */}
          {network.providers?.length > 0 && (
            <Section title="Certified Providers" icon="shield-checkmark">
              {network.providers.map((p) => (
                <View key={p.name} style={styles.providerRow}>
                  <View style={styles.providerAvatar}>
                    <Text style={styles.providerAvatarText}>{p.name.substring(0, 2).toUpperCase()}</Text>
                  </View>
                  <View style={styles.providerInfo}>
                    <View style={styles.providerNameRow}>
                      <Text style={styles.providerName}>{p.name}</Text>
                      {(p.certified || p.isCertified) && (
                        <View style={styles.certifiedBadge}>
                          <Ionicons name="shield-checkmark" size={11} color="#0891B2" />
                          <Text style={styles.certifiedText}>Certified</Text>
                        </View>
                      )}
                    </View>
                    {(p.specialty || p.specialization) ? <Text style={styles.providerSub}>{p.specialty || p.specialization}</Text> : null}
                    {p.languages?.length > 0 && (
                      <Text style={styles.providerLang}>{p.languages.join(', ')}</Text>
                    )}
                  </View>
                </View>
              ))}
            </Section>
          )}

          {/* n2/n3: Companies directory */}
          {network.companies?.length > 0 && (
            <Section title="Member Companies" icon="business">
              {network.companies.map((c) => (
                <View key={c.name} style={styles.companyRow}>
                  <View style={styles.companyAvatar}>
                    <Text style={styles.companyAvatarText}>{c.name.split(' ').map((w) => w[0]).join('').substring(0, 2)}</Text>
                  </View>
                  <View style={styles.companyInfo}>
                    <Text style={styles.companyName}>{c.name}</Text>
                    <Text style={styles.companySub}>{c.type} · {c.city}</Text>
                    {c.focus && <Text style={styles.companyFocus}>{c.focus}</Text>}
                  </View>
                </View>
              ))}
            </Section>
          )}

          {/* n2: Opportunities */}
          {network.opportunities?.length > 0 && (
            <Section title="Opportunities" icon="flash">
              {network.opportunities.map((opp, i) => (
                <View key={i} style={styles.oppCard}>
                  <View style={styles.oppHeader}>
                    <Text style={styles.oppTitle}>{opp.title}</Text>
                    {opp.type && <Text style={styles.oppValue}>{opp.type}</Text>}
                  </View>
                  {opp.description ? <Text style={styles.oppDesc}>{opp.description}</Text> : null}
                  {(opp.deadline || opp.date) ? <Text style={styles.oppDeadline}>{opp.deadline ? `Deadline: ${opp.deadline}` : opp.date}</Text> : null}
                </View>
              ))}
            </Section>
          )}

          {/* n3: Updates (FI-KS) */}
          {network.updates?.length > 0 && (
            <Section title="Regulatory Updates" icon="notifications">
              {network.updates.map((upd, i) => (
                <View key={i} style={[styles.updateCard, (upd.urgent || upd.isUrgent) && styles.updateCardUrgent]}>
                  {(upd.urgent || upd.isUrgent) && (
                    <View style={styles.urgentBadge}>
                      <Ionicons name="alert-circle" size={12} color="#EF4444" />
                      <Text style={styles.urgentText}>Urgent</Text>
                    </View>
                  )}
                  <Text style={styles.updateTitle}>{upd.title}</Text>
                  {upd.type && <Text style={styles.updateDate}>{upd.type}</Text>}
                  {upd.body ? <Text style={styles.updateBody}>{upd.body}</Text> : null}
                  <Text style={styles.updateDate}>{upd.date}</Text>
                </View>
              ))}
            </Section>
          )}

          {/* Actions */}
          {network.actions?.length > 0 && (
            <View style={styles.actionsCard}>
              <Text style={styles.actionsTitle}>Get Involved</Text>
              {network.actions.map((action) => {
                const label = typeof action === 'string' ? action : action.label;
                const icon = typeof action === 'string' ? 'arrow-forward-circle' : action.icon;
                return (
                  <TouchableOpacity key={label} style={styles.actionBtn} activeOpacity={0.8}>
                    <Ionicons name={icon} size={18} color={COLORS.white} />
                    <Text style={styles.actionBtnText}>{label}</Text>
                    <Ionicons name="arrow-forward" size={14} color="rgba(255,255,255,0.7)" style={{ marginLeft: 'auto' }} />
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

function Section({ title, icon, children }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Ionicons name={icon} size={16} color={COLORS.navy} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  errorWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  errorText: { fontSize: 16, color: COLORS.textMuted },
  hero: {
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
  },
  logoBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 14,
  },
  logoText: { fontSize: 20, fontWeight: '800', color: COLORS.white, letterSpacing: 2 },
  heroName: { fontSize: 22, fontWeight: '800', color: COLORS.white, textAlign: 'center', letterSpacing: -0.3 },
  heroTagline: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 5, marginBottom: 14, textAlign: 'center' },
  heroMeta: { flexDirection: 'row', gap: 18 },
  heroMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  heroMetaText: { fontSize: 12, color: 'rgba(255,255,255,0.65)' },
  content: { paddingHorizontal: SPACING.md, paddingTop: SPACING.md },
  section: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: 12,
    ...SHADOW.card,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: COLORS.navy },
  descText: { fontSize: 14, color: COLORS.textPrimary, lineHeight: 22, marginBottom: 10 },
  purposeCard: {
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.gold,
  },
  purposeLabel: { fontSize: 11, fontWeight: '700', color: COLORS.gold, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  purposeText: { fontSize: 13, color: COLORS.textPrimary, lineHeight: 20 },
  featRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 12 },
  featIcon: {
    width: 40,
    height: 40,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featInfo: { flex: 1 },
  featTitle: { fontSize: 14, fontWeight: '600', color: COLORS.navy },
  featDesc: { fontSize: 12, color: COLORS.textSecondary, marginTop: 3, lineHeight: 18 },
  providerRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: COLORS.borderLight },
  providerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 11,
    backgroundColor: COLORS.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  providerAvatarText: { fontSize: 14, fontWeight: '700', color: COLORS.white },
  providerInfo: { flex: 1 },
  providerNameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  providerName: { fontSize: 14, fontWeight: '700', color: COLORS.navy },
  certifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#E0F7FA',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
  },
  certifiedText: { fontSize: 10, fontWeight: '700', color: '#0891B2' },
  providerSub: { fontSize: 12, color: COLORS.textSecondary, marginTop: 3 },
  providerLang: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  companyRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: COLORS.borderLight },
  companyAvatar: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: COLORS.navyLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  companyAvatarText: { fontSize: 13, fontWeight: '700', color: COLORS.white },
  companyInfo: { flex: 1 },
  companyName: { fontSize: 13, fontWeight: '600', color: COLORS.navy },
  companySub: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  companyFocus: { fontSize: 11, color: COLORS.blue, marginTop: 2, fontStyle: 'italic' },
  oppCard: {
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.blue,
  },
  oppHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 },
  oppTitle: { fontSize: 13, fontWeight: '700', color: COLORS.navy, flex: 1 },
  oppValue: { fontSize: 12, fontWeight: '700', color: COLORS.gold, marginLeft: 8 },
  oppDesc: { fontSize: 12, color: COLORS.textSecondary, lineHeight: 18 },
  oppDeadline: { fontSize: 11, color: COLORS.textMuted, marginTop: 4 },
  updateCard: {
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    padding: 12,
    marginBottom: 8,
  },
  updateCardUrgent: { backgroundColor: '#FEF2F2', borderWidth: 1, borderColor: '#FECACA' },
  urgentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  urgentText: { fontSize: 11, fontWeight: '700', color: '#EF4444' },
  updateTitle: { fontSize: 13, fontWeight: '700', color: COLORS.navy, marginBottom: 4 },
  updateBody: { fontSize: 12, color: COLORS.textSecondary, lineHeight: 18, marginBottom: 6 },
  updateDate: { fontSize: 11, color: COLORS.textMuted },
  actionsCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: 12,
    ...SHADOW.card,
  },
  actionsTitle: { fontSize: 14, fontWeight: '700', color: COLORS.navy, marginBottom: 12 },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.navy,
    borderRadius: RADIUS.md,
    paddingVertical: 13,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  actionBtnText: { fontSize: 14, fontWeight: '600', color: COLORS.white },
  bottomSpacer: { height: 40 },
});
