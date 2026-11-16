import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  // same 6 padding as the product cells so the banner lines up with the grid
  cell: { padding: 6 },
  banner: { padding: 16, gap: 4, borderRadius: 12, backgroundColor: theme.colors.primary },
  title: { color: theme.colors.onPrimary, fontSize: 18, fontWeight: '700' },
  subtitle: { color: theme.colors.onPrimary, opacity: 0.85 },
}))
