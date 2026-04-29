import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING } from '../theme';

export default function StatusTracker({ steps, activeIndex }) {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const isActive = index === activeIndex;
        const isDone = index < activeIndex;
        const isPending = index > activeIndex;
        return (
          <View key={step} style={styles.stepRow}>
            <View style={styles.stepLeft}>
              <View style={[
                styles.stepDot,
                isDone && styles.stepDotDone,
                isActive && styles.stepDotActive,
                isPending && styles.stepDotPending,
              ]}>
                {isDone ? (
                  <Ionicons name="checkmark" size={12} color={COLORS.white} />
                ) : isActive ? (
                  <View style={styles.activePulse} />
                ) : (
                  <View style={styles.pendingDot} />
                )}
              </View>
              {index < steps.length - 1 && (
                <View style={[styles.connector, isDone && styles.connectorDone]} />
              )}
            </View>
            <View style={styles.stepContent}>
              <Text style={[
                styles.stepLabel,
                isDone && styles.stepLabelDone,
                isActive && styles.stepLabelActive,
                isPending && styles.stepLabelPending,
              ]}>{step}</Text>
              {isActive && (
                <Text style={styles.activeStatus}>In Progress</Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.sm,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    minHeight: 48,
  },
  stepLeft: {
    alignItems: 'center',
    width: 32,
    marginRight: 12,
  },
  stepDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.border,
  },
  stepDotDone: {
    backgroundColor: COLORS.success,
  },
  stepDotActive: {
    backgroundColor: COLORS.navy,
  },
  stepDotPending: {
    backgroundColor: COLORS.border,
  },
  activePulse: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.gold,
  },
  pendingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.textMuted,
  },
  connector: {
    width: 2,
    flex: 1,
    backgroundColor: COLORS.border,
    marginTop: 4,
    marginBottom: -4,
    minHeight: 20,
  },
  connectorDone: {
    backgroundColor: COLORS.success,
  },
  stepContent: {
    flex: 1,
    paddingTop: 4,
    paddingBottom: 16,
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textMuted,
  },
  stepLabelDone: {
    color: COLORS.success,
    fontWeight: '600',
  },
  stepLabelActive: {
    color: COLORS.navy,
    fontWeight: '700',
  },
  stepLabelPending: {
    color: COLORS.textMuted,
  },
  activeStatus: {
    fontSize: 11,
    color: COLORS.gold,
    fontWeight: '600',
    marginTop: 2,
  },
});
