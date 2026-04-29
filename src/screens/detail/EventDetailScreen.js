import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';
import Badge from '../../components/Badge';
import { COLORS, SPACING, SHADOW, RADIUS } from '../../theme';
import { getEventById } from '../../data/events';

const CATEGORY_COLORS = {
  'Business Forum': '#1E5FA8',
  'Info Session': '#9333EA',
  'Germany Fair': '#C9A84C',
  'Cluster Meeting': '#16713A',
  'Trade Fair': '#C9A84C',
  'Networking': '#EF4444',
  'New Member': '#0891B2',
  'B2B Delegation': '#C9A84C',
};

export default function EventDetailScreen({ route, navigation }) {
  const { eventId } = route.params;
  const event = getEventById(eventId);
  const [registered, setRegistered] = useState(false);
  const [ticketModal, setTicketModal] = useState(false);
  const [calendarMsg, setCalendarMsg] = useState(false);
  const [fairChecklist, setFairChecklist] = useState([]);

  if (!event) {
    return (
      <View style={styles.root}>
        <Header navigation={navigation} showBack title="Event" />
        <View style={styles.errorWrap}><Text style={styles.errorText}>Event not found.</Text></View>
      </View>
    );
  }

  const catColor = CATEGORY_COLORS[event.category] || COLORS.blue;

  const toggleFairCheck = (item) => {
    setFairChecklist((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleRegister = () => {
    setRegistered(true);
    setTicketModal(true);
  };

  return (
    <View style={styles.root}>
      <Header navigation={navigation} showBack title="Event Details" />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <LinearGradient colors={[COLORS.navy, COLORS.navyLight]} style={styles.hero}>
          <View style={styles.heroBadgesRow}>
            <View style={[styles.catBadge, { backgroundColor: catColor + '30', borderColor: catColor + '60' }]}>
              <Text style={[styles.catBadgeText, { color: catColor === COLORS.gold || catColor === '#C9A84C' ? '#9A7A2A' : catColor }]}>{event.category}</Text>
            </View>
            {event.isFeatured && <Badge type="Featured" size="sm" />}
            {event.isGermanFair && <Badge type="Germany" size="sm" />}
          </View>
          <Text style={styles.heroTitle}>{event.title}</Text>
          <View style={styles.heroMeta}>
            <View style={styles.heroMetaItem}>
              <Ionicons name="calendar-outline" size={13} color="rgba(255,255,255,0.6)" />
              <Text style={styles.heroMetaText}>{event.dateDisplay}</Text>
            </View>
            {event.time && (
              <View style={styles.heroMetaItem}>
                <Ionicons name="time-outline" size={13} color="rgba(255,255,255,0.6)" />
                <Text style={styles.heroMetaText}>{event.time}</Text>
              </View>
            )}
            <View style={styles.heroMetaItem}>
              <Ionicons name="location-outline" size={13} color="rgba(255,255,255,0.6)" />
              <Text style={styles.heroMetaText}>{event.location}</Text>
            </View>
            <View style={styles.heroMetaItem}>
              <Ionicons name="people-outline" size={13} color="rgba(255,255,255,0.6)" />
              <Text style={styles.heroMetaText}>{event.participantCount} participants</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Register Actions */}
        <View style={styles.actionsRow}>
          {!registered ? (
            <TouchableOpacity style={styles.registerBtn} onPress={handleRegister} activeOpacity={0.8}>
              <Ionicons name="ticket" size={16} color={COLORS.white} />
              <Text style={styles.registerBtnText}>Register / Attend</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.registeredBtn} onPress={() => setTicketModal(true)} activeOpacity={0.8}>
              <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
              <Text style={styles.registeredBtnText}>Registered — View Ticket</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.calendarBtn}
            onPress={() => setCalendarMsg(true)}
            activeOpacity={0.8}
          >
            <Ionicons name="calendar-outline" size={18} color={COLORS.navy} />
          </TouchableOpacity>
        </View>

        {calendarMsg && (
          <View style={styles.calendarToast}>
            <Ionicons name="checkmark-circle" size={14} color={COLORS.success} />
            <Text style={styles.calendarToastText}>Event added to your calendar</Text>
          </View>
        )}

        <View style={styles.content}>
          {/* Description */}
          <InfoSection title="About this Event">
            <Text style={styles.descText}>{event.fullDescription}</Text>
          </InfoSection>

          {/* Agenda */}
          {event.agenda?.length > 0 && (
            <InfoSection title="Agenda">
              {event.agenda.map((item, i) => (
                <View key={i} style={styles.agendaItem}>
                  <View style={styles.agendaNumber}>
                    <Text style={styles.agendaNumberText}>{i + 1}</Text>
                  </View>
                  <View style={styles.agendaContent}>
                    {item.time && <Text style={styles.agendaTime}>{item.time}</Text>}
                    <Text style={styles.agendaTitle}>{item.title || item.item}</Text>
                    {item.speaker && <Text style={styles.agendaSpeaker}>by {item.speaker}</Text>}
                  </View>
                </View>
              ))}
            </InfoSection>
          )}

          {/* Speakers */}
          {event.speakers?.length > 0 && (
            <InfoSection title="Speakers">
              {event.speakers.map((spk) => {
                const spkLabel = typeof spk === 'string' ? spk : spk.name;
                const spkRole = typeof spk === 'string' ? '' : spk.role;
                const initials = spkLabel.split(' ').map((w) => w[0]).join('').substring(0, 2);
                return (
                  <View key={spkLabel} style={styles.speakerRow}>
                    <View style={styles.speakerAvatar}>
                      <Text style={styles.speakerAvatarText}>{initials}</Text>
                    </View>
                    <View>
                      <Text style={styles.speakerName}>{spkLabel}</Text>
                      {spkRole ? <Text style={styles.speakerRole}>{spkRole}</Text> : null}
                    </View>
                  </View>
                );
              })}
            </InfoSection>
          )}

          {/* Organizers */}
          {event.organizers?.length > 0 && (
            <InfoSection title="Organizers">
              <View style={styles.organizersRow}>
                {event.organizers.map((org) => (
                  <View key={org} style={styles.orgChip}>
                    <Text style={styles.orgChipText}>{org}</Text>
                  </View>
                ))}
              </View>
            </InfoSection>
          )}

          {/* Germany Fair Plan */}
          {event.isGermanFair && (
            <View style={styles.fairPlanCard}>
              <LinearGradient colors={['#C9A84C', '#A87B2A']} style={styles.fairPlanHeader}>
                <Ionicons name="flag" size={18} color={COLORS.white} />
                <Text style={styles.fairPlanTitle}>My Germany Fair Plan</Text>
              </LinearGradient>
              <View style={styles.fairPlanBody}>
                {event.fairCity && (
                  <View style={styles.fairMetaRow}>
                    <Ionicons name="location" size={14} color={COLORS.textMuted} />
                    <Text style={styles.fairMetaText}>{event.fairCity}</Text>
                  </View>
                )}
                {event.fairDate && (
                  <View style={styles.fairMetaRow}>
                    <Ionicons name="calendar" size={14} color={COLORS.textMuted} />
                    <Text style={styles.fairMetaText}>{event.fairDate}</Text>
                  </View>
                )}
                {event.delegationContact && (
                  <View style={styles.fairMetaRow}>
                    <Ionicons name="person" size={14} color={COLORS.textMuted} />
                    <Text style={styles.fairMetaText}>Contact: {event.delegationContact}</Text>
                  </View>
                )}

                {event.fairChecklist?.length > 0 && (
                  <View style={styles.checklistSection}>
                    <Text style={styles.checklistTitle}>Pre-Fair Checklist</Text>
                    {event.fairChecklist.map((item) => (
                      <TouchableOpacity
                        key={item}
                        style={styles.checklistItem}
                        onPress={() => toggleFairCheck(item)}
                        activeOpacity={0.7}
                      >
                        <View style={[styles.checkbox, fairChecklist.includes(item) && styles.checkboxDone]}>
                          {fairChecklist.includes(item) && <Ionicons name="checkmark" size={12} color={COLORS.white} />}
                        </View>
                        <Text style={[styles.checklistItemText, fairChecklist.includes(item) && styles.checklistItemDone]}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                {event.recommendedContacts?.length > 0 && (
                  <View style={styles.recSection}>
                    <Text style={styles.checklistTitle}>Recommended Contacts</Text>
                    {event.recommendedContacts.map((c) => {
                      const label = typeof c === 'string' ? c : c.name;
                      const sub = typeof c === 'string' ? '' : c.company;
                      return (
                        <View key={label} style={styles.recContact}>
                          <Ionicons name="person-circle" size={20} color={COLORS.blue} />
                          <View>
                            <Text style={styles.recName}>{label}</Text>
                            {sub ? <Text style={styles.recRole}>{sub}</Text> : null}
                          </View>
                        </View>
                      );
                    })}
                  </View>
                )}
              </View>
            </View>
          )}
        </View>
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Ticket Modal */}
      <Modal visible={ticketModal} transparent animationType="slide" onRequestClose={() => setTicketModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.ticketCard}>
            <LinearGradient colors={[COLORS.navy, COLORS.navyLight]} style={styles.ticketHeader}>
              <Ionicons name="ticket" size={32} color={COLORS.gold} />
              <Text style={styles.ticketTitle}>Your Ticket</Text>
              <Text style={styles.ticketEvent}>{event.title}</Text>
            </LinearGradient>
            <View style={styles.ticketBody}>
              <View style={styles.ticketRow}>
                <Text style={styles.ticketLabel}>Date</Text>
                <Text style={styles.ticketValue}>{event.dateDisplay}</Text>
              </View>
              {event.time && (
                <View style={styles.ticketRow}>
                  <Text style={styles.ticketLabel}>Time</Text>
                  <Text style={styles.ticketValue}>{event.time}</Text>
                </View>
              )}
              <View style={styles.ticketRow}>
                <Text style={styles.ticketLabel}>Location</Text>
                <Text style={styles.ticketValue}>{event.location}</Text>
              </View>
              <View style={styles.ticketRow}>
                <Text style={styles.ticketLabel}>Ticket ID</Text>
                <Text style={[styles.ticketValue, styles.ticketId]}>{event.ticketId || `TKT-${event.id.toUpperCase()}-01`}</Text>
              </View>
              <View style={styles.ticketRow}>
                <Text style={styles.ticketLabel}>Status</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusBadgeText}>Registered</Text>
                </View>
              </View>
              {/* QR placeholder */}
              <View style={styles.qrPlaceholder}>
                <Ionicons name="qr-code" size={64} color={COLORS.navy} />
                <Text style={styles.qrLabel}>QR code shown at entry</Text>
              </View>
              <TouchableOpacity style={styles.closeTicketBtn} onPress={() => setTicketModal(false)} activeOpacity={0.8}>
                <Text style={styles.closeTicketText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function InfoSection({ title, children }) {
  return (
    <View style={styles.infoSection}>
      <Text style={styles.infoSectionTitle}>{title}</Text>
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
  },
  heroBadgesRow: { flexDirection: 'row', gap: 8, marginBottom: 12, flexWrap: 'wrap' },
  catBadge: {
    borderRadius: RADIUS.full,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  catBadgeText: { fontSize: 11, fontWeight: '700' },
  heroTitle: { fontSize: 24, fontWeight: '800', color: COLORS.white, lineHeight: 32, marginBottom: 14, letterSpacing: -0.3 },
  heroMeta: { gap: 6 },
  heroMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  heroMetaText: { fontSize: 13, color: 'rgba(255,255,255,0.7)' },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  registerBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.navy,
    borderRadius: RADIUS.md,
    paddingVertical: 13,
  },
  registerBtnText: { fontSize: 14, fontWeight: '700', color: COLORS.white },
  registeredBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#DCFCE7',
    borderRadius: RADIUS.md,
    paddingVertical: 13,
    borderWidth: 1.5,
    borderColor: '#BBF7D0',
  },
  registeredBtnText: { fontSize: 14, fontWeight: '700', color: '#16713A' },
  calendarBtn: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.navy,
    backgroundColor: COLORS.white,
  },
  calendarToast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#DCFCE7',
    marginHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    padding: 10,
    marginBottom: 4,
  },
  calendarToastText: { fontSize: 13, color: '#15803D', fontWeight: '500' },
  content: { paddingHorizontal: SPACING.md },
  infoSection: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: 12,
    ...SHADOW.card,
  },
  infoSectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 12,
  },
  descText: { fontSize: 14, color: COLORS.textPrimary, lineHeight: 22 },
  agendaItem: { flexDirection: 'row', gap: 12, marginBottom: 12, alignItems: 'flex-start' },
  agendaNumber: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: COLORS.navy,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  agendaNumberText: { fontSize: 12, fontWeight: '700', color: COLORS.white },
  agendaContent: { flex: 1 },
  agendaTime: { fontSize: 11, color: COLORS.textMuted, marginBottom: 2 },
  agendaTitle: { fontSize: 13, fontWeight: '600', color: COLORS.navy },
  agendaSpeaker: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  speakerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  speakerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speakerAvatarText: { fontSize: 14, fontWeight: '700', color: COLORS.white },
  speakerName: { fontSize: 14, fontWeight: '600', color: COLORS.navy },
  speakerRole: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
  organizersRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  orgChip: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  orgChipText: { fontSize: 12, fontWeight: '500', color: COLORS.textSecondary },
  fairPlanCard: {
    borderRadius: RADIUS.lg,
    marginBottom: 12,
    overflow: 'hidden',
    ...SHADOW.card,
  },
  fairPlanHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: SPACING.md,
  },
  fairPlanTitle: { fontSize: 16, fontWeight: '700', color: COLORS.white },
  fairPlanBody: { backgroundColor: COLORS.white, padding: SPACING.md },
  fairMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  fairMetaText: { fontSize: 13, color: COLORS.textSecondary },
  checklistSection: { marginTop: 12 },
  checklistTitle: { fontSize: 13, fontWeight: '700', color: COLORS.navy, marginBottom: 10 },
  checklistItem: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: { backgroundColor: COLORS.success, borderColor: COLORS.success },
  checklistItemText: { fontSize: 13, color: COLORS.textSecondary },
  checklistItemDone: { textDecorationLine: 'line-through', color: COLORS.textMuted },
  recSection: { marginTop: 12 },
  recContact: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  recName: { fontSize: 13, fontWeight: '600', color: COLORS.navy },
  recRole: { fontSize: 11, color: COLORS.textMuted },
  bottomSpacer: { height: 40 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10,35,66,0.65)',
    justifyContent: 'flex-end',
    padding: 16,
  },
  ticketCard: {
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    ...SHADOW.cardStrong,
  },
  ticketHeader: {
    alignItems: 'center',
    padding: SPACING.xl,
    gap: 8,
  },
  ticketTitle: { fontSize: 13, fontWeight: '600', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 1 },
  ticketEvent: { fontSize: 18, fontWeight: '800', color: COLORS.white, textAlign: 'center' },
  ticketBody: { backgroundColor: COLORS.white, padding: SPACING.md },
  ticketRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.borderLight },
  ticketLabel: { fontSize: 12, fontWeight: '600', color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
  ticketValue: { fontSize: 13, fontWeight: '600', color: COLORS.navy },
  ticketId: { fontFamily: 'monospace', color: COLORS.blue },
  statusBadge: {
    backgroundColor: '#DCFCE7',
    borderRadius: RADIUS.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusBadgeText: { fontSize: 12, fontWeight: '700', color: '#16713A' },
  qrPlaceholder: { alignItems: 'center', paddingVertical: 24, gap: 8 },
  qrLabel: { fontSize: 12, color: COLORS.textMuted },
  closeTicketBtn: {
    backgroundColor: COLORS.navy,
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  closeTicketText: { fontSize: 15, fontWeight: '700', color: COLORS.white },
});
