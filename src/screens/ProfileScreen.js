import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import { COLORS, SPACING, SHADOW, RADIUS } from '../theme';
import { profile } from '../data/profile';
import { members } from '../data/members';
import { events } from '../data/events';
import { clusters } from '../data/clusters';
import { offers } from '../data/offers';

export default function ProfileScreen({ navigation }) {
  const savedCompanies = members.filter((m) => profile.savedCompanies.includes(m.id));
  const registeredEvents = events.filter((e) => profile.registeredEvents.includes(e.id));
  const clusterMemberships = clusters.filter((c) => profile.clusterMemberships.includes(c.id));
  const claimedOffers = offers.filter((o) => profile.claimedOffers.includes(o.id));

  return (
    <View style={styles.root}>
      <Header navigation={navigation} />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Profile Hero */}
        <LinearGradient colors={[COLORS.navy, COLORS.navyLight]} style={styles.profileHero}>
          <View style={styles.avatarWrap}>
            <Text style={styles.avatarText}>PS</Text>
          </View>
          <View style={styles.badgesRow}>
            <View style={styles.premiumBadge}>
              <Ionicons name="star" size={12} color={COLORS.navy} />
              <Text style={styles.premiumBadgeText}>Premium Member</Text>
            </View>
            <View style={styles.verifiedBadge}>
              <Ionicons name="shield-checkmark" size={12} color={COLORS.blue} />
              <Text style={styles.verifiedBadgeText}>Verified OEGJK Member</Text>
            </View>
          </View>
          <Text style={styles.companyName}>{profile.companyName}</Text>
          <Text style={styles.contactName}>{profile.contactPerson} · {profile.role}</Text>
          <View style={styles.profileMeta}>
            <View style={styles.profileMetaItem}>
              <Ionicons name="layers-outline" size={13} color="rgba(255,255,255,0.6)" />
              <Text style={styles.profileMetaText}>{profile.sector}</Text>
            </View>
            <View style={styles.profileMetaItem}>
              <Ionicons name="location-outline" size={13} color="rgba(255,255,255,0.6)" />
              <Text style={styles.profileMetaText}>{profile.city}, {profile.country}</Text>
            </View>
            <View style={styles.profileMetaItem}>
              <Ionicons name="earth-outline" size={13} color="rgba(255,255,255,0.6)" />
              <Text style={styles.profileMetaText}>{profile.countryFocus}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { val: profile.stats.savedCompanies, label: 'Saved' },
            { val: profile.stats.registeredEvents, label: 'Events' },
            { val: profile.stats.activeB2BRequests, label: 'B2B' },
            { val: profile.stats.clusterMemberships, label: 'Clusters' },
            { val: profile.stats.claimedOffers, label: 'Offers' },
          ].map((stat) => (
            <View key={stat.label} style={styles.statItem}>
              <Text style={styles.statValue}>{stat.val}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.content}>
          {/* Quick Actions */}
          <View style={styles.actionGrid}>
            {[
              { icon: 'create-outline', label: 'Edit Profile', color: COLORS.navy },
              { icon: 'calendar-outline', label: 'My Events', color: '#1E5FA8' },
              { icon: 'git-compare-outline', label: 'B2B Requests', color: '#C9A84C' },
              { icon: 'notifications-outline', label: 'Notifications', color: '#9333EA' },
            ].map((item) => (
              <TouchableOpacity key={item.label} style={styles.actionBtn} activeOpacity={0.75}>
                <View style={[styles.actionIcon, { backgroundColor: item.color + '15' }]}>
                  <Ionicons name={item.icon} size={22} color={item.color} />
                </View>
                <Text style={styles.actionLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Company Overview */}
          <SectionCard title="Company Overview" icon="business">
            <Text style={styles.overviewText}>{profile.description}</Text>
            <View style={styles.servicesWrap}>
              {profile.services.map((s) => (
                <View key={s} style={styles.serviceChip}>
                  <Text style={styles.serviceChipText}>{s}</Text>
                </View>
              ))}
            </View>
          </SectionCard>

          {/* Membership Status */}
          <SectionCard title="Membership Status" icon="ribbon">
            <View style={styles.membershipRow}>
              <View style={styles.membershipBadge}>
                <Ionicons name="star" size={16} color={COLORS.gold} />
                <Text style={styles.membershipType}>{profile.membership} Member</Text>
              </View>
              <Text style={styles.memberSince}>Member since {profile.memberSince}</Text>
            </View>
            <View style={styles.membershipBenefits}>
              {['B2B Matchmaking', 'Members4Members', 'Cluster Access', 'Trade Fair Support', 'Event Priority'].map((b) => (
                <View key={b} style={styles.benefitRow}>
                  <Ionicons name="checkmark-circle" size={14} color={COLORS.success} />
                  <Text style={styles.benefitText}>{b}</Text>
                </View>
              ))}
            </View>
          </SectionCard>

          {/* Saved Companies */}
          <SectionCard title={`Saved Companies (${savedCompanies.length})`} icon="bookmark">
            {savedCompanies.map((m) => (
              <TouchableOpacity
                key={m.id}
                style={styles.listItem}
                onPress={() => navigation.navigate('BusinessDetail', { memberId: m.id })}
                activeOpacity={0.7}
              >
                <View style={styles.listItemAvatar}>
                  <Text style={styles.listItemAvatarText}>{m.name.split(' ').map((w) => w[0]).join('').substring(0, 2)}</Text>
                </View>
                <View style={styles.listItemInfo}>
                  <Text style={styles.listItemName}>{m.name}</Text>
                  <Text style={styles.listItemSub}>{m.sector} · {m.city}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={COLORS.textMuted} />
              </TouchableOpacity>
            ))}
          </SectionCard>

          {/* Registered Events */}
          <SectionCard title={`Registered Events (${registeredEvents.length})`} icon="calendar">
            {registeredEvents.map((e) => (
              <TouchableOpacity
                key={e.id}
                style={styles.listItem}
                onPress={() => navigation.navigate('EventDetail', { eventId: e.id })}
                activeOpacity={0.7}
              >
                <View style={[styles.listItemAvatar, { backgroundColor: '#1E5FA820' }]}>
                  <Ionicons name="calendar" size={16} color={COLORS.blue} />
                </View>
                <View style={styles.listItemInfo}>
                  <Text style={styles.listItemName} numberOfLines={1}>{e.title}</Text>
                  <Text style={styles.listItemSub}>{e.dateDisplay} · {e.locationBadge}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={COLORS.textMuted} />
              </TouchableOpacity>
            ))}
          </SectionCard>

          {/* B2B Requests */}
          <SectionCard title="B2B Requests" icon="git-compare">
            {profile.b2bRequests.map((req) => (
              <View key={req.id} style={styles.b2bRequestItem}>
                <View style={styles.b2bRequestTop}>
                  <Text style={styles.b2bRequestTitle}>{req.sector} · {req.targetCountry}</Text>
                  <View style={styles.b2bStatusBadge}>
                    <Text style={styles.b2bStatusText}>{req.status}</Text>
                  </View>
                </View>
                <Text style={styles.b2bRequestSub}>Submitted {req.submittedDate} · Urgency: {req.urgency}</Text>
              </View>
            ))}
          </SectionCard>

          {/* Cluster Memberships */}
          <SectionCard title="Cluster Memberships" icon="layers">
            {clusterMemberships.map((c) => (
              <TouchableOpacity
                key={c.id}
                style={styles.listItem}
                onPress={() => navigation.navigate('ClusterDetail', { clusterId: c.id })}
                activeOpacity={0.7}
              >
                <View style={[styles.listItemAvatar, { backgroundColor: '#1E5FA820' }]}>
                  <Ionicons name={c.icon} size={16} color={COLORS.blue} />
                </View>
                <View style={styles.listItemInfo}>
                  <Text style={styles.listItemName}>{c.name}</Text>
                  <Text style={styles.listItemSub}>Next: {c.nextMeeting}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={COLORS.textMuted} />
              </TouchableOpacity>
            ))}
          </SectionCard>

          {/* Claimed Offers */}
          <SectionCard title={`Claimed Offers (${claimedOffers.length})`} icon="gift">
            {claimedOffers.map((o) => (
              <View key={o.id} style={styles.listItem}>
                <View style={[styles.listItemAvatar, { backgroundColor: '#9333EA15' }]}>
                  <Ionicons name="gift" size={16} color="#9333EA" />
                </View>
                <View style={styles.listItemInfo}>
                  <Text style={styles.listItemName} numberOfLines={1}>{o.title}</Text>
                  <Text style={styles.listItemSub}>{o.provider} · {o.category}</Text>
                </View>
                <View style={styles.claimedDot}>
                  <Ionicons name="checkmark" size={12} color={COLORS.white} />
                </View>
              </View>
            ))}
          </SectionCard>
        </View>
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

function SectionCard({ title, icon, children }) {
  return (
    <View style={styles.sectionCard}>
      <View style={styles.sectionCardHeader}>
        <Ionicons name={icon} size={18} color={COLORS.navy} />
        <Text style={styles.sectionCardTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  profileHero: {
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
  },
  avatarWrap: {
    width: 80,
    height: 80,
    borderRadius: 22,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  avatarText: { fontSize: 28, fontWeight: '800', color: COLORS.navy },
  badgesRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.gold,
    borderRadius: RADIUS.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  premiumBadgeText: { fontSize: 11, fontWeight: '700', color: COLORS.navy },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(30,95,168,0.3)',
    borderRadius: RADIUS.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(30,95,168,0.4)',
  },
  verifiedBadgeText: { fontSize: 11, fontWeight: '600', color: '#90CAF9' },
  companyName: { fontSize: 24, fontWeight: '800', color: COLORS.white, textAlign: 'center', letterSpacing: -0.3 },
  contactName: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4, marginBottom: 14 },
  profileMeta: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12 },
  profileMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  profileMetaText: { fontSize: 12, color: 'rgba(255,255,255,0.65)' },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.md,
    marginTop: -18,
    borderRadius: RADIUS.lg,
    padding: 12,
    ...SHADOW.cardStrong,
  },
  statItem: { flex: 1, alignItems: 'center', borderRightWidth: 1, borderRightColor: COLORS.borderLight },
  statValue: { fontSize: 20, fontWeight: '800', color: COLORS.navy },
  statLabel: { fontSize: 10, color: COLORS.textMuted, marginTop: 2, textTransform: 'uppercase', letterSpacing: 0.5 },
  content: { paddingHorizontal: SPACING.md, paddingTop: SPACING.md },
  actionGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: SPACING.md,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: 10,
    alignItems: 'center',
    ...SHADOW.small,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  actionLabel: { fontSize: 11, fontWeight: '600', color: COLORS.textSecondary, textAlign: 'center' },
  sectionCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: 12,
    ...SHADOW.card,
  },
  sectionCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  sectionCardTitle: { fontSize: 15, fontWeight: '700', color: COLORS.navy },
  overviewText: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 20, marginBottom: 12 },
  servicesWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  serviceChip: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  serviceChipText: { fontSize: 12, fontWeight: '500', color: COLORS.textSecondary },
  membershipRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  membershipBadge: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  membershipType: { fontSize: 15, fontWeight: '700', color: COLORS.navy },
  memberSince: { fontSize: 12, color: COLORS.textMuted },
  membershipBenefits: { gap: 6 },
  benefitRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  benefitText: { fontSize: 13, color: COLORS.textSecondary },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  listItemAvatar: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.navyLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  listItemAvatarText: { fontSize: 13, fontWeight: '700', color: COLORS.white },
  listItemInfo: { flex: 1 },
  listItemName: { fontSize: 13, fontWeight: '600', color: COLORS.navy },
  listItemSub: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  b2bRequestItem: {
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    padding: 12,
    marginBottom: 8,
  },
  b2bRequestTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  b2bRequestTitle: { fontSize: 14, fontWeight: '600', color: COLORS.navy },
  b2bStatusBadge: {
    backgroundColor: COLORS.successLight,
    borderRadius: RADIUS.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  b2bStatusText: { fontSize: 11, fontWeight: '600', color: COLORS.success },
  b2bRequestSub: { fontSize: 12, color: COLORS.textMuted },
  claimedDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSpacer: { height: 40 },
});
