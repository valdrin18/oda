import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';
import Badge from '../../components/Badge';
import { COLORS, SPACING, SHADOW, RADIUS } from '../../theme';
import { getMemberById } from '../../data/members';

export default function BusinessDetailScreen({ route, navigation }) {
  const { memberId } = route.params;
  const member = getMemberById(memberId);
  const [saved, setSaved] = useState(false);
  const [introModal, setIntroModal] = useState(false);

  if (!member) {
    return (
      <View style={styles.root}>
        <Header navigation={navigation} showBack title="Member" />
        <View style={styles.errorWrap}>
          <Text style={styles.errorText}>Member not found.</Text>
        </View>
      </View>
    );
  }

  const initials = member.name.split(' ').map((w) => w[0]).join('').substring(0, 2);

  return (
    <View style={styles.root}>
      <Header navigation={navigation} showBack title="Company Profile" />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <LinearGradient colors={[COLORS.navy, COLORS.navyLight]} style={styles.hero}>
          <View style={styles.heroAvatar}>
            <Text style={styles.heroAvatarText}>{initials}</Text>
          </View>
          <View style={styles.heroBadges}>
            {member.isPremium && <Badge type="Premium" size="sm" />}
            {member.isVerified && <Badge type="Verified" size="sm" />}
          </View>
          <Text style={styles.companyName}>{member.name}</Text>
          <Text style={styles.sector}>{member.sector}</Text>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="location-outline" size={13} color="rgba(255,255,255,0.6)" />
              <Text style={styles.metaText}>{member.city}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="earth-outline" size={13} color="rgba(255,255,255,0.6)" />
              <Text style={styles.metaText}>{member.countryFocus}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="people-outline" size={13} color="rgba(255,255,255,0.6)" />
              <Text style={styles.metaText}>{member.size}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Action Buttons */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.primaryAction}
            onPress={() => setIntroModal(true)}
            activeOpacity={0.8}
          >
            <Ionicons name="mail" size={16} color={COLORS.white} />
            <Text style={styles.primaryActionText}>Request Introduction</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.secondaryAction, saved && styles.savedAction]}
            onPress={() => setSaved(!saved)}
            activeOpacity={0.8}
          >
            <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={18} color={saved ? COLORS.gold : COLORS.navy} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Description */}
          <InfoCard title="About">
            <Text style={styles.descText}>{member.description}</Text>
          </InfoCard>

          {/* Services */}
          <InfoCard title="Services">
            <View style={styles.tagsWrap}>
              {member.services.map((s) => (
                <View key={s} style={styles.tag}>
                  <Text style={styles.tagText}>{s}</Text>
                </View>
              ))}
            </View>
          </InfoCard>

          {/* Cooperation */}
          <InfoCard title="Cooperation Interest">
            <View style={styles.coopSection}>
              <View style={styles.coopCol}>
                <View style={styles.coopHeader}>
                  <Ionicons name="arrow-up-circle" size={14} color="#16713A" />
                  <Text style={styles.coopTitle}>Offering</Text>
                </View>
                <Text style={styles.coopItem}>{member.offering}</Text>
              </View>
              <View style={styles.coopDivider} />
              <View style={styles.coopCol}>
                <View style={styles.coopHeader}>
                  <Ionicons name="arrow-down-circle" size={14} color="#1E5FA8" />
                  <Text style={styles.coopTitle}>Seeking</Text>
                </View>
                <Text style={styles.coopItem}>{member.seeking}</Text>
              </View>
            </View>
          </InfoCard>

          {/* Contact */}
          <InfoCard title="Contact">
            <View style={styles.contactRow}>
              <View style={[styles.contactAvatar, { backgroundColor: COLORS.navy + '15' }]}>
                <Ionicons name="person" size={18} color={COLORS.navy} />
              </View>
              <View>
                <Text style={styles.contactName}>{member.contactPerson}</Text>
                <Text style={styles.contactRole}>Primary Contact</Text>
              </View>
            </View>
            {member.email && (
              <TouchableOpacity style={styles.contactLink} onPress={() => Linking.openURL(`mailto:${member.email}`)} activeOpacity={0.7}>
                <Ionicons name="mail-outline" size={16} color={COLORS.blue} />
                <Text style={styles.contactLinkText}>{member.email}</Text>
              </TouchableOpacity>
            )}
            {member.phone && (
              <View style={styles.contactLink}>
                <Ionicons name="call-outline" size={16} color={COLORS.blue} />
                <Text style={styles.contactLinkText}>{member.phone}</Text>
              </View>
            )}
            {member.website && (
              <TouchableOpacity style={styles.contactLink} onPress={() => Linking.openURL(member.website)} activeOpacity={0.7}>
                <Ionicons name="globe-outline" size={16} color={COLORS.blue} />
                <Text style={styles.contactLinkText}>{member.website}</Text>
              </TouchableOpacity>
            )}
          </InfoCard>

          {/* Tags */}
          <InfoCard title="Tags">
            <View style={styles.tagsWrap}>
              {member.tags.map((t) => (
                <View key={t} style={styles.tagGray}>
                  <Text style={styles.tagGrayText}>{t}</Text>
                </View>
              ))}
            </View>
          </InfoCard>

          {/* B2B CTA */}
          <TouchableOpacity
            style={styles.b2bCTA}
            onPress={() => navigation.navigate('B2B', { sector: member.sectorKey })}
            activeOpacity={0.8}
          >
            <View>
              <Text style={styles.b2bCTATitle}>Start B2B Request</Text>
              <Text style={styles.b2bCTASub}>Find businesses in the same sector</Text>
            </View>
            <Ionicons name="arrow-forward-circle" size={28} color={COLORS.gold} />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Introduction Modal */}
      <Modal visible={introModal} transparent animationType="fade" onRequestClose={() => setIntroModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Ionicons name="checkmark-circle" size={48} color={COLORS.success} />
            <Text style={styles.modalTitle}>Introduction Requested!</Text>
            <Text style={styles.modalText}>
              OEGJK will contact you within 2 business days to arrange a formal introduction with {member.name}.
            </Text>
            <Text style={styles.modalRef}>Ref: INTRO-{member.id.toUpperCase()}-{new Date().getFullYear()}</Text>
            <TouchableOpacity style={styles.modalClose} onPress={() => setIntroModal(false)} activeOpacity={0.8}>
              <Text style={styles.modalCloseText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function InfoCard({ title, children }) {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.infoCardTitle}>{title}</Text>
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
  heroAvatar: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  heroAvatarText: { fontSize: 26, fontWeight: '800', color: COLORS.navy },
  heroBadges: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  companyName: { fontSize: 22, fontWeight: '800', color: COLORS.white, textAlign: 'center', letterSpacing: -0.3 },
  sector: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4, marginBottom: 12 },
  metaRow: { flexDirection: 'row', gap: 16, flexWrap: 'wrap', justifyContent: 'center' },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 12, color: 'rgba(255,255,255,0.65)' },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  primaryAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.navy,
    borderRadius: RADIUS.md,
    paddingVertical: 13,
  },
  primaryActionText: { fontSize: 14, fontWeight: '700', color: COLORS.white },
  secondaryAction: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.navy,
    backgroundColor: COLORS.white,
  },
  savedAction: { borderColor: COLORS.gold, backgroundColor: COLORS.goldSoft },
  content: { paddingHorizontal: SPACING.md },
  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: 12,
    ...SHADOW.card,
  },
  infoCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 10,
  },
  descText: { fontSize: 14, color: COLORS.textPrimary, lineHeight: 22 },
  tagsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: {
    backgroundColor: COLORS.navy + '10',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  tagText: { fontSize: 12, fontWeight: '500', color: COLORS.navy },
  tagGray: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  tagGrayText: { fontSize: 12, fontWeight: '500', color: COLORS.textSecondary },
  coopSection: { flexDirection: 'row', gap: 8 },
  coopCol: { flex: 1 },
  coopHeader: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 8 },
  coopTitle: { fontSize: 13, fontWeight: '700', color: COLORS.textPrimary },
  coopItem: { fontSize: 12, color: COLORS.textSecondary, marginBottom: 4, lineHeight: 18 },
  coopDivider: { width: 1, backgroundColor: COLORS.borderLight },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  contactAvatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactName: { fontSize: 14, fontWeight: '600', color: COLORS.navy },
  contactRole: { fontSize: 11, color: COLORS.textMuted },
  contactLink: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 6 },
  contactLinkText: { fontSize: 13, color: COLORS.blue, fontWeight: '500' },
  b2bCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.navy,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  b2bCTATitle: { fontSize: 15, fontWeight: '700', color: COLORS.white },
  b2bCTASub: { fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 3 },
  bottomSpacer: { height: 40 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10,35,66,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  modalBox: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    alignItems: 'center',
    gap: 10,
    width: '100%',
    ...SHADOW.cardStrong,
  },
  modalTitle: { fontSize: 20, fontWeight: '700', color: COLORS.navy },
  modalText: { fontSize: 14, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 21 },
  modalRef: { fontSize: 12, color: COLORS.textMuted, fontFamily: 'monospace' },
  modalClose: {
    backgroundColor: COLORS.navy,
    borderRadius: RADIUS.md,
    paddingVertical: 12,
    paddingHorizontal: 48,
    marginTop: 6,
  },
  modalCloseText: { fontSize: 15, fontWeight: '700', color: COLORS.white },
});
