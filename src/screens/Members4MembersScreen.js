import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { COLORS, SPACING, SHADOW, RADIUS } from '../theme';
import { offers, offerCategories } from '../data/offers';

export default function Members4MembersScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [claimedOffers, setClaimedOffers] = useState([]);
  const [confirmModal, setConfirmModal] = useState(null);
  const [contactModal, setContactModal] = useState(null);

  const filtered = offers.filter(
    (o) => selectedCategory === 'All' || o.category === selectedCategory
  );

  const handleClaim = (offer) => {
    setClaimedOffers((prev) => [...prev, offer.id]);
    setConfirmModal(offer);
  };

  return (
    <View style={styles.root}>
      <Header navigation={navigation} />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Page Header */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Members4Members</Text>
          <Text style={styles.pageSub}>Exclusive offers and services shared between OEGJK members.</Text>
          <View style={styles.memberBadge}>
            <Ionicons name="shield-checkmark" size={13} color={COLORS.gold} />
            <Text style={styles.memberBadgeText}>Member-only marketplace</Text>
          </View>
        </View>

        {/* Category Filters */}
        <View style={styles.filterSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filterRow}>
              {offerCategories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.filterChip, selectedCategory === cat && styles.filterChipActive]}
                  onPress={() => setSelectedCategory(cat)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.filterChipText, selectedCategory === cat && styles.filterChipTextActive]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Offers List */}
        <View style={styles.offersList}>
          {filtered.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              isClaimed={claimedOffers.includes(offer.id)}
              onClaim={() => handleClaim(offer)}
              onContact={() => setContactModal(offer)}
            />
          ))}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Claim Confirmation Modal */}
      <Modal
        visible={!!confirmModal}
        transparent
        animationType="fade"
        onRequestClose={() => setConfirmModal(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalIconWrap}>
              <Ionicons name="checkmark-circle" size={48} color={COLORS.success} />
            </View>
            <Text style={styles.modalTitle}>Offer Claimed!</Text>
            <Text style={styles.modalText}>
              {'"'}{confirmModal?.title}{'"'} has been claimed successfully.{'\n\n'}In the full platform, the provider and OEGJK would be notified to coordinate the offer with you.
            </Text>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => setConfirmModal(null)}
              activeOpacity={0.8}
            >
              <Text style={styles.modalBtnText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Contact Modal */}
      <Modal
        visible={!!contactModal}
        transparent
        animationType="fade"
        onRequestClose={() => setContactModal(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Contact Provider</Text>
            <Text style={styles.modalProviderName}>{contactModal?.provider}</Text>
            <Text style={styles.modalText}>
              In the full platform, you would be connected directly with this member company to discuss the offer details.
            </Text>
            <View style={styles.contactInfoRow}>
              <Ionicons name="mail-outline" size={16} color={COLORS.textMuted} />
              <Text style={styles.contactInfoText}>contact@{contactModal?.provider?.toLowerCase().replace(/\s/g, '')}.com</Text>
            </View>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => setContactModal(null)}
              activeOpacity={0.8}
            >
              <Text style={styles.modalBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function OfferCard({ offer, isClaimed, onClaim, onContact }) {
  const catColors = {
    Legal: '#1E5FA8', Marketing: '#9333EA', HR: '#16713A', Translation: '#C9A84C',
    Logistics: '#0369A1', Energy: '#22C55E', Events: '#F59E0B', Software: '#6366F1',
    Consulting: '#DB2777',
  };
  const catColor = catColors[offer.category] || COLORS.textSecondary;

  return (
    <View style={[styles.offerCard, offer.isOfferOfWeek && styles.offerCardFeatured]}>
      {offer.isOfferOfWeek && (
        <View style={styles.featuredBanner}>
          <Ionicons name="star" size={12} color={COLORS.navy} />
          <Text style={styles.featuredBannerText}>Offer of the Week</Text>
        </View>
      )}
      <View style={styles.offerTop}>
        <View style={[styles.catBadge, { backgroundColor: catColor + '18', borderColor: catColor + '40' }]}>
          <Text style={[styles.catBadgeText, { color: catColor }]}>{offer.category}</Text>
        </View>
        <View style={styles.memberOnlyBadge}>
          <Ionicons name="lock-closed" size={10} color="#7E22CE" />
          <Text style={styles.memberOnlyText}>Member Only</Text>
        </View>
      </View>
      <Text style={styles.offerTitle}>{offer.title}</Text>
      <Text style={styles.offerProvider}>by {offer.provider}</Text>
      <Text style={styles.offerDesc} numberOfLines={3}>{offer.description}</Text>
      <View style={styles.validityRow}>
        <Ionicons name="time-outline" size={13} color={COLORS.textMuted} />
        <Text style={styles.validityText}>Valid until {offer.validUntil}</Text>
      </View>
      <View style={styles.offerActions}>
        <TouchableOpacity
          style={[styles.claimBtn, isClaimed && styles.claimBtnClaimed]}
          onPress={isClaimed ? undefined : onClaim}
          activeOpacity={isClaimed ? 1 : 0.8}
        >
          <Ionicons name={isClaimed ? 'checkmark-circle' : 'gift'} size={16} color={isClaimed ? COLORS.success : COLORS.white} />
          <Text style={[styles.claimBtnText, isClaimed && styles.claimBtnTextClaimed]}>
            {isClaimed ? 'Claimed' : 'Claim Offer'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactBtn} onPress={onContact} activeOpacity={0.7}>
          <Ionicons name="chatbubble-outline" size={16} color={COLORS.navy} />
          <Text style={styles.contactBtnText}>Contact</Text>
        </TouchableOpacity>
      </View>
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
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(201,168,76,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.3)',
  },
  memberBadgeText: { fontSize: 12, fontWeight: '600', color: COLORS.goldLight },
  filterSection: {
    paddingVertical: SPACING.md,
    paddingLeft: SPACING.md,
  },
  filterRow: { flexDirection: 'row', gap: 8, paddingRight: SPACING.md },
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
  offersList: { paddingHorizontal: SPACING.md },
  offerCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: 12,
    ...SHADOW.card,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    overflow: 'hidden',
  },
  offerCardFeatured: {
    borderColor: COLORS.gold,
    borderWidth: 1.5,
  },
  featuredBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.gold,
    marginHorizontal: -SPACING.md,
    marginTop: -SPACING.md,
    marginBottom: SPACING.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
  },
  featuredBannerText: { fontSize: 11, fontWeight: '700', color: COLORS.navy },
  offerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  catBadge: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  catBadgeText: { fontSize: 11, fontWeight: '600' },
  memberOnlyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F9F0FF',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  memberOnlyText: { fontSize: 10, fontWeight: '600', color: '#7E22CE' },
  offerTitle: { fontSize: 16, fontWeight: '700', color: COLORS.navy, marginBottom: 3 },
  offerProvider: { fontSize: 12, color: COLORS.textMuted, marginBottom: 8, fontStyle: 'italic' },
  offerDesc: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 19, marginBottom: 10 },
  validityRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 14 },
  validityText: { fontSize: 12, color: COLORS.textMuted },
  offerActions: { flexDirection: 'row', gap: 10 },
  claimBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: COLORS.navy,
    borderRadius: RADIUS.md,
    paddingVertical: 11,
  },
  claimBtnClaimed: { backgroundColor: COLORS.successLight, borderWidth: 1, borderColor: '#BBF7D0' },
  claimBtnText: { fontSize: 13, fontWeight: '600', color: COLORS.white },
  claimBtnTextClaimed: { color: COLORS.success },
  contactBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderColor: COLORS.navy,
    borderRadius: RADIUS.md,
    paddingVertical: 11,
    paddingHorizontal: 16,
  },
  contactBtnText: { fontSize: 13, fontWeight: '600', color: COLORS.navy },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(10,35,66,0.5)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 },
  modalCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    width: '100%',
    ...SHADOW.cardStrong,
    alignItems: 'center',
  },
  modalIconWrap: { marginBottom: 12 },
  modalTitle: { fontSize: 20, fontWeight: '700', color: COLORS.navy, marginBottom: 8 },
  modalProviderName: { fontSize: 14, fontWeight: '600', color: COLORS.blue, marginBottom: 8 },
  modalText: { fontSize: 13, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 20, marginBottom: 16 },
  contactInfoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  contactInfoText: { fontSize: 13, color: COLORS.textSecondary },
  modalBtn: {
    backgroundColor: COLORS.navy,
    borderRadius: RADIUS.md,
    paddingVertical: 13,
    paddingHorizontal: 40,
  },
  modalBtnText: { fontSize: 15, fontWeight: '600', color: COLORS.white },
  bottomSpacer: { height: 40 },
});
