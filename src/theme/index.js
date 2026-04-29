export const COLORS = {
  navy: '#0A2342',
  navyLight: '#1E3A5F',
  navyMid: '#1A3A5C',
  blue: '#1E5FA8',
  blueLight: '#2E7ADB',
  gold: '#C9A84C',
  goldLight: '#E8C14E',
  goldSoft: '#FFF8E7',
  white: '#FFFFFF',
  background: '#F4F6FA',
  backgroundAlt: '#EEF1F7',
  cardBg: '#FFFFFF',
  border: '#E2E8F0',
  borderLight: '#EEF1F7',
  textPrimary: '#0A2342',
  textSecondary: '#4A5568',
  textMuted: '#8A9BAC',
  success: '#22C55E',
  successLight: '#F0FDF4',
  warning: '#F59E0B',
  error: '#EF4444',
  premiumBg: '#FFF8E7',
  premiumBorder: '#C9A84C',
  verifiedBg: '#EFF6FF',
  verifiedBorder: '#1E5FA8',
  kosovoColor: '#003082',
  germanyColor: '#DD0000',
  onlineColor: '#22C55E',
  shadowColor: '#0A2342',
};

export const TYPOGRAPHY = {
  h1: { fontSize: 26, fontWeight: '700', color: COLORS.navy, letterSpacing: -0.5 },
  h2: { fontSize: 22, fontWeight: '700', color: COLORS.navy, letterSpacing: -0.3 },
  h3: { fontSize: 18, fontWeight: '600', color: COLORS.navy },
  h4: { fontSize: 16, fontWeight: '600', color: COLORS.navy },
  body: { fontSize: 14, fontWeight: '400', color: COLORS.textSecondary, lineHeight: 21 },
  bodySmall: { fontSize: 12, fontWeight: '400', color: COLORS.textMuted, lineHeight: 18 },
  label: { fontSize: 11, fontWeight: '600', color: COLORS.textMuted, letterSpacing: 0.8, textTransform: 'uppercase' },
  button: { fontSize: 15, fontWeight: '600' },
  buttonSmall: { fontSize: 13, fontWeight: '600' },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
};

export const SHADOW = {
  card: {
    shadowColor: '#0A2342',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardStrong: {
    shadowColor: '#0A2342',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
  },
  small: {
    shadowColor: '#0A2342',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
};
