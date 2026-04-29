import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';
import { COLORS, SPACING, SHADOW, RADIUS } from '../../theme';
import { getClusterById } from '../../data/clusters';

const CLUSTER_COLORS = {
  c1: '#9333EA',
  c2: '#1E5FA8',
  c3: '#C9A84C',
  c4: '#16713A',
  c5: '#F59E0B',
  c6: '#EF4444',
};

export default function ClusterDetailScreen({ route, navigation }) {
  const { clusterId } = route.params;
  const cluster = getClusterById(clusterId);
  const [voted, setVoted] = useState(null);
  const clusterColor = CLUSTER_COLORS[clusterId] || COLORS.blue;

  if (!cluster) {
    return (
      <View style={styles.root}>
        <Header navigation={navigation} showBack title="Cluster" />
        <View style={styles.errorWrap}><Text style={styles.errorText}>Cluster not found.</Text></View>
      </View>
    );
  }

  const totalVotes = voted
    ? cluster.poll.totalVoted + 1
    : cluster.poll.totalVoted;

  const getVotes = (optionLabel, i) => {
    const baseVotes = cluster.poll.votes ? cluster.poll.votes[i] : cluster.poll.options[i]?.votes || 0;
    if (!voted) return baseVotes;
    if (optionLabel === voted) return baseVotes + 1;
    return baseVotes;
  };

  return (
    <View style={styles.root}>
      <Header navigation={navigation} showBack title="Cluster" />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <LinearGradient colors={[COLORS.navy, clusterColor + 'CC']} style={styles.hero}>
          <View style={[styles.heroIcon, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
            <Ionicons name={cluster.icon} size={30} color={COLORS.white} />
          </View>
          <Text style={styles.heroName}>{cluster.name}</Text>
          <Text style={styles.heroFull}>{cluster.fullName}</Text>
          <View style={styles.heroMeta}>
            <View style={styles.heroMetaItem}>
              <Ionicons name="people-outline" size={13} color="rgba(255,255,255,0.6)" />
              <Text style={styles.heroMetaText}>{cluster.memberCount} members</Text>
            </View>
            <View style={styles.heroMetaItem}>
              <Ionicons name="calendar-outline" size={13} color="rgba(255,255,255,0.6)" />
              <Text style={styles.heroMetaText}>Next: {cluster.nextMeeting}</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          {/* About */}
          <Section title="About this Cluster" icon="information-circle">
            <Text style={styles.descText}>{cluster.description}</Text>
          </Section>

          {/* Current Topics */}
          <Section title="Current Topics" icon="chatbubbles">
            {cluster.topics.map((topic, i) => (
              <View key={i} style={styles.topicRow}>
                <View style={[styles.topicDot, { backgroundColor: clusterColor }]} />
                <Text style={styles.topicText}>{topic}</Text>
              </View>
            ))}
          </Section>

          {/* Active Poll */}
          <Section title="Active Poll" icon="stats-chart">
            <Text style={styles.pollQuestion}>{cluster.poll.question}</Text>
            {cluster.poll.options.map((option, i) => {
              const optionLabel = typeof option === 'string' ? option : option.label;
              const votes = getVotes(optionLabel, i);
              const pct = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
              const isVoted = voted === optionLabel;
              return (
                <TouchableOpacity
                  key={optionLabel}
                  style={[styles.pollOption, isVoted && styles.pollOptionVoted]}
                  onPress={() => !voted && setVoted(optionLabel)}
                  activeOpacity={voted ? 1 : 0.7}
                >
                  <View style={styles.pollOptionTop}>
                    <Text style={[styles.pollOptionLabel, isVoted && styles.pollOptionLabelVoted]}>{optionLabel}</Text>
                    {voted && <Text style={styles.pollPct}>{pct}%</Text>}
                  </View>
                  {voted && (
                    <View style={styles.pollBar}>
                      <View style={[styles.pollBarFill, { width: `${pct}%`, backgroundColor: isVoted ? clusterColor : COLORS.border }]} />
                    </View>
                  )}
                  {!voted && (
                    <Text style={styles.pollVoteCount}>{votes} votes</Text>
                  )}
                </TouchableOpacity>
              );
            })}
            {voted ? (
              <Text style={styles.pollThanks}>Thanks for voting! Total: {totalVotes} votes</Text>
            ) : (
              <Text style={styles.pollHint}>Tap an option to cast your vote</Text>
            )}
          </Section>

          {/* Documents */}
          {cluster.documents?.length > 0 && (
            <Section title="Documents" icon="document-text">
              {cluster.documents.map((doc) => {
                const docTitle = typeof doc === 'string' ? doc : doc.title;
                const docMeta = typeof doc === 'string' ? '' : `${doc.type} · ${doc.date}`;
                return (
                  <View key={docTitle} style={styles.docRow}>
                    <View style={styles.docIconWrap}>
                      <Ionicons name="document-text" size={18} color={COLORS.blue} />
                    </View>
                    <View style={styles.docInfo}>
                      <Text style={styles.docTitle}>{docTitle}</Text>
                      {docMeta ? <Text style={styles.docMeta}>{docMeta}</Text> : null}
                    </View>
                    <Ionicons name="download-outline" size={18} color={COLORS.textMuted} />
                  </View>
                );
              })}
            </Section>
          )}

          {/* Issues */}
          {cluster.issues?.length > 0 && (
            <Section title="Issue Tracker" icon="alert-circle">
              {cluster.issues.map((issue, idx) => {
                const issueTitle = typeof issue === 'string' ? issue : issue.title;
                const priority = typeof issue === 'string' ? 'Medium' : (issue.priority || 'Medium');
                const status = typeof issue === 'string' ? 'Open' : (issue.status || 'Open');
                return (
                  <View key={idx} style={styles.issueRow}>
                    <View style={[styles.issuePriority, {
                      backgroundColor: priority === 'High' ? '#FEE2E2' : priority === 'Medium' ? COLORS.goldSoft : '#DCFCE7'
                    }]}>
                      <Text style={[styles.issuePriorityText, {
                        color: priority === 'High' ? '#EF4444' : priority === 'Medium' ? '#B45309' : '#16713A'
                      }]}>{priority}</Text>
                    </View>
                    <View style={styles.issueInfo}>
                      <Text style={styles.issueTitle}>{issueTitle}</Text>
                      <Text style={styles.issueMeta}>{status}</Text>
                    </View>
                  </View>
                );
              })}
            </Section>
          )}

          {/* Recommendations */}
          {cluster.recommendations?.length > 0 && (
            <Section title="Policy Recommendations" icon="megaphone">
              {cluster.recommendations.map((rec, i) => (
                <View key={i} style={styles.recRow}>
                  <View style={styles.recNumber}>
                    <Text style={styles.recNumberText}>{i + 1}</Text>
                  </View>
                  <Text style={styles.recText}>{rec}</Text>
                </View>
              ))}
            </Section>
          )}

          {/* Meeting Summaries */}
          {cluster.meetings?.length > 0 && (
            <Section title="Meeting Summaries" icon="reader">
              {cluster.meetings.map((meeting, i) => (
                <View key={i} style={styles.meetingCard}>
                  <View style={styles.meetingHeader}>
                    <Text style={styles.meetingTitle}>{meeting.title || 'Meeting'}</Text>
                    <Text style={styles.meetingDate}>{meeting.date}</Text>
                  </View>
                  <Text style={styles.meetingSummary}>{meeting.summary}</Text>
                </View>
              ))}
            </Section>
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
  heroIcon: {
    width: 70,
    height: 70,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  heroName: { fontSize: 24, fontWeight: '800', color: COLORS.white, textAlign: 'center', letterSpacing: -0.3 },
  heroFull: { fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 4, marginBottom: 14, textAlign: 'center' },
  heroMeta: { flexDirection: 'row', gap: 16 },
  heroMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  heroMetaText: { fontSize: 12, color: 'rgba(255,255,255,0.7)' },
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
  descText: { fontSize: 14, color: COLORS.textPrimary, lineHeight: 22 },
  topicRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 5 },
  topicDot: { width: 8, height: 8, borderRadius: 4 },
  topicText: { fontSize: 13, color: COLORS.textPrimary },
  pollQuestion: { fontSize: 15, fontWeight: '600', color: COLORS.navy, marginBottom: 14, lineHeight: 22 },
  pollOption: {
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    padding: 12,
    marginBottom: 8,
    backgroundColor: COLORS.background,
  },
  pollOptionVoted: { borderColor: COLORS.navy, backgroundColor: COLORS.navy + '08' },
  pollOptionTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  pollOptionLabel: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary, flex: 1 },
  pollOptionLabelVoted: { color: COLORS.navy },
  pollPct: { fontSize: 13, fontWeight: '700', color: COLORS.navy },
  pollBar: { height: 6, backgroundColor: COLORS.borderLight, borderRadius: 3, overflow: 'hidden', marginTop: 4 },
  pollBarFill: { height: '100%', borderRadius: 3 },
  pollVoteCount: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  pollThanks: { fontSize: 12, color: COLORS.textMuted, textAlign: 'center', marginTop: 4, fontStyle: 'italic' },
  pollHint: { fontSize: 11, color: COLORS.textMuted, textAlign: 'center', marginTop: 4, fontStyle: 'italic' },
  docRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: COLORS.borderLight },
  docIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.blue + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  docInfo: { flex: 1 },
  docTitle: { fontSize: 13, fontWeight: '600', color: COLORS.navy },
  docMeta: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  issueRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: COLORS.borderLight },
  issuePriority: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
    minWidth: 60,
    alignItems: 'center',
  },
  issuePriorityText: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },
  issueInfo: { flex: 1 },
  issueTitle: { fontSize: 13, fontWeight: '600', color: COLORS.navy },
  issueMeta: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  recRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 10 },
  recNumber: {
    width: 24,
    height: 24,
    borderRadius: 7,
    backgroundColor: COLORS.navy,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  recNumberText: { fontSize: 12, fontWeight: '700', color: COLORS.white },
  recText: { flex: 1, fontSize: 13, color: COLORS.textPrimary, lineHeight: 20 },
  meetingCard: {
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    padding: 12,
    marginBottom: 8,
  },
  meetingHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  meetingTitle: { fontSize: 13, fontWeight: '700', color: COLORS.navy, flex: 1 },
  meetingDate: { fontSize: 11, color: COLORS.textMuted },
  meetingSummary: { fontSize: 12, color: COLORS.textSecondary, lineHeight: 18 },
  bottomSpacer: { height: 40 },
});
