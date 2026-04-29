import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, SHADOW, RADIUS } from '../theme';
import { notifications as notifData } from '../data/notifications';
import { LinearGradient } from 'expo-linear-gradient';

export default function Header({ navigation, title, showBack = false }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(notifData);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <>
      <LinearGradient colors={[COLORS.navy, COLORS.navyLight]} style={styles.headerGradient}>
        <SafeAreaView>
          <View style={styles.headerInner}>
            <View style={styles.leftSection}>
              {showBack ? (
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn} activeOpacity={0.7}>
                  <Ionicons name="arrow-back" size={22} color={COLORS.white} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.iconBtn} activeOpacity={0.7}>
                  <Ionicons name="menu" size={24} color={COLORS.white} />
                </TouchableOpacity>
              )}
              {!showBack && (
                <View style={styles.logoArea}>
                  <View style={styles.logoMini}>
                    <Text style={styles.logoMiniText}>OG</Text>
                  </View>
                  <View>
                    <Text style={styles.appTitle}>OEGJK Connect</Text>
                    <Text style={styles.appSubtitle}>Business Platform</Text>
                  </View>
                </View>
              )}
              {showBack && (
                <Text style={styles.backTitle} numberOfLines={1}>{title}</Text>
              )}
            </View>
            <View style={styles.rightSection}>
              <TouchableOpacity
                style={styles.notifBtn}
                onPress={() => setShowNotifications(true)}
                activeOpacity={0.7}
              >
                <Ionicons name="notifications" size={22} color={COLORS.white} />
                {unreadCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{unreadCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <Modal
        visible={showNotifications}
        transparent
        animationType="fade"
        onRequestClose={() => setShowNotifications(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowNotifications(false)}
        >
          <TouchableOpacity activeOpacity={1} style={styles.notifPanel}>
            <View style={styles.notifHeader}>
              <Text style={styles.notifTitle}>Notifications</Text>
              <View style={styles.notifHeaderRight}>
                <TouchableOpacity onPress={markAllRead}>
                  <Text style={styles.markReadText}>Mark all read</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowNotifications(false)} style={styles.closeBtn}>
                  <Ionicons name="close" size={20} color={COLORS.textSecondary} />
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView>
              {notifications.map((n) => (
                <View key={n.id} style={[styles.notifItem, !n.isRead && styles.notifItemUnread]}>
                  <View style={[styles.notifIconWrap, { backgroundColor: n.iconColor + '20' }]}>
                    <Ionicons name={n.icon} size={20} color={n.iconColor} />
                  </View>
                  <View style={styles.notifContent}>
                    <Text style={styles.notifItemTitle}>{n.title}</Text>
                    <Text style={styles.notifMessage}>{n.message}</Text>
                    <Text style={styles.notifTime}>{n.time}</Text>
                  </View>
                  {!n.isRead && <View style={styles.unreadDot} />}
                </View>
              ))}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  headerGradient: {
    zIndex: 100,
  },
  headerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoMini: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  logoMiniText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.navy,
    letterSpacing: 1,
  },
  appTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.white,
    letterSpacing: 0.2,
  },
  appSubtitle: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.55)',
  },
  backTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notifBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.navy,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10,35,66,0.4)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 110,
    paddingRight: 12,
  },
  notifPanel: {
    width: 320,
    maxHeight: 450,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    ...SHADOW.cardStrong,
    overflow: 'hidden',
  },
  notifHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  notifTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.navy,
  },
  notifHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  markReadText: {
    fontSize: 12,
    color: COLORS.blue,
    fontWeight: '500',
    marginRight: 8,
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  notifItemUnread: {
    backgroundColor: COLORS.verifiedBg,
  },
  notifIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    flexShrink: 0,
  },
  notifContent: {
    flex: 1,
  },
  notifItemTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.navy,
    marginBottom: 3,
  },
  notifMessage: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 17,
    marginBottom: 4,
  },
  notifTime: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.blue,
    marginTop: 4,
    marginLeft: 8,
    flexShrink: 0,
  },
});
