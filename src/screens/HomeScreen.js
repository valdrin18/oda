import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import EventCard from '../components/EventCard';
import BusinessCard from '../components/BusinessCard';
import { COLORS, SPACING, SHADOW, RADIUS, TYPOGRAPHY } from '../theme';
import { events } from '../data/events';
import { members } from '../data/members';
import { clusters } from '../data/clusters';

const { width } = Dimensions.get('window');

const homeEvents = events.slice(0, 3);
const homeOpportunities = members.filter((m) => m.isPremium).slice(0, 3);
const homeClusters = clusters.filter((c) => ['c2', 'c5'].includes(c.id));

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.root}>
      <Header navigation={navigation} />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero Welcome */}
        <LinearGradient colors={[COLORS.navy, COLORS.navyLight, '#2A5A90']} style={styles.hero}>
          <View style={styles.heroContent}>
            <Text style={styles.heroWelcome}>Welcome to</Text>
            <Text style={styles.heroTitle}>OEGJK Connect</Text>
            <Text style={styles.heroSub}>Your German-Kosovar business hub</Text>
            <Text style={styles.heroDesc}>
              Discover business partners, attend events, claim member offers, explore clusters & networks, and grow your business across the German-Kosovar corridor.
            </Text>
            <View style={styles.heroStats}>
              {[['250+', 'Members'], ['40+', 'Events/yr'], ['6', 'Clusters'], ['3', 'Networks']].map(([val, label]) => (
                <View key={label} style={styles.heroStat}>
                  <Text style={styles.heroStatVal}>{val}</Text>
                  <Text style={styles.heroStatLabel}>{label}</Text>
                </View>
              ))}
            </View>
          </View>
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.quickActionsWrap}>
          <View style={styles.quickActions}>
            {[
              { icon: 'people', label: 'Members', screen: 'Members', color: '#1E5FA8' },
              { icon: 'git-compare', label: 'B2B', screen: 'B2B', color: '#0A2342' },
              { icon: 'gift', label: 'Offers', screen: 'M4M', color: '#9333EA' },
              { icon: 'earth', label: 'Market Entry', screen: 'MarketEntry', color: '#C9A84C' },
            ].map((item) => (
              <TouchableOpacity
                key={item.screen}
                style={styles.quickAction}
                onPress={() => navigation.navigate(item.screen)}
                activeOpacity={0.75}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: item.color + '18' }]}>
                  <Ionicons name={item.icon} size={22} color={item.color} />
                </View>
                <Text style={styles.quickActionLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Upcoming Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Upcoming Events</Text>
              <Text style={styles.sectionSub}>Register and attend OEGJK events</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Events')} style={styles.seeAllBtn}>
              <Text style={styles.seeAllText}>See all</Text>
              <Ionicons name="arrow-forward" size={14} color={COLORS.blue} />
            </TouchableOpacity>
          </View>
          {homeEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onPress={() => navigation.navigate('EventDetail', { eventId: event.id })}
            />
          ))}
        </View>

        {/* New B2B Opportunities */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>New B2B Opportunities</Text>
              <Text style={styles.sectionSub}>Companies looking for cooperation</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('B2B')} style={styles.seeAllBtn}>
              <Text style={styles.seeAllText}>See all</Text>
              <Ionicons name="arrow-forward" size={14} color={COLORS.blue} />
            </TouchableOpacity>
          </View>
          {homeOpportunities.map((member) => (
            <BusinessCard
              key={member.id}
              member={member}
              onPress={() => navigation.navigate('BusinessDetail', { memberId: member.id })}
            />
          ))}
        </View>

        {/* Cluster Updates */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Cluster Updates</Text>
              <Text style={styles.sectionSub}>Latest from your sector clusters</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Clusters')} style={styles.seeAllBtn}>
              <Text style={styles.seeAllText}>See all</Text>
              <Ionicons name="arrow-forward" size={14} color={COLORS.blue} />
            </TouchableOpacity>
          </View>
          {homeClusters.map((cluster) => (
            <ClusterUpdateCard
              key={cluster.id}
              cluster={cluster}
              onPress={() => navigation.navigate('ClusterDetail', { clusterId: cluster.id })}
            />
          ))}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

function ClusterUpdateCard({ cluster, onPress }) {
  return (
    <View style={styles.clusterCard}>
      <View style={styles.clusterCardHeader}>
        <View style={styles.clusterIcon}>
          <Ionicons name="layers" size={18} color={COLORS.blue} />
        </View>
        <View style={styles.clusterHeaderText}>
          <Text style={styles.clusterName}>{cluster.name}</Text>
          <Text style={styles.clusterActivity}>posted a new poll</Text>
        </View>
        <View style={styles.memberCountBadge}>
          <Text style={styles.memberCountText}>{cluster.poll.totalVoted} voted</Text>
        </View>
      </View>
      <View style={styles.pollWrap}>
        <Text style={styles.pollQuestion}>{cluster.poll.question}</Text>
        {cluster.poll.options.slice(0, 3).map((opt, i) => (
          <View key={opt} style={styles.pollOption}>
            <View style={styles.pollDot} />
            <Text style={styles.pollOptionText}>{opt}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.openClusterBtn} onPress={onPress} activeOpacity={0.7}>
        <Text style={styles.openClusterText}>Open Cluster</Text>
        <Ionicons name="arrow-forward" size={14} color={COLORS.navy} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  hero: {
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl + 8,
    paddingHorizontal: SPACING.md,
  },
  heroContent: {},
  heroWelcome: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.65)',
    fontWeight: '500',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.white,
    marginTop: 4,
    letterSpacing: -0.5,
  },
  heroSub: {
    fontSize: 16,
    color: COLORS.goldLight,
    marginTop: 4,
    fontWeight: '500',
  },
  heroDesc: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 12,
    lineHeight: 20,
  },
  heroStats: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 0,
  },
  heroStat: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.15)',
  },
  heroStatVal: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.goldLight,
  },
  heroStatLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  quickActionsWrap: {
    marginTop: -16,
    paddingHorizontal: SPACING.md,
  },
  quickActions: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    flexDirection: 'row',
    padding: 12,
    ...SHADOW.cardStrong,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  quickActionIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  quickActionLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: COLORS.navy,
  },
  sectionSub: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingTop: 4,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.blue,
  },
  clusterCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: 12,
    ...SHADOW.card,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  clusterCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  clusterIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: COLORS.verifiedBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  clusterHeaderText: { flex: 1 },
  clusterName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.navy,
  },
  clusterActivity: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 1,
  },
  memberCountBadge: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  memberCountText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  pollWrap: {
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    padding: 12,
    marginBottom: 12,
  },
  pollQuestion: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.navy,
    marginBottom: 8,
  },
  pollOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 3,
  },
  pollDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.gold,
  },
  pollOptionText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  openClusterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
  },
  openClusterText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.navy,
  },
  bottomSpacer: { height: 40 },
});
