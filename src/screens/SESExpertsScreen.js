import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import StatusTracker from '../components/StatusTracker';
import { COLORS, SPACING, SHADOW, RADIUS } from '../theme';

const ORG_TYPES = ['Company', 'Municipality', 'NGO', 'Education institution', 'Public institution'];
const SECTORS = ['Finance', 'Legal', 'Management', 'Production', 'Technology', 'Marketing', 'Agriculture', 'Education', 'Administration', 'Healthcare', 'Process Improvement', 'ICT'];
const LANGUAGES = ['German', 'English', 'Albanian'];
const SIZES = ['< 10 employees', '10–50', '50–250', '250+'];
const SES_STATUS_STEPS = ['Submitted', 'Under Review', 'Expert Matching', 'Visit Planned', 'Completed'];

const EXPERT_AREAS = [
  'Finance & Accounting',
  'Legal & Compliance',
  'Company Management',
  'Production & Manufacturing',
  'Technology & Digitalization',
  'Marketing & Sales',
  'Agriculture & Food',
  'Education & Training',
  'Public Administration',
  'Process Improvement',
];

export default function SESExpertsScreen({ navigation }) {
  const [form, setForm] = useState({
    orgName: '',
    orgType: ORG_TYPES[0],
    sector: SECTORS[0],
    problem: '',
    expertise: EXPERT_AREAS[0],
    language: LANGUAGES[0],
    size: SIZES[0],
    preferredDates: '',
    canCoverCosts: true,
    contactPerson: '',
    contactInfo: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <View style={styles.root}>
      <Header navigation={navigation} />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Page Header */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>SES Experts</Text>
          <Text style={styles.pageSub}>Request support from experienced German senior experts.</Text>
        </View>

        <View style={styles.content}>
          {/* Info Card */}
          <View style={styles.infoCard}>
            <Ionicons name="person-circle" size={22} color={COLORS.gold} />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>What is an SES Expert?</Text>
              <Text style={styles.infoText}>
                Senior Experten Service (SES) connects companies and institutions with highly experienced German professionals who volunteer their expertise. Companies and institutions describe their challenge – OEGJK coordinates the next steps.
              </Text>
            </View>
          </View>

          {/* Expert Area Cards */}
          <Text style={styles.sectionTitle}>SES experts can help with:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.expertAreasRow}>
              {EXPERT_AREAS.map((area) => (
                <View key={area} style={styles.expertAreaCard}>
                  <Ionicons name="person" size={16} color={COLORS.blue} />
                  <Text style={styles.expertAreaText}>{area}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          {!submitted ? (
            <View style={styles.formCard}>
              <Text style={styles.formTitle}>Submit SES Request</Text>

              <FormField label="Organization / Company Name">
                <TextInput
                  style={styles.textInput}
                  value={form.orgName}
                  onChangeText={(v) => setForm({ ...form, orgName: v })}
                  placeholder="Your organization name"
                  placeholderTextColor={COLORS.textMuted}
                />
              </FormField>

              <FormField label="Organization Type">
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.chipsRow}>
                    {ORG_TYPES.map((t) => (
                      <TouchableOpacity
                        key={t}
                        style={[styles.chip, form.orgType === t && styles.chipActive]}
                        onPress={() => setForm({ ...form, orgType: t })}
                        activeOpacity={0.7}
                      >
                        <Text style={[styles.chipText, form.orgType === t && styles.chipTextActive]}>{t}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
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

              <FormField label="Describe your business problem or challenge">
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  multiline
                  numberOfLines={4}
                  value={form.problem}
                  onChangeText={(v) => setForm({ ...form, problem: v })}
                  placeholder="Describe the specific challenge you need expert support with..."
                  placeholderTextColor={COLORS.textMuted}
                />
              </FormField>

              <FormField label="Desired Expertise Area">
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.chipsRow}>
                    {EXPERT_AREAS.map((area) => (
                      <TouchableOpacity
                        key={area}
                        style={[styles.chip, form.expertise === area && styles.chipActive]}
                        onPress={() => setForm({ ...form, expertise: area })}
                        activeOpacity={0.7}
                      >
                        <Text style={[styles.chipText, form.expertise === area && styles.chipTextActive]}>{area}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </FormField>

              <FormField label="Language Needs">
                <View style={styles.selectRow}>
                  {LANGUAGES.map((l) => (
                    <TouchableOpacity
                      key={l}
                      style={[styles.selectOption, form.language === l && styles.selectOptionActive]}
                      onPress={() => setForm({ ...form, language: l })}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.selectOptionText, form.language === l && styles.selectOptionTextActive]}>{l}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </FormField>

              <FormField label="Organization Size">
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

              <FormField label="Preferred Dates for Expert Visit">
                <TextInput
                  style={styles.textInput}
                  value={form.preferredDates}
                  onChangeText={(v) => setForm({ ...form, preferredDates: v })}
                  placeholder="e.g. June–July 2026"
                  placeholderTextColor={COLORS.textMuted}
                />
              </FormField>

              <FormField label="Can you cover local costs (accommodation, meals)?">
                <View style={styles.selectRow}>
                  {[{ label: 'Yes', val: true }, { label: 'No', val: false }].map(({ label, val }) => (
                    <TouchableOpacity
                      key={label}
                      style={[styles.selectOption, form.canCoverCosts === val && styles.selectOptionActive]}
                      onPress={() => setForm({ ...form, canCoverCosts: val })}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.selectOptionText, form.canCoverCosts === val && styles.selectOptionTextActive]}>{label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </FormField>

              <FormField label="Contact Person">
                <TextInput
                  style={styles.textInput}
                  value={form.contactPerson}
                  onChangeText={(v) => setForm({ ...form, contactPerson: v })}
                  placeholder="Name and role"
                  placeholderTextColor={COLORS.textMuted}
                />
              </FormField>

              <FormField label="Email / Phone">
                <TextInput
                  style={styles.textInput}
                  value={form.contactInfo}
                  onChangeText={(v) => setForm({ ...form, contactInfo: v })}
                  placeholder="contact@yourcompany.com | +383..."
                  placeholderTextColor={COLORS.textMuted}
                />
              </FormField>

              {/* Document Upload Placeholder */}
              <FormField label="Supporting Documents (optional)">
                <View style={styles.uploadPlaceholder}>
                  <Ionicons name="cloud-upload-outline" size={28} color={COLORS.textMuted} />
                  <Text style={styles.uploadTitle}>Attach Documents</Text>
                  <Text style={styles.uploadSub}>Company profile, org chart, or problem description (PDF, DOCX)</Text>
                  <Text style={styles.uploadNote}>Available in the full platform</Text>
                </View>
              </FormField>

              <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.8}>
                <Ionicons name="send" size={18} color={COLORS.white} />
                <Text style={styles.submitBtnText}>Submit SES Request</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.resultSection}>
              {/* Confirmation */}
              <View style={styles.confirmCard}>
                <Ionicons name="checkmark-circle" size={44} color={COLORS.success} />
                <Text style={styles.confirmTitle}>Request Submitted!</Text>
                <Text style={styles.confirmText}>
                  Your SES request has been submitted. A senior expert request would be reviewed and OEGJK would contact you shortly.
                </Text>
                <View style={styles.refRow}>
                  <Text style={styles.refLabel}>Reference ID:</Text>
                  <Text style={styles.refId}>SES-2026-0{Math.floor(Math.random() * 90) + 10}</Text>
                </View>
              </View>

              {/* Status Tracker */}
              <View style={styles.statusCard}>
                <Text style={styles.statusTitle}>Request Progress</Text>
                <View style={styles.pendingBadge}>
                  <View style={styles.pendingDot} />
                  <Text style={styles.pendingText}>Pending Review</Text>
                </View>
                <StatusTracker steps={SES_STATUS_STEPS} activeIndex={0} />
              </View>

              <TouchableOpacity
                style={styles.newRequestBtn}
                onPress={() => setSubmitted(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.newRequestBtnText}>Submit Another Request</Text>
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
    gap: 12,
    backgroundColor: COLORS.goldSoft,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.gold + '40',
  },
  infoContent: { flex: 1 },
  infoTitle: { fontSize: 14, fontWeight: '700', color: COLORS.navy, marginBottom: 4 },
  infoText: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 19 },
  sectionTitle: { fontSize: 15, fontWeight: '600', color: COLORS.navy, marginBottom: SPACING.sm },
  expertAreasRow: { flexDirection: 'row', gap: 8, paddingBottom: 16, paddingRight: SPACING.md },
  expertAreaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOW.small,
  },
  expertAreaText: { fontSize: 12, fontWeight: '500', color: COLORS.textSecondary, whiteSpace: 'nowrap' },
  formCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    ...SHADOW.card,
    marginBottom: SPACING.md,
  },
  formTitle: { fontSize: 17, fontWeight: '700', color: COLORS.navy, marginBottom: SPACING.md },
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
  textArea: { minHeight: 90, textAlignVertical: 'top' },
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
  uploadPlaceholder: {
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
    gap: 6,
  },
  uploadTitle: { fontSize: 14, fontWeight: '600', color: COLORS.textSecondary },
  uploadSub: { fontSize: 12, color: COLORS.textMuted, textAlign: 'center' },
  uploadNote: { fontSize: 11, color: COLORS.textMuted, fontStyle: 'italic' },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: COLORS.navy,
    borderRadius: RADIUS.md,
    paddingVertical: 15,
    marginTop: SPACING.sm,
  },
  submitBtnText: { fontSize: 15, fontWeight: '700', color: COLORS.white },
  resultSection: {},
  confirmCard: {
    backgroundColor: COLORS.successLight,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    alignItems: 'center',
    gap: 8,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  confirmTitle: { fontSize: 20, fontWeight: '700', color: '#15803D' },
  confirmText: { fontSize: 13, color: '#166534', textAlign: 'center', lineHeight: 20 },
  refRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  refLabel: { fontSize: 12, color: '#166534', fontWeight: '500' },
  refId: { fontSize: 13, fontWeight: '700', color: COLORS.navy, fontFamily: 'monospace' },
  statusCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    ...SHADOW.card,
    marginBottom: SPACING.md,
  },
  statusTitle: { fontSize: 16, fontWeight: '700', color: COLORS.navy, marginBottom: 8 },
  pendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.goldSoft,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    marginBottom: SPACING.sm,
  },
  pendingDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.gold },
  pendingText: { fontSize: 12, fontWeight: '600', color: COLORS.gold },
  newRequestBtn: {
    borderWidth: 1.5,
    borderColor: COLORS.navy,
    borderRadius: RADIUS.md,
    paddingVertical: 13,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  newRequestBtnText: { fontSize: 14, fontWeight: '600', color: COLORS.navy },
  bottomSpacer: { height: 40 },
});
