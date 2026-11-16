import { StyleSheet } from 'react-native-unistyles'

// Global styles that can be reused anywhere (like utility / global CSS on the web).
// Usage: <View style={common.screen} />
// Combined with a local style: <View style={[common.card, styles.item]} />
export const common = StyleSheet.create((theme) => ({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  center: { marginTop: 32 },
  card: { backgroundColor: theme.colors.card, borderRadius: 12 },
  errorText: { color: theme.colors.text, padding: 16 },
  text: { color: theme.colors.text },
  textBold: { color: theme.colors.text, fontWeight: '600' },
}))
