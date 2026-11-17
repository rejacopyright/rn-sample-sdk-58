import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  // 6 padding on each side = 12 gap between cards
  cell: { padding: 6 },
  // combined with common.card; thin border so the white card does not blend into the white body
  card: { padding: 10, gap: 4, borderWidth: 1, borderColor: theme.colors.border },
  image: { width: '100%', aspectRatio: 1 },
  badge: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: theme.colors.danger,
  },
  badgeText: { color: theme.colors.onPrimary, fontSize: 12, fontWeight: '700' },
  heartButton: { position: 'absolute', top: 0, right: 0, padding: 4 },
  category: { color: theme.colors.mutedText, fontSize: 11, textTransform: 'uppercase' },
  title: { color: theme.colors.text, fontWeight: '600', minHeight: 36 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 8, minHeight: 18 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  rating: { color: theme.colors.text, fontSize: 12, fontWeight: '600' },
  lowStock: { color: theme.colors.danger, fontSize: 12, fontWeight: '600' },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6 },
  price: { color: theme.colors.primary, fontWeight: '700', fontSize: 16 },
  originalPrice: {
    color: theme.colors.mutedText,
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
}))
