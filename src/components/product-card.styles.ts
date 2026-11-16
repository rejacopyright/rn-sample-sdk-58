import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  // padding 6 di tiap sisi = jarak 12 antar kartu
  cell: { padding: 6 },
  card: { padding: 10, gap: 4 }, // dipadukan dengan common.card
  image: { width: '100%', aspectRatio: 1 },
  title: { color: theme.colors.text, fontWeight: '600', minHeight: 36 },
  price: { color: theme.colors.primary, fontWeight: '700' },
  heartButton: { position: 'absolute', top: 0, right: 0, padding: 4 },
  heart: { fontSize: 22, color: theme.colors.text },
}))
