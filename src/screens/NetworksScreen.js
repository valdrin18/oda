import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import { COLORS, SPACING, SHADOW, RADIUS } from '../theme';
import { networks } from '../data/networks';

export default function NetworksScreen({ navigation }) {
  return (
    <View style={styles.root}>
      <Header navigation={navigation} />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Page Header */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Networks</Text>
          <Text style={styles.pageSub}>Explore specialized business networks supported by OEGJK.</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.infoCard}>
            <Ionicons name="share-social" size={18} color={COLORS.blue} />
            <Text style={styles.infoText}>
              OEGJK Networks are specialized business communities with their own directories, events, regulatory updates, and collaboration tools. Each network focuses on a specific sector or theme.
            </Text>
          </View>

          {networks.map((network) => (
            <NetworkCard
              key={network.id}
              network={network}
              onPress={() => navigation.navigate('NetworkDetail', { networkId: network.id })}
            />
          ))}
        </View>
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

function NetworkCard({ network, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <LinearGradient
        colors={[network.color, network.color + 'CC']}
        style={styles.cardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardTopRow}>
          <View style={styles.networkLogoWrap}>
            <Text style={styles.networkLogo}>{network.shortName}</Text>
          </View>
          <View style={styles.memberCountBadge}>
            <Text style={styles.memberCountText}>{network.memberCount} members</Text>
          </View>
        </View>
        <Text style={styles.networkName}>{network.name}</Text>
        <Text style={styles.networkTagline}>{network.tagline}</Text>
        <Text style={styles.networkDesc} numberOfLines={2}>{network.description}</Text>
        <View style={styles.focusBadge}>
          <Ionicons name="prism-outline" size={12} color="rgba(255,255,255,0.8)" />
          <Text style={styles.focusBadgeText}>{network.focusArea}</Text>
        </View>
      </LinearGradient>
      <View style={styles.cardFooter}>
        {network.features?.slice(0, 3).map((feat) => (
          <View key={feat.title} style={styles.featItem}>
            <Ionicons name={feat.icon} size={14} color={COLORS.blue} />
            <Text style={styles.featText}>{feat.title}</Text>
          </View>
        ))}
        <TouchableOpacity style={styles.openBtn} onPress={onPress} activeOpacity={0.7}>
          <Text style={styles.openBtnText}>Open Network</Text>
          <Ionicons name="arrow-forward" size={14} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    marginBottom: 16,
    ...SHADOW.cardStrong,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  cardTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  networkLogoWrap: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  networkLogo: { fontSize: 15, fontWeight: '800', color: COLORS.white, letterSpacing: 1 },
  memberCountBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: RADIUS.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  memberCountText: { fontSize: 11, fontWeight: '600', color: 'rgba(255,255,255,0.9)' },
  networkName: { fontSize: 22, fontWeight: '800', color: COLORS.white, letterSpacing: -0.3 },
  networkTagline: { fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: '500', marginTop: 3, marginBottom: 8 },
  networkDesc: { fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 18, marginBottom: 10 },
  focusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  focusBadgeText: { fontSize: 11, color: 'rgba(255,255,255,0.85)', fontWeight: '500' },
  cardFooter: {
    padding: SPACING.md,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  featItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featText: { fontSize: 13, color: COLORS.textSecondary, fontWeight: '500' },
  openBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.navy,
    borderRadius: RADIUS.md,
    paddingVertical: 12,
    marginTop: 4,
  },
  openBtnText: { fontSize: 14, fontWeight: '700', color: COLORS.white },
  bottomSpacer: { height: 40 },
});
