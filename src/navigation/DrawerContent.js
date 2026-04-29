import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';

const NAV_ITEMS = [
  { name: 'Home', icon: 'home', screen: 'Home' },
  { name: 'Members', icon: 'people', screen: 'Members' },
  { name: 'B2B Matchmaking', icon: 'git-compare', screen: 'B2B' },
  { name: 'Members4Members', icon: 'gift', screen: 'M4M' },
  { name: 'Events & Fairs', icon: 'calendar', screen: 'Events' },
  { name: 'Market Entry', icon: 'earth', screen: 'MarketEntry' },
  { name: 'SES Experts', icon: 'person-circle', screen: 'SES' },
  { name: 'Clusters', icon: 'layers', screen: 'Clusters' },
  { name: 'Networks', icon: 'share-social', screen: 'Networks' },
  { name: 'Profile', icon: 'briefcase', screen: 'Profile' },
];

export default function DrawerContent({ state, navigation }) {
  const currentRouteName = state?.routes?.[state?.index]?.name;

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.navy, COLORS.navyLight]} style={styles.header}>
        <View style={styles.logoRow}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>OG</Text>
          </View>
          <View style={styles.logoTextBlock}>
            <Text style={styles.appName}>OEGJK Connect</Text>
            <Text style={styles.appSub}>Business Platform</Text>
          </View>
        </View>
        <View style={styles.memberBadge}>
          <Ionicons name="star" size={12} color={COLORS.gold} />
          <Text style={styles.memberBadgeText}>Premium Member</Text>
        </View>
        <Text style={styles.memberName}>Pixellent Solutions</Text>
      </LinearGradient>

      <ScrollView style={styles.navList} showsVerticalScrollIndicator={false}>
        {NAV_ITEMS.map((item) => {
          const isActive = currentRouteName === item.screen;
          return (
            <TouchableOpacity
              key={item.screen}
              style={[styles.navItem, isActive && styles.navItemActive]}
              onPress={() => navigation.navigate(item.screen)}
              activeOpacity={0.7}
            >
              <View style={[styles.navIconWrap, isActive && styles.navIconWrapActive]}>
                <Ionicons
                  name={item.icon}
                  size={20}
                  color={isActive ? COLORS.white : COLORS.textMuted}
                />
              </View>
              <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
                {item.name}
              </Text>
              {isActive && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerDivider} />
        <Text style={styles.footerText}>© 2026 OEGJK · v1.0 MVP</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingTop: 56,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.navy,
    letterSpacing: 1,
  },
  logoTextBlock: { flex: 1 },
  appName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
    letterSpacing: 0.3,
  },
  appSub: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(201,168,76,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.4)',
  },
  memberBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.goldLight,
    marginLeft: 4,
  },
  memberName: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.75)',
  },
  navList: {
    flex: 1,
    paddingTop: 8,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 11,
    marginHorizontal: 8,
    marginVertical: 1,
    borderRadius: 10,
    position: 'relative',
  },
  navItemActive: {
    backgroundColor: COLORS.backgroundAlt,
  },
  navIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 9,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  navIconWrapActive: {
    backgroundColor: COLORS.navy,
  },
  navLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
    flex: 1,
  },
  navLabelActive: {
    fontWeight: '600',
    color: COLORS.navy,
  },
  activeIndicator: {
    width: 4,
    height: 20,
    backgroundColor: COLORS.gold,
    borderRadius: 2,
    position: 'absolute',
    right: 0,
  },
  bottomSpacer: { height: 24 },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  footerDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 12,
  },
  footerText: {
    fontSize: 11,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
});
