import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { COLORS, SPACING, SHADOW, RADIUS } from '../theme';
import { clusters } from '../data/clusters';

const CLUSTER_COLORS = {
  c1: '#9333EA',
  c2: '#1E5FA8',
  c3: '#C9A84C',
  c4: '#16713A',
  c5: '#F59E0B',
  c6: '#EF4444',
};

export default function ClustersScreen({ navigation }) {
  return (
    <View style={styles.root}>
      <Header navigation={navigation} />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Page Header */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Clusters</Text>
          <Text style={styles.pageSub}>Join sector workspaces, discussions, polls, and recommendations.</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.infoCard}>
            <Ionicons name="layers" size={18} color={COLORS.blue} />
            <Text style={styles.infoText}>
              OEGJK Clusters are private sector workspaces where members collaborate on policy, share expertise, participate in polls, and prepare joint recommendations.
            </Text>
          </View>

          {clusters.map((cluster) => (
            <ClusterCard
              key={cluster.id}
              cluster={cluster}
              color={CLUSTER_COLORS[cluster.id] || COLORS.blue}
              onPress={() => navigation.navigate('ClusterDetail', { clusterId: cluster.id })}
            />
          ))}
        </View>
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

function ClusterCard({ cluster, color, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.cardHeader}>
        <View style={[styles.clusterIcon, { backgroundColor: color + '18' }]}>
          <Ionicons name={cluster.icon} size={22} color={color} />
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.clusterName}>{cluster.name}</Text>
          <Text style={styles.clusterFullName} numberOfLines={1}>{cluster.fullName}</Text>
        </View>
        <View style={[styles.memberBadge, { borderColor: color + '40', backgroundColor: color + '10' }]}>
          <Text style={[styles.memberBadgeText, { color }]}>{cluster.memberCount} members</Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={2}>{cluster.description}</Text>

      <View style={styles.topicsRow}>
        {cluster.topics.slice(0, 3).map((topic) => (
          <View key={topic} style={styles.topicChip}>
            <Text style={styles.topicText} numberOfLines={1}>{topic}</Text>
          </View>
        ))}
        {cluster.topics.length > 3 && (
          <View style={styles.topicChip}>
            <Text style={styles.topicText}>+{cluster.topics.length - 3} more</Text>
          </View>
        )}
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.meetingInfo}>
          <Ionicons name="calendar-outline" size={13} color={COLORS.textMuted} />
          <Text style={styles.meetingText}>Next: {cluster.nextMeeting}</Text>
        </View>
        <View style={styles.pollInfo}>
          <Ionicons name="stats-chart-outline" size={13} color={COLORS.textMuted} />
          <Text style={styles.pollText}>{cluster.poll.totalVoted} voted in poll</Text>
        </View>
        <TouchableOpacity style={styles.openBtn} onPress={onPress} activeOpacity={0.7}>
          <Text style={styles.openBtnText}>Open</Text>
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
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: 12,
    ...SHADOW.card,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  clusterIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerInfo: { flex: 1 },
  clusterName: { fontSize: 16, fontWeight: '700', color: COLORS.navy },
  clusterFullName: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  memberBadge: {
    borderWidth: 1,
    borderRadius: RADIUS.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  memberBadgeText: { fontSize: 11, fontWeight: '600' },
  description: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 19, marginBottom: 10 },
  topicsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
  topicChip: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    maxWidth: 140,
  },
  topicText: { fontSize: 11, color: COLORS.textSecondary, fontWeight: '500' },
  cardFooter: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  meetingInfo: { flexDirection: 'row', alignItems: 'center', gap: 4, flex: 1 },
  meetingText: { fontSize: 11, color: COLORS.textMuted },
  pollInfo: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  pollText: { fontSize: 11, color: COLORS.textMuted },
  openBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.navy,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  openBtnText: { fontSize: 12, fontWeight: '600', color: COLORS.white },
  bottomSpacer: { height: 40 },
});
