import { StyleSheet } from 'react-native-unistyles'
import { tabContentInset } from './layout'

export const productDetail = StyleSheet.create((theme, rt) => ({
  content: { paddingBottom: tabContentInset(rt) },
  slide: { width: rt.screen.width, aspectRatio: 1, backgroundColor: '#fff' },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 6, paddingTop: 12 },
  dot: (active: boolean) => ({
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: active ? theme.colors.primary : theme.colors.border,
  }),
  body: { padding: 16, gap: 8 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  category: { color: theme.colors.mutedText, fontSize: 12, textTransform: 'uppercase' },
  heart: { fontSize: 28, color: theme.colors.text },
  title: { color: theme.colors.text, fontSize: 22, fontWeight: '700' },
  brand: { color: theme.colors.mutedText, fontSize: 14 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8 },
  price: { color: theme.colors.primary, fontSize: 26, fontWeight: '700' },
  originalPrice: {
    color: theme.colors.mutedText,
    fontSize: 16,
    textDecorationLine: 'line-through',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: theme.colors.danger,
  },
  badgeText: { color: theme.colors.onPrimary, fontSize: 12, fontWeight: '700' },
  meta: { flexDirection: 'row', gap: 16, alignItems: 'center' },
  stock: (low: boolean) => ({
    color: low ? theme.colors.danger : theme.colors.mutedText,
    fontWeight: '600',
  }),
  sectionTitle: { color: theme.colors.text, fontSize: 16, fontWeight: '700', marginTop: 8 },
  description: { color: theme.colors.text, lineHeight: 22 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: theme.colors.muted,
  },
  tagText: { color: theme.colors.text, fontSize: 12 },
  sku: { color: theme.colors.mutedText, fontSize: 12, marginTop: 8 },
}))
